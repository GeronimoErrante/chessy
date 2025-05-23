FROM node:20-slim

WORKDIR /app_frontend

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
