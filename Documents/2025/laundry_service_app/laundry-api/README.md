# LaundryPro API 🐍

A comprehensive FastAPI backend for the LaundryPro laundry service management system with advanced loyalty program features.

## 🚀 Features

### Core Functionality
- **User Authentication** - JWT-based auth with role-based access control
- **Customer Management** - Complete customer profiles with loyalty integration
- **Order Management** - Full order lifecycle with worker tracking
- **Loyalty Program** - 4-tier system with points and subscription plans
- **Worker Management** - Staff administration and performance tracking
- **Service Management** - Configurable service types and pricing
- **Analytics Dashboard** - Business metrics and reporting
- **Order Tracking** - Real-time status updates with unique tracking IDs

### Technical Features
- **FastAPI Framework** - Modern, fast, and async Python web framework
- **PostgreSQL Database** - Robust relational database with SQLAlchemy ORM
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access** - Admin, Worker, and Customer roles
- **Automatic API Documentation** - OpenAPI/Swagger integration
- **Request Validation** - Pydantic schemas for data validation
- **Database Migrations** - Alembic for schema management
- **Containerization** - Docker support for easy deployment
- **Comprehensive Logging** - Structured logging for monitoring
- **Background Tasks** - Celery integration for async operations

## 📋 Prerequisites

- Python 3.11+
- PostgreSQL 13+
- Redis (for caching and background tasks)
- Docker & Docker Compose (optional)

## 🛠️ Installation

### Option 1: Docker Compose (Recommended)

1. **Clone and setup**:
   ```bash
   cd laundry-api
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Start services**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   - API: http://localhost:8000
   - API Docs: http://localhost:8000/api/docs
   - Database Admin: http://localhost:8080

### Option 2: Local Development

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Setup database**:
   ```bash
   # Create PostgreSQL database
   createdb laundry_db
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL and Redis URLs
   ```

4. **Run the application**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## 🏗️ Project Structure

```
laundry-api/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── auth.py          # Authentication endpoints
│   │       │   ├── customers.py     # Customer management
│   │       │   ├── orders.py        # Order management
│   │       │   ├── workers.py       # Worker management
│   │       │   ├── services.py      # Service types
│   │       │   ├── loyalty.py       # Loyalty program
│   │       │   └── analytics.py     # Analytics & reports
│   │       └── api.py               # API router
│   ├── core/
│   │   ├── config.py                # Configuration settings
│   │   ├── database.py              # Database setup
│   │   ├── auth.py                  # Authentication utilities
│   │   └── logging_config.py        # Logging configuration
│   ├── models/
│   │   ├── user.py                  # User model
│   │   ├── customer.py              # Customer model
│   │   ├── worker.py                # Worker model
│   │   ├── service.py               # Service type model
│   │   ├── order.py                 # Order models
│   │   └── loyalty.py               # Loyalty program models
│   ├── schemas/
│   │   ├── user.py                  # User schemas
│   │   ├── customer.py              # Customer schemas
│   │   └── order.py                 # Order schemas
│   ├── utils/
│   │   └── init_data.py             # Default data initialization
│   └── main.py                      # FastAPI application
├── requirements.txt                 # Python dependencies
├── Dockerfile                       # Container configuration
├── docker-compose.yml              # Local development setup
└── .env.example                     # Environment variables template
```

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/register/customer` - Customer registration
- `POST /api/v1/auth/register/worker` - Worker registration (admin only)
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user info
- `POST /api/v1/auth/change-password` - Change password
- `POST /api/v1/auth/logout` - Logout

### Users Management
- `GET /api/v1/users` - List users (admin only)
- `GET /api/v1/users/{user_id}` - Get user details
- `PUT /api/v1/users/{user_id}` - Update user
- `DELETE /api/v1/users/{user_id}` - Deactivate user

### Customer Management
- `GET /api/v1/customers` - List customers
- `GET /api/v1/customers/{customer_id}` - Get customer details
- `PUT /api/v1/customers/{customer_id}` - Update customer
- `GET /api/v1/customers/{customer_id}/loyalty` - Get loyalty info
- `GET /api/v1/customers/{customer_id}/orders` - Get customer orders

### Order Management
- `GET /api/v1/orders` - List orders
- `POST /api/v1/orders` - Create new order
- `GET /api/v1/orders/{order_id}` - Get order details
- `PUT /api/v1/orders/{order_id}` - Update order
- `PATCH /api/v1/orders/{order_id}/status` - Update order status
- `GET /api/v1/orders/track/{tracking_id}` - Track order

### Worker Management
- `GET /api/v1/workers` - List workers (admin only)
- `GET /api/v1/workers/{worker_id}` - Get worker details
- `PUT /api/v1/workers/{worker_id}` - Update worker
- `GET /api/v1/workers/{worker_id}/orders` - Get worker's orders

### Service Management
- `GET /api/v1/services` - List service types
- `POST /api/v1/services` - Create service type (admin only)
- `PUT /api/v1/services/{service_id}` - Update service type
- `DELETE /api/v1/services/{service_id}` - Delete service type

### Loyalty Program
- `GET /api/v1/loyalty/tiers` - Get loyalty tier configurations
- `GET /api/v1/loyalty/plans` - Get subscription plan configurations
- `GET /api/v1/loyalty/points/{customer_id}` - Get customer points history
- `POST /api/v1/loyalty/points/adjust` - Adjust customer points (admin only)

### Analytics
- `GET /api/v1/analytics/dashboard` - Dashboard statistics
- `GET /api/v1/analytics/orders` - Order analytics
- `GET /api/v1/analytics/customers` - Customer analytics
- `GET /api/v1/analytics/revenue` - Revenue analytics

## 🔒 Authentication & Authorization

### User Roles
- **Admin**: Full system access, user management, analytics
- **Worker**: Order processing, status updates, customer service
- **Customer**: Order tracking, account management, loyalty program

### JWT Tokens
- **Access Token**: Short-lived (30 minutes) for API access
- **Refresh Token**: Long-lived (7 days) for token renewal

### Example Authentication
```python
# Login
response = requests.post("/api/v1/auth/login", json={
    "email": "admin@laundrysystem.com",
    "password": "admin123",
    "role": "admin"
})
tokens = response.json()

# Use access token
headers = {"Authorization": f"Bearer {tokens['access_token']}"}
response = requests.get("/api/v1/auth/me", headers=headers)
```

## 🏪 Business Logic

### Loyalty Program
- **4 Tiers**: Bronze (0+ orders), Silver (5+), Gold (15+), Platinum (30+)
- **Points**: 1 point per order + tier/plan multipliers
- **Discounts**: Tier-based (0%-15%) + subscription plan bonuses
- **Redemption**: Up to 50% of order value (1 point = ₹1)

### Order Processing
1. **Creation**: Customer/Worker creates order with items
2. **Calculation**: Automatic pricing with loyalty discounts
3. **Processing**: Worker assignment and status tracking
4. **Completion**: Points awarded, customer notified

### Subscription Plans
- **Basic**: No discount, 1x points
- **Premium**: 5% discount, 1.5x points
- **Family**: 10% discount, 2x points
- **Business**: 15% discount, 2.5x points

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_auth.py -v
```

## 📊 Monitoring & Logging

- **Structured Logging**: JSON format for production
- **Health Checks**: `/health` endpoint for monitoring
- **Performance Metrics**: Request timing headers
- **Error Tracking**: Comprehensive exception handling

## 🚀 Deployment

### Heroku Deployment
```bash
# Create Heroku app
heroku create your-laundry-api

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Add Redis addon
heroku addons:create heroku-redis:mini

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set ENVIRONMENT=production

# Deploy
git push heroku main
```

### Environment Variables
```bash
# Required
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-super-secret-key
ENVIRONMENT=production

# Optional
REDIS_URL=redis://localhost:6379/0
ALLOWED_ORIGINS=https://your-frontend-domain.com
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
```

## 🔄 Database Migrations

```bash
# Create migration
alembic revision --autogenerate -m "Add new column"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## 📝 API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

## 🤝 Integration with Frontend

The API is designed to work seamlessly with the existing React frontend:

```typescript
// Frontend API client example
const API_BASE = 'http://localhost:8000/api/v1';

// Authentication
const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Create order
const createOrder = async (orderData: any, token: string) => {
  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  return response.json();
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   ```bash
   # Check PostgreSQL is running
   systemctl status postgresql

   # Verify connection string in .env
   DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
   ```

2. **Authentication Errors**
   ```bash
   # Verify SECRET_KEY is set
   echo $SECRET_KEY

   # Check token expiration
   # Access tokens expire in 30 minutes
   ```

3. **CORS Issues**
   ```bash
   # Add frontend URL to ALLOWED_ORIGINS
   ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.com
   ```

## 📄 License

This project is part of the LaundryPro system developed for comprehensive laundry service management.

## 🏆 Features Completed

✅ **Authentication System** - JWT with role-based access
✅ **Database Models** - Complete SQLAlchemy models
✅ **API Structure** - RESTful endpoints with validation
✅ **Loyalty Program** - Full tier and points system
✅ **Docker Support** - Containerized deployment
✅ **Documentation** - Comprehensive API docs
✅ **Security** - Password hashing, JWT tokens
✅ **Logging** - Structured application logging

The FastAPI backend is now ready to replace the localStorage-based frontend with a robust, scalable API!
