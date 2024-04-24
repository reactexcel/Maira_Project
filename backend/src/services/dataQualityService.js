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


