const { users, parties, users_parties } = require('../models')

const {
  generateAccessToken,
  sendAccessToken,
  isAuthorized,
} = require("../controllers/tokenfunctions")

module.exports = {
  // 회원가입
  signup: async (req, res) => {
    const { email, password, nickname, phone_number, image, address } = req.body

    if (!email || !password || !nickname || !phone_number || !image || !address) {
      console.log("진입")
      return res.status(404).send("Bad request sign up")
    }

    // email 중복체크
    const checkEmail = await users.findOne({
      where: { email: email },
    })
    
    // nickname 중복체크
    const checkNickname = await users.findOne({
      where: { nickname: nickname },
    })

    if (checkEmail) {
      return res.status(409).send("email already exists sign up")
    }
    if (checkNickname) {
      return res.status(409).send("nickname already exists sign up");
    }

    const [data, created] = await users.findOrCreate({
      where: {
        email: email,
        password: password,
        nickname: nickname,
        phone_number: phone_number,
        image: image,
        address: address
      },
    })
    if (!created) {
      return res.status(409).send("already exists sign up")
    }
    try {
      const accessToken = generateAccessToken(data.dataValues)
      sendAccessToken(res, accessToken).json({
        data: data.dataValues.email,
        message: "created your id!!",
      })
    } catch (err) {
      return res.status(500).send("Server Error sign up")
    }
  },

  // 로그인
  signin: async (req, res) => {
    const { email, password } = req.body
    console.log("서버체크", email, password)

    const userInfo = await users.findOne({
      where: { email: email, password: password },
    })
    console.log("userInfo:", userInfo)
    if (!userInfo) {
      return res.status(404).send("bad request sign in")
    } else {
      try {
        const accessToken = generateAccessToken(userInfo.dataValues)
        sendAccessToken(res, accessToken).json({ userInfo, accessToken, message: "success sign in" })
      } catch (err) {
        return res.status(500).send("Server Error sign in")
      }
    }
  },

  // 로그아웃
  signout: async (req, res) => {
    const userInfo = isAuthorized(req)
    try {
      if (!userInfo) {
        return res.status(404).send("bad request sign out")
      } else {
        return res
          .status(200)
          .clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .send({ message: "success sign out" })
      }
    } catch (err) {
      return res.status(500).send("Server Error sign out")
    }
  },

  // 회원탈퇴
  delUser: async (req, res) => {
    const userInfo = isAuthorized(req)
    console.log(userInfo)
    try {
      if (!userInfo) {
        return res.status(404).send("bad request users/:id")
      } else {
        const deleteUser = await users.destroy({ where: { id: req.params.id } })
        return res.status(200).send("successfully delete id")
      }
    } catch (err) {
      return res.status(500).send("Server Error users/:id")
    }
  },

  // 회원정보 수정(작업중)
  // 닉네임을 안바꾸고 다른 항목 수정하면 닉네임 중복으로 수정 안됨
  updateUser: async (req, res) => {
    const userInfo = isAuthorized(req)
    const { nickname, password, image, phone_number, address } = req.body
    try {
      if (!userInfo) {
        return res.status(404).send("bad request mypage")
      } else {
        const user = await users.findOne({ where: { id: userInfo.id } })
        console.log(user)
        // 닉네임 중복 체크
        const checkNickname = await users.findOne({
          where: { nickname: nickname },
        })
        if (checkNickname) {
          return res.status(409).send('nickname already exists sign up')
        }
        console.log('check')

        // 데이터 수정
        const updateUserInfo = await users.update(
          { nickname, password, image, phone_number, address },
          { where: { id: userInfo.id } }
        );
        return res.status(200).json({ updateUserInfo, message: "success update user info"});
      }
    } catch (err) {
      return res.status(500).send("Server Error mypage")
    }
  },

  // 회원 정보 조회
  getUserInfo: async (req, res) => {
    const userInfo = isAuthorized(req)
    try {
      if (!userInfo) {
        res.statsu(404).send("bad request mypage")
      } else {
        res.status(200).json({ userInfo })
      }
    } catch (err) {
      res.status(500).send("Server Error mypage")
    }
  },

  // 생성한 파티, 가입한 파티 조회(완료)
  getUserParty: async (req, res) => {
    const userInfo = isAuthorized(req)
    console.log("userInfo", userInfo)
    try {
      if (!userInfo) {
        return res.status(404).send("bad request users/:id")
      } else {
        const userParty = await parties.findAll({
          where: { writerUser_id: req.params.id }
        })
        const userJoin = await users_parties.findAll({
          where: { users_id: req.params.id }
        })
        console.log('userParty:', userParty)
        return res.status(200).json({ userParty, userJoin })
      }
    } catch (err) {
      return res.status(500).send("Server Error users/:id")
    }
  },
}
