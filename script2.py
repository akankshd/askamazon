from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By

# Set up the Chrome WebDriver with Selenium
chrome_service = ChromeService(executable_path='/path/to/chromedriver')
driver = webdriver.Chrome(service=chrome_service)

# Amazon product URL
url = "https://www.amazon.com/Pandora-Silver-Charm-Bracelet-Sterling/dp/B00S18EWHU/ref=sr_1_5?crid=5MJ7COHQE5Y7&keywords=pandora+bracelet&qid=1693253044&sprefix=pandora+bracle%2Caps%2C172&sr=8-5%22&th=1"

# Open the URL in the Chrome browser
driver.get(url)

# Wait for the product title element to be visible
product_title_element = driver.find_element(By.ID, 'productTitle')

# Extract the text of the product title
product_name = product_title_element.text.strip()
print("Product Name:", product_name)

# Close the browser
driver.quit()
