# app/schemas/order.py
from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Literal

class OrderItemIn(BaseModel):
    service_type_id: int
    quantity: int
    price_per_item: Optional[float] = None  # if omitted, use service base_price

class OrderBase(BaseModel):
    customer_id: int
    status: Optional[Literal["pending", "in-progress", "ready", "completed", "cancelled"]] = "pending"
    discount_amount: Optional[float] = 0.0
    notes: Optional[str] = None
    captured_by_id: Optional[int] = None
    assigned_to_id: Optional[int] = None

class OrderCreate(OrderBase):
    items: List[OrderItemIn]

class OrderUpdate(BaseModel):
    status: Optional[Literal["pending", "in-progress", "ready", "completed", "cancelled"]] = None
    discount_amount: Optional[float] = None
    notes: Optional[str] = None
    assigned_to_id: Optional[int] = None

class OrderAssign(BaseModel):
    assigned_to_id: int

class OrderStatusChange(BaseModel):
    status: Literal["pending", "in-progress", "ready", "completed", "cancelled"]
    notes: Optional[str] = None
    updated_by_id: Optional[int] = None

class OrderItemOut(BaseModel):
    id: int
    service_type_id: int
    quantity: int
    price_per_item: float
    total_price: float
    model_config = ConfigDict(from_attributes=True)

class OrderOut(BaseModel):
    id: int
    tracking_id: str
    customer_id: int
    status: str
    total_amount: float
    discount_amount: float
    final_amount: float
    notes: Optional[str]
    captured_by_id: Optional[int]
    assigned_to_id: Optional[int]
    items: List[OrderItemOut]
    model_config = ConfigDict(from_attributes=True)
