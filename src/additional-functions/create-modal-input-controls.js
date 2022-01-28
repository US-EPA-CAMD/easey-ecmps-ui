import { findValue, adjustDate } from "./find-values-in-array";
import _ from "lodash";

// object property,Label Name, value

//arr = [property name, ui label, value, required or not labeling for edit, control input type ... ]
export const modalViewData = (
  selected, // selectedData,
  label, // controlInputs,
  time, // controlDatePickerInputs,
  createNew, // create,
  totalOptions, // mdmData,
  prefilteredMdmTotal, // mdmData[prefilteredDataName],\
  mainDropdownName,
  prefilterMdmMain, // result

  mats = false
) => {
  const arr = [];

  const totalOptionsClone = _.cloneDeep(totalOptions);
  totalOptionsClone[mainDropdownName] = prefilterMdmMain;

  // y = property name of the apis
  for (const y in label) {
    if (label[y][3] === "locked") {
      if (createNew) {
        arr.push([
          y,
          label[y][0],
          createNew ? "" : selected[y],
          label[y][2] === "required" ? "required" : false,

          "locked",
        ]);
      } else if (label[y][1] === "date") {
        const parts = selected[y] ? selected[y].split("-") : "";

        const formmatedDate =
          parts !== "" ? `${parts[1]}/${parts[2]}/${parts[0]}` : "";
        arr.push([
          y,
          label[y][0],
          createNew ? "" : formmatedDate,
          label[y][2] === "required" ? "required" : false,
          "locked",
        ]);
      } else {
        arr.push([
          y,
          label[y][0],
          createNew ? "" : selected[y],
          label[y][2] === "required" ? "required" : false,
          "locked",
        ]);
      }
    } else {
      let labels = "";
      switch (label[y][1]) {
        case "mainDropdown":
        case "dropdown":
          if (!createNew) {
            if (totalOptionsClone) {
              labels = findValue(totalOptionsClone[y], selected[y], "name");
            }
          }
          arr.push([
            y,
            label[y][0],
            labels,
            label[y][2] === "required" ? "required" : false,
            label[y][1] === "mainDropdown" ? "mainDropdown" : "dropdown",
            createNew ? "select" : selected[y],
            totalOptionsClone ? totalOptionsClone[y] : [],
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
        case "date":
          let formattedDate = "";
          if (!createNew) {
            formattedDate = adjustDate(
              "mm/dd/yyyy",
              selected[y] ? selected[y] : null
            );
          }
          arr.push([
            y,
            label[y][0],
            formattedDate,
            label[y][2] === "required" ? "required" : false,
            "date",
            createNew ? "" : selected[y],
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
        default:
          break;
      }
    }
  }
  for (const y in time) {
    if (
      (y === "endDate" ||
        y === "beginDate" ||
        y === "loadAnalysisDate" ||
        y === "wafEndDate" ||
        y === "wafBeginDate" ||
        y === "wafDeterminationDate" ||
        y === "installDate" ||
        y === "optimizationDate" ||
        y === "retireDate") &&
      time[y][1] !== "dateTime"
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

    // handles the dateTime format returned sometimes
    if (y === "beginDate" && time[y][1] === "dateTime") {
      let formattedDate = "";
      let selectedDate = selected[y].split("T");
      if (!createNew) {
        formattedDate = adjustDate(
          "mm/dd/yyyy",
          selected[y] ? selectedDate[0] : null
        );
      }

      arr.push([
        y,
        time[y][0],
        formattedDate,
        time[y][2] === "required" ? "required" : false,
        "date",
        createNew ? "" : selected[y][1],
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
    if (y === "skip") {
      arr.push([[], [], [], "", "skip"]);
    }
  }
  return arr;
};
