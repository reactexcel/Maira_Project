const jwt = require('jsonwebtoken');
require('dotenv').config();
const { decodeToken } = require('./decodeAuthToken')


 module.exports.userAuth = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      throw Error(`auth token required `)
    }
    let token = req.header('Authorization').split('Bearer ')[1]
    let verified = await decodeToken(token);

    if (!verified) {
      res.status(401).json({
        status: false,
        message: "User Unauthorized"
      })
    } else {
      req.userId = verified.userId
      req.email = verified.email
    }
    next()
  }
  catch (err) {
    res.status(500).json({
      status: true,
      message: err.message
    })
  }
}

