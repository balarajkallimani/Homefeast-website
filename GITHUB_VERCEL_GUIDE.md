# 🚀 HomeFeast - Quick GitHub & Vercel Setup

## You Have a Single Combined Repository!

Your entire project is now in **one repository**:

```
homefeast/
├── app/              ← Frontend (Next.js pages)
├── lib/              ← Frontend utilities
├── server/           ← Backend (Express.js)
├── public/           ← Static assets
├── package.json      ← Frontend dependencies
└── server/package.json   ← Backend dependencies
```

---

## Step 1: Push to GitHub (2 Minutes)

### Create GitHub Repository

1. Visit https://github.com/new
2. **Repository name:** `homefeast`
3. **Description:** HomeFeast - Full Stack Food Delivery Platform
4. **Public** (recommended for portfolio)
5. **DO NOT** initialize with README/gitignore
6. Click "Create repository"

### Push Your Code

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
cd "c:\Users\Admin\OneDrive\Desktop\Dev website\homefeast"
git remote add origin https://github.com/YOUR_USERNAME/homefeast.git
git branch -M main
git push -u origin main
```

**That's it!** Your code is now on GitHub ✅

Verify: https://github.com/YOUR_USERNAME/homefeast

---

## Step 2: Deploy Frontend to Vercel (5 Minutes)

1. Visit https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Find and select: `homefeast` repository
5. **Configure:**
   - Framework: **Next.js**
   - Root Directory: **`.`**
6. **Add Environment Variable:**
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: http://localhost:5000/api
   ```
   (We'll update this after backend deploys)
7. Click **"Deploy"**

**Wait for deployment...** ✅

Your URL: `https://homefeast.vercel.app`

---

## Step 3: Deploy Backend to Vercel (5 Minutes)

### Option A: Separate Backend Project (Recommended)

1. Visit https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select: `homefeast` repository again
5. **Configure:**
   - Root Directory: **`server`**
   - Framework: **Node.js**
   - Build Command: **(leave empty)**
   - Install Command: **`npm install`**
6. **Add Environment Variables:**
   ```
   PORT: 5000
   MONGODB_URI: mongodb://localhost:27017/homefeast
   JWT_SECRET: your-secret-key-here-123
   NODE_ENV: production
   FRONTEND_URL: https://homefeast.vercel.app
   ```
7. Click **"Deploy"**

**Wait for deployment...** ✅

Your Backend URL: `https://homefeast-backend.vercel.app`

---

## Step 4: Connect MongoDB Atlas (Cloud Database)

1. Visit https://www.mongodb.com/atlas
2. Sign up (free account)
3. Create new project → Create cluster (free tier)
4. **Security → Database Access:**
   - Username: `homefeast`
   - Password: (create strong password)
5. **Network Access:**
   - Allow all IPs: `0.0.0.0/0`
6. **Connect → Drivers:**
   - Copy connection string
   - Example: `mongodb+srv://homefeast:PASSWORD@cluster.mongodb.net/homefeast?retryWrites=true&w=majority`

### Update Backend Environment on Vercel

1. Go to Vercel → Backend project
2. Settings → Environment Variables
3. Update `MONGODB_URI` with your MongoDB Atlas connection string
4. Redeploy

---

## Step 5: Update Frontend API URL (Final Step)

1. Go to Vercel → Frontend project
2. Settings → Environment Variables
3. Change `NEXT_PUBLIC_API_URL`:
   ```
   https://homefeast-backend.vercel.app/api
   ```
4. Click "Save"
5. Redeploy frontend

---

## ✅ You're Done!

**Your Live Application:**
- 🌐 Frontend: https://homefeast.vercel.app
- 🔌 Backend: https://homefeast-backend.vercel.app
- 📚 Repository: https://github.com/YOUR_USERNAME/homefeast

**Test it out:**
1. Visit https://homefeast.vercel.app
2. Register or login with:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Browse Cooks & Menus"
4. See 3 cooks and 12 menu items!

---

## Make Changes & Auto-Deploy

From now on, whenever you make changes:

```powershell
git add .
git commit -m "Your message"
git push origin main
```

**Vercel automatically deploys!** ✨

---

## Local Development

To run locally:

```powershell
# Install dependencies
npm install
cd server && npm install && cd ..

# Create .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Create server/.env
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/homefeast
# JWT_SECRET=your-secret
# NODE_ENV=development
# FRONTEND_URL=http://localhost:3000

# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend
npm run dev

# Visit http://localhost:3000
```

---

## Need Help?

Check these files in your repo:
- `DEPLOYMENT_STEPS.md` - Detailed deployment guide
- `README.md` - Project overview
- `server/BACKEND_SETUP.md` - Backend documentation

**Your project is ready for the world!** 🎉
