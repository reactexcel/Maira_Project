const { userRegisterSer, userLoginSer } = require('../services/userServices')

module.exports.userRegister = async (req, res) => {
  try {
    let userId = await userRegisterSer(req.body)
    res.status((200)).json({
      status: true,
      userId
    })
  }
  catch (err) {
    res.status(400).json({
      status: false,
      messsage: err.message
    })
  }
}

module.exports.userLogin = async (req, res) => {
  try {
    let user = await userLoginSer(req.body)
    
    res.status(200).json({
      status: true,
      user
    })
  }
  catch (err) {
    res.status(400).json({
      status: false,
      message: err.message
    })
  }
}


