# HomeFeast Project Documentation

## Project Overview
**HomeFeast** is a web-based platform that connects users (students, working professionals, elderly people) with verified home cooks and tiffin service providers offering fresh, hygienic, home-style meals.

## Technology Stack

### Frontend
- **Framework**: Next.js 16.1.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: React 19.2.3
- **Package Manager**: npm

### Backend (To be implemented)
- **Server**: Node.js with Express.js
- **Database**: MongoDB / PostgreSQL
- **APIs**: REST APIs for orders, subscriptions, notifications

### Deployment
- AWS / Vercel / Netlify

## Current Project Structure

```
homefeast/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout with navigation
│   ├── globals.css              # Global styles
│   ├── dashboard/
│   │   └── page.tsx             # Dashboard page
│   ├── chat/
│   │   └── page.tsx             # Chat support page
│   ├── calendar/
│   │   └── page.tsx             # Calendar page
│   ├── submit-project/
│   │   └── page.tsx             # Submit project page
│   ├── faqs/
│   │   └── page.tsx             # FAQs page
│   ├── job-portal/
│   │   └── page.tsx             # Job portal page
│   ├── login/
│   │   └── page.tsx             # Login page
│   └── register/
│       └── page.tsx             # Registration page
├── public/                      # Static files
├── docs/
│   └── requirements.md          # Project requirements
├── package.json                 # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── postcss.config.mjs          # PostCSS configuration
```

## Running the Project

### Development Mode
```bash
cd homefeast
npm run dev
```

The application will be available at **http://localhost:3000**

### Build for Production
```bash
cd homefeast
npm run build
npm start
```

## Navigation Structure

The header navigation includes:
- **Logo/Home**: Click to return to home page
- **Dashboard**: User dashboard
- **Chat Support**: Communication with support
- **Calendar**: Schedule and availability
- **Submit Project**: Project submission form
- **FAQs**: Frequently asked questions
- **Job Portal**: Job opportunities

## Pages Implemented

1. **Home Page** (`/`): Welcome to HomeFeast
2. **Dashboard** (`/dashboard`): User overview and stats
3. **Chat Support** (`/chat`): Customer support interface
4. **Calendar** (`/calendar`): Delivery schedules
5. **Submit Project** (`/submit-project`): Project management
6. **FAQs** (`/faqs`): Help and questions
7. **Job Portal** (`/job-portal`): Job listings
8. **Login** (`/login`): User authentication
9. **Register** (`/register`): New user registration

## Future Development

### Phase 1 - Core Features (Current)
- [x] Project scaffold
- [x] Navigation structure
- [x] Basic pages layout
- [ ] User authentication (backend)
- [ ] Database integration

### Phase 2 - Food Service Features
- [ ] Browse tiffin providers
- [ ] Search and filter by meal type, price, cuisine
- [ ] View cook profiles and menus
- [ ] Subscription management
- [ ] Order tracking

### Phase 3 - Cook Dashboard
- [ ] Menu management
- [ ] Order acceptance/rejection
- [ ] Earnings dashboard
- [ ] Delivery timing management

### Phase 4 - Admin Panel
- [ ] User and cook management
- [ ] Cook registration approval
- [ ] Order and subscription monitoring
- [ ] Complaint handling

### Phase 5 - Advanced Features
- [ ] Online payments & wallet
- [ ] Mobile application
- [ ] Meal customization
- [ ] Nutrition & calorie tracking
- [ ] AI-based meal recommendations

## Key Performance Indicators (KPIs)

- Number of registered users
- Active subscriptions
- Order conversion rate
- Cook onboarding rate
- Monthly active users
- Customer retention rate

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React functional component patterns
- Use Tailwind CSS utility classes
- Component names in PascalCase
- File names in lowercase with hyphens

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints: sm, md, lg, xl, 2xl
- Test on various screen sizes

### Performance
- Target page load time: under 3 seconds
- Optimize images and assets
- Code splitting and lazy loading

### Security
- Implement secure authentication
- Encrypt user data
- Validate all inputs
- Follow OWASP guidelines

## Next Steps

1. Implement backend API with Node.js/Express
2. Set up MongoDB/PostgreSQL database
3. Create user authentication system
4. Build food provider listing page
5. Implement subscription management
6. Deploy to production (AWS/Vercel/Netlify)

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
