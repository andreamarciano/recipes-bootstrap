# ⚙️ Backend Setup - Node.js, Express, PostgreSQL, Prisma, Docker

## Table of Contents

- [Step 1: Initialize the Backend Project](#-step-1-initialize-the-backend-project)
- [Step 2: Install Dependencies](#-step-2-install-dependencies)
- [Step 3: Update `package.json` Scripts](#-step-3-update-packagejson-scripts)
- [Step 4: Configure TypeScript](#-step-4-configure-typescript)
- [Step 5: Setup Prisma](#️-step-5-setup-prisma)
- [Step 6: Setup Docker](#-step-6-setup-docker)
- [Step 7: Build and Initialize Database](#step-7-build-and-initialize-database)
- [Step 8 (optional): Access PostgreSQL CLI](#️-step-8-optional-access-postgresql-cli)
- [Project Structure Overview](#️-project-structure-overview)

---

## 📦 Step 1: Initialize the Backend Project

In the `/backend` folder run:

```bash
npm init -y
```

---

## 📚 Step 2: Install Dependencies

### Runtime dependencies

```bash
npm install express dotenv cors @prisma/client pg bcryptjs jsonwebtoken
```

- `express`: Web framework.
- `dotenv`: Load environment variables.
- `cors`: Middleware to enable Cross-Origin requests from the frontend.
- `@prisma/client`: Auto-generated Prisma client.
- `pg`: PostgreSQL client for Node.js.
- `bcryptjs`: Password hashing library.
- `jsonwebtoken`: Create and verify JWT tokens.

### Development dependencies

```bash
npm install -D prisma typescript ts-node nodemon @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken prisma-json-schema-generator
```

- `prisma`: Prisma CLI (schema management, migrations).
- `nodemon`: Auto-restarts on file changes.
- `ts-node`: Runs TypeScript directly.
- `prisma-json-schema-generator`: Generates a JSON schema from the Prisma model, useful for validation.

---

## 📝 Step 3: Update `package.json` scripts

```json
"scripts": {
  "dev": "nodemon --watch src --exec ts-node src/index.ts"
}
```

---

## 🔧 Step 4: Configure TypeScript

Create a `tsconfig.json` file:

```bash
npx tsc --init
```

Update it as follows:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

---

## ⚙️ Step 5: Setup Prisma

### 1. Initialize Prisma

```bash
npx prisma init
```

This creates a `prisma/` folder with a `schema.prisma` file, and a `.env` file.

### 2. Edit `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

generator jsonSchema {
  provider = "prisma-json-schema-generator"
  output   = "./generated/json-schema"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             Int              @id @default(autoincrement())
  username       String           @unique
  password       String
  email          String           @unique
  createdAt      DateTime         @default(now())
}
```

### 3. Generate the Prisma client

```bash
npx prisma generate
```

This generates the TypeScript client you can import and use in your app.

### 4. Create a Prisma Client helper

**`src/prismaClient.ts`**:

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

---

### 5. Set Environment Variables

Edit the `.env` file in the root:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/recipes
PORT=4000
JWT_SECRET=superSecretTokenKey123
```

---

## 🐳 Step 6: Setup Docker

### 1. Dockerfile

Create a `Dockerfile` in your project root with the following contents:

```Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["./entrypoint.sh"]
```

### 2. docker-compose.yaml

Create a `docker-compose.yaml` file in your project root with the following contents:

```yaml
services:
  app:
    build: .
    container_name: recipes-app
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/recipes
      - JWT_SECRET=superSecretTokenKey123
      - NODE_ENV=development
      - PORT=4000
    ports:
      - "4000:4000"
    depends_on:
      - db
    volumes:
      - .:/app

  db:
    image: postgres:13-alpine
    container_name: recipes-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: recipes
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

### 3. entrypoint.sh

Shell script that runs inside the Docker container to automate migrations and start the server:

```sh
#!/bin/sh

echo "⏳ Applying Prisma DB migrations..."
npx prisma migrate deploy

echo "🚀 Starting development server..."
npm run dev
```

---

## Step 7: Build and Initialize Database

### 1. Build containers

Run from project root:

```bash
docker compose build
```

### 2. Start your containers (Postgres + app)

After defining at least one model in `schema.prisma`, run:

```bash
docker compose up -d
```

This starts the app and database containers in the background.

### 3. Enter the app container's shell

```bash
docker exec -it recipes-app sh
```

You can check the container name with:

```bash
docker ps
```

### 4. Run the migration *inside* the container

Run the initial migration:

```text
/app # npx prisma migrate dev --name init
```

> After initial migration:
>
> ```text
> /app # npx prisma migrate dev --name new_migration_name
> ```

This will:

- Create a migration in `/prisma/migrations`
- Apply it to the connected database (PostgreSQL container)
- Generate the Prisma Client

Exit the container after migration:

```text
/app # exit
```

### 5. Stop containers (optional)

If you want to reset or rebuild:

```bash
docker compose down
```

### 6. Rebuild and restart all containers

Once migrations are stable and database is clean:

```bash
docker compose up --build
```

> After first build:
>
> ```bash
> docker compose up
> ```

This will trigger the `entrypoint.sh` script which runs `migrate deploy`.

You should see output confirming that PostgreSQL and your Node.js app started successfully.

---

## 🖥️ Step 8 (optional): Access PostgreSQL CLI

Open a second terminal and connect to your PostgreSQL database running inside Docker:

```bash
docker exec -it recipes-db psql -U postgres -d recipes
```

Run queries like:

```sql
\dt
SELECT * FROM "User";
\q 
```

---

## 🗂️ Project Structure Overview

```text
/backend                  # Node.js + Express + Prisma
├── /node_modules
├── /prisma               
│   ├── /generated        # json-schema
│   ├── /migrations
│   └── schema.prisma
├── /src
│   ├── /middleware
│   │   └── verifyToken.ts
│   ├── /routes
│   │   ├── auth.ts
│   │   ├── profile.ts
│   │   └── userData.ts
│   ├── /types
│   ├── index.ts           # Prisma Client
│   └── prismaClient.ts    # Entry point
├── .env                  
├── .gitignore
├── docker-compose.yaml    # PostgreSQL
├── Dockerfile
├── entrypoint.sh
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
