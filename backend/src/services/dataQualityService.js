const db = require('../model/connection')

module.exports.getDataQualityData = async () => {
  try {
    let sqldb = await db.connection;
    const data = await sqldb.query(`
    SELECT dv.*,
    JSON_OBJECT('doNotHave', validity.doNotHave, 'needsImprovement', validity.needsImprovement, 'ready', validity.ready) AS validity,
    JSON_OBJECT('doNotHave', consistency.doNotHave, 'needsImprovement', consistency.needsImprovement, 'ready', consistency.ready) AS consistency,
    JSON_OBJECT('doNotHave', variability.doNotHave, 'needsImprovement', variability.needsImprovement, 'ready', variability.ready) AS variability 
    FROM  datavariablelist AS dv
    LEFT JOIN datalevelcheck AS validity ON dv.validityId = validity.id
    LEFT JOIN datalevelcheck AS consistency ON dv.consistencyId = consistency.id
    LEFT JOIN datalevelcheck AS variability ON dv.variabilityId = variability.id
         `);

         const transformedData = {};

         data[0].forEach(item => {
           const {
             id,
             referenceBy,
             variableShortDescription, 
             definition, 
             validityId, 
             consistencyId, 
             variabilityId, 
             validity, 
             consistency, 
             variability
             } = item;
           if (!transformedData[referenceBy]) {
             transformedData[referenceBy] = {
               headerName: referenceBy,
               columns: []
             };
           }
         
           transformedData[referenceBy].columns.push({
             variableList: variableShortDescription,
             Definition: definition,
              subColounms:[{
               id:validityId,
               type:"validity",
               doNotHave: validity.doNotHave,
               needsImprovement: validity.needsImprovement,
               ready: validity.ready
             },
             {
               id:consistencyId,
               type:"consistency",
               doNotHave: consistency.doNotHave,
               needsImprovement: consistency.needsImprovement,
               ready: consistency.ready
             },
             {
               id:variabilityId,
               type:"variability",
               doNotHave: variability.doNotHave,
               needsImprovement: variability.needsImprovement,
               ready: variability.ready
             }]
           });
         });
         
         const transformedArray = Object.values(transformedData);
         return transformedArray;
  } catch (err) {
    throw new Error(err)
  }
};

module.exports.dataLevelcheckUpdate = async (levelCheckId , body) => {
  try {
    let conn = await db.connection;
    if(body.doNotHave === true)
       await conn.query(`update datalevelcheck set doNotHave =true, needsImprovement = false, ready = false where id = "${levelCheckId}"`)
    else if(body.needsImprovement === true)
       await conn.query(`update datalevelcheck set doNotHave =false, needsImprovement = true, ready = false where id = "${levelCheckId}"`)
    else if(body.ready === true)
      await conn.query(`update datalevelcheck set doNotHave =false, needsImprovement = false, ready = true where id = "${levelCheckId}"`)
    else 
      await conn.query(`update datalevelcheck set doNotHave =false, needsImprovement = false, ready = false where id = "${levelCheckId}"`) 
  } catch (err) {
    throw new Error(err)
  }
};


// module.exports.ratingCheckUpdate = async (levelCheckId , body) => {
//   try {
//     let conn = await db.connection;
//     if(body.doNotHave === true)
//        await conn.query(`update datalevelcheck2 set doNotHave =true, needsImprovement = false, ready = false where id = "${levelCheckId}"`)
//     else if(body.needsImprovement === true)
//        await conn.query(`update datalevelcheck2 set doNotHave =false, needsImprovement = true, ready = false where id = "${levelCheckId}"`)
//     else if(body.ready === true)
//       await conn.query(`update datalevelcheck2 set doNotHave =false, needsImprovement = false, ready = true where id = "${levelCheckId}"`)
//     else 
//       await conn.query(`update datalevelcheck2 set doNotHave =false, needsImprovement = false, ready = false where id = "${levelCheckId}"`) 
//   } catch (err) {
//     throw new Error(err)
//   }
// };

