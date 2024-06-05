# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight web server to serve the React app
RUN npm install -g serve

# Set the command to run the web server and serve the built React app
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 3000
EXPOSE 3000
