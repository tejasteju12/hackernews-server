FROM node:22.1.0

WORKDIR /app

# Copy configs and install deps
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

# Copy Prisma and source code
COPY prisma ./prisma
COPY src ./src

# Generate Prisma client
RUN if [ -f "./prisma/schema.prisma" ]; then npx prisma generate; else echo "Skipping prisma generate"; fi

# Compile TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start with debug logging (optional)
CMD ["node dist/index.js"]
