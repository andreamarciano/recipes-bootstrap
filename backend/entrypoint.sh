#!/bin/sh

echo "⚙️ Generating Prisma client..."
npx prisma generate

echo "⏳ Applying Prisma DB migrations..."
npx prisma migrate deploy

echo "🌱 Seeding initial data..."
npx ts-node src/seed.ts

echo "🚀 Starting development server..."
npm run dev
