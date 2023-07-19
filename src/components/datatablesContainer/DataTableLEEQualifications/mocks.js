export const getMockLEEQualifications = () => {
  const data = [
    {
      qualificationTestDate: "2018-07-15",
      parameterCode: "HG",
      qualificationTestType: "INITIAL",
      potentialAnnualMassEmissions: 10.2,
      applicableEmissionStandard: 29,
      unitsOfStandard: "LBGWH",
      percentageOfEmissionStandard: 72.8,
      id: "mock1",
      qualificationId: "MIKE-DELL-E4CE3931A24E4C1395B3C81457B300CC",
      userId: "abcde",
      addDate: "2018-10-25",
      updateDate: "2018-10-25"
    },
    {
      qualificationTestDate: "2018-07-15",
      parameterCode: "HG",
      qualificationTestType: "INITIAL",
      potentialAnnualMassEmissions: 10.2,
      applicableEmissionStandard: 29,
      unitsOfStandard: "LBGWH",
      percentageOfEmissionStandard: 72.8,
      id: "mock2",
      qualificationId: "MIKE-DELL-E4CE3931A24E4C1395B3C81457B300CC",
      userId: "abcde",
      addDate: "2018-10-25",
      updateDate: "2018-10-25"
    }
  ]

  return [...data]
}

export const getMockPrefilteredLEEQualifications = () => {
  const data = [
    {
      parameterCode: "HG",
      unitsOfStandard: "LBTBTU",
      qualificationTestType: "INITIAL"
    },
    {
      parameterCode: "HG",
      unitsOfStandard: "LBTBTU",
      qualificationTestType: "RETEST"
    },
    {
      parameterCode: "HCL",
      unitsOfStandard: "LBTBTU",
      qualificationTestType: "INITIAL"
    },
    {
      parameterCode: "HCL",
      unitsOfStandard: "LBTBTU",
      qualificationTestType: "RETEST"
    },
    {
      parameterCode: "HG",
      unitsOfStandard: "LBMMBTU",
      qualificationTestType: "INITIAL"
    },
    {
      parameterCode: "HG",
      unitsOfStandard: "LBMMBTU",
      qualificationTestType: "RETEST"
    },
    {
      parameterCode: "HCL",
      unitsOfStandard: "LBMMBTU",
      qualificationTestType: "INITIAL"
    },
    {
      parameterCode: "HCL",
      unitsOfStandard: "LBMMBTU",
      qualificationTestType: "RETEST"
    },
    {
      parameterCode: "HG",
      unitsOfStandard: "LBMWH",
      qualificationTestType: "INITIAL"
    },
    {
      parameterCode: "HG",
      unitsOfStandard: "LBMWH",
      qualificationTestType: "RETEST"
    },
    {
      parameterCode: "HCL",
      unitsOfStandard: "LBMWH",
      qualificationTestType: "INITIAL"
    },
    {
      parameterCode: "HCL",
      unitsOfStandard: "LBMWH",
      qualificationTestType: "RETEST"
    },
    {
      parameterCode: "HG",
      unitsOfStandard: "LBGWH",
      qualificationTestType: "INITIAL"
    },
    {
      parameterCode: "HG",
      unitsOfStandard: "LBGWH",
      qualificationTestType: "RETEST"
    },
    {
      parameterCode: "HCL",
      unitsOfStandard: "LBGWH",
      qualificationTestType: "INITIAL"
    },
    {
      parameterCode: "HCL",
      unitsOfStandard: "LBGWH",
      qualificationTestType: "RETEST"
    }
  ]
  return data
}
