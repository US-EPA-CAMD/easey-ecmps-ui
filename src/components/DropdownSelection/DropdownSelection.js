import React from "react";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";
export const DropdownSelection = ({
  caption,
  selectKey, // the key in the object property to identify
  viewKey, // the key in the object property to display in dropdown
  options, // array of objects with at least 2 properties
  selectionHandler, // needs to setState with [0] for the index, to change dropdown
  initialSelection, // needs useState to change the dropdown
  workspaceSection,
  changeFunc, // extra function that gets called inside handleChange, passing in the val of the dropdown
}) => {
  const getIndex = (val) => {
    return options.findIndex((obj) => obj[selectKey] === val);
  };

  const handleChange = (val) => {
    workspaceSection
      ? selectionHandler(
          [getIndex(val.target.value), val.target.value],
          workspaceSection
        )
      : selectionHandler([getIndex(val.target.value), val.target.value]);

    if( changeFunc && changeFunc instanceof Function)
        changeFunc(val);
  };

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option
          data-testid={info[selectKey]}
          key={info[selectKey]}
          value={info[selectKey]}
        >
          {info[viewKey]}
        </option>
      );
    });
  };
  return (
    <div>
      <div>
        <FormGroup className="margin-right-2 margin-bottom-1">
          <Label test-id={caption} htmlFor={caption}>
            {caption}
          </Label>
          <Dropdown
            id={caption}
            name={caption}
            epa-testid={caption}
            data-testid={caption}
            value={
              options[initialSelection]
                ? options[initialSelection][selectKey]
                : options[0][selectKey]
            }
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
