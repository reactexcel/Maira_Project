
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
        if(report[entry]["Your Score"] > 0){
        overall.Descriptive = overall.Descriptive + report[entry].Descriptive !== null ? ((report[entry].Weight * report[entry].Descriptive) / report[entry]["Your Score"]).toFixed(2) : 0
        overall.Diagnostic = overall.Diagnostic + report[entry].Diagnostic !== null ? ((report[entry].Weight * report[entry].Diagnostic) / report[entry]["Your Score"]).toFixed(2) : 0
        overall.Predictive = overall.Predictive + report[entry].Predictive !== null ? ((report[entry].Weight * report[entry].Predictive) / report[entry]["Your Score"]).toFixed(2) : 0
        overall.Prescriptive = overall.Prescriptive + report[entry].Prescriptive !== null ? ((report[entry].Weight * report[entry].Prescriptive) / report[entry]["Your Score"]).toFixed(2) : 0
        }
      }

    }

    return {...report, overall};

  } catch (err) {
    throw new Error(err)
  }
};