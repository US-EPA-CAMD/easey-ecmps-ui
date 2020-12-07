import React from "react";
import "./MethodSub.css";
const MethodSub = ({ title }) => {
  return (
    <div className="methodHeader">
      <div className="methodTitle">
        <h3> + {title}</h3>
      </div>
      <button className="rectBTN">⊕ Add {title}</button>
    </div>
  );
};

export default MethodSub;
