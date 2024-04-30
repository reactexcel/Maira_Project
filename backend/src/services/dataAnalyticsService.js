const {getDataQualityData} = require('./dataQualityService')
const db = require('../model/connection')

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

module.exports.dataAnalytics = async ()=>{
    const conn = await db.connection;
     let dataQualityData =  await getDataQualityData();
     let organizationData = await conn.query(
      `SELECT  
      rs.scaleName , 
      rc.doNotHave , 
      rc.needsImprovement , 
      rc.ready ,  
      rc.sum  
      FROM ratingscale rs 
      left join ratinglevelcheck rc on  rs.id = rc.ratingscaleId `
    )
  
     const modifiedData = dataQualityData.map(item => {
      const modifiedColumns = item.columns.map(column => {
        const modifiedSubColumns = column.subColounms.map(subColumn => {
          const {type} = subColumn;
          return {
            type,
            value:getPriority(subColumn)
          };
        });
        let tempSubColounms = [];
        organizationData[0].forEach( orgColounm =>{
          tempSubColounms.push({type:orgColounm.scaleName, value:getPriority(orgColounm)})
        })
        return { ...column, subColounms:[...modifiedSubColumns, ...tempSubColounms]};
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
  