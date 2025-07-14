const express = require("express");
const router = express.Router();
const runPuppeteer = require("../puppeteer");

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "缺少網址參數 url" });
  }

  try {
    const result = await runPuppeteer(url);
    res.json(result);
  } catch (err) {
    console.error("Puppeteer 錯誤：", err);
    res.status(500).json({ error: "爬蟲執行失敗" });
  }
});

module.exports = router;