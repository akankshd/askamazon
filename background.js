// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.reviews) {
    // Log the reviews to the console for testing
    console.log("Scraped Reviews:", message.reviews);

    // Optionally, send the reviews to the popup for display
    sendReviewsToPopup(message.reviews);

    // Analyze reviews (currently commented out)
    analyzeReviews(message.reviews);
  }
});

// Function to send reviews to the popup
function sendReviewsToPopup(reviews) {
  chrome.runtime.sendMessage({ reviews });
}
