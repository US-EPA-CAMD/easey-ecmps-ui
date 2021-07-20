import {
  types,
  fuels,
  designations,
} from "../components/Details/SystemDescriptions";

import {
  bypassApproachCodes,
  substituteDataApproachCodes,
  parameterCodes,
  methodCodes,
} from "../components/datatablesContainer/DataTableMethod/MethodModalData";
import {
  componentTypes,
  acqMethodCode,
  basisCode,
} from "../components/ModalDetails/SystemComponentsData";

import { findValue, adjustDate } from "./find-values-in-array";

// object property,Label Name, value

//arr = [property name, ui label, value, required or not labeling for edit, control input type ... ]
export const modalViewData = (selected, label, time, createNew) => {
  const arr = [];
  const codeList = {
    systemTypeCode: types,
    fuelCode: fuels,
    systemDesignationCode: designations,
    bypassApproachCode: bypassApproachCodes,
    subDataCode: substituteDataApproachCodes,
    parameterCode: parameterCodes,
    methodCode: methodCodes,
    componentTypeCode: componentTypes,
    acquisitionMethodCode: acqMethodCode,
    basisCode: basisCode,
    maxRateSourceCode: componentTypes,
    maxRate: acqMethodCode,
    sysFuelUomCode: basisCode,
  };

  for (let y in label) {
    let labels = "";
    switch (label[y][1]) {
      case "dropdown":
        if (!createNew) {
          labels = findValue(codeList[y], selected[y], "name");
        }
        arr.push([
          y,
          label[y][0],
          labels,
          label[y][2]==="required"? "required":false,
          "dropdown",
          createNew ? "select" : selected[y],
          codeList[y],
        ]);
        break;
      case "input":
        arr.push([
          y,
          label[y][0],
          createNew ? "" : selected[y],
          label[y][2]==="required"? "required":false,
          "input",
        ]);
        break;
      case "skip":
        arr.push([[], [], [], "", "skip"]);
        break;
      case "radio":
        if (selected) {
          arr.push([y, label[y][0], selected[y],label[y][2]==="required"? "required":false, "radio"]);
        }
        else{
          arr.push([y, label[y][0], false,label[y][2]==="required"? "required":false, "radio"]);
        }
        console.log('selected',selected,y)
        break;
      default:
        break;
    }
  }

  for (let y in time) {
    if (y === "endDate" || y === "beginDate") {
      let formattedDate = "";
      if (!createNew) {
        formattedDate = adjustDate("mm/dd/yyyy", selected[y]);
      }

      arr.push([
        y,
        time[y][0],
        formattedDate,
        time[y][2]==="required"? "required":false,
        "date",
        createNew ? "" : selected[y],
      ]);
    }
    if (y === "endHour" || y === "beginHour") {
      arr.push([
        y,
        time[y][0],
        createNew ? "" : selected[y],
        time[y][2]==="required"? "required":false,
        "time",
        createNew ? "" : selected[y],
      ]);
    }
  }
  return arr;
};
