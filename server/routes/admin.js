const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.post("/signin", adminController.signin);
router.get("/alluserinfo", adminController.getAllUserInfo)
router.get("/allpartyinfo", adminController.getAllParty)
router.delete("/:id", adminController.deleteUser)


module.exports = router;
