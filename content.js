const puppeteer = require('puppeteer');

async function scrapeAmazonReviews() {
  const amazonProductUrl = "https://www.amazon.com/Pandora-Silver-Charm-Bracelet-Sterling/dp/B00S18EWHU/ref=sr_1_5?crid=5MJ7COHQE5Y7&keywords=pandora+bracelet&qid=1693253044&sprefix=pandora+bracle%2Caps%2C172&sr=8-5";
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(amazonProductUrl);

  const reviews = await page.evaluate(() => {
    const reviewElements = document.querySelectorAll('span[data-asin]');
    const reviews = [];
    reviewElements.forEach((reviewElement) => {
      const reviewText = reviewElement.textContent.trim();
      reviews.push(reviewText);
    });
    return reviews;
  });

  await browser.close();

  return reviews;
}

scrapeAmazonReviews()
  .then((scrapedReviews) => {
    console.log("Scraped Reviews:", scrapedReviews);
  })
  .catch((error) => {
    console.error("Scraping error:", error);
  });

