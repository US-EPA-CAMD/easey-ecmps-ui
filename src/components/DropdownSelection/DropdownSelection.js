import React from "react";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
export const DropdownSelection = ({
  caption,
  selectKey,
  viewKey,
  options,
  selectionHandler,
  initialSelection,
  workspaceSection
}) => {
  const getIndex = (val) => {
    return options.findIndex((obj) => obj[selectKey] === val);
  };

  const handleChange = (val) => {
    selectionHandler([getIndex(val.target.value), val.target.value], workspaceSection);
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
