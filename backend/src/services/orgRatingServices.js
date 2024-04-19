

module.exports.getOrganizationRating = async () => {
  try {
    const DO_NOT_HAVE = "Do Not Have";
    const NEEDS_IMPROVEMENT = "Needs Improvement";
    const READY = "Ready";
    let ratingDataArr = [
      {
        "Rules and Operations": {
          "Adequate Coverage": { 
            DO_NOT_HAVE: "The organization has data pertaining to less than a third of the Measurement Framework and Variable Matrix",
            NEEDS_IMPROVEMENT: "The organization has data pertaining to more than half of the Measurement Framework and Variable Matrix identified variables ",
            READY: "The organization has data pertaining to all of the Measurement Framework and Variable Matrix identified variables  "
          },
          "Velocity": {
            DO_NOT_HAVE: "archival data exists without regular updates",
            NEEDS_IMPROVEMENT: "data is updated at regular intervals, such as weekly or monthly",
            READY: "data is updated in real-time"
          },
          "Harmonization": {
            DO_NOT_HAVE: "the owners of the data are anonymous or cannot be identified",
            NEEDS_IMPROVEMENT: "data is able to be connected at the organization/division/department level",
            READY: "data can be connected to a direct individual or task level"
          }
        },
        "Foundational Infrastructure": {
          "Personnel": {
            DO_NOT_HAVE: "the organization does not have employees asking business related data questions, and does not have personnel skilled in managing data or running analyses",
            NEEDS_IMPROVEMENT: "the organization has personnel skilled in managing data and running analyses (e.g. ensure availability of data, establish common analysis processes, develop predictive and forecasting models)",
            READY: "the organization has the personnel skilled in managing data and running analyses and the leadership support/involvement in the formulation of a business question to be answered by analytics"
          },
          "Centralized Database": {
            DO_NOT_HAVE: "data is not centralized",
            NEEDS_IMPROVEMENT: "safety and non-safety data are located in disparate but centralized locations",
            READY: "all data is located in a central location"
          }

        },
        "Measurement Culture": {
          "Employee Participation": {
            DO_NOT_HAVE: "Employees never participate in reporting",
            NEEDS_IMPROVEMENT: "Employees sometimes report to supervisors or safety coordinators but do no direct reporting",
            READY: "Employees fill out reports on safety issues and participate actively in the safety process"
          },
          "Management Use": {
            DO_NOT_HAVE: "Managers do not talk about safety or encourage participants to get involved",
            NEEDS_IMPROVEMENT: "Managers talk about safety reports or encourage participation, but don't do both regularly",
            READY: "Managers talk about safety reports and encourage participation"
          }
        }
      }
    ]

return ratingDataArr

  } catch (error) {
    throw new Error(error);
  }
};