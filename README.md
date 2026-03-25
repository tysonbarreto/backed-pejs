# 🎬 Backend API – Users, Movies & Watchlists  
A production‑grade Node.js backend built with **Express**, **Prisma**, and **TypeScript**, featuring authentication, validation, and a Neon‑hosted PostgreSQL database.

This service powers user accounts, movie data, and personal watchlists with secure session handling and robust input validation.

---

## 🚀 Tech Stack

### **Core**
- **Node.js** – runtime environment  
- **Express.js** – HTTP server and routing  
- **TypeScript** – static typing and developer tooling  

### **Database**
- **Prisma ORM** – schema management, migrations, type‑safe queries  
- **Neon PostgreSQL** – cloud‑hosted, serverless Postgres  

### **Auth & Security**
- **Cookie‑based authentication**  
- **Custom auth middleware**  
- **Password hashing**  
- **Session validation**  

### **Validation**
- **Zod** – schema validation for requests (body, params, query)

---

## 📦 Features

### 👤 **Users**
- Register with email + password  
- Login and receive a secure session cookie  
- Protected routes using authentication middleware  
- Fetch user profile  

### 🎥 **Movies**
- Create and manage movie entries  
- Fetch all movies or a single movie  
- Search and filter movies  
- Type‑safe Prisma queries  

### 📚 **Watchlists**
- Add movies to a user’s watchlist  
- Remove movies  
- Fetch a user’s entire watchlist  
- Prevent duplicates  

### 🔐 **Authentication**
- Cookie‑based session handling  
- Middleware to protect private routes  
- Automatic user extraction from cookies  
- Zod validation for all auth inputs  

### 🛡️ **Validation**
Every endpoint uses **Zod** to validate:
- request body  
- URL params  
- query strings  

Invalid requests return structured error messages.

---

## 🗄️ Database (Neon + Prisma)

The project uses **Neon** as a scalable, serverless PostgreSQL provider.

Prisma handles:
- schema definition  
- migrations  
- type‑safe database access  
- automatic type generation  

You can update the schema using:

```
npx prisma migrate dev
```

And inspect your data with:

```
npx prisma studio
```

---

## 🧩 Middleware

### **Auth Middleware**
Ensures protected routes can only be accessed by authenticated users.  
It:
- reads the session cookie  
- verifies the session  
- attaches the user to `req.user`  
- rejects unauthorized requests  

### **Validation Middleware**
A reusable wrapper around Zod schemas to ensure all incoming data is safe before hitting controllers.

---

## 🧪 Testing (Optional)
If you include tests, you can mention:
- Jest / Vitest for unit tests  
- Supertest for API integration tests  

---

## ▶️ Running the Project

### Install dependencies
```
npm install
```

### Generate Prisma client
```
npx prisma generate
```

### Start development server
```
npm run dev
```

### Build for production
```
npm run build
```

### Start production server
```
npm start
```

---

## 🔧 Environment Variables

Create a `.env` file with:

```
DATABASE_URL="your-neon-postgres-url"
JWT_SECRET="your-secret-key"
NODE_ENV="your-environment"
```

You may also include:
- cookie settings  
- port configuration  

---

## 📜 API Overview

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

### Users
- `GET /users/:id`

### Movies
- `GET /movies`
- `GET /movies/:id`
- `POST /movies`
- `PUT /movies/:id`
- `DELETE /movies/:id`

### Watchlists
- `GET /watchlist`
- `POST /watchlist/:movieId`
- `DELETE /watchlist/:movieId`
