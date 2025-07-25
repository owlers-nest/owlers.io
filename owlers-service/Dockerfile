# # Stage 1: Build the TypeScript application
# FROM node:20-alpine AS build-env

# WORKDIR /app

# # Copy package.json and package-lock.json first to leverage Docker cache
# COPY package*.json ./

# # Install dependencies, including dev dependencies for TypeScript compilation
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Compile TypeScript to JavaScript
# RUN npm run build

# # Stage 2: Create the final production image
# FROM node:20-alpine AS production-env

# WORKDIR /usr/src/app

# # Copy only production dependencies from the build stage
# COPY --from=build-env /app/node_modules ./node_modules

# # Copy the compiled JavaScript files from the build stage
# # Assuming your build output goes to 'dist'
# COPY --from=build-env /app/dist ./dist

# # Copy package.json for starting the application
# COPY package.json .

# # Set environment variables
# ENV NODE_ENV=production

# # Expose the port your application listens on
# EXPOSE 3000

# # Command to start the application
# CMD ["node", "dist/index.js"]



# === STAGE 1: Build TypeScript ===
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# === STAGE 2: Production Runtime ===
FROM node:20-alpine

WORKDIR /usr/src/app

# Only production deps
COPY --from=build /app/node_modules ./node_modules

# Only built JS files
COPY --from=build /app/dist ./dist
COPY package.json .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
