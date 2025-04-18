const express = require("express");
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.post("/checkout", orderController.checkout);
router.get("/invoice/:orderId", orderController.getInvoice);

module.exports = router;
