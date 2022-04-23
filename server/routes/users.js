const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();

router.post("/signup", usersController.signup);
router.post("/signin", usersController.signin);
router.post("/signout", usersController.signout);
router.delete("/:id", usersController.delUser);
router.patch("/mypage", usersController.updateUser);
router.get("/mypage", usersController.getUserInfo);

module.exports = router;