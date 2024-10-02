# Dockerfile for service1 and service2
FROM node:14-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]  # Replace with `service2.js` for service2
