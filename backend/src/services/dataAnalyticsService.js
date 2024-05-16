const {getDataQualityData, dataLevelcheckUpdate} = require('./dataQualityService')
const db = require('../model/connection')
// const { ratingLevelCheckSer } = require('./orgRatingServices')

const getPriority = (checkObj) =>{
    if(checkObj.doNotHave && checkObj.doNotHave === 1)
       return 1
    else if(checkObj.needsImprovement && checkObj.needsImprovement === 1)
       return 2
    else if(checkObj.ready && checkObj.ready === 1)
       return 3
    else 
       return "FALSE"  
  }
  
  let averages = {}

  let type = ['Adequate Coverage' , 'Velocity' , 'Harmonization' , 'Personnel', 'Centralized Database', 'Employee Participation' , 'Management Use']
  module.exports.dataAnalytics = async ()=>{
     let groupSize = 7;
     let startIndex = 0;
     const conn = await db.connection;
     let dataQualityData =  await getDataQualityData();
     let data1 = await conn.query(`select * from datalevelcheck2 ORDER BY UUID_TO_BIN(id)`)
    //  let organizationData = await conn.query(
    //   `SELECT  
    //   rs.scaleName , 
    //   rc.doNotHave ,
    //   rc.ratingLevelId,
    //   rc.needsImprovement , 
    //   rc.ready ,  
    //   rc.sum  
    //   FROM ratingscale rs 
    //   left join ratinglevelcheck rc on  rs.id = rc.ratingscaleId `
    // )
     const modifiedData = dataQualityData.map(item => {
      const modifiedColumns = item.columns.map(column => {
        const modifiedSubColumns = column.subColounms.map(subColumn => {
          const {type, id} = subColumn;
          return {
            id,
            type,
            value:getPriority(subColumn)
          };
        });
        let temp2 =[];
        const sliceData = data1[0].slice(startIndex, startIndex+groupSize);
        startIndex = startIndex+groupSize;
        let typeIndex = 0;
        sliceData.forEach((item)=>{
          temp2.push({id:item.id, type:type[typeIndex], value:getPriority(item)})
          typeIndex++;
        })
        // organizationData[0].forEach( orgColounm =>{
        //   tempSubColounms.push({id:orgColounm.ratingLevelId, type:orgColounm.scaleName, value:getPriority(orgColounm)})
        // })
        return { ...column, subColounms:[...modifiedSubColumns, ...temp2]};
      });
    
      return { ...item, columns: modifiedColumns };
    });

    let countAppearance = {};
    modifiedData.forEach(row => {
      row.columns.forEach(colounm => {
        colounm.subColounms.forEach(obj => {
          if (!countAppearance[obj.type]) {
            countAppearance[obj.type] = {};
          }
          let value = obj.value === 'FALSE' ? 0 : obj.value;
          if (!countAppearance[obj.type][value]) {
            countAppearance[obj.type][value] = 0;
          }
          countAppearance[obj.type][value]++;
        })
      })
    })


    let maxAppearance = {};

    for (let type in countAppearance) {
      let maxCount = 0;
      let maxValue = null;
      for (let value in countAppearance[type]) {
        if (countAppearance[type][value] > maxCount) {
          maxCount = countAppearance[type][value];
          maxValue = parseInt(value);
        }
      }
      maxAppearance[type] = maxValue;
    }


    return {modifiedData, maxAppearance};
}

module.exports.dataAnalyticsDropdownUpdate = async (levelCheckId , body) => {
  if(body.type === "validity" || body.type === "consistency" || body.type === "variability"){
      await dataLevelcheckUpdate(levelCheckId, body)
    }
    else{
      await ratingCheckUpdate(levelCheckId, body)
    }
};
  

const ratingCheckUpdate = async (levelCheckId , body) => {
  try {
    let conn = await db.connection;
    if(body.doNotHave === true)
       await conn.query(`update datalevelcheck2 set doNotHave =true, needsImprovement = false, ready = false where id = "${levelCheckId}"`)
    else if(body.needsImprovement === true)
       await conn.query(`update datalevelcheck2 set doNotHave =false, needsImprovement = true, ready = false where id = "${levelCheckId}"`)
    else if(body.ready === true)
      await conn.query(`update datalevelcheck2 set doNotHave =false, needsImprovement = false, ready = true where id = "${levelCheckId}"`)
    else 
      await conn.query(`update datalevelcheck2 set doNotHave =false, needsImprovement = false, ready = false where id = "${levelCheckId}"`) 
  } catch (err) {
    throw new Error(err)
  }
};