const mysql = require('mysql2/promise');

 require('dotenv').config();
    const mysqlConfig  = {
      host : "localhost",
      port : 3306 , 
      database :'maira',
      user : 'root',
      password : process.env.dbPassword, 
     
    }
       let connection = (async()=>{
        return   mysql.createPool(mysqlConfig);
       })()

  module.exports = {
    connection
  } 

