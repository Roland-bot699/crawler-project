const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

const cityMap = {
  '台北': 1,
  '新北': 2,
  '桃園': 3,
  '台中': 4,
  '台南': 5,
  '高雄': 6,
  '新竹': 7,
  '台東': 10,
  '花蓮': 11,
};

app.get('/search', async (req, res) => {
  const { city, keyword } = req.query;
  if (!city || !keyword) {
    return res.status(400).send('❌ 請同時提供 city 和 keyword');
  }

  const cityCode = cityMap[city];
  if (!cityCode) {
    return res.status(400).send('❌ 不支援的城市，請使用：' + Object.keys(cityMap).join('、'));
  }

  try {
    console.log('✅ Start processing');
    console.log('🔍 Query:', req.query);

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    });

    const page = await browser.newPage();

    // 打開搜尋頁
    const searchUrl = `https://www.sex100.co/search.php?search=${encodeURIComponent(keyword)}&city=${cityCode}`;
    console.log('🔗 Search URL:', searchUrl);

    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 0 });

    // 等待第一筆搜尋結果載入
    await page.waitForSelector('.col-6.col-md-4.col-xl-3 a, .item_card a', { timeout: 10000 });

    const searchHtml = await page.content();
    const $ = cheerio.load(searchHtml);

    const profileLink =
      $('.col-6.col-md-4.col-xl-3 a').first().attr('href') ||
      $('.item_card a').first().attr('href');

    console.log('🔗 profileLink:', profileLink);

    if (!profileLink) {
      await browser.close();
      return res.status(404).send('❌ 找不到符合的人員頁面');
    }

    const profileUrl = `https://www.sex100.co${profileLink}`;
    await page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 0 });

    const profileHTML = await page.content();
    const $$ = cheerio.load(profileHTML);

    const name = $$('h1').first().text().trim();
    const area = $$('.badge.bg-primary').text().trim();
    const service = $$('.badge.bg-success').text().trim();
    const price = $$('h4.text-danger').text().trim();

    await browser.close();

    const summary = `✅ 姓名：${name || '無資料'}\n📍服務區域：${area || '無資料'}\n💆‍♀️服務項目：${service || '無資料'}\n💰價格：${price || '無資料'}\n🔗連結：${profileUrl}`;
    res.send(summary);
  } catch (error) {
    console.error('🚨 Puppeteer Error:', error);
    res.status(500).send('❌ Server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});