# Use an official Node.js runtime as a parent image
FROM node:20-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY .env .

EXPOSE 5000

CMD ["node", "dist/src/main.js"]