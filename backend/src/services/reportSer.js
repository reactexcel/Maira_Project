const db = require('../model/connection')

module.exports.reportService = async () => {
  try {
    let conn = await db.connection;

    let datavariablelistData = await conn.query(`select * from datavariablelist`)
    datavariablelistData = datavariablelistData[0]

    //     let getDataLevelCheck = `SELECT 
    //     SUM(doNotHave) AS Total_DoNotHave_Count,
    //     SUM(needsImprovement) AS Total_NeedsImprovement_Count,
    //     SUM(ready) AS Total_Ready_Count FROM datalevelcheck;
    // `

    let dataLevelCheck = await conn.query(`SELECT
 (SELECT COUNT(*) FROM datalevelcheck WHERE id IN (SELECT dv.validityId FROM dataVariableList AS dv) AND doNotHave = true) AS validity_doNotHaveCount,
 (SELECT COUNT(*) FROM datalevelcheck WHERE id IN (SELECT dv.validityId FROM dataVariableList AS dv) AND needsImprovement = true) AS validity_needsImprovementCount,
 (SELECT COUNT(*) FROM datalevelcheck WHERE id IN (SELECT dv.validityId FROM dataVariableList AS dv) AND ready = true) AS validity_readyCount,
 (SELECT COUNT(*) FROM datalevelcheck WHERE id IN (SELECT dv.consistencyId FROM dataVariableList AS dv) AND doNotHave = true) AS consistency_doNotHaveCount,
 (SELECT COUNT(*) FROM datalevelcheck WHERE id IN (SELECT dv.consistencyId FROM dataVariableList AS dv) AND needsImprovement = true) AS consistency_needsImprovementCount,
 (SELECT COUNT(*) FROM datalevelcheck WHERE id IN (SELECT dv.consistencyId FROM dataVariableList AS dv) AND ready = true) AS consistency_readyCount,
 (SELECT COUNT(*) FROM datalevelcheck WHERE id IN (SELECT dv.variabilityId FROM dataVariableList AS dv) AND doNotHave = true) AS variability_doNotHaveCount,
 (SELECT COUNT(*) FROM datalevelcheck WHERE id IN (SELECT dv.variabilityId FROM dataVariableList AS dv) AND needsImprovement = true) AS variability_needsImprovementCount,
 (SELECT COUNT(*) FROM datalevelcheck WHERE id IN (SELECT dv.variabilityId FROM dataVariableList AS dv) AND ready = true) AS variability_readyCount;
`)
    let ratingLevelCheck = await conn.query(`SELECT rc.doNotHave , rc.needsImprovement , rc.ready ,rs.scaleName FROM maira.ratinglevelcheck  rc left join  ratingScale rs on  rc.ratingscaleId = rs.id;`)
    ratingLevelCheck = ratingLevelCheck[0]


let data =   ratingLevelCheck.map((e) => {
      let obj = {}
      if (e.doNotHave === 1) {

        obj.scaleName = e.scaleName
        obj.average = 1
        return obj

      } else if (e.needsImprovement === 1) {
        obj.scaleName = e.scaleName
        obj.average = 2
        return obj

      } else if (e.ready === 1) {
        console.log(e.ready);
        obj.scaleName = e.scaleName
        obj.average = 3
        return obj

      }
      else {
        obj.average = 0
        return obj
      }

    })










  } catch (err) {
    throw new Error(err)
  }
};