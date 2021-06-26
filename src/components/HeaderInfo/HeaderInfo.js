import React, { useState } from "react";
import DropdownSelection from "../DropdownSelection/DropdownSelection";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { Button } from "@trussworks/react-uswds";

const HeaderInfo = ({
  facility,
  selectedConfig,
  orisCode,
  setSectionSelect,
  sectionSelect,
  setLocationSelect,
  locationSelect,
  locations,
  // checkout,
  // user,
}) => {
  const sections = [
    { name: "Defaults" },
    { name: "Loads" },
    { name: "Location Attributes" },
    { name: "Methods" },
    { name: "Qualifications" },
    { name: "Rectangular Duct WAFs" },
    { name: "Reporting Frequency" },
    { name: "Span, Range, and Formulas" },
    { name: "Stack/Pipe Information" },
    { name: "Systems" },
    { name: "Unit Information" },
  ];

  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");
  const [checkout, setCheckout] = useState(false);
  return (
    <div className="">
      <div className="grid-row ">
        <div className="grid-col">
          <div>
            <h3 className=" display-inline-block">
              {" "}
              {checkout ? <LockIcon fontSize="small" /> : ""}
              {facilityMainName}
            </h3>
          </div>
          <div className="">
            <div className="float-left clearfix display-inline-block ">
              <div className="text-bold font-body-xl display-block height-auto">
                {checkout ? (
                  <CreateOutlinedIcon color="primary" fontSize="large" />
                ) : (
                  ""
                )}{" "}
                {facilityAdditionalName}
                <div className="text-bold font-body-2xs display-inline-block ">
                  {checkout ? (
                    <Button
                      outline={false}
                      tabIndex="0"
                      aria-label={`Check back in the configuration `}
                      className="initial-tab-button"
                      onClick={() => setCheckout(false)}
                    >
                      <LockOpenIcon /> {"Check Back In"}
                    </Button>
                  ) : (
                    <Button
                      outline={true}
                      tabIndex="0"
                      aria-label={`Check out the configuration`}
                      className="float-top"
                      onClick={() => setCheckout(true)}
                    >
                      <CreateOutlinedIcon color="primary" /> {"Check Out"}
                    </Button>
                  )}
                  {checkout
                    ? "Currently checked out by: user"
                    : "Last checked out by: user"}
                </div>
              </div>

              <div className="row padding-left-2">
                <DropdownSelection
                  caption="Locations"
                  orisCode={orisCode}
                  options={locations}
                  viewKey="name"
                  selectKey="id"
                  initialSelection={locationSelect[0]}
                  selectionHandler={setLocationSelect}
                />
                <DropdownSelection
                  caption="Sections"
                  selectionHandler={setSectionSelect}
                  options={sections}
                  viewKey="name"
                  selectKey="name"
                  initialSelection={sectionSelect[0]}
                  orisCode={orisCode}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-col float-right clearfix">
          <div className="">
            <span>
              <a href="#/" className="margin-right-4 text-bold">
                Comments
              </a>
            </span>
            <span className="border-right-1px border-gray-90">
              <a href="#/" className="margin-right-4 text-bold">
                Reports
              </a>
            </span>
            <Button type="button" className="margin-left-4" outline={true}>
              Evaluate
            </Button>
            <Button type="button" className="" outline={true}>
              Submit
            </Button>
            <div className="text-right padding-right-0">
              <div>
                <span className="text-bold">Evaluation Status: </span>
                <span className="font-body-2xs display-inline-block padding-105">
                  {" Passed with no errors "}{" "}
                </span>
              </div>
              <div>
                <span className="text-bold"> Submission Status: </span>
                <span className="font-body-2xs display-inline-block padding-105">
                  {" Resubmission required "}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
