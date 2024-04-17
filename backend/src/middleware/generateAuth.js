const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports.generateAuthtoken = async (tokenPayload)=>{
  try{
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: 3600 })
     return token
  }
  catch(err){
    throw Error (err)
  }
}

