FROM node:20-slim

RUN apt-get update && apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libatk-bridge2.0-0 \
  libxss1 \
  libasound2 \
  libnss3 \
  libxshmfence1 \
  libxrandr2 \
  libgtk-3-0 \
  --no-install-recommends && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
