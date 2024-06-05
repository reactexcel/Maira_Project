
const db = require('../model/connection');
const { dataAnalytics } = require('./dataAnalyticsService');

module.exports.reportService = async () => {
  try {
    const { maxAppearance } = await dataAnalytics();
    // let countAppearance = {};
    // data.forEach(row => {
    //   row.columns.forEach(colounm => {
    //     colounm.subColounms.forEach(obj => {
    //       if (!countAppearance[obj.type]) {
    //         countAppearance[obj.type] = {};
    //       }
    //       let value = obj.value === 'FALSE' ? 0 : obj.value;
    //       if (!countAppearance[obj.type][value]) {
    //         countAppearance[obj.type][value] = 0;
    //       }
    //       countAppearance[obj.type][value]++;
    //     })
    //   })
    // })


    // let maxAppearance = {};

    // for (let type in countAppearance) {
    //   let maxCount = 0;
    //   let maxValue = null;
    //   for (let value in countAppearance[type]) {
    //     if (countAppearance[type][value] > maxCount) {
    //       maxCount = countAppearance[type][value];
    //       maxValue = parseInt(value);
    //     }
    //   }
    //   maxAppearance[type] = maxValue;
    // }

    let TotalReadinessScore = 0;

    let c18=0, c19=0, d18=0, d19=0, e18=0, e19=0, f18 =0, f19=0, hCol=0, iCol=0, jCol=0, kCol=0

    const report = {
      "Validity/Accuracy": { Weight: 0.15, Descriptive: 1, Diagnostic: 1, Predictive: 2, Prescriptive: 2, "Your Score": maxAppearance["validity"]},
      "Consistency": { Weight: 0.15, Descriptive: 1, Diagnostic: 1, Predictive: 2, Prescriptive: 2, "Your Score": maxAppearance["consistency"]},
      "Variance": { Weight: 0.15, Descriptive: 1, Diagnostic: 1, Predictive: 2, Prescriptive: 2, "Your Score": maxAppearance["variability"]},
      "Adequate Coverage": { Weight: 0.10, Descriptive: 1, Diagnostic: 1, Predictive: 1, Prescriptive: 2, "Your Score": maxAppearance["Adequate Coverage"] },
      "Velocity": { Weight: 0.10, Descriptive: null, Diagnostic: 1, Predictive: 1, Prescriptive: 2, "Your Score": maxAppearance["Harmonization"] },
      "Harmonization": { Weight: 0.10, Descriptive: null, Diagnostic: 1, Predictive: 2, Prescriptive: 2, "Your Score": maxAppearance["validity"] },
      "Personnel": { Weight: 0.10, Descriptive: null, Diagnostic: 1, Predictive: 2, Prescriptive: 2, "Your Score": maxAppearance["Personnel"] },
      "Centralized Database": { Weight: 0.05, Descriptive: null, Diagnostic: null, Predictive: 1, Prescriptive: 2, "Your Score": maxAppearance["Centralized Database"] },
      "Employee Participation": { Weight: 0.05, Descriptive: null, Diagnostic: null, Predictive: null, Prescriptive: null, "Your Score": maxAppearance["Employee Participation"] },
      "Management Use": { Weight: 0.05, Descriptive: null, Diagnostic: null, Predictive: null, Prescriptive: null, "Your Score": maxAppearance["Management Use"] },
    }

    let overall = { Descriptive: 0, Diagnostic: 0, Predictive: 0, Prescriptive: 0 }

    for (let entry in report) {
      if (report.hasOwnProperty(entry)) {
        if(report[entry].Descriptive !== null){
          const temp = report[entry]["Your Score"] >= report[entry].Descriptive ? report[entry]["Your Score"] : 0;
           hCol = hCol + temp;
        }
        if(report[entry].Diagnostic !== null){
           const temp = report[entry]["Your Score"] >= report[entry].Diagnostic ? report[entry]["Your Score"] : 0;
           iCol = iCol + temp;
        }
        if(report[entry].Predictive !== null){
          const temp = report[entry]["Your Score"] >= report[entry].Predictive ? report[entry]["Your Score"] : 0;
           jCol = jCol + temp
        }
        if(report[entry].Prescriptive !== null){
          const temp = report[entry]["Your Score"] >= report[entry].Prescriptive ? report[entry]["Your Score"] : 0;
           kCol = kCol + temp
        }
        }
        TotalReadinessScore = TotalReadinessScore + (report[entry]["Your Score"]*report[entry].Weight)
      }

      c18 = 0.55*4, d18= 0.85*7 , e18 = 13*0.9 , f18 = 16*0.9, c19 = 0.55 * hCol, d19 = 0.85*iCol, e19 = 0.9*jCol, f19 = 0.9*kCol

      TotalReadinessScore = `${((TotalReadinessScore / 2)*100).toFixed(0)}%`;
      report["TotalReadinessScore"] = { Weight: null, Descriptive: null, Diagnostic: null, Predictive: null, Prescriptive: null, "Your Score":TotalReadinessScore};

      overall.Descriptive = (c19 / c18) > 1 ? "100%": `${((c19/c18)*100).toFixed(0)}%`;
      overall.Diagnostic = (d19 / d18) > 1 ? "100%": `${((d19/d18)*100).toFixed(0)}%`;
      overall.Predictive = (e19 / e18) > 1 ? "100%": `${((e19/e18)*100).toFixed(0)}%`;
      overall.Prescriptive = (f19 / f18) > 1 ? "100%":`${((f19/f18)*100).toFixed(0)}%`;
    return {...report, overall};

  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
};