``` 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory with secure authentication.
Customers can browse and purchase sweets, while administrators manage inventory including adding, editing, restocking, and deleting products.

🚀 Features

🔐 User authentication using JWT

👥 Role-based access control (Admin & User)

🍭 Sweet inventory management (Admin)

🛒 Purchase sweets (Users)

🔍 Search and filter sweets

📱 Responsive modern UI

🛠️ Technologies Used
Backend

Runtime: Node.js 20

Framework: Express.js

Language: TypeScript

Database: PostgreSQL

ORM: Drizzle ORM

Authentication: JWT (JSON Web Tokens)

Password Hashing: bcryptjs

Validation: Zod + drizzle-zod

Frontend

Framework: React 18 (TypeScript)

Routing: Wouter

State Management: TanStack React Query

Styling: Tailwind CSS v4

UI Components: shadcn/ui

Icons: Lucide React

Build Tool: Vite

🔐 API Endpoints
Authentication

POST /api/auth/register – Register a new user

POST /api/auth/login – Login and receive JWT

GET /api/auth/me – Get current logged-in user (Protected)

Sweets

GET /api/sweets – Get all sweets

GET /api/sweets/search – Search sweets

POST /api/sweets – Add a sweet (Admin only)

PUT /api/sweets/:id – Update a sweet (Admin only)

DELETE /api/sweets/:id – Delete a sweet (Admin only)

Inventory

POST /api/sweets/:id/purchase – Purchase a sweet

POST /api/sweets/:id/restock – Restock a sweet (Admin only)

📂 Project Structure
sweet-shop-manager/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Login, Register, Dashboard pages
│   │   ├── lib/            # Utilities & Auth context
│   │   └── hooks/          # Custom React hooks
│
├── server/                 # Backend Express application
│   ├── index.ts            # Entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   └── static.ts           # Static file serving
│
├── shared/                 # Shared schemas & types
│   └── schema.ts
│
├── drizzle.config.ts       # Drizzle ORM config
├── package.json
└── README.md

▶️ How to Run the Project
Prerequisites

Node.js 20+

PostgreSQL

VS Code

Setup
git clone https://github.com/Vanshika394/sweet-shop-manager.git
cd sweet-shop-manager
npm install

Database Setup
npm run db:push

Run in Development
npm run dev

Build for Production
npm run build
npm start

📜 Available Scripts

npm run dev – Start development server

npm run build – Build for production

npm start – Start production server

npm run db:push – Push schema to database

npm run check – TypeScript type checking

🖼️ Screenshots

Add screenshots inside a screenshots/ folder in the root of the project.

## Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Sweet List
![Sweet List](screenshots/sweets.png)

### Purchase Flow
![Purchase Flow](screenshots/purchase.png)


📌 Tip: Use clear, cropped screenshots with meaningful filenames.

🤖 AI Usage

This project was built with the assistance of AI tools such as:

ChatGPT

Google Gemini

How AI Was Used

Schema Design: Generated PostgreSQL schema with Drizzle ORM & Zod validation

API Development: Helped create Express routes with JWT authentication

Frontend: Assisted in building React components for authentication and dashboard

Testing & Debugging: Helped verify API flows and fix runtime issues

🧠 Reflection

AI significantly accelerated development by generating boilerplate code and repetitive logic.
This allowed me to focus on architecture, security, and user experience.
Using shared schemas ensured end-to-end type safety between frontend and backend.

👩‍💻 Author

Vanshika
GitHub: Vanshika394
```

 <img width="1920" height="1080" alt="Screenshot (381)" src="https://github.com/user-attachments/assets/d49fc818-61e5-4a76-93db-0af27bd03ec5" />
<img width="1920" height="1080" alt="Screenshot (380)" src="https://github.com/user-attachments/assets/6bb4c07f-0c7a-4d81-9f97-e597d6ed9bb0" />
<img width="1920" height="1080" alt="Screenshot (378)" src="https://github.com/user-attachments/assets/4e88bfaa-30cd-47c2-9a2c-a30f2452488d" />
<img width="1920" height="1080" alt="Screenshot (377)" src="https://github.com/user-attachments/assets/52b2fa5b-a4bd-44fb-b559-8ab43baa9a7b" />
<img width="1920" height="1080" alt="Screenshot (396)" src="https://github.com/user-attachments/assets/b53e6003-4c0d-4a29-869f-a60f11b4600c" />
<img width="1920" height="1080" alt="Screenshot (395)" src="https://github.com/user-attachments/assets/4004b95a-51c8-41a6-8ae5-3937703cddc6" />
<img width="1920" height="1080" alt="Screenshot (393)" src="https://github.com/user-attachments/assets/b8694a83-cd39-4747-b766-2f0f0fab94b0" />
<img width="1920" height="1080" alt="Screenshot (392)" src="https://github.com/user-attachments/assets/085fcf02-d52d-448f-81e1-40a60414a579" />

