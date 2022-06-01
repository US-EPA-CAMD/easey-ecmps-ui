import React, { useState } from "react";
import { Button } from "@trussworks/react-uswds";

import "./QACertTestSummaryHeaderInfo.scss";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";

import { Preloader } from "@us-epa-camd/easey-design-system";

export const QACertTestSummaryHeaderInfo = ({
  facility,
  selectedConfig,
  orisCode,
  user,
  //redux sets
  setLocationSelect,
  setSectionSelect,
  // redux store
  sectionSelect,
  locationSelect,
  locations,
}) => {
  const sections = [
    { name: "AppendixE Correlation Test Summary" },
    { name: "Calibration Injection" },
    { name: "Cycle Time Summary" },
    { name: "Flow to Load Check" },
    { name: "Flow to Load Reference" },
    { name: "Fuel Flow to Load Baseline" },
    { name: "Fuel Flow to Load Test" },
    { name: "Fuel Flowmeter Accuracy" },
    { name: "Hg Linearity and 3-Level Summary" },
    { name: "Linearity Summary" },
    { name: "Online Offline Calibration" },
    { name: "RATA" },
    { name: "Test Qualifcation" },
    { name: "Transmitter Transducer Accuracy" },
    { name: "Unit Test" },
  ];

  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");
  const [dataLoaded, setDataLoaded] = useState(true);

  return (
    <div className="header QACertHeader ">
      {dataLoaded ? (
        // adding display-block here allows buttons to be clickable ( has somesort of hidden overlay without it)
        <div className="grid-container width-full clearfix position-relative">
          <div className="grid-row">
            <h3 className="display-inline-block">
              <span className="font-body-lg">{facilityMainName}</span>
            </h3>{" "}
          </div>
          <div className=" grid-row text-bold font-body-xl display-block">
            {facilityAdditionalName}
          </div>

          <div className="grid-row positon-relative">
            <div className="grid-col-2">
              <DropdownSelection
                caption="Locations"
                orisCode={orisCode}
                options={locations}
                viewKey="name"
                selectKey="id"
                initialSelection={locationSelect ? locationSelect[0] : null}
                selectionHandler={setLocationSelect}
              />
            </div>
            <div className="grid-col-4">
              <DropdownSelection
                caption="Test Type"
                selectionHandler={setSectionSelect}
                options={sections}
                viewKey="name"
                selectKey="name"
                initialSelection={sectionSelect ? sectionSelect[0] : null}
                orisCode={orisCode}
              />
            </div>{" "}
            <div className="grid-col-3"></div>{" "}
            <div className="grid-col-3">
              {user ? (
                <div className=" float-right right-0 bottom-0 text-no-wrap position-absolute padding-bottom-1">
                  <Button
                    className="padding-x-5"
                    type="button"
                    id="showRevertModal"
                    outline={false}
                  >
                    {"Import Test Data"}
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="grid-row float-right">
            <Button
              className="float-right text-right bottom-0 text-no-wrap "
              type="button"
              id="showRevertModal"
              outline={true}
            >
              {"Test Data Report"}
            </Button>
            <Button
              className="float-right text-right bottom-0 text-no-wrap "
              type="button"
              id="showRevertModal"
              outline={true}
            >
              {"Test History Report"}
            </Button>
            {user ? (
              <Button
                className="float-right text-right bottom-0 text-no-wrap "
                type="button"
                id="showRevertModal"
                outline={false}
              >
                {"Evaluate"}
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default QACertTestSummaryHeaderInfo;
