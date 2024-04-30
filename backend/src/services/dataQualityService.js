const db = require('../model/connection')

module.exports.getDataQualityData = async () => {
  try {
    let sqldb = await db.connection;
    const data = await sqldb.query(`
    SELECT dv.*,
    JSON_OBJECT('doNotHave', validity.doNotHave, 'needsImprovement', validity.needsImprovement, 'ready', validity.ready) AS validity,
    JSON_OBJECT('doNotHave', consistency.doNotHave, 'needsImprovement', consistency.needsImprovement, 'ready', consistency.ready) AS consistency,
    JSON_OBJECT('doNotHave', variability.doNotHave, 'needsImprovement', variability.needsImprovement, 'ready', variability.ready) AS variability 
    FROM  dataVariableList AS dv
    LEFT JOIN datalevelcheck AS validity ON dv.validityId = validity.id
    LEFT JOIN datalevelcheck AS consistency ON dv.consistencyId = consistency.id
    LEFT JOIN datalevelcheck AS variability ON dv.variabilityId = variability.id
         `);


         const transformedData = {};

         data[0].forEach(item => {
           const {
             id,
             referenceby,
             variableshortDescription, 
             defination, 
             validityId, 
             consistencyId, 
             variabilityId, 
             validity, 
             consistency, 
             variability
             } = item;
           if (!transformedData[referenceby]) {
             transformedData[referenceby] = {
               headerName: referenceby,
               columns: []
             };
           }
         
           transformedData[referenceby].columns.push({
             variableList: variableshortDescription,
             Definition: defination,
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
    let datalevelCheckData = await conn.query(`SELECT * FROM datalevelcheck WHERE id = "${levelCheckId}"`);
    datalevelCheckData = datalevelCheckData[0] ;
    if (datalevelCheckData && datalevelCheckData.length) {
      let updateQuery = 'UPDATE datalevelcheck SET ';
      let updateFields = [];

      if (body.doNotHave !== undefined) {
        updateFields.push(`doNotHave = ${body.doNotHave ? 1 : 0}`);
      }

      if (body.needsImprovement !== undefined) {
        updateFields.push(`needsImprovement = ${body.needsImprovement ? 1 : 0}`);
      }

      if (body.ready !== undefined) {
        updateFields.push(`ready = ${body.ready ? 1 : 0}`);
      }

      if (updateFields.length > 0) {
        updateQuery += updateFields.join(', ') + ` WHERE id = "${levelCheckId}"`;     
        await conn.query(updateQuery);
      }

    let sum = await conn.query(`select doNotHave , needsImprovement , ready ,  (doNotHave + needsImprovement + ready) AS totalBooleanSum from datalevelcheck where id = "${levelCheckId}"`)
      sum =  sum[0][0].totalBooleanSum 
     await conn.query(`update datalevelcheck set  sum = "${sum}" where id = "${levelCheckId}" `  ) 

    }
    

  } catch (err) {
    throw new Error(err)
  }
};

