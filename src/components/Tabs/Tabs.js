import React, { useState } from "react";

import { Button } from "@trussworks/react-uswds";

import "./Tabs.scss";
import { ClearSharp } from "@material-ui/icons";
const Tabs = ({ children, dynamic = false, removeTabs, setActive }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const settingActiveTab = (index) => {
    setActiveTabIndex(index);
    setActive(false, index - 1);
  };
  const closeHandler = (event, index) => {
    event.stopPropagation();
    removeTabs(index);
    if (activeTabIndex === children.length - 1) {
      setActiveTabIndex(index - 1);
      setActive(false, index - 2);
    }
  };

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
                <>
                  <Button
                    type="button"
                    outline={activeTabIndex !== i}
                    tabIndex="0"
                    aria-label={`open ${el.props.title} tab`}
                    className={
                      activeTabIndex === i
                        ? "initial-tab-button active-tab-button"
                        : "initial-tab-button"
                    }
                    onClick={() => settingActiveTab(i)}
                  >
                    {el.props.title}
                  </Button>
                </>
              ) : (
                <div
                  role="button"
                  className={
                    activeTabIndex === i
                      ? "tab-button react-transition flip-in-y  active-tab-button"
                      : "tab-button react-transition flip-in-y"
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
                    <ClearSharp
                      className="text-bold margin-left-2 float-right position-relative left-neg-1 top-neg-3 margin-top-neg-2 cursor-pointer"
                      onClick={(e) => closeHandler(e, i)}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          closeHandler(event, i);
                        }
                      }}
                      title="Click to close tab"
                      name="closeXBtnTab"
                      id="closeXBtnTab"
                      data-test-id="closeXBtnTab"
                      epa-testid="closeXBtnTab"
                      role="button"
                      tabIndex="0"
                    />
                  ) : null}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <hr className="height-3" />
      <div className="tabContent">{children[activeTabIndex]}</div>
    </div>
  );
};

export default Tabs;
