const sqldb = require('../model/connection')
const bcrypt = require('bcrypt');
const { generateAuthtoken } = require('../middleware/generateAuth')
const { v4: uuidv4 } = require('uuid');

module.exports.userRegisterSer = async (body) => {
  try {
    let conn = await sqldb.connection
    let { userName, password, confirm_Password, emailAddress } = body

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
      userName,
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
    const { emailAddress , password } = body;
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


