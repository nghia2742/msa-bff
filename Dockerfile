# Use official Node.js LTS image as the base
FROM node:24.3-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies only when package.json or yarn.lock changes
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Build the project
RUN yarn build

# Production image
FROM node:24.3-alpine AS production
WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose port (default NestJS port)
EXPOSE 4000

# Start the application
CMD ["yarn", "start"]
