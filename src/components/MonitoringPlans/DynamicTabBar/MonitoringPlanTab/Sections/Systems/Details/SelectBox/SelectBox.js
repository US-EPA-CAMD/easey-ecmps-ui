import React, { useState } from "react";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

import "./SelectBox.css";
const SelectBox = ({
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
          <Label
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
            aria-label={caption + " dropdown"}
            className="modalDrop"
            name={caption}
            // weird bug without this
            value={selectionState !== null ? selectionState : initialSelection}
            disabled={viewOnly}
            role="select"
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
export default React.memo(SelectBox);
