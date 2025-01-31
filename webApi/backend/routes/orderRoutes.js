const router = require("express").Router();
const logActivity = require("../middleware/logActivity");
const orderController = require("../controllers/orderController");
const { authGuard } = require("../middleware/authGuard");

router.post("/create", authGuard,logActivity, orderController.addOrder);
router.get("/get", authGuard, orderController.getAllOrders);
router.put("/update/:id", authGuard, orderController.updateOrderStatus);
router.get("/user", authGuard, orderController.getUserOrders);
module.exports = router;
