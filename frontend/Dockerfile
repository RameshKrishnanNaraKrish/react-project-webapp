# Stage 1: Build the React app
FROM node:14-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app with the feature flag to switch between blue and green services
ARG REACT_APP_FEATURE_FLAG
RUN REACT_APP_FEATURE_FLAG=$REACT_APP_FEATURE_FLAG npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
