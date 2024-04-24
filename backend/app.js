const express = require('express')
const db = require('./src/model/connection')
const UserRouter = require('./src/routes/userRoutes')
const organizationRouter =  require('./src/routes/orgRatingRouter')
const dataQualityRouter = require('./src/routes/dataQualityRouter')
var cors = require('cors')
require('dotenv').config()

const app = express();
let port = process.env.PORT || 6000 
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET,LINK');
  next()
});

app.use('/user' , UserRouter)
app.use('/organization' , organizationRouter)
app.use('/data-quality' , dataQualityRouter)

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
