import React from "react";

import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

const LocationDrop = ({
  orisCode,
  caption,
  options,
  selectKey,
  initialSelection,
  selectionHandler,
  tabs,
  activeTab,
}) => {
  const getIndex = (val) => {
    return options.findIndex((obj) => obj.id === val);
  };

  const handleChange = (val) => {
    selectionHandler([getIndex(val.target.value), val.target.value]);
  };

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={info.id} value={info.id}>
          {info[selectKey]}
        </option>
      );
    });
  };

  return (
    <div>
      {" "}
      <div>
        {/* need to add default value later */}
        <FormGroup className="margin-right-2 margin-bottom-1">
          <Label htmlFor={caption + initialSelection[0]}>{caption}</Label>
          <Dropdown
            name="optionList"
            id={initialSelection[0]}
            // issue here, the inital selection is return index,
            // id need value to match with id
            value={
              options[initialSelection[0]]
                ? options[initialSelection[0]].id
                : options[0].id
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

export default LocationDrop;
