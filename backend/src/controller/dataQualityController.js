const  { getDataQualityData , dataLevelcheckUpdate} = require('../services/dataQualityService')

module.exports.getQualityData = async (req , res )=>{
 try{
  let data =  await getDataQualityData();
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

module.exports.dataLevelCheckController = async (req ,res )=>{
  try{
    console.log(`11111111111111`);
    const {id} = req.params;
    let data = await dataLevelcheckUpdate(id, req.body)

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

// module.exports.updateDataQualityData = async (req , res )=>{
//   try{

//      await ratingLevelCheckSer(req.body)

//     res.status(200).json({
//       status : true ,

//     })
//   }
//   catch(err){
//     res.status(400).json({
//       status : false ,
//       message : err.message
//     })
//   }
// }