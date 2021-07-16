import React from "react";
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

import { ArrowBackSharp } from "@material-ui/icons";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";
// value in data => [0] api label, [1] our UI label, [2] value, [3] control form type
const ModalDetails = ({ modalData, data, cols, title, viewOnly, backBtn }) => {

  const makeViewOnlyComp = (value) => {
    return (
      <div key={`${value[1]}`} className="grid-col">
         {(value[4]==='time' || value[4] ==='date') && (value[5]===null )? '':
        <FormGroup className="margin-top-0">
          <Label className="text-bold margin-bottom-0" htmlFor={`${value[1]}`}>
            {value[1]}
          </Label>
          <div tabIndex="0" id={`${value[1]}`}>
            {value[2] ? value[2] : (value[3] ==="radio")? "No":''}
          </div>
        </FormGroup>}
      </div>
    );
  };

  const makeEditComp = (value) => {
    let comp = null;
    switch (value[4]) {
      case "dropdown":
        comp = (
          <SelectBox
            className="modalUserInput width-mobile"
            epadataname={value[0]}
            options={value[6] !== null ? value[6] : [{}]}
            initialSelection={value[5]}
            selectKey="code"
            id={value[0]}
            epa-testid={value[0]}
            name={value[1]}
            secondOption="name"
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
          <div>
            {viewOnly ? (
              ""
            ) : (
              <div className="usa-hint" id="appointment-date-hint">
                mm/dd/yyyy
              </div>
            )}
            <DatePicker
              className="margin-0 modalUserInput width-mobile"
              id={value[0]}
              name={value[1]}
              epadataname={value[0]}
              epa-testid={value[0]}
              defaultValue={datePickerValue}
              onChange={() => void 0}
            />
          </div>
        );
        break;
      case "time":
        comp = (
          <div>
            {viewOnly ? (
              ""
            ) : (
              <div className="usa-hint" id="appointment-date-hint">
                hh
              </div>
            )}
          <TextInput
            className="modalUserInput width-7"
            id="modalUserInput"
            epa-testid={value[0]}
            epadataname={value[0]}
            name="modalUserInput"
            type="text"
            defaultValue={value[2] ? value[2] : ""}
          />
          </div>
        );
        break;

      case "input":
        comp = (
          <TextInput
            className="modalUserInput width-mobile"
            id="modalUserInput"
            name="modalUserInput"
            type="text"
            defaultValue={value[2] ? value[2] : ""}
          />
        );
        break;

      case "radio":
        comp = (
          <Fieldset
            className=" display-inline-flex"
            id={`${value[1].split(" ").join("")}`}
          >
            <Radio
              id={`${value[1].split(" ").join("")}-1`}
              name={`${value[1].split(" ").join("-")}`}
              label="Yes"
              value="Yes"
              className="padding-right-1"
              defaultChecked={value[2] ? true : null}
            />
            <Radio
              id={`${value[1].split(" ").join("")}-2`}
              name={`${value[1].split(" ").join("-")}`}
              label="No"
              value="No"
              className="padding-left-1"
              defaultChecked={!value[2] ? true : null}
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
          <Label className=" margin-bottom-0" htmlFor={`${value[1]}`}>
            {value[3] === "required" ? `${value[1]} (Required)` : value[1]}
          </Label>
          <div tabIndex="0" id={`${value[1]}`}>
            {comp}
          </div>
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
        row.push(makeEditComp(value));
      }
    } else {
      items.push(row);
      row = [];
      if (viewOnly) {
        row.push(makeViewOnlyComp(value));
      } else {
        row.push(makeEditComp(value));
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
              >
                {" "}
                <ArrowBackSharp
                  aria-label="go back to systems details"
                  className=" font-body-sm"
                />
              </Button>

              <h4 className="text-bold float-left">
                {title}
              </h4>
            </div>
          ) : (
            ""
          )}

          {/* <input
            type="hidden"
            epadataname="id"
            id="id"
            name="id"
            className="modalUserInput"
            value={modalData["id"]}
          /> */}
        </div>
        <div>
          {items.map((item, index) => {
            return (
              <div
                key={`${index}`}
                className="grid-row padding-top-2 margin-right-2"
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
