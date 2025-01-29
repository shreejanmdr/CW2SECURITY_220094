const router = require("express").Router();
const userController = require("../controllers/userControllers");

// POST request to create a user
router.post("/create", userController.createUser);

// Handle disallowed GET requests
router.get("/create", (req, res, next) => {
  res.status(405).json({
    error: "GET request is not allowed in this Closet website developed by Shreejan Manandhar",
  });
});

// Handle disallowed PUT requests
router.put("/create", (req, res, next) => {
  res.status(405).json({
    error: "PUT request is not allowed in this Closet website developed by Shreejan Manandhar",
  });
});

// Handle disallowed DELETE requests
router.delete("/create", (req, res, next) => {
  res.status(405).json({
    error: "DELETE request is not allowed in this Closet website developed by Shreejan Manandhar",
  });
});


router.post("/login", userController.loginUser);

router.post("/forgot_password", userController.forgotPassword);

router.post("/verify_otp", userController.verifyOtpAndSetPassword);

router.get("/profile", userController.getCurrentProfile);

router.post("/update_profile", userController.updateUserProfile);

router.get("/token", userController.getToken);


module.exports = router;
