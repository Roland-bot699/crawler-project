const puppeteer = require("puppeteer-core");
const browserFetcher = puppeteer.createBrowserFetcher();

const chromiumPath = '/usr/bin/chromium-browser'; // 常見於 Railway Nixpacks 的路徑

const browser = await puppeteer.launch({
  headless: false,  // ✅ 模擬真人，建議先關掉 headless
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-blink-features=AutomationControlled',
  ],
});
const page = await browser.newPage();

// ✅ 模擬真實瀏覽器
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

// ✅ 模擬從首頁點入（可繞過 Cloudflare challenge）
await page.goto('https://www.sex100.co/', { waitUntil: 'networkidle2' });
await page.waitForTimeout(3000);  // 等待 challenge 通過

// ✅ 接著再開關鍵字搜尋頁
await page.goto(`https://www.sex100.co/search?keyword=${encodeURIComponent(keyword)}`, { waitUntil: 'networkidle2' });