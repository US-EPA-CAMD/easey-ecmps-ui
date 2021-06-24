import React, { useState } from "react";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

const DetailsSelectBox = ({
  caption,
  options,
  selectKey,
  initialSelection,
  viewOnly,
  required,
  secondOption,
  className,
  epaDataname,
  id,
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
        <option key={index} value={info[selectKey]}>
          {info[secondOption ? secondOption : selectKey]}
        </option>
      );
    });
  };
  return (
    <div>
      <div>
        <FormGroup className="margin-top-0">
          <Label
            htmlFor={caption}
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
            name={caption}
            // weird bug without this
            value={selectionState !== null ? selectionState : initialSelection}
            disabled={viewOnly}
            id={id === null ? caption : id}
            className={className}
            epaDataname={epaDataname}
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
