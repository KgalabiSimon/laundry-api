# app/api/v1/endpoints/loyalty.py
from fastapi import APIRouter, Depends, HTTPException, status, Body, Path, Query
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models import (
    PointsTransaction, LoyaltyTierConfig, SubscriptionPlanConfig,
    TransactionType, Customer, LoyaltyTier, User
)
from app.schemas.loyalty import (
    PointsTxnCreate, PointsTxnOut,
    LoyaltyTierConfigCreate, LoyaltyTierConfigUpdate, LoyaltyTierConfigOut,
    SubscriptionPlanConfigCreate, SubscriptionPlanConfigUpdate, SubscriptionPlanConfigOut
)

router = APIRouter()

def _apply_points(customer: Customer, txn: PointsTransaction) -> None:
    pts = int(customer.loyalty_points or 0)
    if txn.transaction_type in (TransactionType.EARNED, TransactionType.BONUS):
        pts += txn.points
    elif txn.transaction_type in (TransactionType.REDEEMED, TransactionType.EXPIRED, TransactionType.ADJUSTMENT):
        pts -= txn.points
    customer.loyalty_points = max(0, pts)

def _update_tier(db: Session, customer: Customer) -> None:
    configs = (
        db.query(LoyaltyTierConfig)
        .filter(LoyaltyTierConfig.is_active == True)
        .order_by(LoyaltyTierConfig.min_orders.asc())
        .all()
    )
    best = None
    for cfg in configs:
        if (customer.total_orders or 0) >= cfg.min_orders:
            best = cfg
    if best:
        mapping = {"bronze": LoyaltyTier.BRONZE, "silver": LoyaltyTier.SILVER,
                   "gold": LoyaltyTier.GOLD, "platinum": LoyaltyTier.PLATINUM}
        name = (best.tier_name or "").lower()
        if name in mapping:
            customer.loyalty_tier = mapping[name]

# Points transactions
@router.get("/points", response_model=List[PointsTxnOut])
def list_points_txns(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    return db.query(PointsTransaction).offset(offset).limit(limit).all()

@router.post("/points", response_model=PointsTxnOut, status_code=status.HTTP_201_CREATED)
def create_points_txn(
    payload: PointsTxnCreate = Body(..., description="Points transaction"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    customer = db.get(Customer, payload.customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    txn = PointsTransaction(**payload.model_dump())
    db.add(txn); db.flush()
    _apply_points(customer, txn); _update_tier(db, customer)
    db.commit(); db.refresh(txn)
    return txn

# Tier config
@router.get("/tiers", response_model=List[LoyaltyTierConfigOut])
def list_tiers(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return db.query(LoyaltyTierConfig).all()

@router.post("/tiers", response_model=LoyaltyTierConfigOut, status_code=status.HTTP_201_CREATED)
def create_tier(
    payload: LoyaltyTierConfigCreate = Body(..., description="Tier config"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = LoyaltyTierConfig(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/tiers/{tier_id}", response_model=LoyaltyTierConfigOut)
def update_tier(
    tier_id: int = Path(..., ge=1),
    payload: LoyaltyTierConfigUpdate = Body(...),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(LoyaltyTierConfig, tier_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Tier config not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/tiers/{tier_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tier(
    tier_id: int = Path(..., ge=1),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(LoyaltyTierConfig, tier_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Tier config not found")
    db.delete(obj); db.commit()
    return None

# Subscription plans
@router.get("/plans", response_model=List[SubscriptionPlanConfigOut])
def list_plans(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return db.query(SubscriptionPlanConfig).all()

@router.post("/plans", response_model=SubscriptionPlanConfigOut, status_code=status.HTTP_201_CREATED)
def create_plan(
    payload: SubscriptionPlanConfigCreate = Body(..., description="Plan config"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = SubscriptionPlanConfig(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/plans/{plan_id}", response_model=SubscriptionPlanConfigOut)
def update_plan(
    plan_id: int = Path(..., ge=1),
    payload: SubscriptionPlanConfigUpdate = Body(...),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(SubscriptionPlanConfig, plan_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Plan config not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/plans/{plan_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_plan(
    plan_id: int = Path(..., ge=1),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(SubscriptionPlanConfig, plan_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Plan config not found")
    db.delete(obj); db.commit()
    return None
