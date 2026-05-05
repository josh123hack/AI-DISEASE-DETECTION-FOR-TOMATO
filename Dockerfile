# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production stage - serve static files
FROM node:18-alpine

WORKDIR /app

# Install serve for static file hosting
RUN npm install -g serve

# Copy built app
COPY --from=builder /app/dist ./dist

# Remove X-Frame-Options to allow iframe embedding
RUN echo '{"headers":[{"source":"/**","headers":[{"key":"X-Frame-Options","value":""}]}]}' > ./dist/serve.json

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
