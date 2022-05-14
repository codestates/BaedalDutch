const express = require("express");
const ordersController = require("../controllers/orders");
const router = express.Router();

router.post("/:id", ordersController.participateParty);
router.delete("/:id", ordersController.cancelOrder);

module.exports = router;
