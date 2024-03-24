# Use a base image that supports Node.js
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for both frontend and backend
COPY package*.json ./

# Install dependencies for both frontend and backend
RUN npm install

# Copy the rest of the application code for both frontend and backend
COPY . .

# Expose ports for both frontend and backend
EXPOSE 3000 
EXPOSE 3001

# Command to start both frontend and backend servers concurrently
CMD ["npm", "run", "start:all"]
