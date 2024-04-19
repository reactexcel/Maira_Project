const  { getOrganizationRating } = require('../services/orgRatingServices')

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