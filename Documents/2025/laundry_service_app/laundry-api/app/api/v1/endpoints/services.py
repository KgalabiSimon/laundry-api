# app/api/v1/endpoints/services.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models import ServiceType, User
from app.schemas.service import ServiceTypeCreate, ServiceTypeUpdate, ServiceTypeOut

router = APIRouter()

@router.get("/", response_model=List[ServiceTypeOut])
def list_services(db: Session = Depends(get_db)):
    return db.query(ServiceType).all()

@router.get("/{service_id}", response_model=ServiceTypeOut)
def get_service(service_id: int, db: Session = Depends(get_db)):
    obj = db.get(ServiceType, service_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Service type not found")
    return obj

@router.post("/", response_model=ServiceTypeOut, status_code=status.HTTP_201_CREATED)
def create_service(payload: ServiceTypeCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    obj = ServiceType(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/{service_id}", response_model=ServiceTypeOut)
def update_service(service_id: int, payload: ServiceTypeUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    obj = db.get(ServiceType, service_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Service type not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(service_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    obj = db.get(ServiceType, service_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Service type not found")
    db.delete(obj); db.commit()
    return None
