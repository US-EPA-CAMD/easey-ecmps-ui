import React, { useState } from "react";

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
      <ul className="usa-button-group usa-button-group--segmented">
        {children.map((el, i) => (
          <li key={i} className="usa-button-group__item">
            <button
              className={
                activeTabIndex === i
                  ? "usa-button"
                  : "usa-button usa-button--outline"
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
      <div>{children[activeTabIndex]}</div>
    </div>
  );
};

export default Tabs;
