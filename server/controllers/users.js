const { user } = require("../models");
const { generateAccessToken, sendAccessToken, isAuthorized } = require("../controllers/tokenfunctions")

module.exports = {
  signup: async (req, res) => {
    const { email, password, nickname, phone_number, image } = req.body

    if(!email || !password || !nickname || !phone_number || !image){
      return res.status(404).send('Bad request sign up')
    }

    const checkEmail = await user.findOne({
      where: { email: email }
    })

    const checkNickname = await user.findOne({
      where: { nickname: nickname }
    })

    if(checkEmail){
      return res.status(409).send('email already exists sign up')
    }

    if(checkNickname){
      return res.status(409).send('nickname already exists sign up')
    }

    const [data, created] = await user.findOrCreate({
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

    try{
      const accessToken = generateAccessToken(data.dataValues);
      sendAccessToken(res, accessToken).json({ data: data.dataValues.email, message: 'created your id!!'})
    } catch(err) {
      return res.status(500).send('Server Error sign up')
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body

    const userInfo = await user.findOne({ where: { email: email, password: password }})
    console.log('userInfo:', userInfo)

    if(!userInfo){
      console.log('check')
      return res.status(404).send('bad request sign in')
    } else {
      try{
        const accessToken = generateAccessToken(userInfo.dataValues)
        sendAccessToken(res, accessToken).json({ data: userInfo.dataValues.email, message: 'success sign in'})
      } catch(err){
        return res.status(500).send('Server Error sign in')
      }
    }
   
  },

  signout: async (req, res) => {
    const userInfo = isAuthorized(req)
    try{
      if(!userInfo){
        return res.status(404).send('bad request sign out')
      } else {
        sendAccessToken.send("success sign out");
      }
    } catch(err){
      return res.status(500).send('Server Error sign out')
    }
  },

  delUser: async (req, res) => {
    res.end();
  },
  updateUser: async (req, res) => {
    res.end();
  },
  getUserInfo: async (req, res) => {
    res.end();
  },
};
