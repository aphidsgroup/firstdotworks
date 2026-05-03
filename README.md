# Firstdot Works — Frontend Web App

## Project Structure

```
src/
├── main.jsx                    # React entry point
├── App.jsx                     # Router + providers
├── index.css                   # Global styles + Tailwind directives
├── context/
│   ├── AuthContext.jsx         # Role-based auth (demo login state)
│   └── ThemeContext.jsx        # Light/dark mode toggle
├── data/                       # MOCK DATA LAYER — replace with API calls later
│   ├── jobs.js                 # 18 job postings
│   ├── candidates.js           # 35 candidate profiles
│   ├── employers.js            # 8 employer companies
│   └── applications.js         # 50+ application records
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Sticky public navigation
│   │   ├── Footer.jsx          # Public footer
│   │   └── DashboardLayout.jsx # Sidebar + topbar shell for dashboards
│   ├── ui/                     # Reusable base UI components
│   └── charts/                 # Recharts wrappers
└── pages/
    ├── public/                 # Public website pages
    └── dashboard/              # Role-based dashboards
        ├── admin/
        ├── employer/
        └── candidate/
```

## Role-Based Demo Login

Three demo login paths from `/login`:

| Button                 | Sets Role   | Redirects To             |
|------------------------|-------------|--------------------------|
| Login as Admin         | `admin`     | `/dashboard/admin`       |
| Login as Employer      | `employer`  | `/dashboard/employer`    |
| Login as Candidate     | `candidate` | `/dashboard/candidate`   |

Auth state is stored in React Context + localStorage.
Protected routes check `AuthContext.currentUser.role`.

## Mock Data

All mock data lives in `src/data/`. Replace with real API calls by swapping:
- `import { jobs } from '@/data/jobs'` → `fetch('/api/v1/jobs')`
- Each data file exports an array of objects matching the DB schema

## Backend Integration Points

Services ready to be swapped (future):
- `GET /api/v1/jobs` → job listings
- `POST /api/v1/auth/login` → auth
- `GET /api/v1/admin/dashboard` → admin KPIs
- All other endpoints per the backend architecture document

## Neon DB

Database: PostgreSQL via Neon serverless
Connection config in: `.env` (not committed)
Schema: see `BACKEND_ARCHITECTURE.md`

## Environment Variables

```env
VITE_NEON_DATABASE_URL=postgresql://...
VITE_APP_ENV=development
```
