# Step 1: Use the official Nginx image as the base
FROM nginx:alpine

# Step 2: Copy the static website files into the Nginx container
# Assuming your static files are in the current directory (replace './public' if needed)
COPY nginx.conf /etc/nginx/nginx.conf

COPY ./ /usr/share/nginx/html

# Step 3: Expose port 80 (default for HTTP)
EXPOSE 80

# Step 4: Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
