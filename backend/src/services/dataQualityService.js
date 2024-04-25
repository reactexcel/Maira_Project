const db = require('../model/connection')

module.exports.getDataQualityData = async () => {
  try {
    let sqldb = await db.connection;
    const data = await sqldb.query(`
    SELECT * 
    FROM maira.dataVariablelist AS dv
    LEFT JOIN datalevelcheck AS validity_check ON dv.validityId = validity_check.id
    LEFT JOIN datalevelcheck AS consistency_check ON dv.consistencyId = consistency_check.id
    LEFT JOIN datalevelcheck AS variability_check ON dv.variabilityId = variability_check.id
         `);

    return data;
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

