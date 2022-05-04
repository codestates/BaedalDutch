const axios = require("axios");
const { users, parties } = require("../models");

module.exports = {
  kakaoLogin: (req, res) => {
    const code = req.body.code;
    // access_token
    axios
      .get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${code}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(async (result) => {
        console.log(result.data);
        const nickname = result;
        const email = result;

        const oauthUser = await users.findOne({
          where: {
            email: email,
            nickname: nickname,
          },
        });

        if (oauthUser) {
          // 이미 가입된 유저
          const userInfo = await users.findOne({
            where: {
              email: email,
            },
          });

          let payload = {
            nickname: userInfo.dataValues.nickname,
            email: userInfo.dataValues.email,
          };

          const access_Token = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" });

          res.cookie("jwt", access_Token);
          res.status(200).json({
            data: {
              accessToken: access_Token,
              nickname: nickname,
            },
          });
        } else {
          // 가입하려는 유저
          users.create({
            nickname: nickname,
            email: email,
          });

          const userInfo = await users.findOne({
            where: {
              email: email,
            },
          });

          let payload = {
            nickname: userInfo.dataValues.nickname,
            email: userInfo.dataValues.email,
          };

          const access_Token = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" });

          res.cookie("jwt", access_Token).json({
            message: "Login success!",
            data: {
              accessToken: access_Token,
              nickname: nickname,
            },
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "Oauth login err",
        });
      });
  },
};
