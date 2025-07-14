const express = require("express");
const router = express.Router();
const runPuppeteer = require("../puppeteer");

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "請提供正確的 URL。" });
  }

  try {
    const result = await runPuppeteer(url);
    res.json(result);
  } catch (err) {
    console.error("Puppeteer 執行錯誤：", err.message);
    res.status(500).json({ error: "伺服器錯誤，無法完成爬蟲作業。" });
  }
});

module.exports = router;