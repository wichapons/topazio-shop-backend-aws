# Use a slim version of the Node.js base image to reduce the attack surface
FROM node:18.15.0-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's cache
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Clean up unnecessary apt cache files
RUN apt-get update && apt-get upgrade -y && \
    apt-get dist-upgrade -y && apt-get autoremove -y && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Expose the port the app runs on
EXPOSE 5000

# Command to start the app
CMD ["node", "server.js"]
