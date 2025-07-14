// 引入必要套件
const express = require("express");
const cors = require("cors");
const searchRoute = require("./routes/search"); // search 路由模組

const app = express();
const PORT = process.env.PORT || 3000;

// 中介層：跨來源與 JSON 處理
app.use(cors());
app.use(express.json());

// 路由註冊：當收到 /search 請求時，交給 searchRoute 處理
app.use("/search", searchRoute);

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});