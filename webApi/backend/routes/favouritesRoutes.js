const express = require("express");
const router = express.Router();
const favouritesController = require("../controllers/favouritesController");
const { authGuard } = require("../middleware/authGuard");
const logActivity = require("../middleware/logActivity");
// Route to add item to favorites
router.post("/add", authGuard,logActivity, favouritesController.favorite);

// Route to get all favorite items
router.get("/all",authGuard, favouritesController.getAllFavorites);

// Route to get favorite for user
router.get("/get",authGuard, favouritesController.getFavorite);

// Route to delete item from favorites
router.delete(
  "/delete/:id",
  authGuard,logActivity,
  favouritesController.deleteFavoriteItem
);

module.exports = router;
