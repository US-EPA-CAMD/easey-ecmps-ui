import React from "react";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

const DropdownSelection = ({
  caption,
  selectKey,
  viewKey,
  options,
  selectionHandler,
  initialSelection,
}) => {
  const getIndex = (val) => {
    return options.findIndex((obj) => obj[selectKey] === val);
  };

  const handleChange = (val) => {
     selectionHandler([getIndex(val.target.value), val.target.value]);
  };

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={info[selectKey]} value={info[selectKey]}>
          {info[viewKey]}
        </option>
      );
    });
  };
  return (
    <div>
      <div>
        <FormGroup className="margin-right-2 margin-bottom-1">
          <Label test-id={caption} htmlFor={caption}>{caption}</Label>
          <Dropdown
            id={caption}
            test-id={caption}
            value={options[initialSelection] ? options[initialSelection][selectKey]: options[0][selectKey]}
            onChange={(e) => handleChange(e)}
          >
            {populateOptions(options)}
          </Dropdown>
        </FormGroup>
      </div>
    </div>
  );
};

export default DropdownSelection;
