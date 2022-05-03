const { users, parties, users_parties } = require("../models");
const { generateAccessToken, sendAccessToken, isAuthorized } = require("../controllers/tokenfunctions");
const { Op } = require('sequelize');

module.exports = {
  // 로그인(완료)
  signin: async (req, res) => {
    const { email, password } = req.body;

    const userInfo = await users.findOne({ where: { email: email, password: password } });
    console.log(userInfo)
    if (!userInfo) {
      return res.status(404).send("bad request admin sign in");
    } 
    if(userInfo.nickname === 'admin'){
      try {
        console.log(userInfo.nickname)
        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken).json({ accessToken, message: "success sign in for admin" });
      } catch (err) {
        return res.status(500).send("Server Error admin sign in");
      }
    } else {
      res.status(404).send("bad request admin sign in")
    }
  },

  // 회원삭제(작업중)
  deleteUser: async (req, res) => {
    const adminInfo = isAuthorized(req)
    try{
      if(adminInfo.nickname === 'admin') {
        await users.destroy({ where: { id: req.params.id}})
        return res.status(200).send('successfully delete user deleteUser')
      }
    } catch(err){
      return res.status(500).send('Server Error deleteUser')
    }
  },

  // 회원정보 수정(작업중)
  updateUser: async (req, res) => {
    const adminInfo = isAuthorized(req)
    try{
      if(adminInfo.nickname === "admin") {
        const user = await users.findOne({ where: { id: req.params.id }})

        // 닉네임 중복 체크
        const checkNickname = await users.findOne({
          where: { nickname: nickname },
        });
        if (checkNickname) {
          return res.status(409).send("nickname already exists sign up");
        }

        // 데이터 수정
        const updateUser = await user.update(
          { nickname, password, image, phone_number },
          { where: { id: users.params.id }}
        )
        return res.statsu(200).json({ updateuser, message: 'success update user info'})
      }
    } catch(err){
      return res.status(500).send('Server Error mypage')
    }
  },

  // 전체 회원 정보 조회(완료)
  getAllUserInfo: async (req, res) => {
    const adminInfo = isAuthorized(req)
    const userInfo = await users.findAll({ where: { nickname: { [Op.ne]: "admin" } }})
    try{
      if(adminInfo.nickname === "admin") {
        console.log(adminInfo)
        res.status(200).json({ userInfo })
      } else {
        res.statsu(404).send('bad request alluserinfo')
      }
    } catch(err){
      res.status(500).send('Server Error alluserinfo')
    }
  },

  // 모든 파티 조회(완료)
  getAllParty: async (req, res) => {
    const adminInfo = isAuthorized(req)
    console.log('adminInfo', adminInfo)
    try{
      if(adminInfo.nickname === "admin"){
        const userParty = await parties.findAll({ })
        return res.status(200).json({ userParty })
      } else {
        res.statsu(404).send('bad request allpartyinfo')
      }
    } catch(err){
      return res.status(500).send('Server Error allpartyinfo')
    }
  },
};