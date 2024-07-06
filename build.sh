#!/bin/bash

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Build the application (if necessary)
# Replace with your actual build command
npm run build
