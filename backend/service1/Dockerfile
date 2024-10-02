FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the port for service1
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]
