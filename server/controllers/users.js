const { users, parties } = require("../models");
const {
  generateAccessToken,
  sendAccessToken,
  isAuthorized,
} = require("../controllers/tokenfunctions");
const axios = require("axios");

module.exports = {
  // 회원가입
  signup: async (req, res) => {
    const { email, password, nickname, phone_number, image } = req.body;

    if (!email || !password || !nickname || !phone_number || !image) {
      return res.status(404).send("Bad request sign up");
    }

    const checkEmail = await users.findOne({
      where: { email: email },
    });
    const checkNickname = await users.findOne({
      where: { nickname: nickname },
    });

    if (checkEmail) {
      return res.status(409).send("email already exists sign up");
    }

    if (checkNickname || "admin") {
      return res.status(409).send("nickname already exists sign up");
    }

    const [data, created] = await users.findOrCreate({
      where: {
        email: email,
        password: password,
        nickname: nickname,
        phone_number: phone_number,
        image: image,
      },
    });
    if (!created) {
      return res.status(409).send("already exists sign up");
    }
    try {
      const accessToken = generateAccessToken(data.dataValues);
      sendAccessToken(res, accessToken).json({
        data: data.dataValues.email,
        message: "created your id!!",
      });
    } catch (err) {
      return res.status(500).send("Server Error sign up");
    }
  },

  // 로그인
  signin: async (req, res) => {
    console.log(Object.keys(req.body).length);
    // 일반 로그인
    if (Object.keys(req.body).length === 2) {
      const { email, password } = req.body;
      const userInfo = await users.findOne({
        where: { email: email, password: password },
      });
      console.log("userInfo:", userInfo);
      if (!userInfo) {
        return res.status(404).send("bad request sign in");
      } else {
        try {
          const accessToken = generateAccessToken(userInfo.dataValues);
          sendAccessToken(res, accessToken).json({
            data: {
              id: userInfo.id,
              nickname: userInfo.nickname,
              phone_number: userInfo.phone_number,
              email: userInfo.email,
              image: userInfo.image,
            },
            accessToken,
            message: "success sign in",
          });
        } catch (err) {
          return res.status(500).send("Server Error sign in");
        }
      }
    }
    // 카카오 로그인
    else {
      const { code } = req.body;
      console.log("code----", code);
      axios
        .get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${code}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(async (result) => {
          const nickname = result.data.kakao_account.profile.nickname;
          const email = result.data.kakao_account.email;
          console.log("여기는??????", nickname, email);
          const oauthUser = await users.findOne({
            where: {
              email: email,
              nickname: nickname,
            },
          });
          console.log("여기??????", oauthUser);
          // 이미 가입된 유저
          if (oauthUser) {
            const accessToken = generateAccessToken(oauthUser.dataValues);
            sendAccessToken(res, accessToken).json({
              data: {
                id: oauthUser.dataValues.id,
                nickname: oauthUser.dataValues.nickname,
                phone_number: oauthUser.dataValues.phone_number,
                email: oauthUser.dataValues.email,
                image: oauthUser.dataValues.image,
              },
              message: "success sign in",
            });
          }
          // 가입하려는 유저
          else {
            console.log("여기???");
            await users.create({
              nickname: nickname,
              email: email,
            });
            const userInfo = await users.findOne({
              where: {
                nickname: nickname,
                email: email,
              },
            });
            const accessToken = generateAccessToken(userInfo.dataValues);
            sendAccessToken(res, accessToken).json({
              data: {
                id: userInfo.dataValues.id,
                nickname: userInfo.dataValues.nickname,
                phone_number: userInfo.dataValues.phone_number,
                email: userInfo.dataValues.email,
                image: userInfo.dataValues.image,
              },
              message: "success sign in",
            });
          }
        })
        .catch((err) => {
          res.status(400).json({
            message: "Oauth login err",
          });
        });
    }
  },

  // 로그아웃
  signout: async (req, res) => {
    try {
      res.clearCookie("jwt");
      res.status(200).send({ message: "success sign out" });
    } catch (err) {
      return res.status(500).send("Server Error sign out");
    }
  },

  // 회원탈퇴
  delUser: (req, res) => {
    const userInfo = isAuthorized(req);
    console.log(req.body);
    try {
      if (!userInfo) {
        return res.status(404).send("bad request users/:id");
      } else {
        if (!userInfo.password) {
          axios.post("https://kapi.kakao.com/v1/user/unlink", {
            headers: {
              Authorization: `Bearer ${req.body.kakaoToken}`,
            },
          });
          users.destroy({
            where: { id: req.params.id },
          });
          res.status(200).clearCookie("jwt").json("successfully delete oauth");
        } else {
          users.destroy({
            where: { id: req.params.id },
          });
          res.status(200).clearCookie("jwt").send("successfully delete id");
        }
      }
    } catch (err) {
      return res.status(500).send("Server Error users/:id");
    }
  },

  // 회원정보 수정
  updateUser: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { nickname, password, image, phone_number } = req.body;
    try {
      if (!userInfo) {
        return res.status(404).send("bad request mypage");
      } else {
        const user = await users.findOne({ where: { email: userInfo.email } });
        console.log(user);

        // 닉네임 중복 체크
        const checkNickname = await users.findOne({
          where: { nickname: nickname },
        });
        if (checkNickname) {
          return res.status(409).send("nickname already exists sign up");
        }

        // 데이터 수정
        const userNickname = await user.update(
          { nickname, password, image, phone_number },
          { where: { email: user.dataValues.email } }
        );
        return res.statsu(200).send("success update user info");
      }
    } catch (err) {
      return res.status(500).send("Server Error mypage");
    }
  },

  // 회원 정보 조회
  getUserInfo: async (req, res) => {
    const userInfo = isAuthorized(req);
    try {
      if (!userInfo) {
        res.statsu(404).send("bad request mypage");
      } else {
        res.status(200).json({ userInfo });
      }
    } catch (err) {
      res.status(500).send("Server Error mypage");
    }
  },

  // 생성한 파티, 가입한 파티 조회
  getUserParty: async (req, res) => {
    const userInfo = isAuthorized(req);
    console.log("userInfo", userInfo);
    try {
      if (!userInfo) {
        return res.status(404).send("bad request users/:id");
      } else {
        console.log("check");

        const userParty = await parties.findAll({
          include: [{ model: users_parties }],
          where: { writeruser_id: userInfo.id },
        });
        console.log("userParty:", userParty);
        return res.status(200).json({ userParty });
      }
    } catch (err) {
      return res.status(500).send("Server Error users/:id");
    }
  },
};
