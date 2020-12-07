import React, { useState } from "react";
import './Tabs.css';
const Tabs = ({ children, dynamic = false, removeTabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const closeHandler = (event, index) => {
    event.stopPropagation();
    removeTabs(index);
    if (activeTabIndex === children.length - 1) {
      setActiveTabIndex(index - 1);
    }
  };

  return (
    <div>
      <div className="tabBar">
      <ul className="usa-button-group usa-button-group--segmented" >
        {children.map((el, i) => (
          <li key={i} className="usa-button-group__item" style={{position:'relative'}}>
            <button
              className={
                activeTabIndex === i
                  ? "active-button button-group"
                  : "notActive-button button-group"
              }
              onClick={() => setActiveTabIndex(i)}
            >
              {dynamic ? (
                <i
                  className={
                    i === 0
                      ? "fa fa-times close-icon hidden"
                      : "fa fa-times close-icon"
                  }
                  onClick={(e) => closeHandler(e, i)}
                ></i>
              ) : null}
              {el.props.title}
            </button>
          </li>
        ))}
      </ul>
      </div>
      <div>{children[activeTabIndex]}</div>
    </div>
  );
};

export default Tabs;
