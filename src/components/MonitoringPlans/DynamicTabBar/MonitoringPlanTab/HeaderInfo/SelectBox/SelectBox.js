import React, { useState,useEffect } from "react";
import "./SelectBox.css";
const SelectBox = ({ caption, options, selectKey, selectionHandler }) => {

  function getIndex(name) {
    return options.findIndex(obj => obj[selectKey] === name);
  }
  const [selectionState, setSelectionState] = useState(0);

  const handleChange = (val) => {
    selectionHandler(getIndex(val.target.value));
    setSelectionState(getIndex(val.target.value));
  };

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
          onChange={(e) => handleChange(e)}
          value={(options[selectionState] !== undefined) ?options[selectionState][selectKey]:options[0][selectKey]}
        >
          {options.map((info,index) => {
            return (
              <option key={index} value={info[selectKey]}>
                {info[selectKey]}{" "}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SelectBox;
