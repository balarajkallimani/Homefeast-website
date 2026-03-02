# HomeFeast - Combined Repo Setup & Deployment

## Repository Structure

```
homefeast/ (single monorepo)
├── app/                    # Next.js pages & components
├── lib/                    # Frontend utilities (API client, auth)
├── public/                 # Static assets
├── server/                 # Express.js backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
├── package.json           # Frontend deps
├── .env.local            # Frontend env
├── vercel.json           # Frontend Vercel config
├── next.config.ts
└── README.md
```

## Local Development

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 2. Environment Setup

**Create `.env.local` (root directory):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Create `server/.env`:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/homefeast
JWT_SECRET=your-secret-key-here-change-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

```bash
mongod
```

### 4. Run Servers

**Terminal 1 - Backend (port 5000):**
```bash
cd server
npm start
```

**Terminal 2 - Frontend (port 3000):**
```bash
npm run dev
```

Visit: http://localhost:3000

### 5. Seed Sample Data

```bash
cd server
node seed.js
```

Creates 3 cooks with 12 menu items.

---

## Deploy to GitHub

### 1. Create GitHub Repository

Visit https://github.com/new
- **Repository name:** homefeast
- **Description:** HomeFeast - Full Stack Food Delivery Platform
- **Public** (recommended)
- **DO NOT** initialize with anything

### 2. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/homefeast.git
git branch -M main
git commit -m "Initial commit - full stack application" 2>/dev/null || true
git push -u origin main
```

Verify: https://github.com/YOUR_USERNAME/homefeast

---

## Deploy to Vercel

### Frontend Deployment (Automatic)

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Import Git Repository"
4. Select `homefeast` repository
5. **Configure:**
   - Framework: Next.js
   - Root Directory: `.`
   - Build Command: `npm run build`
   - Install Command: `npm install`
6. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL = https://homefeast-backend.vercel.app/api
   ```
7. Click "Deploy"

**Your Frontend URL:** https://homefeast.vercel.app

### Backend Deployment (Vercel Serverless)

1. Create new Vercel project for backend
2. Go to https://vercel.com/dashboard
3. Click "Add New..." → "Project"
4. Choose "Import Project"
5. Paste your repo URL: https://github.com/YOUR_USERNAME/homefeast
6. **Configure:**
   - Root Directory: `server`
   - Framework: Node.js
   - Build Command: (leave empty)
   - Install Command: `npm install`
7. **Environment Variables:**
   ```
   PORT = 5000
   MONGODB_URI = mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/homefeast
   JWT_SECRET = your-production-secret-key-change-this
   NODE_ENV = production
   FRONTEND_URL = https://homefeast.vercel.app
   ```
8. Click "Deploy"

**Your Backend URL:** https://homefeast-backend.vercel.app

### Update Frontend Environment

After backend deploys, update `NEXT_PUBLIC_API_URL` in Vercel:

1. Backend project → Settings → Environment Variables
2. Set `NEXT_PUBLIC_API_URL` to your backend URL
3. Redeploy frontend

### MongoDB Atlas Setup (Cloud Database)

1. Visit https://www.mongodb.com/atlas
2. Sign up for free account
3. Create new project and cluster (free tier)
4. Create database user:
   - Username: `homefeast`
   - Password: (use strong password)
5. Get connection string: `mongodb+srv://homefeast:PASSWORD@cluster.mongodb.net/homefeast`
6. Add to Vercel environment variables

---

## Make Changes & Auto-Deploy

After everything is set up:

1. Make code changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```
3. Vercel automatically deploys! ✅

---

## Project Features

✅ User Registration & Login (JWT)  
✅ Browse Cooks & Menus  
✅ Search & Filter  
✅ User Dashboard  
✅ Professional UI (Emerald/Slate Theme)  
✅ Responsive Design  
✅ MongoDB Integration  
✅ API Authentication  

## Test Credentials

- Email: `test@example.com`
- Password: `password123`

## API Endpoints

```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - User login
GET    /api/auth/me                - Get current user (protected)

GET    /api/cooks                  - Get all cooks
GET    /api/cooks/:id              - Get cook by ID

GET    /api/menus/cook/:cookId     - Get menus for cook
POST   /api/menus                  - Create menu (protected)

GET    /api/orders                 - Get user orders (protected)
POST   /api/orders                 - Create order (protected)

GET    /api/subscriptions          - Get subscriptions (protected)
```

## Troubleshooting

### "Failed to fetch" or API errors
- Check backend is deployed: `https://homefeast-backend.vercel.app/api/health`
- Verify `NEXT_PUBLIC_API_URL` on Vercel matches backend URL
- Check CORS in `server/server.js`

### MongoDB connection error
- Verify connection string in Vercel environment variables
- Check MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)
- Test connection locally first

### Deployment fails
- Check Vercel build logs
- Ensure `package.json` has all dependencies
- Verify `server/package.json` has dependencies
- Run `npm install` locally to verify no errors

### CORS issues
Update `server/server.js`:
```javascript
app.use(cors({
  origin: ['https://homefeast.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

## Commands Reference

**Frontend:**
```bash
npm run dev        # Development
npm run build      # Production build
npm run start      # Production start
npm run lint       # Check for errors
```

**Backend:**
```bash
cd server
npm start          # Start server
node seed.js       # Seed database
```

## Next Steps

1. ✅ Create GitHub repo
2. ✅ Push to GitHub
3. ✅ Set up MongoDB Atlas
4. ✅ Deploy backend to Vercel
5. ✅ Deploy frontend to Vercel
6. ✅ Verify both working
7. 🔄 Make changes and push to auto-deploy

---

**Your Application is Ready! 🚀**

- Frontend: https://homefeast.vercel.app
- Backend: https://homefeast-backend.vercel.app
- Repository: https://github.com/YOUR_USERNAME/homefeast
