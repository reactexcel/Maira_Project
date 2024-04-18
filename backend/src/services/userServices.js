const sqldb = require('../model/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { generateAuthtoken } = require('../middleware/generateAuth')
const { sendMail } = require('../middleware/sendMail')
const { v4: uuidv4 } = require('uuid');

module.exports.userRegisterSer = async (body) => {
  try {
    let conn = await sqldb.connection
    let { firstName, lastName, password, confirm_Password, emailAddress } = body

    if (!emailAddress) {
      throw new Error(`EmailAddress is required `)
    }

    let findUserByEmail = await conn.query(`select * from user where emailAddress = ?`, [emailAddress])
    if (findUserByEmail[0].length) {
      throw new Error(`User already registered with this Email`)
    }


    if (password !== confirm_Password) {
      throw new Error(` confirm password is not matched`)
    }

    let userId = uuidv4();
    let saltRounds = 10
    password = await bcrypt.hash(password, saltRounds);

    let userData = {
      id: userId,
      firstName,
      lastName: lastName ? lastName : null,
      password,
      emailAddress
    }
    console.log(userData);
    await conn.query(`insert into user set ? `, [userData])
    return userId
  }
  catch (err) {
    throw new Error(err)

  }
}

module.exports.userLoginSer = async (body) => {
  try {
    const { emailAddress, password } = body;
    let conn = await sqldb.connection
    let [userData] = await conn.query(`select * from user where emailAddress = "${emailAddress}"`)
    userData = userData[0];

    if (!userData) {
      throw new Error("User is not  Registered with this emailAddress ")
    }
    const passwordMatch = await bcrypt.compare(password, userData.Password)

    if (!passwordMatch) {
      throw new Error('Password Incorrect ')
    }
    let tokenPayload = {
      userId: userData.id,
      emailAddress
    }
    let token = await generateAuthtoken(tokenPayload)

    return {
      userId: userData.id,
      token
    }
  }
  catch (err) {
    throw new Error(err)
  }

}

module.exports.forgetPwdSer = async (email) => {
  try {
    let conn = await sqldb.connection
    let [userData] = await conn.query(`select * from user where emailAddress = "${email}"`)

    if (userData && userData.length) {
      let tokenPayload = {
        email
      }
      const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: 900 })
      await conn.query('UPDATE user SET token = ? WHERE emailAddress = ?', [token, email]); 
      let messageId = await sendMail(token)
      return {
        token,
        messageId
      }
    }
    else {
      throw new Error('User not found');
    }

  }
  catch (err) {
    throw Error(err)
  }
}

module.exports.pwdResetSer = async (token, body) => {
  try {
    let conn = await sqldb.connection
    let decodeToken;
    try {
      decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Link has been expired');
      } else {
        throw error; 
      }
    }
    
    let findUserByToken = await conn.query(`select * from user where emailAddress = "${decodeToken.email}" `)

    if(findUserByToken && findUserByToken.length){
      let { newPassword, confirmPassword } = body
      console.log( newPassword, confirmPassword);
      if (newPassword !== confirmPassword) {
        throw Error(`Password not matched`)
      }
      let password = await bcrypt.hash(newPassword, 10)
      
      await conn.query(`update user set password = ? , token = ? where emailAddress = "${decodeToken.email}"`, [password , null])
      return decodeToken.email
    }
    else {
      throw new Error(`The link has been expired`)
    }

  }
  catch (err) {
    throw Error(err)
  }
}


