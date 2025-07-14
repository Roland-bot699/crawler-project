const express = require("express");
const router = express.Router();
const runPuppeteer = require("../puppeteer");

router.get("/", async (req, res) => {
  const keyword = req.query.keyword;
  // 爬蟲邏輯寫在這
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`https://www.sex100.co/search?keyword=${encodeURIComponent(keyword)}`);
  await page.waitForTimeout(3000); // 等待頁面載入

  const html = await page.content();
  await browser.close();

  res.json({ html }); // 你可以改成回傳解析後的資料
});

module.exports = router;