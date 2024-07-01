const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://www.amazon.com/gp/product/B08HW1L75J/ref=ox_sc_act_title_2?smid=ATVPDKIKX0DER&psc=1';
  const reviewsPerPage = 10; // Number of reviews per page

  await page.goto(url);

  // Click on the "See all reviews" link at the bottom of the product page
  const seeAllReviewsLink = await page.$('[data-hook="see-all-reviews-link-foot"]');
  if (seeAllReviewsLink) {
    await seeAllReviewsLink.click();
    await page.waitForNavigation();
  } else {
    console.log('Could not find the "See all reviews" link.');
    await browser.close();
    return;
  }

  // Extract and print multiple reviews on the current page
  const scrapeReviews = async () => {
    let pageNum = 1;
    let reviewsCount = 0;

    while (true) {
      console.log(`Scraping page ${pageNum}`);

      const reviewElements = await page.$$('[data-hook="review"]');
      for (const reviewElement of reviewElements) {
        const reviewText = await reviewElement.$eval('[data-hook="review-body"]', (element) => element.textContent.trim());
        console.log(`Review ${reviewsCount + 1}:`, reviewText);
        console.log("-----------------------"); // Separator between reviews
        reviewsCount++;
      }

      const nextButton = await page.$x("//li[contains(@class, 'a-last')]/a");
      if (nextButton.length > 0) {
        await nextButton[0].click();
        await page.waitForTimeout(2000); // Add a delay to allow the next page to load (adjust as needed)
        pageNum++;
      } else {
        break;
      }
    }

    console.log(`Scraped a total of ${reviewsCount} reviews`);
  };

  await scrapeReviews(); // Call the scrapeReviews function to extract all reviews

 // Add code to extract 5-star reviews here
const scrape5StarReviews = async () => {
    let pageNum = 1;
    let reviewsCount = 0;
  
    while (true) {
      console.log(`Scraping 5-star reviews page ${pageNum}`);
  
      const reviewElements = await page.$$('[data-hook="review"]');
      for (const reviewElement of reviewElements) {
        const reviewText = await reviewElement.$eval('[data-hook="review-body"]', (element) => element.textContent.trim());
        console.log(`5-Star Review ${reviewsCount + 1}:`, reviewText);
        console.log("-----------------------"); // Separator between reviews
        reviewsCount++;
      }
  
      const nextButton = await page.$x("//li[contains(@class, 'a-last')]/a");
      if (nextButton.length > 0) {
        await nextButton[0].click();
        await page.waitForTimeout(2000); // Add a delay to allow the next page to load (adjust as needed)
        pageNum++;
      } else {
        break;
      }
    }
  
    console.log(`Scraped a total of ${reviewsCount} 5-star reviews`);
  };
  
  await scrape5StarReviews(); // Call the reviews function
})();
