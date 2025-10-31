# RAW Consulting - Business Development & Coaching Services

## Overview

RAW Consulting is a professional business consulting and coaching services platform that showcases fractional leadership services (CEO, CFO, CMO, HR, Legal), business development, web app MVP development, social media marketing, and executive coaching. The application features a marketing website with a contact form for lead generation, built with a modern full-stack TypeScript architecture.

The platform emphasizes professional minimalism with clean B2B consulting aesthetics, designed to build trust through restrained design, strategic whitespace, and clear messaging.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe UI development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture

**UI Component System:**
- Shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color system using HSL values with CSS variables for theming
- Typography system based on Inter font with defined scale and weights
- Responsive grid layout system with defined breakpoints

**State Management:**
- TanStack Query (React Query) for server state management
- React Hook Form for form state and validation
- Local component state with React hooks

**Design System:**
- Professional B2B consulting aesthetic inspired by McKinsey Digital and BCG
- Trust-focused minimalist design with strategic whitespace
- Defined spacing primitives (4, 6, 8, 12, 16, 20, 24)
- Responsive typography scale from text-sm to text-7xl
- Container max-widths: 7xl (main), 6xl (sections), 4xl (text-heavy), 2xl (narrow)

### Backend Architecture

**Server Framework:**
- Express.js running on Node.js
- TypeScript for type safety across the stack
- ESM (ECMAScript Modules) module system
- Custom middleware for request logging and JSON response capture

**Development Environment:**
- Vite development server with HMR (Hot Module Replacement)
- Middleware mode integration with Express
- Custom logging system with timestamp formatting
- Replit-specific plugins for development experience (cartographer, dev banner, runtime error overlay)

**API Design:**
- RESTful API architecture
- `/api/contact` POST endpoint for contact form submissions
- Zod schema validation for request payloads
- Structured JSON responses with success/error states

### Data Layer

**Database Schema:**
- Drizzle ORM for type-safe database operations
- PostgreSQL dialect configuration (with Neon Database serverless driver)
- Contact submissions table with fields:
  - id (UUID primary key)
  - name (required text)
  - email (required text with validation)
  - phone (optional text)
  - company (optional text)
  - serviceInterest (optional text)
  - message (required text)
  - submittedAt (timestamp with default now())

**Storage Strategy:**
- Development: In-memory storage implementation (MemStorage class)
- Production-ready: Database configuration present but optional implementation
- Interface-based storage abstraction (IStorage) for easy swapping between implementations

**Validation:**
- Zod schemas derived from Drizzle table definitions using drizzle-zod
- Client and server-side validation consistency
- Custom validation rules (email format, minimum character lengths)

### Static Assets

**Asset Management:**
- Stock images stored in attached_assets directory
- Vite alias configuration for `@assets` path
- Images used for:
  - Hero section background
  - Industries section team collaboration image
  - Results section executive workplace image

### Build & Deployment

**Build Process:**
- Client: Vite builds React application to `dist/public`
- Server: esbuild bundles Express server to `dist/index.js`
- Platform: Node.js with external packages
- Format: ESM output for both client and server

**Development Workflow:**
- `npm run dev`: Start development server with tsx
- `npm run build`: Build both client and server for production
- `npm start`: Run production build
- `npm run db:push`: Push database schema changes via Drizzle Kit

## External Dependencies

### Core Frameworks
- **React** (v18+): UI framework
- **Express**: Backend web server
- **Vite**: Build tool and development server
- **TypeScript**: Type system across entire stack

### Database & ORM
- **Drizzle ORM** (v0.39+): Type-safe database toolkit
- **@neondatabase/serverless**: PostgreSQL serverless driver for Neon Database
- **Drizzle Kit**: Database migration tool
- **Drizzle Zod**: Generate Zod schemas from Drizzle tables

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives (accordion, dialog, dropdown, select, toast, etc.)
- **Shadcn/ui**: Pre-styled components built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Variant-based component styling
- **cmdk**: Command menu component
- **embla-carousel-react**: Carousel component

### Form Handling & Validation
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Validation resolver integration
- **Zod**: Schema validation library
- **zod-validation-error**: User-friendly validation error messages

### State Management
- **TanStack React Query** (v5): Server state management and data fetching

### Routing
- **Wouter**: Lightweight client-side routing

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **Replit plugins**: Development experience enhancements (cartographer, dev banner, runtime error modal)

### Utilities
- **clsx**: Conditional className utility
- **tailwind-merge**: Merge Tailwind CSS classes
- **date-fns**: Date manipulation library
- **lucide-react**: Icon library
- **nanoid**: Unique ID generation

### Fonts
- **Google Fonts**: Inter (primary typeface), Architects Daughter, DM Sans, Fira Code, Geist Mono

### Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting (configured via DATABASE_URL environment variable)
- **LinkedIn**: Social media integration link in footer