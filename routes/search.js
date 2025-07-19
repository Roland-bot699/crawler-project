const express = require("express");
const router = express.Router();
const axios = require("axios");

const cityMap = {
  "台北": 1,
  "新北": 2,
  "桃園": 3,
  "台中": 4,
  "台南": 5,
  "高雄": 6,
  "新竹": 7,
  "台東": 10,
  "花蓮": 11,
};

const runPuppeteer = require("../puppeteer");

router.get("/", async (req, res) => {
  const { city, keyword } = req.query;
  if (!city || !keyword) {
    return res.status(400).send("❌ 請同時提供 city 和 keyword");
  }

  const cityCode = cityMap[city];
  if (!cityCode) {
    return res.status(400).send("❌ 不支援的城市，請使用：" + Object.keys(cityMap).join("、"));
  }

  try {
    const searchUrl = \`https://www.sex100.co/search.php?search=\${encodeURIComponent(keyword)}&city=\${cityCode}\`;
    console.log("🔗 Search URL:", searchUrl);

    const browser = await require("puppeteer").launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(searchUrl, { waitUntil: "networkidle2" });
    await page.waitForTimeout(1500);

    const html = await page.content();
    const cheerio = require("cheerio");
    const $ = cheerio.load(html);

    const profileLink = $('.col-6.col-md-4.col-xl-3 a').first().attr('href') ||
                        $('.item_card a').first().attr('href');

    if (!profileLink) {
      await browser.close();
      return res.status(404).send("❌ 找不到符合的個人頁面");
    }

    const profileUrl = \`https://www.sex100.co\${profileLink}\`;
    console.log("🔗 Profile URL:", profileUrl);
    await browser.close();

    const result = await runPuppeteer(profileUrl);
    result.link = profileUrl;

    const summary = \`✅ 姓名：\${result.name || "無資料"}\n📍服務區域：\${result.area || "無資料"}\n💆‍♀️服務內容：\${result.services || "無資料"}\n💰價格：\${result.price || "無資料"}\n🔗連結：\${profileUrl}\`;
    res.send(summary);
  } catch (err) {
    console.error("🚨 查詢錯誤：", err);
    res.status(500).send("❌ Server 錯誤");
  }
});

module.exports = router;
