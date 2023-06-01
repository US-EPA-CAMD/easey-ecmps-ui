import React, { useState, useEffect } from "react";

import { Button } from "@trussworks/react-uswds";
import { ClearSharp, CreateSharp, LockSharp } from "@material-ui/icons";

import "./Tabs.scss";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import { EXPORT_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import { addElementToLastFocusedArray } from "../../additional-functions/manage-focus";
const Tabs = ({
  children,
  dynamic = false,
  removeTabs,
  checkedOutLocations,
  user,
  setCheckout,
  workspaceSection,
  setCurrentTabIndex,
  currentTabIndex,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(currentTabIndex);
  useEffect(() => {
    if (activeTabIndex != currentTabIndex) {
      setCurrentTabIndex(activeTabIndex);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabIndex]);

  const settingActiveTab = (index) => {
    setActiveTabIndex(index);
  };

  const removeTab = (index) => {
    removeTabs(index);
    if (activeTabIndex === children.length - 1) {
      setActiveTabIndex(index - 1);
    }
  };

  const closeHandler = (event, index, configId) => {
    event.stopPropagation();

    if (workspaceSection !== EXPORT_STORE_NAME) {
      mpApi
        .getCheckedOutLocations()
        .then((resOne) => {
          const configs = resOne.data;
          if (
            configs.some(
              (plan) =>
                plan.monPlanId === configId &&
                plan.checkedOutBy === user["userId"]
            )
          ) {
            mpApi
              .deleteCheckInMonitoringPlanConfiguration(configId)
              .then(() => {
                if (setCheckout) {
                  setCheckout(false, configId, workspaceSection);
                }
                removeTab(index);
              })
              .catch((error) =>
                console.log(
                  "deleteCheckInMonitoringPlanConfiguration failed",
                  error
                )
              );
          } else {
            removeTab(index);
          }
        })
        .catch((error) => console.log("getCheckedOutLocations failed", error));
    } else {
      removeTab(index);
    }
  };

  const isCheckedOut = (locationId) => {
    if (workspaceSection !== EXPORT_STORE_NAME) {
      return (
        checkedOutLocations
          .map((location) => location["monPlanId"])
          .indexOf(locationId) > -1
      );
    }
  };

  const isCheckedOutByUser = (locationId) => {
    if (workspaceSection !== EXPORT_STORE_NAME) {
      return (
        checkedOutLocations
          .map((location) => location["monPlanId"])
          .indexOf(locationId) > -1 &&
        checkedOutLocations[
          checkedOutLocations
            .map((location) => location["monPlanId"])
            .indexOf(locationId)
        ]["checkedOutBy"] === user["userId"]
      );
    }
  };

  const cleanConfigStr = (name) => {
    return name
      .replaceAll(",", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .trim()
      .replaceAll(" ", "-");
  };
  let tabBtnSelector;
  const updateTabBtnSelectorAndReturnAriaLabel = (arg) => {
    tabBtnSelector = `[aria-label="${arg}"]`;
    return arg;
  };
  return (
    <div>
      <div className="tab-buttons mobile-lg:margin-left-7 mobile-lg:padding-left-5 tablet:margin-left-0 tablet:padding-left-0">
        <ul className="usa-button-group margin-top-1">
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
                    id="select-config"
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
                  id="tabBtn"
                  className={
                    activeTabIndex === i
                      ? "tab-button react-transition flip-in-y active-tab-button"
                      : "tab-button react-transition flip-in-y"
                  }
                  tabIndex="0"
                  aria-label={updateTabBtnSelectorAndReturnAriaLabel(
                    `open ${el.props.title.split("(")[0]}${
                      user &&
                      el.props.locationId &&
                      el.props.facId &&
                      workspaceSection !== EXPORT_STORE_NAME &&
                      (isCheckedOut(el.props.locationId) ||
                        checkedOutLocations.some(
                          (loc) => loc.facId === parseInt(el.props.facId)
                        ))
                        ? "(locked)"
                        : ""
                    } ${el.props.title
                      .split("(")[1]
                      .replace(")", "")
                      .replace("Inactive", "(Inactive)")
                      .replace("Active", "(Active)")} ${
                      el.props.locationId &&
                      isCheckedOutByUser(el.props.locationId)
                        ? "(checked-out)"
                        : ""
                    } tab`
                  )}
                  onClick={() => {
                    addElementToLastFocusedArray(tabBtnSelector);
                    settingActiveTab(i);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      addElementToLastFocusedArray(tabBtnSelector);
                      settingActiveTab(i);
                    }
                  }}
                >
                  <div className="text-center tab-button-text-container ellipsis-text position-relative">
                    {user &&
                    workspaceSection !== EXPORT_STORE_NAME &&
                    el.props.locationId &&
                    el.props.facId &&
                    (isCheckedOut(el.props.locationId) ||
                      checkedOutLocations.some(
                        (plan) => plan.facId === parseInt(el.props.facId)
                      )) ? (
                      <LockSharp
                        role="img"
                        className="text-bold tab-icon margin-right-1"
                        aria-hidden="false"
                        title={`Locked Facility - ${
                          el.props.title.split("(")[0]
                        }`}
                      />
                    ) : null}
                    {workspaceSection !== EXPORT_STORE_NAME &&
                      el.props.locationId &&
                      isCheckedOutByUser(el.props.locationId) && (
                        <CreateSharp
                          role="img"
                          className="text-bold tab-icon margin-right-1"
                          aria-hidden="false"
                          title={`Checked-out Configuration - ${el.props.title
                            .split("(")[1]
                            .replace(")", "")}`}
                        />
                      )}
                    {el.props.title.split("(")[0]}
                  </div>
                  <div className="text-center">
                    <span className="position-relative top-neg-105 locations-display">
                      {el.props.selectedConfigName}
                    </span>
                  </div>

                  {dynamic ? (
                    <ClearSharp
                      className="text-bold margin-left-2 float-right position-relative left-neg-1 top-neg-1 margin-top-neg-3 cursor-pointer closeXBtnTab"
                      onClick={(e) => closeHandler(e, i, el.props.locationId)}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          closeHandler(event, i);
                        }
                      }}
                      title={`Click to close ${el.props.title} tab`}
                      name={`closeXBtnTab-${cleanConfigStr(el.props.title)}`}
                      id={`closeXBtnTab-${cleanConfigStr(el.props.title)}`}
                      data-test-id={`closeXBtnTab-${cleanConfigStr(
                        el.props.title
                      )}`}
                      epa-testid={`closeXBtnTab-${cleanConfigStr(
                        el.props.title
                      )}`}
                      role="button"
                      tabIndex="0"
                      aria-hidden="false"
                    />
                  ) : null}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="tabContent border-top-1px border-base-lighter margin-top-4 padding-top-4">
        {children[activeTabIndex]}
      </div>
    </div>
  );
};

export default Tabs;
