const {reportService} = require('../services/reportSer')

module.exports.reportController = async (req , res )=>{
  try{

     const report = await reportService()
    res.status(200).json({
      status : true,
      report :report
    })
  }
  catch(err){
    res.status(400).json({
      status : false  ,
      message : err.message
    })
  }
}
