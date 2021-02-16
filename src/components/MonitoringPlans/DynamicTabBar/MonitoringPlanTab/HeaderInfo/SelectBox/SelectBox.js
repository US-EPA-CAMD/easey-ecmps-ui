import React, { useState,useEffect } from "react";
import "./SelectBox.css";
import {getActiveConfigurations, getInActiveConfigurations} from "../../../../../../utils/selectors/monitoringConfigurations";

const SelectBox = ({ caption, options, selectKey, selectionHandler, showInactive=false }) => {

  function getIndex(name) {
    return options.findIndex(obj => obj[selectKey] === name);
  }
  const [selectionState, setSelectionState] = useState(0);

  const handleChange = (val) => {
    selectionHandler(getIndex(val.target.value));
    setSelectionState(getIndex(val.target.value));
  };

  const populateOptions = (optionsList) =>{
    return optionsList.map((info,index) => {
      return (
        <option key={index} value={info[selectKey]} role="selectOption">
            {info[selectKey]}{" "}
        </option>
      );
    })
  }

  useEffect(() => {
    selectionHandler(0);
    setSelectionState(0);
  }, [options]);

  return (
    <div>
      <div className="mpSelect">
        {caption}
        {": "} <br />
        <select
        role="select"
        data-testid="select"
          onChange={(e) => handleChange(e)}
          value={(options[selectionState] !== undefined) ?options[selectionState][selectKey]:options[0][selectKey]}
        >
          {showInactive && caption==="Configurations" && (
              <optgroup label="Active" role="optGroup">
                {populateOptions(getActiveConfigurations(options))}
              </optgroup>
          )}
          {showInactive && caption==="Configurations" && (
              <optgroup label="Inactive" role="optGroup">
                {populateOptions(getInActiveConfigurations(options))}
              </optgroup>
          )}
          {/* {showInactive && caption==="Locations" &&
              populateOptions(options)
          }
          {showInactive===false && caption==="Locations" &&
              populateOptions(getActiveLocations(options))
          }
          {showInactive===false && caption!=="Locations" &&
              populateOptions(options)
          } */}
          {showInactive===false &&
              populateOptions(options)
          }
        </select>
      </div>
    </div>
  );
};

export default SelectBox;
