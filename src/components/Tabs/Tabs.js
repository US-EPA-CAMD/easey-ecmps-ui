import React, { useEffect, useState } from "react";
import "./Tabs.scss";
const Tabs = ({
  children,
  dynamic = false,
  removeTabs,
  setResizeObserver,
  setActive,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const settingActiveTab = (index) => {
    setActiveTabIndex(index);
    setActive(false, index - 1);
  };
  let contentBox = null;
  const closeHandler = (event, index) => {
    event.stopPropagation();
    removeTabs(index);
    if (activeTabIndex === children.length - 1) {
      setActiveTabIndex(index - 1);
      setActive(false, index - 2);
    }
  };

  useEffect(() => {
    if (contentBox) {
      setResizeObserver(contentBox);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentBox]);

  return (
    <div>
      <div className="">
        <ul className="usa-button-group usa-button-group--segmented">
          {children.map((el, i) => (
            <li
              key={i}
              className="usa-button-group__item usa-tooltip"
              style={{ position: "relative" }}
              data-position="bottom"
              title={el.props.title}
            >
              {dynamic ? (
                <i
                  aria-label={`close ${el.props.title} tab`}
                  tabIndex={0}
                  className={
                    i === 0
                      ? "fa fa-times close-icon hidden"
                      : "fa fa-times close-icon"
                  }
                  onClick={(e) => closeHandler(e, i)}
                />
              ) : null}
              <button
                tabIndex={0}
                aria-label={`open ${el.props.title} tab`}
                className={
                  activeTabIndex === i
                    ? "active-button button-group"
                    : "notActive-button button-group"
                }
                onClick={() => settingActiveTab(i)}
              >
                <span className={i !== 0 ? "tabTitle" : "firstTabTitle"}>
                  {el.props.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="tabContent"
        ref={(el) => {
          if (!el) {
            return;
          }
          contentBox = el;
        }}
      >
        {children[activeTabIndex]}
      </div>
    </div>
  );
};

export default Tabs;
