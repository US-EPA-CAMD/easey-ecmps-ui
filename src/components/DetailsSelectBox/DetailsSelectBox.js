import React, { useState } from "react";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

import "./DetailsSelectBox.css";
const DetailsSelectBox = ({
  caption,
  options,
  selectKey,
  initialSelection,
  viewOnly,
  required,
}) => {
  const [selectionState, setSelectionState] = useState(
    initialSelection ? initialSelection : null
  );

  const handleChange = (val) => {
    setSelectionState(val.target.value);
  };

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={index} value={info[selectKey]} role="selectOption">
          {info[selectKey]}
        </option>
      );
    });
  };
  return (
    <div>
      <div className="">
        <FormGroup className="formLabeling">
          <Label htmlFor={caption + initialSelection}
            hint={
              required ? (
                <span className="requiredItalics"> (Required)</span>
              ) : (
                ""
              )
            }
          >
            {caption}
          </Label>
          <Dropdown
            className="modalDrop"
            name={caption}
            // weird bug without this
            value={selectionState !== null ? selectionState : initialSelection}
            disabled={viewOnly}
            id={caption + initialSelection}
            onChange={(e) => handleChange(e)}
          >
            {populateOptions(options)}
          </Dropdown>
        </FormGroup>
      </div>
    </div>
  );
};
export default DetailsSelectBox;
