FROM node:22.1.0

WORKDIR /app

# Copy package and tsconfig files first to leverage Docker's layer caching
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY src ./src

# Prisma generation if the schema file exists
RUN if [ -f "./prisma/schema.prisma" ]; then npx prisma generate; else echo "Skipping prisma generate"; fi

# Build the TypeScript files
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]
