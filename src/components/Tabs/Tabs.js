import React, { useEffect, useState } from "react";

import { Button } from "@trussworks/react-uswds";

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
        <ul className="usa-button-group">
          {children.map((el, i) => (
            <li
              key={i}
              className="usa-button-group__item usa-tooltip"
              data-position="bottom"
              title={el.props.title}
            >
              {" "}
              {el.props.title.toLowerCase() === "select configurations" ? (
                <Button
                  outline={activeTabIndex !== i}
                  tabIndex="0"
                  aria-label={`open ${el.props.title} tab`}
                  className="initial-tab-button"
                  onClick={() => settingActiveTab(i)}
                >
                  {el.props.title}
                </Button>
              ) : (
                <div
                role = 'button'
                  className={
                    activeTabIndex === i
                      ? "tab-button active-tab-button"
                      : "tab-button"
                  }
                  tabIndex="0"
                  aria-label={`open ${el.props.title} tab`}
                  onClick={() => settingActiveTab(i)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      settingActiveTab(i);
                    }
                  }}
                >
                  <div>
                    <div className="text-center">
                      {el.props.title.split("(")[0]}
                    </div>
                    <div className="text-center">
                      {el.props.title.split("(")[1].replace(")", "")}
                    </div>
                  </div>

                  {dynamic ? (
                    <span className="margin-left-2 float-right position-relative left-neg-1 top-neg-3 margin-top-neg-2 cursor-pointer">
                      <i
                        aria-label={`close ${el.props.title} tab`}
                        tabIndex={0}
                        className={
                          i === 0
                            ? "fa fa-times close-icon invisible"
                            : "fa fa-times close-icon"
                        }
                        onClick={(e) => closeHandler(e, i)}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            closeHandler(event, i);
                          }
                        }}
                      />
                    </span>
                  ) : null}
                </div>
              )}
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
