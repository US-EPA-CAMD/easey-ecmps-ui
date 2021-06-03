import React, { useEffect, useState } from "react";
import {
  Label,
  FormGroup,
  Form,
  TextInput,
  DatePicker,
  Radio,
  Fieldset,
  Button,
} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  componentTypes,
  acqMethodCode,
  basisCode,
  viewOnly,
  setSecondLevel
} from "./SystemComponentsData";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";

const SystemComponentsModal = ({ modalData, viewOnly, backBTN }) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [startHour, setStartHour] = React.useState(null);
  const [endHour, setEndHour] = React.useState(null);

  const findValue = (options, val) => {
    for (let x of options) {
      if (x.code === val) {
        return x.name;
      }
    }
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
  }, [modalData]);
  return (
    <div className="systemsCompTable">
      <div className="grid-container margin-bottom-2">
        <div className="display-inline-flex padding-top-3 padding-bottomm-3">
          <Button aria-label="go back to systems details" onClick={() => backBTN(false)}>
            <FontAwesomeIcon icon={faArrowLeft} className=" font-body-sm" />
          </Button>

          <h3>Component: {modalData.componentIdentifier}</h3>
        </div>

        <div className="grid-row">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label
                className="margin-0"
                htmlFor="componentID"
                hint={
                  !viewOnly ? (
                    <span className="text-italic"> (Required)</span>
                  ) : (
                    ""
                  )
                }
              >
                Component ID
              </Label>
              <TextInput
                className="modalInput"
                id="componentID"
                name="componentID"
                type="text"
                disabled={viewOnly}
                defaultValue={
                  modalData.componentIdentifier
                    ? modalData.componentIdentifier
                    : ""
                }
              />
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            {" "}
            {viewOnly ? (
              <FormGroup className="margin-top-0">
                <Label className="margin-0" htmlFor="Acquisition">
                  Sample Acquisition Method
                </Label>
                <TextInput
                  className="modalInput"
                  id="Acquisition"
                  name="Acquisition"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData.acquisitionMethodCode
                      ? findValue(
                          acqMethodCode,
                          modalData.acquisitionMethodCode
                        )
                      : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Sample Acquisition Method"
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
            {viewOnly ? (
              <FormGroup className="margin-top-0">
                <Label className="margin-0" htmlFor="Component">
                  Component Type
                </Label>
                <TextInput
                  className="modalInput"
                  id="Component"
                  name="Component"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData.componentTypeCode
                      ? findValue(componentTypes, modalData.componentTypeCode)
                      : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Component Type"
                options={componentTypes}
                initialSelection={modalData.componentTypeCode}
                selectKey="code"
                viewOnly={viewOnly}
                required
                secondOption="name"
              />
            )}
          </div>
          <div className="tablet:grid-col padding-left-2">
            {viewOnly ? (
              <FormGroup className="margin-top-0">
                <Label className="margin-0" htmlFor="Basis">
                  Basis Description
                </Label>
                <TextInput
                  className="modalInput"
                  id="Basis"
                  name="Basis"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData.basisCode
                      ? findValue(basisCode, modalData.basisCode)
                      : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Basis Description"
                options={basisCode}
                initialSelection={modalData.basisCode}
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
                htmlFor="manufacturer"
                hint={viewOnly? '' : <span className="text-italic"> (Required)</span>}
              >
                Manufacturer
              </Label>
              <TextInput
                className="modalInput"
                id="manufacturer"
                name="manufacturer"
                type="text"
                disabled={viewOnly}
                defaultValue={
                  modalData.manufacturer ? modalData.manufacturer : ""
                }
              />
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <FormGroup className="margin-top-0">
              <Label
                className="margin-0"
                htmlFor="modelVersion"
                hint={viewOnly ? '' :<span className="text-italic"> (Required)</span>}
              >
                Modal or Version
              </Label>
              <TextInput
                className="modalInput"
                id="modelVersion"
                name="modelVersion"
                type="text"
                disabled={viewOnly}
                defaultValue={
                  modalData.modelVersion ? modalData.modelVersion : ""
                }
              />
            </FormGroup>
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label
                className="margin-0"
                htmlFor="serialNumber"
                hint={viewOnly? '' : <span className="text-italic"> (Required)</span>}
              >
                {"Serial Number"}
              </Label>
              <TextInput
                className="modalInput"
                id="serialNumber"
                name="serialNumber"
                type="text"
                disabled={viewOnly}
                defaultValue={
                  modalData.serialNumber ? modalData.serialNumber : ""
                }
              />
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <Fieldset
              legend="hg Converter Indicator"
              className=" display-inline-flex"
            >
              <Radio
                id="yes"
                name="hg-Converter-Indicator"
                label="Yes"
                value="Yes"
                className="padding-right-1"
                defaultChecked={modalData.hgConverterInd ? true : null}
                disabled={viewOnly && !modalData.hgConverterInd}
              />
              <Radio
                id="no"
                name="hg-Converter-Indicator"
                label="No"
                value="No"
                className="padding-left-1"
                defaultChecked={!modalData.hgConverterInd ? true : null}
                disabled={viewOnly && modalData.hgConverterInd}
              />
            </Fieldset>
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <Label className="margin-0" id="startTime">
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
            <Label className="margin-0" id="endDate">
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

export default SystemComponentsModal;
