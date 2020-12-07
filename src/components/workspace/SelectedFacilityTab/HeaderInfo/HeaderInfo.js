import React from "react";
import "./HeaderInfo.css";
import SelectBox from "./SelectBox/SelectBox";
const HeaderInfo = ({ facility }) => {
  
  return (
    <div className="header">
      <div className="title">{facility.name}</div>
      <div className="accessories">
        <a>Comments</a>
        <a>Reports</a>|<button className="ovalBTN">Evaluate</button>
        <button className="ovalBTN">Submit</button>
      </div>
      <div className="selects">
        <SelectBox caption="Monitoring Plan" options={facility.units} />
        {/* <SelectBox caption="Monitoring Plan Sections" /> */}
        <div className="statuses">
          <div className="eval">
            {" "}
            Evaluation Status: {" passed with no errors "}
          </div>
          <div className="submission"> Submission Status:</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
