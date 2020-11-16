import React, { useState } from "react";

const Tabs = ({ children, initTab }) => {
  const findTabIndex = (title) => {
    return children.findIndex((e) => e.props.title === title);
  };
  const [activeTabIndex, setActiveTabIndex] = useState(findTabIndex(initTab));

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
              onClick={() => setActiveTabIndex(findTabIndex(el.props.title))}
            >
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
