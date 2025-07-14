const express = require("express");
const app = express();
const cors = require("cors");
const searchRoute = require("./routes/search");

app.use(cors());
app.use(express.json());
app.use("/search", searchRoute); // 已處理 /search 路由

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/search', async (req, res) => {
  const keyword = req.query.keyword;
  // 執行 puppeteer 爬蟲流程，回傳 JSON 結果
});