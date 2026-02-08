# 1. Start with the "Foundation" (OS + Node)
FROM node:20-alpine

# 2. Create the "Workshop" folder inside the container
WORKDIR /app

# 3. Copy the "Shopping List" of libraries
COPY package*.json ./

# 4. Install the libraries inside the container
RUN npm install

# 5. Copy your actual code (server.js, etc.)
COPY . .

# 6. Generate the Prisma client (The DB Translator)
RUN npx prisma generate

# 7. Tell the container which "Door" (Port) to open
EXPOSE 5000

# 8. The command to start the engine
CMD ["node", "server.js"]