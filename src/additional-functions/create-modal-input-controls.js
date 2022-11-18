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
  hasMainDropdown,
  prefilteredTotalName,
  extraControlInputs = false,
  mats = false
) => {
  const arr = [];

  const totalOptionsClone = _.cloneDeep(totalOptions);

  if (hasMainDropdown) {
    totalOptionsClone[mainDropdownName] = prefilterMdmMain;
  }

  //for independent dropdowns
  const setInitialPreFilter = (
    dropdownType,
    propertyName,
    singleMDMCodeList
  ) => {
    const allFilteredMDMCodesArray = totalOptionsClone[prefilteredTotalName];

    const selectedFilteredCodeArray = allFilteredMDMCodesArray[0];

    const filteredOutSingleMDMCodeList = singleMDMCodeList.filter((code) =>
      selectedFilteredCodeArray[propertyName].includes(code.code)
    );
    filteredOutSingleMDMCodeList.unshift({
      code: "",
      name: "-- Select a value --",
    });
    totalOptionsClone[propertyName] = filteredOutSingleMDMCodeList;
  };

  const setInitialPreFilterDependent = (propertyName) => {
    totalOptionsClone[propertyName] = totalOptionsClone[mainDropdownName];
  };

  const createInputControls = (inputs) => {
    // y = property name of the apis
    let y = "y";
    for (y in inputs) {
      if (inputs[y][3] === "locked") {
        if (createNew) {
          arr.push([
            y,
            inputs[y][0],
            createNew ? "" : selected[y],
            inputs[y][2] === "required" ? "required" : false,

            "locked",
          ]);
        } else if (inputs[y][1] === "date") {
          const parts = selected[y] ? selected[y].split("-") : "";

          const formmatedDate =
            parts !== "" ? `${parts[1]}/${parts[2]}/${parts[0]}` : "";
          arr.push([
            y,
            inputs[y][0],
            createNew ? "" : formmatedDate,
            inputs[y][2] === "required" ? "required" : false,
            "locked",
          ]);
        } else {
          arr.push([
            y,
            inputs[y][0],
            createNew ? "" : selected[y],
            inputs[y][2] === "required" ? "required" : false,
            "locked",
          ]);
        }
      } else {
        let labels = "";
        switch (inputs[y][1]) {
          case "mainDropdown":
            setInitialPreFilterDependent(y);
            if (!createNew) {
              if (totalOptionsClone) {
                labels = findValue(
                  totalOptionsClone[y],
                  selected ? selected[y] : null,
                  "name"
                );
              }
            }
            arr.push([
              y,
              inputs[y][0],
              labels,
              inputs[y][2] === "required" ? "required" : false,
              inputs[y][1] === "mainDropdown" ? "mainDropdown" : "dropdown",
              createNew ? "select" : selected ? selected[y] : "",
              totalOptionsClone ? totalOptionsClone[y] : [],
            ]);
            break;
          case "dropdown":
            if (!createNew) {
              if (totalOptionsClone) {
                labels = findValue(
                  totalOptionsClone[y],
                  selected ? selected[y] : null,
                  "name"
                );
              }
            }
            arr.push([
              y,
              inputs[y][0],
              labels,
              inputs[y][2] === "required" ? "required" : false,
              inputs[y][1] === "mainDropdown" ? "mainDropdown" : "dropdown",
              createNew ? "select" : selected ? selected[y] : "",
              totalOptionsClone ? totalOptionsClone[y] : [],
            ]);
            break;

          case "nonFilteredDropdown":
            if (!createNew) {
              if (totalOptionsClone) {
                labels = findValue(
                  totalOptionsClone[y],
                  selected ? selected[y] : null,
                  "name"
                );
              }
            }

            arr.push([
              y,
              inputs[y][0],
              labels,
              inputs[y][2] === "required" ? "required" : false,
              "nonFilteredDropdown",
              createNew ? "select" : selected ? selected[y] : "",
              totalOptionsClone ? totalOptionsClone[y] : [],
            ]);
            break;
          case "independentDropdown":
            setInitialPreFilter(inputs[y][1], y, totalOptionsClone[y]);
            if (!createNew) {
              if (totalOptionsClone) {
                labels = findValue(
                  totalOptionsClone[y],
                  selected ? selected[y] : null,
                  "name"
                );
              }
            }
            arr.push([
              y,
              inputs[y][0],
              labels,
              inputs[y][2] === "required" ? "required" : false,
              "independentDropdown",
              createNew ? "select" : selected ? selected[y] : "",
              totalOptionsClone ? totalOptionsClone[y] : [],
            ]);
            break;
          case "input":
            arr.push([
              y,
              inputs[y][0],
              createNew
                ? ""
                : selected
                  ? selected[y] === 0
                    ? "0"
                    : selected[y]
                  : "",
              inputs[y][2] === "required" ? "required" : false,
              "input",
            ]);
            break;
          case "date":
            let formattedDate = "";
            if (!createNew) {
              formattedDate = adjustDate(
                "mm/dd/yyyy",
                selected ? selected[y] : null
              );
            }
            arr.push([
              y,
              inputs[y][0],
              formattedDate,
              inputs[y][2] === "required" ? "required" : false,
              "date",
              createNew ? "" : selected ? selected[y] : "",
            ]);
            break;

          case "skip":
            arr.push(["", "", "", "", "skip"]);
            break;
          case "radio":
            const curInputOptions = inputs[y][4]
            if (selected) {
              arr.push([
                y,
                inputs[y][0],
                parseInt(selected[y]),
                inputs[y][2] === "required" ? "required" : false,
                "radio",
              ]);
            } else if (curInputOptions) {
              arr.push([
                y,
                inputs[y][0],
                parseInt(curInputOptions.defaultValue),
                inputs[y][2] === "required" ? "required" : false,
                "radio",
              ])
            } else {
              arr.push([
                y,
                inputs[y][0],
                false,
                inputs[y][2] === "required" ? "required" : false,
                "radio",
              ]);
            }
            break;
          case "customDropdown":
            if (!createNew) {
              labels = findValue(
                inputs[y][4], // custom dropdown objecct
                selected ? selected[y] : null,
                "name"
              );
            }
            arr.push([
              y,
              inputs[y][0],
              labels,
              inputs[y][2] === "required" ? "required" : false,
              "dropdown",
              createNew ? "select" : selected ? selected[y] : "",
              inputs[y][4],
            ]);
            break;
          default:
            break;
        }
      }
    }
  };

  const createTimeInputControls = () => {
    for (const y in time) {
      if (y.endsWith("Date") && time[y][1] !== "dateTime") {
        let formattedDate = "";
        if (!createNew) {
          formattedDate = adjustDate(
            "mm/dd/yyyy",
            selected ? selected[y] : null
          );
        }
        arr.push([
          y,
          time[y][0],
          formattedDate,
          time[y][2] === "required" ? "required" : false,
          "date",
          createNew ? "" : selected ? selected[y] : "",
        ]);
      }

      // handles the dateTime format returned sometimes
      if (y === "beginDate" && time[y][1] === "dateTime") {
        let formattedDate = "";
        let selectedDate = selected[y].split("T");
        if (!createNew) {
          formattedDate = adjustDate(
            "mm/dd/yyyy",
            selected ? selectedDate[0] : null
          );
        }

        arr.push([
          y,
          time[y][0],
          formattedDate,
          time[y][2] === "required" ? "required" : false,
          "date",
          createNew ? "" : selected ? selected[y][1] : "",
        ]);
      }
      // text input time
      // if (
      //   (y === "endHour" ||
      //     y === "beginHour" ||
      //     y === "wafEndHour" ||
      //     y === "wafBeginHour") &&
      //   time[y][2] === ""
      // ) {
      //   arr.push([
      //     y,
      //     time[y][0],
      //     createNew ? "" : selected ? selected[y] : "",
      //     time[y][2] === "required" ? "required" : false,
      //     "time",
      //     createNew ? "" : selected ? selected[y] : "",
      //   ]);
      //   continue;
      // }
      // dropdown time selection
      if (y.endsWith("Hour")) {
        arr.push([
          y,
          time[y][0],
          createNew ? "" : selected ? selected[y] : "",
          time[y][2] === "required" ? "required" : false,
          "hourDropdown",
          createNew ? "" : selected ? selected[y] : "",
        ]);
      }
      if (y.endsWith("Minute")) {
        arr.push([
          y,
          time[y][0],
          createNew ? "" : selected ? selected[y] : "",
          time[y][2] === "required" ? "required" : false,
          "minuteDropdown",
          createNew ? "" : selected ? selected[y] : "",
        ]);
      }

      if (y === "skip") {
        arr.push(["", "", "", "", "skip"]);
      }
    }
  };
  createInputControls(label);
  createTimeInputControls();
  if (extraControlInputs) {
    createInputControls(extraControlInputs);
  }

  return arr;
};
