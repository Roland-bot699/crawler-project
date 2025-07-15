FROM node:20-slim

# 安裝 Chromium 及 Puppeteer 所需依賴
RUN apt-get update && apt-get install -y \
  chromium \
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

# 設定環境變數，讓 puppeteer 使用系統安裝的 Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV NODE_ENV=production

# 設定工作目錄
WORKDIR /app

# 複製 package 資料並安裝依賴
COPY package*.json ./
RUN npm install --omit=dev

# 複製所有專案檔案
COPY . .

# 開放 port
EXPOSE 3000

# 啟動伺服器
CMD ["node", "index.js"]