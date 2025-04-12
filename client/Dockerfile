# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Use Vite for development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
