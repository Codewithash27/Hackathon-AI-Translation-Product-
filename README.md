# B4One Class: One Class, Five Languages

A hackathon prototype for an educational SaaS platform demonstrating AI-powered multi-lingual lesson delivery with terminology validation.

## Features

- **Role-based Dashboards:** Separate views for Teachers and Students.
- **AI Translation Workflow (Mocked):** Create in English -> Generate Translation -> Terminology Check -> Review -> Publish.
- **Terminology Validation:** Ensures domain-specific words (like "Rational Number") are translated consistently across languages.
- **Five Languages:** English (en), Marathi (mr), Hindi (hi), Gujarati (gu), Tamil (ta).
- **Responsive Design:** Works on desktop, tablet, and mobile.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Local Storage (for session persistence)
- Mock Services (frontend-only logic)

## Folder Structure

```
B4OneClass/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # AuthContext
│   ├── data/            # Local mock data (lessons, translations, terminology)
│   ├── hooks/           # Custom React hooks (useAuth)
│   ├── layouts/         # Dashboard layout wrapping
│   ├── pages/           # Application views
│   ├── services/        # mockService.js (Simulated API calls)
│   └── utils/           # Helper functions
```

## How to Install and Run

1. Clone or extract the project.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the application at `http://localhost:5173`.

## Demo Accounts

No real registration is required. You can use the built-in demo buttons on the login page, or manually enter these credentials:

**Teacher Account**
- Email: `teacher@b4one.com`
- Password: `teacher123`

**Student Account**
- Email: `student@b4one.com`
- Password: `student123`

## Teacher Flow (Hackathon Demo)

1. Login as Teacher.
2. Observe the innovation workflow and stats on the dashboard.
3. Go to **Classes -> Class 8 -> Mathematics -> Rational Numbers**.
4. Click **Create Lesson** (or use an existing one).
5. Click **Manage Translations**.
6. Generate a new translation in a target language.
7. Observe the **Terminology Validation** results.
8. Review and Publish the translation.

## Student Flow (Hackathon Demo)

1. Login as Student.
2. Go to a published lesson.
3. Use the language selector to switch between the original English and the translated versions.
4. Note that students cannot access teacher-only views (Create, Review, Terminology).

## Note on Backend

This project is a **frontend-only prototype** designed specifically for a hackathon. All data is managed in memory/local files via `mockService.js`. There is no actual backend server, database, or API connected.
