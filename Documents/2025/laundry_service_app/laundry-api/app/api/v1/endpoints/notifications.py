# app/api/v1/endpoints/notifications.py
from fastapi import APIRouter, Depends, HTTPException, status, Body, Path, Query
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models import MessageTemplate, Notification, NotificationPreference, WebhookEvent, User
from app.schemas.notification import (
    MessageTemplateCreate, MessageTemplateUpdate, MessageTemplateOut,
    NotificationCreate, NotificationOut,
    NotificationPreferenceCreate, NotificationPreferenceUpdate, NotificationPreferenceOut,
    WebhookEventIn, WebhookEventOut
)

router = APIRouter()

# Templates
@router.get("/templates", response_model=List[MessageTemplateOut])
def list_templates(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    return db.query(MessageTemplate).offset(offset).limit(limit).all()

@router.post("/templates", response_model=MessageTemplateOut, status_code=status.HTTP_201_CREATED)
def create_template(
    payload: MessageTemplateCreate = Body(..., description="Template details"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = MessageTemplate(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/templates/{template_id}", response_model=MessageTemplateOut)
def update_template(
    template_id: int = Path(..., ge=1),
    payload: MessageTemplateUpdate = Body(...),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(MessageTemplate, template_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Template not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/templates/{template_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_template(
    template_id: int = Path(..., ge=1),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(MessageTemplate, template_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Template not found")
    db.delete(obj); db.commit()
    return None

# Notifications
@router.get("/", response_model=List[NotificationOut])
def list_notifications(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    return db.query(Notification).offset(offset).limit(limit).all()

@router.post("/", response_model=NotificationOut, status_code=status.HTTP_201_CREATED)
def create_notification(
    payload: NotificationCreate = Body(..., description="Outbound message"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = Notification(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

# Preferences
@router.get("/preferences", response_model=List[NotificationPreferenceOut])
def list_preferences(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    return db.query(NotificationPreference).offset(offset).limit(limit).all()

@router.post("/preferences", response_model=NotificationPreferenceOut, status_code=status.HTTP_201_CREATED)
def create_preference(
    payload: NotificationPreferenceCreate = Body(..., description="Notification prefs"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = NotificationPreference(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/preferences/{pref_id}", response_model=NotificationPreferenceOut)
def update_preference(
    pref_id: int = Path(..., ge=1),
    payload: NotificationPreferenceUpdate = Body(...),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(NotificationPreference, pref_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Preference not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/preferences/{pref_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_preference(
    pref_id: int = Path(..., ge=1),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    obj = db.get(NotificationPreference, pref_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Preference not found")
    db.delete(obj); db.commit()
    return None

# Webhook ingest
@router.post("/webhook", response_model=WebhookEventOut, status_code=status.HTTP_201_CREATED)
def ingest_webhook(
    payload: WebhookEventIn = Body(..., description="Webhook payload"),
    db: Session = Depends(get_db),
):
    obj = WebhookEvent(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj
