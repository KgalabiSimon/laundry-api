# app/api/v1/endpoints/workers.py
from fastapi import APIRouter, Depends, HTTPException, status, Body, Path, Query
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models import Worker, User
from app.schemas.worker import WorkerCreate, WorkerUpdate, WorkerOut

router = APIRouter()

@router.get("/", response_model=List[WorkerOut])
def list_workers(
    db: Session = Depends(get_db),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    return db.query(Worker).offset(offset).limit(limit).all()

@router.get("/{worker_id}", response_model=WorkerOut)
def get_worker(
    worker_id: int = Path(..., ge=1),
    db: Session = Depends(get_db),
):
    obj = db.get(Worker, worker_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Worker not found")
    return obj

@router.post("/", response_model=WorkerOut, status_code=status.HTTP_201_CREATED)
def create_worker(
    payload: WorkerCreate = Body(..., description="Worker data"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = Worker(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/{worker_id}", response_model=WorkerOut)
def update_worker(
    worker_id: int = Path(..., ge=1),
    payload: WorkerUpdate = Body(...),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(Worker, worker_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Worker not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/{worker_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_worker(
    worker_id: int = Path(..., ge=1),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(Worker, worker_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Worker not found")
    db.delete(obj); db.commit()
    return None
