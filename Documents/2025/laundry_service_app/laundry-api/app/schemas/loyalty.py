# app/schemas/loyalty.py
from pydantic import BaseModel, ConfigDict
from typing import Optional, Literal

class PointsTxnBase(BaseModel):
    customer_id: int
    order_id: Optional[int] = None
    transaction_type: Literal["earned", "redeemed", "expired", "bonus", "adjustment"]
    points: int
    description: str
    processed_by_id: Optional[int] = None

class PointsTxnCreate(PointsTxnBase):
    pass

class PointsTxnOut(PointsTxnBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class LoyaltyTierConfigBase(BaseModel):
    tier_name: str
    min_orders: int
    discount_percentage: float
    points_multiplier: float
    color_code: str
    is_active: Optional[bool] = True

class LoyaltyTierConfigCreate(LoyaltyTierConfigBase):
    pass

class LoyaltyTierConfigUpdate(BaseModel):
    tier_name: Optional[str] = None
    min_orders: Optional[int] = None
    discount_percentage: Optional[float] = None
    points_multiplier: Optional[float] = None
    color_code: Optional[str] = None
    is_active: Optional[bool] = None

class LoyaltyTierConfigOut(LoyaltyTierConfigBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class SubscriptionPlanConfigBase(BaseModel):
    plan_name: str
    discount_percentage: float
    points_bonus_multiplier: float
    monthly_fee: float
    description: Optional[str] = None
    is_active: Optional[bool] = True

class SubscriptionPlanConfigCreate(SubscriptionPlanConfigBase):
    pass

class SubscriptionPlanConfigUpdate(BaseModel):
    plan_name: Optional[str] = None
    discount_percentage: Optional[float] = None
    points_bonus_multiplier: Optional[float] = None
    monthly_fee: Optional[float] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

class SubscriptionPlanConfigOut(SubscriptionPlanConfigBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
