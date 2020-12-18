import React from "react";
import "./AccordionItemTitle.css";
const AccordionItemTitle = ({ title }) => {
  const addButtonClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div className="methodHeader">
      <div className="methodTitle">
        <h3>{title}</h3>
      </div>
      <button className="rectBTN" onClick={addButtonClick}>⊕ Add {title}</button>
    </div>
  );
};

export default AccordionItemTitle;
