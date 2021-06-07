import React, { useEffect } from "react";
import {
  Label,
  FormGroup,
  TextInput,
  DatePicker,
  Button,
} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { acqMethodCode } from "./SystemFuelFlowsData";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";

const SystemFuelFlowsModal = ({ modalData, viewOnly, backBTN }) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [startHour, setStartHour] = React.useState(null);
  const [endHour, setEndHour] = React.useState(null);

  const findValue = (options, val) => {
    for (const x of options) {
      if (x.code === val) {
        return x.name;
      }
    }
    return options[0].name;
  };
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
      : setStartDate(`${day}-${month}-${year}`);
    setStartHour(modalData.beginHour);

    if (modalData.endDate !== null) {
      const [eyear, emonth, eday] = modalData.endDate.split("-");
      setEndDate(`${eyear}-${eday}-${emonth}`);
      setEndHour(modalData.endHour);
    }
  }, [modalData, viewOnly]);
  return (
    <div className="systemsCompTable">
      <div className="grid-container margin-bottom-2">
        <div className="display-inline-flex padding-top-3 padding-bottomm-3">
          <Button
            type="button"
            aria-label="go back to systems details"
            onClick={() => backBTN(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className=" font-body-sm" />
          </Button>

          <h3>Fuel Code: {modalData.sysFuelUomCode}</h3>
        </div>

        <div className="grid-row">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label
                className="margin-0"
                htmlFor="FuelCode"
                hint={
                  !viewOnly ? (
                    <span className="text-italic"> (Required)</span>
                  ) : (
                    ""
                  )
                }
              >
                Fuel Code
              </Label>
              <TextInput
                className="modalInput"
                id="FuelCode"
                name="FuelCode"
                type="text"
                disabled={viewOnly}
                defaultValue={
                  modalData.sysFuelUomCode ? modalData.sysFuelUomCode : ""
                }
              />
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            {" "}
            {viewOnly ? (
              <FormGroup className="margin-top-0">
                <Label className="margin-0" htmlFor="RateSourceCode">
                  Rate Source Code
                </Label>
                <TextInput
                  className="modalInput"
                  id="RateSourceCode"
                  name="RateSourceCode"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData.maxRateSourceCode
                      ? modalData.maxRateSourceCode
                      : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Rate Source Code"
                id="RateSourceCode"
                options={acqMethodCode}
                initialSelection={modalData.acquisitionMethodCode}
                selectKey="code"
                viewOnly={viewOnly}
                required
                secondOption="name"
              />
            )}
          </div>
        </div>

        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label
                className="margin-0"
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
              <TextInput
                className="modalInput"
                id="MaxRate"
                name="MaxRate"
                type="text"
                disabled={viewOnly}
                defaultValue={modalData.maxRate ? modalData.maxRate : ""}
              />
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            {" "}
            {viewOnly ? (
              <FormGroup className="margin-top-0">
                <Label className="margin-0" htmlFor="UnitOfMeasureCode">
                  Unit of Measure Code
                </Label>
                <TextInput
                  className="modalInput"
                  id="UnitOfMeasureCode"
                  name="UnitOfMeasureCode"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData.sysFuelUomCode ? modalData.sysFuelUomCode : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Unit of Measure Code"
                id="UnitOfMeasureCode"
                options={acqMethodCode}
                initialSelection={modalData.acquisitionMethodCode}
                selectKey="code"
                viewOnly={viewOnly}
                required
                secondOption="name"
              />
            )}
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <Label
              className="margin-0"
              id="StartDateAndTime"
              htmlFor="startTime"
            >
              Start Date and Time
            </Label>
            <div className="grid-row">
              <div className="grid-col ">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0" htmlFor="startTime">
                      mm/dd/yyyy
                    </Label>
                    <TextInput
                      className="modalInput"
                      id="startTime"
                      name="startTime"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={startDate ? startDate : ""}
                    />
                  </FormGroup>
                ) : (
                  <div>
                    <div className="usa-hint" id="startHour">
                      mm/dd/yyyy
                    </div>
                    {startDate !== null ? (
                      <DatePicker
                        className="margin-0"
                        id="startHour"
                        name="startHour"
                        disabled={viewOnly}
                        defaultValue={startDate}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
              <div className="grid-col">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0" htmlFor="startHour">
                      hh
                    </Label>
                    <TextInput
                      className="modalInput"
                      id="startHour"
                      name="startHour"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={startHour}
                    />
                  </FormGroup>
                ) : startHour !== null ? (
                  <SelectBox
                    className="margin-0"
                    caption="hh"
                    options={timeOptions}
                    initialSelection={startHour}
                    selectKey="time"
                    viewOnly={viewOnly}
                    // required={required}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <Label className="margin-0" id="EndDateAndTime" htmlFor="endDate">
              End Date and Time
            </Label>
            <div className="grid-row">
              <div className="grid-col ">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0" htmlFor="endDate">
                      mm/dd/yyyy
                    </Label>
                    <TextInput
                      className="modalInput"
                      id="endDate"
                      name="endDate"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={endDate ? endDate : ""}
                    />
                  </FormGroup>
                ) : (
                  <div>
                    <div className="usa-hint" id="endDate">
                      mm/dd/yyyy
                    </div>
                    <DatePicker
                      className="margin-0"
                      id="endDate"
                      name="endDate"
                      disabled={viewOnly}
                      defaultValue={endDate}
                    />
                  </div>
                )}
              </div>
              <div className="grid-col">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0" htmlFor="endHour">
                      hh
                    </Label>
                    <TextInput
                      className="modalInput"
                      id="endHour"
                      name="endHour"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={endHour}
                    />
                  </FormGroup>
                ) : startHour !== null ? (
                  <SelectBox
                    className="margin-0"
                    caption="hh"
                    options={timeOptions}
                    initialSelection={endHour}
                    selectKey="time"
                    viewOnly={viewOnly}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemFuelFlowsModal;
