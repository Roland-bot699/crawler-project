const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/search', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).send('Missing keyword');

  // 呼叫 puppeteer 執行爬蟲操作（省略）
  res.send(`You searched for ${keyword}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});