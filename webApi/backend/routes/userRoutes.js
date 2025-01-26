const router = require("express").Router();
const userController = require("../controllers/userControllers");

router.post("/create", userController.createUser);

router.post("/login", userController.loginUser);

router.post("/forgot_password", userController.forgotPassword);

router.post("/verify_otp", userController.verifyOtpAndSetPassword);

router.get("/profile", userController.getCurrentProfile);

router.post("/update_profile", userController.updateUserProfile);

router.get("/token", userController.getToken);


module.exports = router;
