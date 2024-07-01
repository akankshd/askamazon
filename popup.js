// popup.js
document.addEventListener("DOMContentLoaded", function () {
    const analyzeButton = document.getElementById("analyzeButton");
    const reviewsContainer = document.getElementById("reviews");
  
    analyzeButton.addEventListener("click", function () {
      chrome.runtime.sendMessage({ action: "scrapeReviews" }, function (response) {
        if (response && response.reviews) {
          reviewsContainer.innerHTML = ""; // Clear previous reviews
  
          response.reviews.forEach(function (review) {
            const reviewElement = document.createElement("p");
            reviewElement.textContent = review;
            reviewsContainer.appendChild(reviewElement);
          });
        }
      });
    });
  });
  