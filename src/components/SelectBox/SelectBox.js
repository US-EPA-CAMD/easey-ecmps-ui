import React, { useState, useEffect } from "react";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";
import "./SelectBox.scss";

const SelectBox = ({
  caption,
  options,
  selectKey,
  selectionHandler,
  showInactive = false,
  initialSelection,
  viewOnly,
  required,
}) => {
  function getIndex(name) {
    return options.findIndex((obj) => obj[selectKey] === name);
  }
  const [selectionState, setSelectionState] = useState(
    initialSelection ? initialSelection : 0
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));
  };
  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={index} value={info[selectKey]}>
          {info[selectKey]}
        </option>
      );
    });
  };
  useEffect(() => {
    selectionHandler(initialSelection ? initialSelection : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    selectionHandler(selectionState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionState]);

  return (
    <div>
      <div className="">
        <FormGroup className="formLabeling">
          <Label htmlFor={caption + initialSelection}>{caption}</Label>
          <Dropdown
            name={caption}
            // weird bug without this
            defaultValue={
              options[selectionState] !== undefined
                ? options[selectionState][selectKey]
                : options[0][selectKey]
            }
            disabled={viewOnly}
            id={caption + initialSelection}
            onChange={(e) => handleChange(e)}
          >
            {showInactive &&
              caption === "Configurations" &&
              getActiveConfigurations(options).length > 0 && (
                <optgroup label="Active" role="optGroup">
                  {populateOptions(getActiveConfigurations(options))}
                </optgroup>
              )}
            {showInactive &&
              caption === "Configurations" &&
              getInActiveConfigurations(options).length > 0 && (
                <optgroup label="Inactive" role="optGroup">
                  {populateOptions(getInActiveConfigurations(options))}
                </optgroup>
              )}
            {showInactive === false && populateOptions(options)}
          </Dropdown>
        </FormGroup>
      </div>
    </div>
  );
};

export default SelectBox;
