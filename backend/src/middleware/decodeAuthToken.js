const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.decodeToken = async (token)=>{
  try{
    let decodeToken = jwt.verify(token, process.env.SECRET_KEY)
      return decodeToken
  }
  catch(err){
    throw Error(err)
  }
}
