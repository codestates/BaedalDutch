const express = require("express");
const oauthController = require("../controllers/oauth");
const router = express.Router();

router.post("/kakao", oauthController.kakaoLogin);

module.exports = router;
