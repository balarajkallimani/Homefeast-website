# HomeFeast Backend & Database Setup

## ✅ Backend Structure Created

A complete Node.js/Express backend with MongoDB integration has been set up.

---

## 📁 Backend Directory Structure

```
homefeast-backend/
├── config/
│   └── database.js              # MongoDB connection config
├── models/
│   ├── User.js                  # User schema
│   ├── Cook.js                  # Cook/Provider schema
│   ├── Menu.js                  # Menu items schema
│   ├── Order.js                 # Orders schema
│   └── Subscription.js          # Subscriptions schema
├── middleware/
│   └── auth.js                  # JWT authentication middleware
├── routes/
│   ├── auth.js                  # Authentication endpoints
│   ├── cooks.js                 # Cook endpoints
│   ├── orders.js                # Order management
│   ├── menus.js                 # Menu management
│   └── subscriptions.js         # Subscription endpoints
├── server.js                    # Main server file
├── .env                         # Environment variables
├── package.json                 # Dependencies
└── package-lock.json            # Lock file
```

---

## 🗄️ Database Schema

### User Model
```
{
  name: String (required)
  email: String (unique, required)
  password: String (hashed, required)
  role: 'customer' | 'cook' | 'admin'
  isVerified: Boolean
  phone: String
  address: String
  profileImage: String
  createdAt: Date
}
```

### Cook Model
```
{
  userId: ObjectId (ref: User)
  businessName: String
  cuisineType: [String]
  serviceArea: String
  mealTypes: { breakfast, lunch, dinner }
  minPrice: Number
  maxPrice: Number
  rating: Number (0-5)
  totalOrders: Number
  isApproved: Boolean
  documents: { fssaiLicense, idProof }
  availableDays: [String]
  createdAt: Date
}
```

### Menu Model
```
{
  cookId: ObjectId (ref: Cook)
  dishName: String
  description: String
  price: Number
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  cuisineType: String
  isVegetarian: Boolean
  servingSize: String
  ingredients: [String]
  image: String
  availability: { monday, tuesday... }
  createdAt: Date
}
```

### Order Model
```
{
  userId: ObjectId (ref: User)
  cookId: ObjectId (ref: Cook)
  items: [{ menuId, dishName, price, quantity }]
  totalAmount: Number
  orderDate: Date
  deliveryDate: Date
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  deliveryAddress: String
  specialInstructions: String
  paymentStatus: 'pending' | 'completed' | 'failed'
  rating: Number
  review: String
}
```

### Subscription Model
```
{
  userId: ObjectId (ref: User)
  cookId: ObjectId (ref: Cook)
  planType: 'daily' | 'weekly' | 'monthly'
  mealsPerDay: Number
  mealTypes: [String]
  startDate: Date
  endDate: Date
  totalCost: Number
  status: 'active' | 'paused' | 'cancelled' | 'completed'
  paymentStatus: 'pending' | 'completed' | 'failed'
  deliveryDays: [String]
  createdAt: Date
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

### Setup Instructions

#### 1. Create MongoDB Database
**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `.env` file with connection string

#### 2. Start Backend Server

```bash
cd "c:\Users\Admin\OneDrive\Desktop\Dev website\homefeast-backend"
npm install  # if not already done
npm start    # or npm run dev
```

The server will run on `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Cooks
- `GET /api/cooks` - Get all approved cooks
- `GET /api/cooks/:id` - Get cook details
- `POST /api/cooks/register` - Register as cook
- `PUT /api/cooks/:id` - Update cook profile

### Orders
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/cook-orders` - Get cook's orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status
- `POST /api/orders/:id/review` - Add review

### Menus
- `GET /api/menus/cook/:cookId` - Get cook's menu
- `POST /api/menus` - Add menu item
- `PUT /api/menus/:id` - Update menu item
- `DELETE /api/menus/:id` - Delete menu item

### Subscriptions
- `GET /api/subscriptions/my-subscriptions` - Get user subscriptions
- `GET /api/subscriptions/cook-subscriptions` - Get cook subscriptions
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `POST /api/subscriptions/:id/cancel` - Cancel subscription

---

## 🔐 Environment Variables

Create `.env` file in backend root:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/homefeast
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**For MongoDB Atlas**, use connection string format:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/homefeast
```

---

## 🔑 Authentication Flow

### Registration
1. User submits name, email, password
2. Server validates email uniqueness
3. Password is hashed using bcrypt
4. User is saved to database
5. JWT token is generated and returned
6. Token is stored in localStorage

### Login
1. User submits email and password
2. Server finds user by email
3. Compares submitted password with hashed password
4. If match, JWT token is generated
5. Token is returned to frontend

### Protected Routes
- Requests include `Authorization: Bearer <token>`
- Middleware verifies token validity
- User ID is extracted from token
- Request proceeds if valid

---

## 📦 Dependencies Installed

```json
{
  "express": "Web framework",
  "cors": "Cross-Origin Resource Sharing",
  "dotenv": "Environment variables",
  "mongoose": "MongoDB ODM",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT authentication"
}
```

---

## 🧪 Testing Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "customer"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get current user (with token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token>"
```

### Using Postman
1. Download Postman
2. Import API endpoints
3. Set Authorization header with Bearer token
4. Test endpoints

---

## 🎯 Frontend Integration

The frontend has been updated with:

### 1. API Client (`lib/api.ts`)
- Centralized API calls
- Automatic token handling
- Error management
- Request/response handling

### 2. Auth Context (`lib/AuthContext.tsx`)
- Global authentication state
- User context provider
- useAuth hook for components
- Login/register/logout functions

### 3. Updated Components
- Login page with backend integration
- Register page with backend integration
- Dashboard with auth protection
- Auto-redirect to login if not authenticated

---

## 🔗 How Frontend Connects to Backend

1. **API URL**: Frontend sends requests to `http://localhost:5000/api`
2. **Token Storage**: Auth token stored in `localStorage`
3. **Auto Headers**: Token automatically added to requests
4. **Error Handling**: Errors caught and displayed to user
5. **State Management**: useAuth hook provides global auth state

---

## 📊 Database Connection Details

### Local MongoDB
- **URI**: `mongodb://localhost:27017/homefeast`
- **Database**: `homefeast`
- **Port**: 27017

### MongoDB Atlas
- **URI Format**: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
- **Create at**: https://cloud.mongodb.com

---

## 🚨 Common Issues & Solutions

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### JWT Token Expired
```
Error: Invalid token
```
**Solution**: Login again to get new token

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Check CORS configuration in server.js

### Port Already in Use
```
Error: Port 5000 already in use
```
**Solution**: Change PORT in .env or kill existing process

---

## 📈 Next Steps

1. ✅ Backend server created
2. ✅ MongoDB models defined
3. ✅ API endpoints built
4. ✅ Frontend integrated
5. 🔄 Add payment integration (Stripe/Razorpay)
6. 🔄 Implement order notifications
7. 🔄 Add admin dashboard
8. 🔄 Deploy to production

---

## 🎓 Running Everything

### Terminal 1 - Backend
```bash
cd "c:\Users\Admin\OneDrive\Desktop\Dev website\homefeast-backend"
npm start
# Output: Server running on port 5000
```

### Terminal 2 - Frontend
```bash
cd "c:\Users\Admin\OneDrive\Desktop\Dev website\homefeast"
npm run dev
# Output: Frontend running on http://localhost:3000
```

### Terminal 3 - MongoDB (if local)
```bash
mongod
# Output: MongoDB listening on port 27017
```

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

---

## ✨ Status

✅ **Backend**: Created and ready to run  
✅ **Database**: Configured and ready to connect  
✅ **API Routes**: All endpoints implemented  
✅ **Authentication**: JWT implemented  
✅ **Frontend**: Integrated with backend  

**Ready to connect and test!** 🚀

---

*Created: March 2, 2026*  
*Backend Server Location*: `c:\Users\Admin\OneDrive\Desktop\Dev website\homefeast-backend\`  
*Main File*: `server.js`
