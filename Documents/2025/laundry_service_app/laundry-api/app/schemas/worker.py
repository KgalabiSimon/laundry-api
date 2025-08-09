# app/schemas/worker.py
from pydantic import BaseModel, ConfigDict
from typing import Optional, Literal

class WorkerBase(BaseModel):
    user_id: int
    employee_id: str
    worker_role: Optional[Literal["worker", "supervisor"]] = "worker"
    is_active: Optional[bool] = True
    total_orders_processed: Optional[int] = 0
    created_by_id: Optional[int] = None

class WorkerCreate(WorkerBase):
    pass

class WorkerUpdate(BaseModel):
    employee_id: Optional[str] = None
    worker_role: Optional[Literal["worker", "supervisor"]] = None
    is_active: Optional[bool] = None
    total_orders_processed: Optional[int] = None
    created_by_id: Optional[int] = None

class WorkerOut(WorkerBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
