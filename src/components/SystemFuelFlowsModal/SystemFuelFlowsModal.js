import React, { useEffect } from "react";
import {
  Label,
  FormGroup,
  TextInput,
  DatePicker,
  Button,
} from "@trussworks/react-uswds";

import { ArrowBackSharp } from "@material-ui/icons";
import { acqMethodCode } from "./SystemFuelFlowsData";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";

const SystemFuelFlowsModal = ({ modalData, viewOnly, backBTN }) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [startHour, setStartHour] = React.useState(null);
  const [endHour, setEndHour] = React.useState(null);

  const timeOptions = [
    { time: null },
    { time: 0 },
    { time: 1 },
    { time: 2 },
    { time: 3 },
    { time: 4 },
    { time: 5 },
    { time: 6 },
    { time: 7 },
    { time: 8 },
    { time: 9 },
    { time: 10 },
    { time: 11 },
    { time: 12 },
    { time: 13 },
    { time: 14 },
    { time: 15 },
    { time: 16 },
    { time: 17 },
    { time: 18 },
    { time: 19 },
    { time: 20 },
    { time: 21 },
    { time: 22 },
    { time: 23 },
  ];
  useEffect(() => {
    const [year, month, day] = modalData.beginDate.split("-");
    !viewOnly
      ? setStartDate(`${year}-${day}-${month}`)
      : setStartDate(`${month}-${day}-${year}`);
    setStartHour(modalData.beginHour);

    if (modalData.endDate !== null) {
      const [eyear, emonth, eday] = modalData.endDate.split("-");
      !viewOnly
        ? setEndDate(`${eyear}-${eday}-${emonth}`)
        : setEndDate(`${emonth}-${eday}-${eyear}`);
      setEndDate(`${eyear}-${eday}-${emonth}`);
      setEndHour(modalData.endHour);
    }
  }, [modalData, viewOnly]);
  return (
    <div className="systemsCompTable">
      <div className="grid-container margin-bottom-2">
        <div className="display-inline-flex padding-top-3 padding-bottom-3">
          <Button
            type="button"
            name="btnModalGoBack"
            id="btnModalGoBack"
            epa-testid="btnModalGoBack"
            title="Go back to Systems Details"
            onClick={() => backBTN(false)}
          >
            <ArrowBackSharp className=" font-body-sm" />
          </Button>

          <h3>
            Fuel Code: {modalData["fuelCode"]}, System Type Code:{" "}
            {modalData["systemTypeCode"]}
          </h3>
        </div>

        <div className="grid-row margin-top-3">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label
                className="text-bold"
                htmlFor="RateSourceCode"
                tabIndex="0"
              >
                Rate Source Code
              </Label>
              {viewOnly ? (
                <div id="RateSourceCode" tabIndex="0">
                  {modalData["maxRateSourceCode"]
                    ? modalData["maxRateSourceCode"]
                    : ""}
                </div>
              ) : (
                <SelectBox
                  caption="Rate Source Code"
                  id="RateSourceCode"
                  name="RateSourceCode"
                  epa-testid="RateSourceCode"
                  selectKey="code"
                  options={acqMethodCode}
                  initialSelection={modalData.acquisitionMethodCode}
                  viewOnly={viewOnly}
                  required
                  secondOption="name"
                />
              )}
            </FormGroup>
          </div>
          <div className="tablet:grid-col" />
        </div>

        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label
                className="text-bold"
                htmlFor="MaxRate"
                hint={
                  viewOnly ? (
                    ""
                  ) : (
                    <span className="text-italic"> (Required)</span>
                  )
                }
              >
                {"MaxRate"}
              </Label>

              {viewOnly ? (
                <div id="MaxRate" tabIndex="0">
                  {modalData["maxRate"] ? modalData["maxRate"] : ""}
                </div>
              ) : (
                <TextInput
                  className="modalInput"
                  id="MaxRate"
                  name="MaxRate"
                  epa-testid="MaxRate"
                  title="Enter Max Rate"
                  type="text"
                  defaultValue={
                    modalData["maxRate"] ? modalData["maxRate"] : ""
                  }
                />
              )}
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <FormGroup className="margin-top-0">
              <Label className="text-bold" htmlFor="UnitOfMeasureCode">
                Unit of Measure Code
              </Label>
              {viewOnly ? (
                <div id="UnitsOfMeasureCode" tabIndex="0">
                  {modalData["sysFuelUomCode"]
                    ? modalData["sysFuelUomCode"]
                    : ""}
                </div>
              ) : (
                <SelectBox
                  caption="Unit of Measure Code"
                  id="UnitOfMeasureCode"
                  name="UnitOfMeasureCode"
                  epa-testid="UnitOfMeasureCode"
                  title="Select Units of Measure Code"
                  selectKey="code"
                  options={acqMethodCode}
                  initialSelection={modalData["acquisitionMethodCode"]}
                  required
                  secondOption="name"
                />
              )}
            </FormGroup>
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <div className="grid-row">
              <div className="grid-col ">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="startDate">
                    Start Date
                  </Label>
                  {viewOnly ? (
                    <div id="startDate" tabIndex="0">
                      {startDate ? startDate : ""}
                    </div>
                  ) : (
                    <div>
                      <div className="usa-hint" id="startDateHint">
                        mm/dd/yyyy
                      </div>
                      {startDate !== null ? (
                        <DatePicker
                          className="margin-0"
                          id="startDate"
                          name="startDate"
                          epa-testid="startDate"
                          title="Enter Start Date"
                          defaultValue={startDate}
                          onChange={() => void 0}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </FormGroup>
              </div>
              <div className="grid-col">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="startHour">
                    Start Time
                  </Label>
                  {viewOnly ? (
                    <div tabIndex="0" id="startHour">
                      {startHour ? startHour : ""}
                    </div>
                  ) : (
                    <SelectBox
                      name="startHour"
                      id="startHour"
                      epa-testid="startHour"
                      title="Enter start hour"
                      selectKey="startHour"
                      className="margin-0"
                      caption="hh"
                      options={timeOptions}
                      initialSelection={startHour}
                    />
                  )}
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <div className="grid-row">
              <div className="grid-col ">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="endDate">
                    End Date and Time
                  </Label>
                  {viewOnly ? (
                    <div tabIndex="0" id="endDate">
                      {endDate ? endDate : ""}
                    </div>
                  ) : (
                    <div>
                      <div className="usa-hint" id="endDate">
                        mm/dd/yyyy
                      </div>
                      <DatePicker
                        className="margin-0"
                        id="endDate"
                        name="endDate"
                        epa-testid="endDate"
                        title="Enter End Date"
                        defaultValue={endDate}
                        onChange={() => void 0}
                      />
                    </div>
                  )}
                </FormGroup>
              </div>
              <div className="grid-col">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="endHour">
                    End Time
                  </Label>
                  {viewOnly ? (
                    <div tabIndex="0" id="endHour">
                      {endHour ? endHour : ""}
                    </div>
                  ) : (
                    <SelectBox
                      className="margin-0"
                      id="endHour"
                      name="endHour"
                      epa-testid="endHour"
                      title="Enter Hour"
                      caption="hh"
                      options={timeOptions}
                      initialSelection={endHour}
                    />
                  )}
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemFuelFlowsModal;
