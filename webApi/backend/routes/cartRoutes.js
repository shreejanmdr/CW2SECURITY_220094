const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authGuard } = require("../middleware/authGuard");
const logActivity = require("../middleware/logActivity");

// Route to add item to cart
router.post("/add",authGuard,logActivity, cartController.addToCart);

// Route to get all cart items
router.get("/all",authGuard, cartController.getAllCartItems);

// Route to delete item from cart
router.delete("/delete/:id",logActivity, cartController.deleteCartItem);
 
// Route to update item in cart
router.put("/update/:id", cartController.updateCartItem);

// Route to update status in cart
router.put("/status", authGuard,logActivity, cartController.updateUserCartStatus);

module.exports = router;
