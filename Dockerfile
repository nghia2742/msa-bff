# Use official Node.js LTS image as the base
FROM node:24.3-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:24.3-alpine AS production
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm ci --only=production --legacy-peer-deps

# Expose port (default NestJS port)
EXPOSE 4000

# Start the application
CMD ["node", "dist/main.js"]
