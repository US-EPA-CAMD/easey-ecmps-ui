import React, { useState, useEffect } from "react";
import "./SelectBox.css";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../../../../../utils/selectors/monitoringConfigurations";

const SelectBox = ({
  caption,
  options,
  selectKey,
  selectionHandler,
  showInactive = false,
  initialSelection,
}) => {
  function getIndex(name) {
    return options.findIndex((obj) => obj[selectKey] === name);
  }
  const [selectionState, setSelectionState] = useState(
    initialSelection ? initialSelection : 0
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));
    selectionHandler(getIndex(val.target.value));
  };

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={index} value={info[selectKey]} role="selectOption">
          {info[selectKey]}{" "}
        </option>
      );
    });
  };
  useEffect(() => {
    selectionHandler(initialSelection ? initialSelection : 0);
  }, []);
  return (
    <div>
      <div className="mpSelect">
        {caption}
        {": "} <br />
        <select
          role="select"
          data-testid="select"
          id={caption}
          onChange={(e) => handleChange(e)}
          value={
            options[selectionState] !== undefined
              ? options[selectionState][selectKey]
              : options[0][selectKey]
          }
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
        </select>
      </div>
    </div>
  );
};

export default SelectBox;
