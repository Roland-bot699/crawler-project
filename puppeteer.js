const puppeteer = require('puppeteer');
const cheerio = require("cheerio");

module.exports = async function runPuppeteer(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.waitForTimeout(1500);

  const html = await page.content();
  const $ = cheerio.load(html);

  const name = $("h1.title").text().trim();
  const area = $(".infotext:contains('服務地區')").next().text().trim();
  const price = $(".infotext:contains('價格')").next().text().trim();
  const services = $(".infotext:contains('服務內容')").next().text().trim();

  const images = [];
  $(".swiper-wrapper img").each((i, el) => {
    const src = $(el).attr("src");
    if (src) images.push(src);
  });

  await browser.close();

  return { name, area, price, services, images };
};
