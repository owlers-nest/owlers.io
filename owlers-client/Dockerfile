# Step 1: Build the React app
FROM node:22.9.0 AS build

WORKDIR /app

# Pass the backend URL as build arg
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy the build folder from the React app build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80

# Expose the Nginx port
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
