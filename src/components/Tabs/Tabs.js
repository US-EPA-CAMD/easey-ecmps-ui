import React, { useState } from "react";

import { Button } from "@trussworks/react-uswds";
import { ClearSharp, CreateSharp, LockSharp } from "@material-ui/icons";

import "./Tabs.scss";
import { setCheckoutState } from "../../store/actions/dynamicFacilityTab";
import { connect } from "react-redux";
import * as mpApi from "../../utils/api/monitoringPlansApi";

export const Tabs = ({
  children,
  dynamic = false,
  removeTabs,
  setActive,
  checkedOutLocations,
  user,
  setCheckout,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const settingActiveTab = (index) => {
    setActiveTabIndex(index);
    setActive(false, index - 1);
  };
  const closeHandler = (event, index, configId) => {
    event.stopPropagation();
    removeTabs(index);

    mpApi.deleteCheckInMonitoringPlanConfiguration(configId).then((res) => {
      if (setCheckout) {
        setCheckout(false, configId);
      }
    });

    if (activeTabIndex === children.length - 1) {
      setActiveTabIndex(index - 1);
      setActive(false, index - 2);
    }
  };

  const isCheckedOut = (locationId) => {
    return (
      checkedOutLocations
        .map((location) => location["monPlanId"])
        .indexOf(locationId) > -1
    );
  };

  const isCheckedOutByUser = (locationId) => {
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
  };

  return (
    <div>
      <div className="tab-buttons mobile-lg:margin-left-7 mobile-lg:padding-left-5 tablet:margin-left-0 tablet:padding-left-0">
        <ul className="usa-button-group margin-top-2">
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
                  aria-label={`open ${
                    user &&
                    el.props.locationId &&
                    isCheckedOut(el.props.locationId)
                      ? "(locked)"
                      : ""
                  } ${
                    el.props.locationId &&
                    isCheckedOutByUser(el.props.locationId)
                      ? "(checked-out)"
                      : ""
                  } ${el.props.title} tab`}
                  onClick={() => settingActiveTab(i)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      settingActiveTab(i);
                    }
                  }}
                >
                  <div className="text-center tab-button-text-container ellipsis-text padding-left-2px">
                    {user &&
                    el.props.locationId &&
                    isCheckedOut(el.props.locationId) ? (
                      <LockSharp
                        role="img"
                        className="text-bold tab-icon margin-right-2"
                        aria-hidden="false"
                        title={`Locked Facility - ${
                          el.props.title.split("(")[0]
                        }`}
                      />
                    ) : null}
                    {el.props.title.split("(")[0]}
                  </div>
                  <div className="text-center">
                    {el.props.locationId &&
                    isCheckedOutByUser(el.props.locationId) ? (
                      <CreateSharp
                        role="img"
                        className="text-bold tab-icon margin-right-2"
                        aria-hidden="false"
                        title={`Checked-out Configuration - ${el.props.title
                          .split("(")[1]
                          .replace(")", "")}`}
                      />
                    ) : null}
                    {el.props.title.split("(")[1].replace(")", "")}
                  </div>

                  {dynamic ? (
                    <ClearSharp
                      className="text-bold margin-left-2 float-right position-relative left-neg-1 top-neg-3 margin-top-neg-2 cursor-pointer"
                      onClick={(e) => closeHandler(e, i, el.props.locationId)}
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
                      aria-hidden="false"
                    />
                  ) : null}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <hr className="height-3 position-relative top-3" />
      <div className="tabContent">{children[activeTabIndex]}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCheckout: (value, configID) =>
      dispatch(setCheckoutState(value, configID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
export { mapStateToProps };
export { mapDispatchToProps };
