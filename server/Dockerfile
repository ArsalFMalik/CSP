# Use Node Alpine image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy dependency files first to leverage Docker cache
COPY package*.json ./

# Install all dependencies
RUN npm install

# Install nodemon globally (optional — `npx` works too)
RUN npm install -g nodemon

# Copy the rest of the server code
COPY . .

# Start the app using nodemon
CMD ["npx", "nodemon", "index.js"]