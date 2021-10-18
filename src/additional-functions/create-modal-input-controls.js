import { findValue, adjustDate } from "./find-values-in-array";

// object property,Label Name, value

//arr = [property name, ui label, value, required or not labeling for edit, control input type ... ]
export const modalViewData = (
  selected,
  label,
  time,
  createNew,
  totalOptions,
  mats = false
) => {
  const arr = [];
  const codeList = {
    // systemTypeCode: types,
    // fuelCode: fuels,
    // systemDesignationCode: designations,
    // bypassApproachCode: bypassApproachCodes,
    // substituteDataCode: substituteDataApproachCodes,
    // parameterCode: parameterCodes,
    // // methodCode: methodCodes,
    // componentTypeCode: componentTypes,
    // sampleAcquisitionMethodCode: acqMethodCode,
    // basisCode: basisCode,
    // maximumFuelFlowRateSourceCode: componentTypes,
    // maximumFuelFlowRate: acqMethodCode,
    // systemFuelFlowUOMCode: basisCode,
  };

  for (const y in label) {
    let labels = "";
    switch (label[y][1]) {
      case "dropdown":
        if (!createNew) {
          if (totalOptions) {
            labels = findValue(totalOptions[y], selected[y], "name");
          } else {
            labels = findValue(codeList[y], selected[y], "name");
          }
        }
        arr.push([
          y,
          label[y][0],
          labels,
          label[y][2] === "required" ? "required" : false,
          "dropdown",
          createNew ? "select" : selected[y],
          totalOptions ? totalOptions[y] : codeList[y],
        ]);
        break;
      case "input":
        arr.push([
          y,
          label[y][0],
          createNew ? "" : selected[y],
          label[y][2] === "required" ? "required" : false,
          "input",
        ]);
        break;
      case "skip":
        arr.push([[], [], [], "", "skip"]);
        break;
      case "radio":
        if (selected) {
          arr.push([
            y,
            label[y][0],
            selected[y],
            label[y][2] === "required" ? "required" : false,
            "radio",
          ]);
        } else {
          arr.push([
            y,
            label[y][0],
            false,
            label[y][2] === "required" ? "required" : false,
            "radio",
          ]);
        }
        break;
      // case "hidden":
      //   arr.push([
      //     y,
      //     label[y][0],
      //     selected[y],
      //     false,
      //     "input",
      //   ]);
      //   break;
      default:
        break;
    }
  }

  for (const y in time) {
    if (
      y === "endDate" ||
      y === "beginDate" ||
      y === "loadAnalysisDate" ||
      y === "wafEndDate" ||
      y === "wafBeginDate" ||
      y === "wafDeterminationDate"
    ) {
      let formattedDate = "";
      if (!createNew) {
        formattedDate = adjustDate(
          "mm/dd/yyyy",
          selected[y] ? selected[y] : null
        );
      }

      arr.push([
        y,
        time[y][0],
        formattedDate,
        time[y][2] === "required" ? "required" : false,
        "date",
        createNew ? "" : selected[y],
      ]);
    }
    if (
      y === "endHour" ||
      y === "beginHour" ||
      y === "wafEndHour" ||
      y === "wafBeginHour"
    ) {
      arr.push([
        y,
        time[y][0],
        createNew ? "" : selected[y],
        time[y][2] === "required" ? "required" : false,
        "time",
        createNew ? "" : selected[y],
      ]);
    }
    if( y === "skip"){
      arr.push([[], [], [], "", "skip"]);
    }
  }
  return arr;
};
