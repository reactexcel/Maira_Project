const db = require('../model/connection')

module.exports.getOrganizationRating = async () => {
  try {
    let sqldb = await db.connection;

    let ratingData = await sqldb.query(`select * from rating `);
    ratingData = ratingData[0];

    let uniqueCategoryIds = [...new Set(ratingData.map(doc => doc.categoryId).filter(id => id !== null))];

    let data = await Promise.all(
      uniqueCategoryIds.map(async (categoryId) => {
        let categoryData = await sqldb.query(`select categoryName, description from ratingcategory where id = "${categoryId}"`);
        categoryData = categoryData[0][0];

        let category = {
          title: categoryData.categoryName,
          description: categoryData.description,
          features: []
        };

        let features = await Promise.all(
          ratingData.filter(doc => doc.categoryId === categoryId).map(async (doc) => {
            let ratingScaleData = await sqldb.query(`select scaleName, id as ratingscaleId, description as ratingScale from ratingscale where id = "${doc.ratingScaleId}"`);
            ratingScaleData = ratingScaleData[0][0];

            let ratingLevelData = await sqldb.query(`select * from ratinglevel where id = "${doc.ratingLevelId}"`);
            ratingLevelData = ratingLevelData[0][0];
            let ratingLevelCheckData = await sqldb.query(`SELECT * FROM maira.ratinglevelcheck;`)
            ratingLevelCheckData = ratingLevelCheckData[0]
            let check = ratingLevelCheckData.filter(item => item.ratingLevelId === ratingLevelData.id);
            ratingLevelData.check = check
             


            if (ratingLevelData !== undefined) {
              let combinedObj = Object.assign({}, ratingScaleData, ratingLevelData);
              return combinedObj;
            }
          })
        );

        category.features = features.filter(feature => feature !== undefined);
        return category;
      })
    );

    return data

  } catch (err) {
    throw new Error(err)
  }
};

module.exports.ratingLevelCheckSer = async (body) => {
  try {
    let conn = await db.connection;
    console.log(body);
    let ratinglevelData = await conn.query(`SELECT * FROM ratinglevelcheck WHERE ratingLevelId = "${body.ratingLevelId}"`);
    ratinglevelData = ratinglevelData[0];
    if (ratinglevelData && ratinglevelData.length) {
      let updateQuery = 'UPDATE ratinglevelcheck SET ';
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
        updateQuery += updateFields.join(', ') + ` WHERE ratingLevelId = "${body.ratingLevelId}"`;
        console.log(updateQuery); 
        await conn.query(updateQuery);
      }
    }
  } catch (err) {
    throw err;
  }
};

