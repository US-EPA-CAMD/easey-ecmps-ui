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
} from "../components/SystemComponentsModal/SystemComponentsData";

import { findValue, adjustDate } from "./find-values-in-array";

// object property,Label Name, value

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
          "required",
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
          "required",
          "input",
        ]);
        break;

      case "skip":
        arr.push([[], [], [], "", "skip"]);

        break;
      case "radio":
        arr.push([y, label[y][0], selected[y], "radio"]);
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
        y === "endDate" ? " " : "required",
        "date",
        createNew ? "" : selected[y],
      ]);
    }
    if (y === "endHour" || y === "beginHour") {
      arr.push([
        y,
        time[y][0],
        createNew ? "" : selected[y],
        y === "endHour" ? " " : "required",
        "time",
        createNew ? "" : selected[y],
      ]);
    }
  }
  return arr;
};
