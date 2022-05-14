require('dotenv').config()
const { sign, verify } = require('jsonwebtoken')

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1d' })
  },
  sendAccessToken: (res, accessToken) => {
    return res.status(200).cookie(
      'jwt',
      accessToken,
      // , {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "none",
      // }
    )
  },

  isAuthorized: (req) => {
    //let authorization = req.headers.authorization
    let authorization = req.headers.cookie
    console.log('req.cookies:', req.cookies)
    console.log('req.headers.authorization:', req.headers.authorization)
    console.log('req.headers.cookie:', req.headers.cookie)

    if (!authorization) {
      return null
    }
    // let token = authorization.split(' ')[1]
    let token = authorization.split('=')[1]
    console.log(authorization)

    try {
      return verify(token, process.env.ACCESS_SECRET)
    } catch (err) {
      console.log(err)
    }
  },
}
