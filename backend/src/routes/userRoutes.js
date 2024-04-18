const express = require('express');
const { userRegister , userLogin  , forgetPwd , pwdReset ,}  = require(`../controller/userController`)

const router = express.Router();

router.post('/register' , userRegister )
router.post('/login' , userLogin )
router.post('/forget-pwd' , forgetPwd )
router.post('/reset-pwd/:token' , pwdReset)


module.exports = router
  