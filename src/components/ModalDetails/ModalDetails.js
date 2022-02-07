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
  }, []);
  useEffect(() => {
    setRerenderDropdown(true);
    if (rerenderDropdown) {
      setRerenderDropdown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainDropdownChange]);
  const [rerenderDropdown, setRerenderDropdown] = useState(false);
  const largeWidthCardStyle = "width-card-lg";

  let hasMainDropdown = false;
  for (const input of data) {
    if (input[4] === "mainDropdown") {
      hasMainDropdown = true;
      break;
    }
  }

  const [mainDropdownUntouched, setMainDropdownUntouched] =
    useState(hasMainDropdown);

  // fixes rare instances where there is an enddate but no end time
  if (
    data.hasOwnProperty("endDate") &&
    data.hasOwnProperty("endTime") &&
    data[data.length - 2][4] === "date" &&
    data[data.length - 2][5] !== null &&
    data[data.length - 1][4] === "time" &&
    data[data.length - 1][5] === null
  ) {
    data[data.length - 1][2] = "0";
    data[data.length - 1][5] = "0";
  }

  const makeViewOnlyComp = (value) => {
    return (
      <div key={`${value[1]}`} className="grid-col">
        {(value[4] === "time" || value[4] === "date") && value[5] === null ? (
          ""
        ) : (
          <FormGroup className="margin-top-0">
            <h3
              className="text-bold margin-bottom-0 usa-label"
              htmlFor={`${value[1]}`}
            >
              {value[1]}
            </h3>
            <div id={`${value[1]}`}>
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
        )}
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
    } else {
      setDisableDropdownFlag(false);
    }
  };
  const makeEditComp = (value, cols) => {
    let comp = null;

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
            id={`${value[1]}`}
            epa-testid={value[0]}
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
            id={`${value[1]}`}
            epa-testid={value[0]}
            name={value[1]}
            secondOption="name"
            mainDropdownChange={mainDropdownChange}
            disableDropdownFlag={
              disableDropdownFlag || (create && mainDropdownUntouched)
            }
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
              initialSelection={
                  ? value[5]
                  : "select"
              }
              selectKey="code"
              id={`${value[1]}`}
              epa-testid={value[0]}
              name={value[1]}
              secondOption="name"
              mainDropdownChange={mainDropdownChange}
            />
          );
          break;

      case "date":
        let [year, month, day] = [];
        if (value[5] || value[5] !== null) {
          [year, month, day] = value[5].split("-");
        }

        const datePickerValue = `${year}-${month}-${day}`;
        comp = (
          <DatePicker
            className="margin-0 modalUserInput width-card-lg"
            id={`${value[1]}`}
            name={value[1]}
            epadataname={value[0]}
            epa-testid={value[0]}
            defaultValue={datePickerValue}
            onChange={() => void 0}
          />
        );
        break;
      case "time":
        comp = (
          <TextInput
            className="modalUserInput width-7"
            id={`${value[1]}`}
            epa-testid={value[0]}
            epadataname={value[0]}
            name={value[0]}
            type="text"
            defaultValue={value[2] ? value[2] : ""}
          />
        );
        break;

      case "input":
        comp = (
          <TextInput
            className={`modalUserInput ${
              cols === 3 ? "" : largeWidthCardStyle
            }`}
            id={`${value[1]}`}
            epa-testid={value[0]}
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
            id={`${value[1].split(" ").join("-")}`}
            epadataname={value[0]}
            epa-testid={value[0]}
            name={value[0]}
          >
            <legend className=" margin-bottom-0 usa-label">{value[1]}</legend>
            <Radio
              id={`${value[1].split(" ").join("")}-1`}
              name={`${value[1].split(" ").join("-")}`}
              label="Yes"
              value="Yes"
              className="padding-right-1  "
              defaultChecked={value[2] && value[2] === "1" ? true : false}
            />
            <Radio
              id={`${value[1].split(" ").join("")}-2`}
              name={`${value[1].split(" ").join("-")}`}
              label="No"
              value="No"
              className="padding-left-1"
              defaultChecked={
                value[2] === null || value[2] === false || value[2] === "0"
                  ? true
                  : false
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
        <FormGroup className="margin-top-0">
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
    if (row.length < cols) {
      if (viewOnly) {
        row.push(makeViewOnlyComp(value));
      } else {
        if (value[4] === "locked") {
          if (!create) {
            row.push(makeViewOnlyComp(value));
          } else {
            row.push(makeViewOnlyComp([false, false, false, false, false]));
          }
        } else {
          row.push(makeEditComp(value, cols));
        }
      }
    } else {
      items.push(row);
      row = [];
      if (viewOnly) {
        row.push(makeViewOnlyComp(value));
      } else {
        if (value[4] === "locked") {
          if (!create) {
            row.push(makeViewOnlyComp(value));
          } else {
            row.push(makeViewOnlyComp([false, false, false, false, false]));
          }
        } else {
          row.push(makeEditComp(value, cols));
        }
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

              <h3 className="text-bold float-left mobile:font-body-md mobile:text-bold">
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
