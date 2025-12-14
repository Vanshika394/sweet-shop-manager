<<<<<<< HEAD
# Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory with user authentication. Customers can browse and purchase sweets, while administrators can manage inventory including adding, editing, restocking, and deleting products.

## Technologies Used

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Zod with drizzle-zod

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Features

- **User Authentication**: Register and login with JWT-based authentication
- **Role-Based Access**: Admin and regular user roles
- **Sweet Management (Admin)**: Add, edit, delete sweets
- **Inventory Management**: Purchase sweets (all users), restock (admin only)
- **Search & Filter**: Search sweets by name, category, or price range
- **Responsive Design**: Beautiful, modern UI that works on all devices

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/me` - Get current user info (protected)

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets with filters
- `POST /api/sweets` - Add a new sweet (Admin only)
- `PUT /api/sweets/:id` - Update a sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete a sweet (Admin only)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase` - Purchase a sweet
- `POST /api/sweets/:id/restock` - Restock a sweet (Admin only)

## How to Run in VS Code

### Prerequisites
1. **Node.js 20+** - Download from https://nodejs.org/
2. **PostgreSQL** - Install from https://www.postgresql.org/download/
3. **VS Code** - Download from https://code.visualstudio.com/

### Step-by-Step Setup

#### Step 1: Clone or Download the Project
```bash
# If using Git
git clone <repository-url>
cd sweet-shop

# Or download and extract the ZIP file
```

#### Step 2: Open in VS Code
```bash
code .
```

#### Step 3: Install Dependencies
Open the integrated terminal in VS Code (Ctrl + ` or View > Terminal):
```bash
npm install
```

#### Step 4: Set Up PostgreSQL Database
1. Create a new PostgreSQL database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE sweet_shop;

# Exit psql
\q
```

#### Step 5: Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/sweet_shop
JWT_SECRET=your-secret-key-change-this-in-production
```

#### Step 6: Push Database Schema
```bash
npm run db:push
```

#### Step 7: Start the Development Server
```bash
npm run dev
```

#### Step 8: Access the Application
Open your browser and go to: `http://localhost:3000`

## Default Admin Account

- **Username**: `admin`
- **Password**: `admin123`

Or you can register a new account and manually set `is_admin = true` in the database.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Route components (login, register, dashboard)
│   │   ├── lib/            # Utilities and auth context
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── index.ts            # Entry point
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Database operations
│   └── static.ts           # Static file serving
├── shared/                 # Shared code (schemas, types)
│   └── schema.ts           # Database schema and Zod validation
├── drizzle.config.ts       # Drizzle ORM configuration
└── package.json            # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push schema changes to database
- `npm run check` - TypeScript type checking

## My AI Usage

This project was built with the assistance of AI tools:chatgpt,google gemini
How AI Was Used
Schema Design: AI helped generate the database schema with proper TypeScript types and Zod validation
API Implementation: AI generated the Express routes with JWT authentication middleware
Frontend Components: AI created React components for login, registration, and dashboard pages
Testing: AI helped create comprehensive API tests to verify functionality


### Reflection
AI significantly accelerated development by handling repetitive tasks and generating boilerplate code. This allowed me to focus on the overall architecture and user experience. The AI was particularly helpful in ensuring type safety between the frontend and backend using shared schemas.
=======
# sweet-shop-manager
The goal of this kata is to design, build, and test a full-stack Sweet Shop Management System. This project will test your skills in API development, database management, frontend implementation, testing, and modern development workflows, including the use of AI tools.


# sweet-shop-manager screenshots

<img width="1920" height="1080" alt="Screenshot (392)" src="https://github.com/user-attachments/assets/0b53bd94-65b8-4a4b-9516-d113cb1855bf" />
<img width="1920" height="1080" alt="Screenshot (393)" src="https://github.com/user-attachments/assets/918e6811-7a2c-4a5a-b5e7-359c5d738cf0" />
<img width="1920" height="1080" alt="Screenshot (394)" src="https://github.com/user-attachments/assets/fcdc6184-7d85-4bb8-8582-5989c0a0e7c7" />
<img width="1920" height="1080" alt="Screenshot (395)" src="https://github.com/user-attachments/assets/d9ac200b-94f8-4e56-bf25-9eb823041da1" />
<img width="1920" height="1080" alt="Screenshot (396)" src="https://github.com/user-attachments/assets/d78b5695-f2a4-4c9c-88b1-fd44e2fdc2fb" />






>>>>>>> c079229dd62d39a2698379d39764382597ab1aec
