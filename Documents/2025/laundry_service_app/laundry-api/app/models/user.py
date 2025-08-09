from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    WORKER = "worker"
    CUSTOMER = "customer"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships (make the FKs explicit)
    customer_profile = relationship(
        "Customer",
        back_populates="user",
        uselist=False,
        foreign_keys="Customer.user_id",
        primaryjoin="Customer.user_id == User.id",
    )

    worker_profile = relationship(
        "Worker",
        back_populates="user",
        uselist=False,
        foreign_keys="Worker.user_id",           # <-- disambiguates the 1–1 owner FK
        primaryjoin="Worker.user_id == User.id", # optional but explicit
    )

    # Optional reverse for 'created_by' on Worker
    workers_created = relationship(
        "Worker",
        foreign_keys="Worker.created_by_id",
        back_populates="created_by",
    )

    # For tracking order activities (kept as you had)
    captured_orders = relationship(
        "Order",
        foreign_keys="Order.captured_by_id",
        back_populates="captured_by",
    )
    assigned_orders = relationship(
        "Order",
        foreign_keys="Order.assigned_to_id",
        back_populates="assigned_to",
    )

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
