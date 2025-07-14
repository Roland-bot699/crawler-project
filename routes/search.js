const express = require("express");
const router = express.Router();
const runPuppeteer = require("../puppeteer"); // 爬蟲模組

router.post("/", async (req, res) => {
  const keyword = req.body.keyword;
  if (!keyword) {
    return res.status(400).json({ error: "Missing 'keyword' in request body" });
  }

  try {
    const url = `https://www.sex100.co/${encodeURIComponent(keyword)}`;
    const result = await runPuppeteer(url);
    res.json(result);
  } catch (err) {
    console.error("Puppeteer error:", err);
    res.status(500).json({ error: "爬蟲執行失敗" });
  }
});

module.exports = router;