import React from "react";
import "./SelectBox.css";
const SelectBox = ({ caption, options, selectKey,mpHandler }) => {

  return (
    <div>
      <div className="mpSelect">
        {caption}
        {": "} <br />
        <select onChange={ (e) => mpHandler(e.target.value)}>
          {options.map((info) => {
                    return (
                    <option key={info[selectKey]} value={info[selectKey]} >{info[selectKey]} </option>
                    )
                })}


        </select>
      </div>
    </div>
  );
};

export default SelectBox;
