# Sweet Shop Management System

## Overview

A full-stack web application for managing a sweet shop inventory with user authentication. The system allows customers to browse and purchase sweets, while administrators can manage inventory including adding, editing, restocking, and deleting products.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with shadcn/ui component library
- **Build Tool**: Vite

The frontend follows a standard React SPA pattern with protected routes for authenticated users. Authentication state is managed through a custom React context (`AuthProvider`) that handles JWT tokens stored in localStorage.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with tsx for development, esbuild for production)
- **API Pattern**: RESTful JSON API under `/api` prefix

The server uses a unified architecture where Express serves both the API routes and the static frontend assets. In development, Vite middleware provides hot module replacement.

### Authentication
- **Method**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Token Storage**: Client-side localStorage
- **Middleware**: Custom Express middleware for route protection and admin authorization

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-kit for migrations
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)

Database schema includes:
- `users` table: id (UUID), username, email, password (hashed), isAdmin flag, createdAt
- `sweets` table: id (serial), name, category, price (integer/cents), quantity, description, imageUrl, createdAt

### Validation
- **Library**: Zod with drizzle-zod integration
- **Pattern**: Schemas defined in shared directory, validated on both client and server

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Route components
│   │   ├── lib/            # Utilities and auth context
│   │   └── hooks/          # Custom React hooks
├── server/           # Backend Express application
│   ├── index.ts      # Entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database operations
│   └── static.ts     # Static file serving
├── shared/           # Shared code (schemas, types)
└── migrations/       # Drizzle database migrations
```

## External Dependencies

### Database
- **PostgreSQL**: Required, connection via `DATABASE_URL` environment variable
- **Connection**: Uses `pg` package with connection pooling

### Authentication
- **JWT Secret**: Configured via `JWT_SECRET` environment variable (has development fallback)

### Third-Party UI Libraries
- **Radix UI**: Primitive components for accessibility
- **Lucide React**: Icon library
- **sonner**: Toast notifications
- **cmdk**: Command palette component

### Build & Development
- **Vite**: Frontend development server and bundler
- **esbuild**: Production server bundling
- **Drizzle Kit**: Database schema management (`npm run db:push`)