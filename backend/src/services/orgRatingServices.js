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
            let ratingLevelCheckData = await sqldb.query(`select * from datalevelcheck2 where OrgLevel = "${ratingScaleData.scaleName}"`)
            ratingLevelCheckData = ratingLevelCheckData[0]
            // console.log(ratingLevelCheckData, '///>>>>>')
            // let check = ratingLevelCheckData.filter(item => item.ratingLevelId === ratingLevelData.id);
            ratingLevelData.check = ratingLevelCheckData



            if (ratingLevelData !== undefined) {
              let combinedObj = Object.assign({}, ratingScaleData, ratingLevelData);
              return combinedObj;
            }
          })
        );

        category.features = features.filter(feature => feature !== undefined);
        // console.log(category, 'OOOOOOO')
        return category;
      })
    );

    return data

  } catch (err) {
    throw new Error(err)
  }
};

module.exports.ratingLevelCheckSer = async (body) => {
  // console.log(body, "ppppppkkkkkk")
  try {
    let conn = await db.connection;
    const data = await conn.query(`select ratingscaleId from ratinglevel where id = "${body.ratingLevelId}"`)
    // console.log(data[0][0].ratingscaleId, '////////')
    const data1 = await conn.query(`select scaleName from ratingscale where id = "${data[0][0].ratingscaleId}"`)
    if(body.doNotHave === true)
        await conn.query(`update datalevelcheck2 set doNotHave =true, needsImprovement = false, ready = false where header = "${data1[0][0].scaleName}"`)
    else if(body.needsImprovement === true)
        await conn.query(`update datalevelcheck2 set doNotHave =false, needsImprovement = true, ready = false where header = "${data1[0][0].scaleName}"`)
    else if(body.ready === true)
        await conn.query(`update datalevelcheck2 set doNotHave =false, needsImprovement = false, ready = true where header = "${data1[0][0].scaleName}"`)
    else 
        await conn.query(`update datalevelcheck2 set doNotHave =false, needsImprovement = false, ready = false where header = "${data1[0][0].scaleName}"`)
  } catch (err) {
    throw err;
  }
};

module.exports.ratingGraphSer = async (body) => {
  try {

    let conn = await db.connection

    let ratinglevelData = await conn.query(`select * from datalevelcheck2 where dataVariableListId = "0f89e588-3c14-4fe7-88fc-b7aaf53e45c5"`)
    // ratinglevelData = ratinglevelData[0]
    // let getLevelData = await Promise.all(ratinglevelData.map(async (data) => {
    //   let scaleData = await conn.query(`select scaleName from ratingscale where id = "${data.ratingscaleId}"`)
    //   scaleData = scaleData[0]
    //   scaleData.map((e) => {
    //     data.scalename = e.scaleName

    //   })
    //   return data
    // }))

    return ratinglevelData[0]



  } catch (err) {
    throw err;
  }
};


