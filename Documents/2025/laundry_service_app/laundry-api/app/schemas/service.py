# app/schemas/service.py
from pydantic import BaseModel, ConfigDict
from typing import Optional, Literal

class ServiceTypeBase(BaseModel):
    name: Optional[str] = None
    category: Literal["wash", "dry-clean", "iron", "special"]
    base_price: float
    description: Optional[str] = None
    estimated_duration_hours: Optional[int] = 2
    is_active: Optional[bool] = True

class ServiceTypeCreate(ServiceTypeBase):
    pass

class ServiceTypeUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[Literal["wash", "dry-clean", "iron", "special"]] = None
    base_price: Optional[float] = None
    description: Optional[str] = None
    estimated_duration_hours: Optional[int] = None
    is_active: Optional[bool] = None

class ServiceTypeOut(ServiceTypeBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
