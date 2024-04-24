const  { getOrganizationRating , ratingLevelCheckSer , ratingGraphSer } = require('../services/orgRatingServices')

module.exports.organizationRatingController = async (req , res )=>{
 try{
  let data =  await getOrganizationRating();
  res.status(200).json({
    status : true  ,
    data
  })
 }
 catch(err){
  res.status(400).json({
    status : false ,
    message : err.message
  })
 }
}

module.exports.ratingLevelCheck = async (req , res )=>{
  try{

     await ratingLevelCheckSer(req.body)

    res.status(200).json({
      status : true ,

    })
  }
  catch(err){
    res.status(400).json({
      status : false ,
      message : err.message
    })
  }
}

module.exports.ratingGraph = async (req , res )=>{
  try{

   let data = await ratingGraphSer()

    res.status(200).json({
      status : true ,
      data 

    })
  }
  catch(err){
    res.status(400).json({
      status : false ,
      message : err.message
    })
  }
}