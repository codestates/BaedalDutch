const { users, parties, users_parties } = require('../models');
const bcrypt = require('bcrypt')
const saltRounds = 10;


const {
  generateAccessToken,
  sendAccessToken,
  isAuthorized,
} = require("../controllers/tokenfunctions")

module.exports = {
  // 회원가입
  signup: async (req, res) => {
    console.log("회원정보확인", req.body)
    const { email, password, nickname, phone_number, image, address } = req.body

    if (
      !email ||
      !password ||
      !nickname ||
      !phone_number ||
      !image ||
      !address
    ) {
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
      //Admin 삭제
      console.log("닉네임에러")
      return res.status(409).send("nickname already exists sign up")
    }

    const bPassword = await bcrypt.hash(password, saltRounds);

    const [data, created] = await users.findOrCreate({
      where: {
        email: email,
        password: bPassword,
        nickname: nickname,
        phone_number: phone_number,
        image: image,
        address: address,
      },
    })
    if (!created) {
      return res.status(409).send('already exists sign up')
    } else if(data){
      return res.status(200).json({data: data.dataValues.email, message: 'created your id!!'})
    } else {
      return res.status(500).send('Server Error sign up')
    }
  },

  // 로그인
  signin: async (req, res) => {
    const { email, password } = req.body
    
    try {
      const userInfo = await users.findOne({
        where: { email: email }
      })

    console.log("userInfo:", userInfo)
    if (!userInfo || !bcrypt.compareSync(password, userInfo.dataValues.password)) {
      console.log('check')
      return res.status(404).send("bad request sign in")
    } else {
        delete userInfo.dataValues.password
        const accessToken = generateAccessToken(userInfo.dataValues)
        sendAccessToken(res, accessToken).json({
          data: {
            id: userInfo.id,
            nickname: userInfo.nickname,
            phone_number: userInfo.phone_number,
            address: userInfo.address,
            email: userInfo.email,
            image: userInfo.image,
            password: userInfo.password,
          },
          accessToken,
          message: "success sign in",
        })

      } catch (err) {
        return res.status(500).send("Server Error sign in")
  },

  // 로그아웃
  signout: async (req, res) => {
    const userInfo = isAuthorized(req)
    try {
      if (!userInfo) {
        return res.status(404).send("bad request sign out")
      } else {
        return res.status(200).clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none'}).send({ message: 'success sign out' })
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
  updateUser: async (req, res) => {
    console.log('회원정보 수정 진입')
    const userInfo = isAuthorized(req)
    const { nickname, password, image, phone_number, address } = req.body
    console.log('req.body:', req.body)
    console.log('userInfo:', userInfo)
    try {
      if (!userInfo) {
        return res.status(404).send("bad request mypage")
      } else {
        const user = await users.findOne({ where: { id: userInfo.id } })
        console.log(user)
        
        // 데이터 수정
        const updateUserInfo = await users.update(
          { password, image, phone_number, address },
          { where: { id: userInfo.id } }
        );
        console.log('check')
        // 닉네임 중복 체크
        const checkNickname = await users.findOne({
          where: { nickname: nickname },
        })
        if (req.body.nickname === userInfo.nickname) {
          // 데이터 수정
          const updateUserInfo = await users.update(
            { nickname, password, image, phone_number },
            { where: { email: user.dataValues.email } }
          )
          return res
            .status(200)
            .json({ updateUserInfo, message: "success update user info" })
        } else if (checkNickname) {
          return res.status(409).send("nickname already exists sign up")
        } else {
          // 데이터 수정
          const updateUserInfo = await users.update(
            { nickname, password, image, phone_number },
            { where: { email: user.dataValues.email } }
          )
          return res
            .status(200)
            .json({ updateUserInfo, message: "success update user info" })
        }
      }
    } catch (err) {
      return res.status(500).send("Server Error mypage")
    }
  },

  // 회원 정보 조회
  getUserInfo: async (req, res) => {
    console.log('들어오나')
    const userInfo = isAuthorized(req)
    try {
      if (!userInfo) {
        console.log("1")
        res.status(404).send("bad request mypage")
      } else {
        console.log('2')
        res.status(200).json({ userInfo })
      }
    } catch (err) {
      console.log("3")
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
          where: { writerUser_id: req.params.id },
        })
        const userJoin = await users_parties.findAll({
          where: { users_id: req.params.id },
        })
        console.log('userParty:', userParty)
        return res.status(200).json({ userParty, userJoin })
      }
    } catch (err) {
      return res.status(500).send("Server Error users/:id")
    }
  },

  // 마이페이지 닉네임 변경 시 닉네임 확인
  checkNickName: async (req, res) => {
    await users
      .findOne({
        where: {
          nickname: req.body.nickname,
        },
      })
      .then(data => {
        if (!data) {
          return res.send({ message: '사용 가능한 닉네임입니다.' })
        } else {
          res.send({ message: '이미 사용중인 닉네임입니다.' })
        }
      })
      .catch(err => {
        res.status(500).send({ message: 'Server error checkNickName' })
      })
  },
}
