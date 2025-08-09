# app/api/v1/endpoints/users.py
from fastapi import APIRouter, Depends, HTTPException, status, Body, Path, Query
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models import User
from app.schemas.user import UserCreate, UserUpdate, UserResponse

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
def list_users(
    db: Session = Depends(get_db),
    limit: int = Query(50, ge=1, le=200, description="Max users to return"),
    offset: int = Query(0, ge=0, description="Pagination offset"),
):
    return db.query(User).offset(offset).limit(limit).all()

@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int = Path(..., ge=1, description="User ID"),
    db: Session = Depends(get_db),
):
    obj = db.get(User, user_id)
    if not obj:
        raise HTTPException(status_code=404, detail="User not found")
    return obj

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(
    payload: UserCreate = Body(..., description="User data (JSON)"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = User(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int = Path(..., ge=1),
    payload: UserUpdate = Body(...),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(User, user_id)
    if not obj:
        raise HTTPException(status_code=404, detail="User not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj
