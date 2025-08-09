# app/api/v1/endpoints/customers.py
from fastapi import APIRouter, Depends, HTTPException, status, Body, Path, Query
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models import Customer, Order, User
from app.schemas.customer import CustomerCreate, CustomerUpdate, CustomerResponse

router = APIRouter()

@router.get("/", response_model=List[CustomerResponse])
def list_customers(
    db: Session = Depends(get_db),
    limit: int = Query(50, ge=1, le=200, description="Max customers to return"),
    offset: int = Query(0, ge=0, description="Pagination offset"),
):
    return db.query(Customer).offset(offset).limit(limit).all()

@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(
    customer_id: int = Path(..., ge=1, description="Customer ID"),
    db: Session = Depends(get_db),
):
    obj = db.get(Customer, customer_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Customer not found")
    return obj

@router.post("/", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
def create_customer(
    payload: CustomerCreate = Body(..., description="Customer data"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = Customer(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(
    customer_id: int = Path(..., ge=1),
    payload: CustomerUpdate = Body(..., description="Fields to update"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(Customer, customer_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Customer not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(
    customer_id: int = Path(..., ge=1),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(Customer, customer_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(obj); db.commit()
    return None

@router.get("/{customer_id}/orders", response_model=List[dict])
def list_customer_orders(
    customer_id: int = Path(..., ge=1),
    db: Session = Depends(get_db),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    customer = db.get(Customer, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    orders = (
        db.query(Order)
        .filter(Order.customer_id == customer_id)
        .offset(offset)
        .limit(limit)
        .all()
    )
    return [
        {"id": o.id, "tracking_id": o.tracking_id,
         "status": getattr(o.status, "value", o.status),
         "final_amount": float(o.final_amount)}
        for o in orders
    ]
