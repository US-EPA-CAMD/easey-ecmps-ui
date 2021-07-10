import React from "react";
import { Label, FormGroup } from "@trussworks/react-uswds";

const ModalDetails = ({ modalData, data, cols, title }) => {
  const items = [];
  let row = [];
  for (const value of data) {
    if (row.length < cols) {
      row.push(
        <div className="grid-col">
          <FormGroup className="margin-top-0">
            <Label className="text-bold" htmlFor={`${value[1]}`}>
              {value[1]}
            </Label>
            <div tabIndex="0" id={`${value[1]}`}>
              {value[2] ? value[2] : ""}
            </div>
          </FormGroup>
        </div>
      );
    } else {
      items.push(row);
      row = [];
      row.push(
        <div className="grid-col">
          <FormGroup className="margin-top-0">
            <Label className="text-bold" htmlFor={`${value[1]}`}>
              {value[1]}
            </Label>
            <div tabIndex="0" id={`${value[1]}`}>
              {value[2]}
            </div>
          </FormGroup>
        </div>
      );
    }
  }
  items.push(row);
  return (
    <div className="systemsCompTable">
      <div className="grid-container margin-bottom-2">
        <div className="display-inline-flex padding-top-1 padding-bottom-3">
          <h3 className="text-bold">{title}</h3>
          <input
            type="hidden"
            epadataname="id"
            id="id"
            name="id"
            className="modalUserInput"
            value={modalData["id"]}
          />
        </div>
        <div>
          {items.map((item) => {
            return <div className="grid-row padding-top-2">{item}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalDetails;
