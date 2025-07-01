#!/bin/sh

echo "⏳ Applying Prisma DB migrations..."
npx prisma migrate deploy

echo "🚀 Starting development server..."
npm run dev
