
const express = require("express");
const router = express.Router();
const runPuppeteer = require("../puppeteer");

router.post("/", async (req, res) => {
  const { url } = req.body;
  try {
    const result = await runPuppeteer(url);
    res.json(result);
  } catch (e) {
    console.error("Scraping failed:", e);
    res.status(500).json({ error: "Scraping failed" });
  }
});

module.exports = router;
