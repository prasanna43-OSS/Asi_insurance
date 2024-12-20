# Use an official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the static website files into the container
COPY ./html /usr/share/nginx/html

# Expose port 80 to access the website
EXPOSE 80
