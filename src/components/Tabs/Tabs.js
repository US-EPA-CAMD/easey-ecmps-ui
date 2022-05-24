import React, { useState } from "react";

import { Button } from "@trussworks/react-uswds";
import { ClearSharp, CreateSharp, LockSharp } from "@material-ui/icons";

import "./Tabs.scss";
import { setCheckoutState } from "../../store/actions/dynamicFacilityTab";
import { connect } from "react-redux";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import {
  convertSectionToStoreName,
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_TEST_SUMMARY_STORE_NAME
} from "../../additional-functions/workspace-section-and-store-names";
export const Tabs = ({
  children,
  dynamic = false,
  removeTabs,
  setActive,
  checkedOutLocations,
  user,
  setCheckout,
  workspaceSection ,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const settingActiveTab = (index) => {
    setActiveTabIndex(index);
    setActive(false, index - 1,workspaceSection);
  };
  const closeHandler = (event, index, configId) => {
    event.stopPropagation();
    removeTabs(index);

    if (workspaceSection === MONITORING_PLAN_STORE_NAME) {
      mpApi.getCheckedOutLocations().then((resOne) => {
        const configs = resOne.data;
        if (
          configs.some(
            (plan) =>
              plan.monPlanId === configId &&
              plan.checkedOutBy === user["userId"]
          )
        ) {
          mpApi.deleteCheckInMonitoringPlanConfiguration(configId).then(() => {
            console.log("X button - checked-in configuration: " + configId);
            if (setCheckout) {
              setCheckout(false, configId,workspaceSection);
            }
          });
        } else {
          console.log(
            "X button - cannot check-in configuration that you do not have checked-out"
          );
        }
      });
    }
    if (activeTabIndex === children.length - 1) {
      setActiveTabIndex(index - 1);
      setActive(false, index - 2,workspaceSection);
    }
  };

  const isCheckedOut = (locationId) => {
    if (workspaceSection === MONITORING_PLAN_STORE_NAME) {
      return (
        checkedOutLocations
          .map((location) => location["monPlanId"])
          .indexOf(locationId) > -1
      );
    }
  };

  const isCheckedOutByUser = (locationId) => {
    if (workspaceSection === MONITORING_PLAN_STORE_NAME) {
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
                  aria-label={`open ${el.props.title.split("(")[0]}${
                    user &&
                    el.props.locationId &&
                    el.props.facId && workspaceSection === MONITORING_PLAN_STORE_NAME &&
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
                  } tab`}
                  onClick={() => settingActiveTab(i)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      settingActiveTab(i);
                    }
                  }}
                >
                  <div className="text-center tab-button-text-container ellipsis-text padding-2px position-relative top-neg-05">
                    {user && workspaceSection === MONITORING_PLAN_STORE_NAME &&
                    el.props.locationId &&
                    el.props.facId &&
                    (isCheckedOut(el.props.locationId) ||
                      checkedOutLocations.some(
                        (plan) => plan.facId === parseInt(el.props.facId)
                      )) ? (
                      <LockSharp
                        role="img"
                        className="text-bold tab-icon margin-top-1 margin-right-2 position-relative top-2px"
                        aria-hidden="false"
                        title={`Locked Facility - ${
                          el.props.title.split("(")[0]
                        }`}
                      />
                    ) : null}
                    {el.props.title.split("(")[0]}
                  </div>
                  <div className="text-center">
                    {workspaceSection === MONITORING_PLAN_STORE_NAME && el.props.locationId &&
                    isCheckedOutByUser(el.props.locationId) ? (
                      <CreateSharp
                        role="img"
                        className="text-bold tab-icon margin-right-2 position-relative top-neg-1"
                        aria-hidden="false"
                        title={`Checked-out Configuration - ${el.props.title
                          .split("(")[1]
                          .replace(")", "")}`}
                      />
                    ) : null}
                    <span className="position-relative top-neg-105">
                      {el.props.title.split("(")[1].replace(")", "")}
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

const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs(convertSectionToStoreName(QA_CERT_TEST_SUMMARY_STORE_NAME)),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCheckout: (value, configID,workspaceSection) =>
      dispatch(setCheckoutState(value, configID,convertSectionToStoreName(workspaceSection))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
export { mapStateToProps };
export { mapDispatchToProps };
