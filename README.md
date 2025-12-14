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
Open your browser and go to: `http://localhost:5000`

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

This project was built with the assistance of AI tools:

### Tools Used
- **Replit Agent** - Used for generating boilerplate code, implementing API endpoints, creating React components, and debugging issues.

### How AI Was Used
1. **Schema Design**: AI helped generate the database schema with proper TypeScript types and Zod validation
2. **API Implementation**: AI generated the Express routes with JWT authentication middleware
3. **Frontend Components**: AI created React components for login, registration, and dashboard pages
4. **Testing**: AI helped create comprehensive API tests to verify functionality

### Reflection
AI significantly accelerated development by handling repetitive tasks and generating boilerplate code. This allowed me to focus on the overall architecture and user experience. The AI was particularly helpful in ensuring type safety between the frontend and backend using shared schemas.
=======
# sweet-shop-manager
The goal of this kata is to design, build, and test a full-stack Sweet Shop Management System. This project will test your skills in API development, database management, frontend implementation, testing, and modern development workflows, including the use of AI tools.
>>>>>>> c079229dd62d39a2698379d39764382597ab1aec
