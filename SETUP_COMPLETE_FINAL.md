# 🎯 HomeFeast - Complete Setup Instructions

## ✅ What's Ready

Your **combined repository** is ready with:

```
homefeast/
├── 📱 Frontend (Next.js, React, TypeScript)
├── 🔌 Backend (Express.js in /server)
├── 🗄️ Database (MongoDB Mongoose models)
├── 🎨 Professional UI (Emerald/Slate Theme)
├── ✨ Complete Features (Auth, Browse, Dashboard)
└── 📚 Full Documentation
```

**Status:** ✅ Ready to push to GitHub and deploy to Vercel

---

## 📋 3 Simple Steps to Go Live

### STEP 1️⃣: Push to GitHub (2 min)

Go to https://github.com/new and create:
- **Name:** `homefeast`
- **Public** repository
- Don't initialize anything

Then run:
```powershell
cd "c:\Users\Admin\OneDrive\Desktop\Dev website\homefeast"

git remote add origin https://github.com/YOUR_USERNAME/homefeast.git
git branch -M main
git push -u origin main
```

✅ **Done!** Your code is now on GitHub

---

### STEP 2️⃣: Deploy Backend (5 min)

1. Visit https://vercel.com/dashboard
2. **"Add New" → "Project" → "Import Git Repository"**
3. Select: `homefeast` → Settings:
   - **Root Directory:** `server`
   - **Framework:** Node.js
   - **Build:** (leave empty)
   - **Install:** `npm install`
4. **Environment Variables:**
   ```
   PORT: 5000
   MONGODB_URI: mongodb://localhost:27017/homefeast
   JWT_SECRET: your-secret-key
   NODE_ENV: production
   FRONTEND_URL: https://homefeast.vercel.app
   ```
5. Click "Deploy"

✅ **Backend URL:** `https://homefeast-backend.vercel.app`

---

### STEP 3️⃣: Deploy Frontend (5 min)

1. Visit https://vercel.com/dashboard
2. **"Add New" → "Project" → "Import Git Repository"**
3. Select: `homefeast` → Settings:
   - **Framework:** Next.js
   - **Root Directory:** `.`
4. **Environment Variable:**
   ```
   NEXT_PUBLIC_API_URL: https://homefeast-backend.vercel.app/api
   ```
5. Click "Deploy"

✅ **Frontend URL:** `https://homefeast.vercel.app`

---

## 🎉 You're Live!

- 🌐 **Frontend:** https://homefeast.vercel.app
- 🔌 **Backend:** https://homefeast-backend.vercel.app
- 📚 **Repository:** https://github.com/YOUR_USERNAME/homefeast

### Test It:
1. Visit https://homefeast.vercel.app
2. Register or login
3. Click "Browse Cooks & Menus"
4. See 3 cooks with 12 menu items

---

## 🔧 Setup MongoDB Atlas (Optional But Recommended for Production)

For production, use cloud database:

1. Visit https://www.mongodb.com/atlas
2. Create account & free cluster
3. Database Access: Create user `homefeast` with password
4. Network Access: Allow all IPs `0.0.0.0/0`
5. Get connection string: `mongodb+srv://homefeast:PASSWORD@...`
6. Update on Vercel backend project environment variables

---

## 💻 Local Development

### Install & Setup
```powershell
npm install
cd server && npm install && cd ..
```

### Environment Files

**`.env.local` (root):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**`server/.env`:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/homefeast
JWT_SECRET=test-secret-key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Run Servers

**Terminal 1 - Backend:**
```powershell
cd server
npm start
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

Visit: http://localhost:3000

### Seed Sample Data
```powershell
cd server
node seed.js
```

Creates 3 cooks: Priya, Rajesh, Ananya with 12 menu items

---

## 🚀 Auto-Deploy on Every Push

After initial setup, every time you:

```powershell
git add .
git commit -m "Your message"
git push origin main
```

Vercel **automatically deploys** your changes! ✨

---

## 📁 Repository Structure

### Frontend (Root Level)
```
app/                 # Next.js pages & components
├── page.tsx         # Home page
├── login/
├── register/
├── dashboard/       # Protected route
├── browse-cooks/    # Browse & search cooks
├── layout.tsx       # Header, footer, navigation
└── ...other pages

lib/                 # Utilities
├── api.ts          # API client (centralized)
└── AuthContext.tsx # Auth state management

public/             # Static assets (images, icons)
```

### Backend (`server/`)
```
server/
├── server.js       # Express setup, routes
├── seed.js         # Sample data generator

config/
├── database.js     # MongoDB connection

models/
├── User.js         # User schema
├── Cook.js         # Cook/provider schema
├── Menu.js         # Menu items schema
├── Order.js        # Order schema
└── Subscription.js # Subscription schema

routes/
├── auth.js         # /api/auth/* endpoints
├── cooks.js        # /api/cooks/* endpoints
├── menus.js        # /api/menus/* endpoints
├── orders.js       # /api/orders/* endpoints
└── subscriptions.js # /api/subscriptions/* endpoints

middleware/
└── auth.js         # JWT verification

package.json        # Backend dependencies
```

---

## 🔌 API Endpoints Reference

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me           (protected)
PUT    /api/auth/profile      (protected)
```

### Cooks
```
GET    /api/cooks
GET    /api/cooks/:id
POST   /api/cooks/register    (protected)
PUT    /api/cooks/:id         (protected)
```

### Menus
```
GET    /api/menus/cook/:cookId
POST   /api/menus             (protected)
PUT    /api/menus/:id         (protected)
DELETE /api/menus/:id         (protected)
```

### Orders
```
GET    /api/orders            (protected)
POST   /api/orders            (protected)
PUT    /api/orders/:id        (protected)
```

### Subscriptions
```
GET    /api/subscriptions     (protected)
POST   /api/subscriptions     (protected)
```

---

## 🎨 Features Included

✅ **Authentication**
- Register new users
- Login with JWT
- Password hashing (bcryptjs)
- Protected routes

✅ **Browse Cooks**
- View all cooks
- Search by name/cuisine
- Filter by meal type
- See ratings & service areas

✅ **Menus**
- Browse cook menus
- View prices
- Add to cart ready

✅ **Dashboard**
- User profile display
- Order statistics
- Quick actions
- Account management

✅ **UI/UX**
- Professional emerald/slate theme
- Responsive design
- Smooth animations
- Modern gradients

---

## 📚 Documentation Files in Repo

- **`README.md`** - Project overview
- **`GITHUB_VERCEL_GUIDE.md`** - Quick deployment guide
- **`DEPLOYMENT_STEPS.md`** - Detailed deployment steps
- **`server/BACKEND_SETUP.md`** - Backend documentation
- **`.env.example`** - Frontend environment variables
- **`server/.env.example`** - Backend environment variables

---

## ❌ Troubleshooting

### "Failed to fetch" or API errors
✅ Check backend is running on port 5000  
✅ Verify `NEXT_PUBLIC_API_URL` is correct  
✅ Check CORS in `server/server.js`

### MongoDB connection error
✅ Ensure MongoDB is running locally (`mongod`)  
✅ For cloud: Verify MongoDB Atlas connection string  
✅ Check IP whitelist allows connections

### Build fails on Vercel
✅ Check Vercel build logs  
✅ Verify all dependencies in `package.json`  
✅ Test build locally: `npm run build`

### Git push issues
✅ Add GitHub account: `git config --global user.name "Your Name"`  
✅ Add email: `git config --global user.email "your@email.com"`  
✅ Use HTTPS or SSH based on your preference

---

## 🎯 Next Steps After Deployment

1. ✅ Test all features on live site
2. ✅ Seed production database
3. ✅ Share your URL with friends
4. 🔄 Make changes and push to auto-deploy
5. 📈 Add more features (payments, reviews, etc.)

---

## 💡 Pro Tips

1. **Keep secrets safe:** Never commit `.env` files
2. **Test locally first:** Run locally before pushing
3. **Clear cache:** If UI looks wrong, clear cache
4. **Monitor logs:** Check Vercel logs for errors
5. **Version control:** Commit frequently with clear messages

---

## 📞 Quick Links

- 📚 Next.js Docs: https://nextjs.org/docs
- 🔌 Express Docs: https://expressjs.com
- 🗄️ MongoDB Docs: https://docs.mongodb.com
- 🚀 Vercel Docs: https://vercel.com/docs
- 🐙 GitHub: https://github.com

---

## 🎉 Congratulations!

Your **full-stack HomeFeast application** is ready for the world!

**Next Milestone:** Get your first user! 🎊

---

**Questions? Check the documentation files or Vercel logs!**
