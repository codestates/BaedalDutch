require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },
  sendAccessToken: (res, accessToken) => {
    return res
      .status(200)
      .cookie("jwt", accessToken, { httpOnly: true, secure: true, sameSite: "none" })
      .json({ accessToken, message: "ok" });
  },

  isAuthorized: (req) => {
    console.log("req.headers:", req.headers);
    let authorization = req.headers.authorization;
    if (!authorization) {
      return null;
    }

    let token = authorization.split(" ")[1];

    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
    }
  },
};