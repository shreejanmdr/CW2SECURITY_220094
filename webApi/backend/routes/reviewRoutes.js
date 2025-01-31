const express = require("express");
const router = express.Router();
const logActivity = require("../middleware/logActivity");
const { addReview, getReviewsByProduct } = require("../controllers/reviewController");
const { authGuard } = require("../middleware/authGuard"); // Adjusted path for middleware import
 
// POST route to add a review
router.post("/add",logActivity, authGuard, addReview); // Added authGuard to ensure user is authenticated
 
// GET route to fetch reviews by product ID
router.get("/product/:productId", getReviewsByProduct);
 
module.exports = router;