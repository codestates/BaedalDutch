const { users, parties } = require("../models");
const { generateAccessToken, sendAccessToken, isAuthorized } = require("../controllers/tokenfunctions");

module.exports = {
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
    if (checkNickname) {
      return res.status(409).send("nickname already exists sign up");
    }

    const [data, created] = await users.findOrCreate({
      where: {
        email: email,
        password: password,
        nickname: nickname,
        phone_number: phone_number,
        image: image
      }
    })
    if (!created) {
      return res.status(409).send("already exists sign up");
    }
    try {
      const accessToken = generateAccessToken(data.dataValues);
      sendAccessToken(res, accessToken).json({ data: data.dataValues.email, message: "created your id!!" });
    } catch (err) {
      return res.status(500).send("Server Error sign up");
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;

    const userInfo = await users.findOne({ where: { email: email, password: password } });

    if (!userInfo) {
      return res.status(404).send("bad request sign in");
    } else {
      try {
        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken).json({ accessToken, message: 'success sign in'});
      } catch (err) {
        return res.status(500).send("Server Error sign in");
      }
    }
  },

  signout: async (req, res) => {
    const userInfo = isAuthorized(req);
    try {
      if (!userInfo) {
        return res.status(404).send("bad request sign out");
      } else {
        return res.status(200).clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "none" })
        .send({ message: "success sign out" })
      }
    } catch (err) {
      return res.status(500).send("Server Error sign out");
    }
  },

  delUser: async (req, res) => {
    const userInfo = isAuthorized(req)
    console.log(userInfo)
    try{
      if(!userInfo){
        return res.status(404).send('bad request users/:id')
      } else {
        const deleteUser = await users.destroy({ where: { id: userInfo.id}})
        return res.status(200).send('successfully delete id')
      }
    } catch(err){
      return res.status(500).send('Server Error users/:id')
    }
  },

  updateUser: async (req, res) => {
    const userInfo = isAuthorized(req)
    const { nickname, password, image, phone_number } = req.body
    try{
      if(!userInfo){
        return res.status(404).send('bad request mypage')
      } else {
        const user = await users.findOne({ where: { email: userInfo.email }})
        console.log(user)

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
          { where: { email: user.dataValues.email }}
        )
        return res.statsu(200).send('success update user info')
      }
    } catch(err){
      return res.status(500).send('Server Error mypage')
    }
  },

  getUserInfo: async (req, res) => {
    const userInfo = isAuthorized(req)
    try{
      if(!userInfo){
        res.statsu(404).send('bad request mypage')
      } else {
        res.status(200).json({ userInfo })
      }
    } catch(err){
      res.status(500).send('Server Error mypage')
    }
  },

  getUserParty: async (req, res) => {
    const userInfo = isAuthorized(req)
    console.log('userInfo', userInfo)
    try{
      if(!userInfo){
        return res.status(404).send('bad request users/:id')
      } else {
        console.log('check')
        const userParty = await users.findAll({ 
          include: [
            { model: parties }
          ],
          where: { id: userInfo.id }
         })        
        console.log('userParty:', userParty)
        return res.statsu(200).json({ data: userParty })
      }
    } catch(err){
      return res.status(500).send('Server Error users/:id')
    }
  }
};

