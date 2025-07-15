const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

// 城市名稱對應對方網站的 city 編號
const cityMap = {
  '台北': 1,
  '新北': 2,
  '桃園': 3,
  '台中': 4,
  '台南': 5,
  '高雄': 6,
  '新竹': 7,
  '台東': 10,
  '花蓮': 11,
};

app.get('/search', (req, res) => {
  res.send('Search endpoint is working!');
});
