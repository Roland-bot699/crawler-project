FROM node:20

# 安裝 Puppeteer 相依的套件（Chrome 依賴）
RUN apt-get update && apt-get install -y \
  chromium \
  fonts-liberation \
  libatk-bridge2.0-0 \
  libxss1 \
  libasound2 \
  libnss3 \
  libxshmfence1 \
  libxrandr2 \
  libgtk-3-0 \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*

# 設定環境變數（讓 Puppeteer 找到 Chrome）
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
