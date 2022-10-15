import React, { useEffect, useState } from "react";
import {
  Label,
  FormGroup,
  DatePicker,
  TextInput,
  Radio,
  Fieldset,
  Button,
} from "@trussworks/react-uswds";

import "./ModalDetails.scss";
import { assignAriaLabelsToDatePickerButtons } from "../../additional-functions/ensure-508";

import { ArrowBackSharp } from "@material-ui/icons";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";

// value in data => [0] api label, [1] our UI label, [2] value,[3], required or not for editing, [4] control form type
const ModalDetails = ({
  modalData,
  data,
  prefilteredMdmData,
  cols,
  title,
  viewOnly,
  backBtn,
  create,
  setMainDropdownChange,
  mainDropdownChange,
}) => {
  useEffect(() => {
    assignAriaLabelsToDatePickerButtons();
    let found = false;
    for (const input of data) {
      if (input[4] === "mainDropdown") {
        setMainDropdown(input[1]);
        found = true;
        if (input[2] === "") {
          setShowInitialHelpText(true);
          setMainDropdownUntouched(true);
        } else {
          setShowInitialHelpText(false);
        }
        break;
      }
    }
    if (!found) {
      setShowInitialHelpText(false);
      setHasMainDropdown(false);
    } else {
      setHasMainDropdown(true);
    }
  }, [data]);
  useEffect(() => {
    setRerenderDropdown(true);
    if (rerenderDropdown) {
      setRerenderDropdown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainDropdownChange]);
  const [rerenderDropdown, setRerenderDropdown] = useState(false);
  const [showInitialHelpText, setShowInitialHelpText] = useState(true);
  const [mainDropdown, setMainDropdown] = useState("");

  const [hasMainDropdown, setHasMainDropdown] = useState(false);

  const largeWidthCardStyle = "width-card-lg";

  const initialDropdownText = `You must make a selection for the '${mainDropdown}' field to enable dropdowns for the other fields.`;
  const selectedDropdownText = `Changing the selection for the '${mainDropdown}' field shall update the dropdown options available for the other fields.`;

  const [mainDropdownUntouched, setMainDropdownUntouched] = useState(false);

  // fixes rare instances where there is an enddate but no end time
  if (
    data.hasOwnProperty("endDate") &&
    data.hasOwnProperty("endTime") &&
    data[data.length - 2][4] === "date" &&
    data[data.length - 2][5] !== null &&
    (data[data.length - 1][4] === "hourDropdown" ||
      data[data.length - 1][4] === "minuteDropdown") &&
    data[data.length - 1][5] === null
  ) {
    data[data.length - 1][2] = "0";
    data[data.length - 1][5] = "0";
  }

  const makeViewOnlyComp = (value, locked) => {
    return (
      <div key={`${value[1]}`} className="grid-col">
        {
          // ((value[4] === "time" || value[4] === "date") && value[5] === null) ||
          value[0] === false ? (
            ""
          ) : (
            <FormGroup className="margin-top-0">
              <h3
                className={
                  locked
                    ? " margin-bottom-0 usa-label"
                    : "text-bold margin-bottom-0 usa-label "
                }
              >
                {value[1]}
              </h3>
              <div id={`${value[4] !== "skip" ? value[1] : ""}`}>
                {value[2]
                  ? value[4] === "radio"
                    ? value[2] === "0"
                      ? "No"
                      : "Yes"
                    : value[2]
                  : value[4] === "radio"
                  ? "No"
                  : ""}
              </div>
            </FormGroup>
          )
        }
      </div>
    );
  };

  const backBtnAriaLabel = () => {
    if (title.includes("Qualification")) {
      return "go back to Qualification details";
    }
    if (title.includes("Component") || title.includes("Fuel")) {
      return "go back to System details";
    }
    return "go back to previous component";
  };

  const [disableDropdownFlag, setDisableDropdownFlag] = useState(false);
  const disableDropdowns = (value) => {
    setMainDropdownChange(value);
    setMainDropdownUntouched(false);

    if (value === "") {
      setDisableDropdownFlag(true);
      setShowInitialHelpText(true);
    } else {
      setDisableDropdownFlag(false);
      setShowInitialHelpText(false);
    }
  };
  const makeEditComp = (value, cols) => {
    let comp;

    const hourArr = [{ code: "", name: "-- Select a value --" }];
    for (let i = 0; i <= 23; i++) {
      hourArr.push({ code: i, name: i });
    }

    const minuteArr = [{ code: "", name: "-- Select a value --" }];
    for (let i = 0; i <= 59; i++) {
      minuteArr.push({ code: i, name: i });
    }

    switch (value[4]) {
      case "mainDropdown":
        comp = (
          <SelectBox
            className={`modalUserInput ${
              cols === 3 ? "" : largeWidthCardStyle
            }`}
            epadataname={value[0]}
            options={
              value[6] !== null || value[6] !== undefined
                ? value[6]
                : [{ code: "", name: "" }]
            }
            initialSelection={value[5]}
            selectKey="code"
            id={value[1]}
            epa-testid={value[0].split(" ").join("-")}
            name={value[1]}
            secondOption="name"
            handler={disableDropdowns}
          />
        );
        break;

      case "dropdown":
        comp = (
          <SelectBox
            className={`modalUserInput ${
              cols === 3 ? "" : largeWidthCardStyle
            }`}
            epadataname={value[0]}
            options={
              value[6] !== null || value[6] !== undefined
                ? value[6]
                : [{ code: "", name: "" }]
            }
            initialSelection={
              !disableDropdownFlag || (create && !mainDropdownUntouched)
                ? value[5]
                : "select"
            }
            selectKey="code"
            id={value[1]}
            epa-testid={value[0].split(" ").join("-")}
            name={value[1]}
            secondOption="name"
            mainDropdownChange={mainDropdownChange}
            disableDropdownFlag={
              disableDropdownFlag || (create && mainDropdownUntouched)
            }
          />
        );
        break;

      case "nonFilteredDropdown":
        comp = (
          <SelectBox
            className={`modalUserInput ${
              cols === 3 ? "" : largeWidthCardStyle
            }`}
            epadataname={value[0]}
            options={
              value[6] !== null || value[6] !== undefined
                ? value[6]
                : [{ code: "", name: "" }]
            }
            initialSelection={
              !disableDropdownFlag || (create && !mainDropdownUntouched)
                ? value[5]
                : "select"
            }
            selectKey="code"
            id={value[1]}
            epa-testid={value[0].split(" ").join("-")}
            name={value[1]}
            secondOption="name"
          />
        );
        break;

      case "independentDropdown":
        comp = (
          <SelectBox
            className={`modalUserInput ${
              cols === 3 ? "" : largeWidthCardStyle
            }`}
            epadataname={value[0]}
            options={
              value[6] !== null || value[6] !== undefined
                ? value[6]
                : [{ code: "", name: "" }]
            }
            initialSelection={!create ? value[5] : "select"}
            selectKey="code"
            id={value[1]}
            epa-testid={value[0].split(" ").join("-")}
            name={value[1]}
            secondOption="name"
            mainDropdownChange={mainDropdownChange}
            disableDropdownFlag={false}
          />
        );
        break;

      case "date":
        let [year, month, day] = [];
        if (value[5] || value[5] !== null) {
          [year, month, day] = value[5].split("-");
        }
        const d = new Date();
        const datePickerValue = `${year}-${month}-${day}`;
        comp = (
          <DatePicker
            className="margin-0 modalUserInput width-card-lg"
            id={value[1]}
            name={value[1]}
            epadataname={value[0]}
            epa-testid={value[0].split(" ").join("-")}
            defaultValue={datePickerValue}
            maxDate= {`${d.getFullYear()}-${d.getMonth()+1}-${d.getDay()}`} 
          />
        );
        break;

      // case "time":
      //   comp = (
      //     <TextInput
      //       className="modalUserInput width-7"
      //       id={value[1]}
      //       epa-testid={value[0].split(" ").join("-")}
      //       epadataname={value[0]}
      //       name={value[0]}
      //       type="text"
      //       defaultValue={value[2] ?? ""}
      //     />
      //   );
      //   break;

      case "minuteDropdown":
        comp = (
          <SelectBox
            className={`modalUserInput ${
              cols === 3 ? "" : largeWidthCardStyle
            }`}
            epadataname={value[0]}
            options={minuteArr}
            initialSelection={!create ? value[5] : "select"}
            selectKey="code"
            id={value[1]}
            epa-testid={value[0].split(" ").join("-")}
            name={value[1]}
            secondOption="name"
            disableDropdownFlag={false}
          />
        );
        break;

      case "hourDropdown":
        comp = (
          <SelectBox
            className={`modalUserInput ${
              cols === 3 ? "" : largeWidthCardStyle
            }`}
            epadataname={value[0]}
            options={hourArr}
            initialSelection={!create ? value[5] : "select"}
            selectKey="code"
            id={value[1]}
            epa-testid={value[0].split(" ").join("-")}
            name={value[1]}
            secondOption="name"
            disableDropdownFlag={false}
          />
        );
        break;

      // PROPOSE COMBINING HOUR AND MINUTE TOGETHER
      // case "hourMinuteDropdown":
      //   comp = (
      //     <>
      //       <SelectBox
      //         className="modalUserInput width-7"
      //         epadataname={value[0]}
      //         options={hourArr}
      //         initialSelection={!create ? value[5] : "select"}
      //         selectKey="code"
      //         id={value[1]}
      //         epa-testid={value[0].split(" ").join("-")}
      //         name={value[1]}
      //         secondOption="name"
      //         disableDropdownFlag={false}
      //       />
      //       :
      //       <SelectBox
      //         className="modalUserInput width-7"
      //         epadataname={value[0]}
      //         options={minuteArr}
      //         initialSelection={!create ? value[5] : "select"}
      //         selectKey="code"
      //         id={value[1]}
      //         epa-testid={value[0].split(" ").join("-")}
      //         name={value[1]}
      //         secondOption="name"
      //         disableDropdownFlag={false}
      //       />
      //     </>
      //   );
      //   break;

      case "input":
        comp = (
          <TextInput
            className={`modalUserInput ${
              cols === 3 ? "" : largeWidthCardStyle
            }`}
            id={value[1]}
            epa-testid={value[0].split(" ").join("-")}
            epadataname={value[0]}
            name={value[0]}
            type="text"
            defaultValue={value[2] ? value[2] : ""}
          />
        );
        break;

      case "radio":
        comp = (
          <Fieldset
            className=" display-inline-flex modalUserInput"
            id={value[1]}
            epadataname={value[0]}
            epa-testid={value[0].split(" ").join("-")}
            name={value[0]}
          >
            <legend className=" margin-bottom-0 usa-label">{value[1]}</legend>
            <Radio
              id={`${value[1].split(" ").join("")}-1`}
              name={`${value[1].split(" ").join("-")}`}
              label="Yes"
              value="Yes"
              className="padding-right-1  "
              defaultChecked={
                value[2] !== undefined && value[2] !== null && value[2] === 1
              }
            />
            <Radio
              id={`${value[1].split(" ").join("")}-2`}
              name={`${value[1].split(" ").join("-")}`}
              label="No"
              value="No"
              className="padding-left-1"
              defaultChecked={
                value[2] === undefined ||
                value[2] === false ||
                value[2] === null ||
                isNaN(value[2]) ||
                value[2] === 0
              }
            />
          </Fieldset>
        );
        break;

      default:
        comp = "";
    }

    return (
      <div className="grid-col">
        <FormGroup className="margin-top-0 colMaxWidth">
          {value[4] === "radio" ? (
            ""
          ) : (
            // For all inputs except for radio buttons:
            <Label className=" margin-bottom-0" htmlFor={`${value[1]}`}>
              {value[3] === "required" ? `${value[1]} (Required)` : value[1]}
              {value[4] === "date" ? (
                <span className="usa-hint d-block" id="appointment-date-hint">
                  <span className="sr-only"> - </span>mm/dd/yyyy
                </span>
              ) : (
                ""
              )}
              {value[4] === "time" ? (
                <span className="usa-hint d-block" id="appointment-date-hint">
                  <span className="sr-only"> - </span>hh
                </span>
              ) : (
                ""
              )}
            </Label>
          )}
          {comp}
        </FormGroup>
      </div>
    );
  };

  const items = [];
  let row = [];

  for (const value of data) {
    if (row.length >= cols) {
      items.push(row);
      row = [];
    }

    if (viewOnly) {
      row.push(makeViewOnlyComp(value));
    } else {
      if (value[4] === "locked") {
        if (!create) {
          row.push(makeViewOnlyComp(value, true));
        } else {
          row.push(makeViewOnlyComp([false, false, false, false, false]));
        }
      } else {
        row.push(makeEditComp(value, cols));
      }
    }
  }
  items.push(row);

  return (
    <div className=" padding-top-0 systemsCompTable">
      <div className="grid-container margin-bottom-2">
        <div className="display-inline-flex padding-top-1 padding-bottom-3">
          {backBtn ? (
            <div className="display-block">
              <Button
                type="button"
                onClick={() => backBtn(false)}
                className="float-left margin-right-1"
                unstyled="true"
                epa-testid="backBtn"
                id="backBtn"
                aria-label={backBtnAriaLabel()}
              >
                {" "}
                <ArrowBackSharp className=" font-body-sm backBTNColor position-relative top-neg-2px" />
              </Button>

              <h3 className="text-bold float-left mobile:font-body-md mobile:text-bold position-relative top-neg-205">
                {title}
              </h3>
            </div>
          ) : (
            ""
          )}

          <input
            type="hidden"
            epadataname="id"
            id="id"
            name="id"
            className="modalUserInput"
            value={modalData ? modalData["id"] : ""}
          />
        </div>
        <div>
          {hasMainDropdown && !viewOnly && showInitialHelpText ? (
            <div className="margin-bottom-2">
              <p className="margin-top-0">
                <b>{initialDropdownText}</b>
              </p>
            </div>
          ) : hasMainDropdown && !viewOnly && !showInitialHelpText ? (
            <div className="margin-bottom-2">
              <p className="margin-top-0">
                <b>{selectedDropdownText}</b>
              </p>
            </div>
          ) : (
            ""
          )}
          {items.map((item, index) => {
            return (
              <div
                key={`${index}`}
                className={
                  item[0]["key"] !== "false"
                    ? "grid-row padding-top-2 margin-right-2"
                    : ""
                }
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalDetails;
