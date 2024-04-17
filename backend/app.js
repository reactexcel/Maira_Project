const express = require('express')
const db = require('./src/model/connection')
const router = require('./src/routes/userRoutes')
require('dotenv').config()
// const router  = require(`./src/routes/route`)
  
const app = express();
let port = process.env.PORT || 6000 

app.use(express.json())
app.use('/user' , router)

app.listen(port, async() => {
  try{
    let conn = await db.connection
   await conn.query(`select 1`)
    console.log(`connection Successfully `);
    console.log(`Server run on http://localhost:${port}`);

  }
  catch(err){
    console.log(err.message  , '======>>>');
  }
});
