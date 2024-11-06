FROM node:16

# This creates and sets the working directory inside the container
WORKDIR /usr/src/contact-api

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from your local contact-api directory to the container
COPY . .

# Expose the port your app runs on
EXPOSE 8080

CMD ["npm", "run", "dev"]
