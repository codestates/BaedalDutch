require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },
  sendAccessToken: (res, accessToken) => {
    return res.cookie("jwt", accessToken, { httpOnly: true, secure: true, sameSite: "none" })
  },

  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];
    
    if (!authorization) {
      return null;
    }
    
    const token = authorization.split(" ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      return null;
    }
  },
};