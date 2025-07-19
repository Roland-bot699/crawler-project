const express = require("express");
const cors = require("cors");
const runPuppeteer = require("./puppeteer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/profile", async (req, res) => {
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

app.get("/", (req, res) => {
  res.send("✅ LINE Puppeteer API 運作中");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
