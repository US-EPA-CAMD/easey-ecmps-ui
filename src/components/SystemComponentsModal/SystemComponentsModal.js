import React, { useEffect } from "react";
import {
  Label,
  FormGroup,
  TextInput,
  DatePicker,
  Radio,
  Fieldset,
  Button,
} from "@trussworks/react-uswds";
import { ArrowBackSharp } from "@material-ui/icons";
import {
  componentTypes,
  acqMethodCode,
  basisCode,
} from "./SystemComponentsData";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";

const SystemComponentsModal = ({ modalData, viewOnly, backBTN }) => {
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
      : setStartDate(`${month}-${day}-${year}`);
    setStartHour(modalData.beginHour);

    if (modalData.endDate !== null) {
      const [eyear, emonth, eday] = modalData.endDate.split("-");
      !viewOnly
        ? setEndDate(`${year}-${day}-${month}`)
        : setEndDate(`${emonth}-${eday}-${eyear}`);
      setEndHour(modalData.endHour);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalData]);
  return (
    <div className="systemsCompTable">
      <div className="grid-container margin-bottom-2">
        <div className="display-inline-flex padding-y-3">
          <Button
            type="button"
            aria-label="go back to systems details"
            onClick={() => backBTN(false)}
          >
            <ArrowBackSharp className=" font-body-sm" />
          </Button>

          <h3>Component: {modalData["componentIdentifier"]}</h3>
        </div>

        <div className="grid-row">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label
                className="text-bold"
                htmlFor="ComponentId"
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
              {viewOnly ? (
                <div tabIndex="0" id="ComponentId">
                  {modalData["componentIdentifier"]
                    ? modalData["componentIdentifier"]
                    : ""}
                </div>
              ) : (
                <TextInput
                  className="modalInput"
                  id="ComponentId"
                  name="ComponentId"
                  epa-testid="ComponentId"
                  type="text"
                  defaultValue={
                    modalData["componentIdentifier"]
                      ? modalData["componentIdentifier"]
                      : ""
                  }
                />
              )}
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            {" "}
            <FormGroup className="margin-top-0">
              <Label className="text-bold" htmlFor="SampleAcquisitionMethod">
                Sample Acquisition Method
              </Label>
              {viewOnly ? (
                <div tabIndex="0" id="SampeAcquisitionMethod">
                  {modalData.acquisitionMethodCode
                    ? findValue(acqMethodCode, modalData.acquisitionMethodCode)
                    : ""}
                </div>
              ) : (
                <SelectBox
                  caption="Sample Acquisition Method"
                  id="SampleAcquisitionMethod"
                  options={acqMethodCode}
                  initialSelection={modalData.acquisitionMethodCode}
                  selectKey="code"
                  required
                  secondOption="name"
                />
              )}
            </FormGroup>
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label className="text-bold" htmlFor="ComponentType">
                Component Type
              </Label>
              {viewOnly ? (
                <div tabIndex="0" id="ComponentType">
                  {" "}
                  {modalData.componentTypeCode
                    ? findValue(componentTypes, modalData.componentTypeCode)
                    : ""}
                </div>
              ) : (
                <SelectBox
                  caption="Component Type"
                  options={componentTypes}
                  initialSelection={modalData.componentTypeCode}
                  selectKey="code"
                  id={"ComponentType"}
                  required
                  secondOption="name"
                />
              )}
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <FormGroup className="margin-top-0">
              <Label className="margin-0" htmlFor="BasisDescription">
                Basis Description
              </Label>
              {viewOnly ? (
                <div id="BasisDescription" tabIndex="0">
                  {modalData.basisCode
                    ? findValue(basisCode, modalData.basisCode)
                    : ""}
                </div>
              ) : (
                <SelectBox
                  caption="Basis Description"
                  options={basisCode}
                  initialSelection={modalData.basisCode}
                  selectKey="code"
                  viewOnly={viewOnly}
                  required
                  id={"BasisDescription"}
                  secondOption="name"
                />
              )}
            </FormGroup>
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label
                className="text-bold"
                htmlFor="Manufacturer"
                hint={
                  viewOnly ? (
                    ""
                  ) : (
                    <span className="text-italic"> (Required)</span>
                  )
                }
              >
                Manufacturer
              </Label>
              {viewOnly ? (
                <div tabIndex="0" id="Manufacturer">
                  {modalData["manufacturer"]}
                </div>
              ) : (
                <TextInput
                  className="modalInput"
                  id="Manufacturer"
                  name="Manufacturer"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData["manufacturer"] ? modalData["manufacturer"] : ""
                  }
                />
              )}
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <FormGroup className="margin-top-0">
              <Label
                className="text-bold"
                htmlFor="ModelOrVersion"
                hint={
                  viewOnly ? (
                    ""
                  ) : (
                    <span className="text-italic"> (Required)</span>
                  )
                }
              >
                Model or Version
              </Label>
              {viewOnly ? (
                <div tabIndex="0" id="ModelOrVersion">
                  {modalData["modelVersion"]}
                </div>
              ) : (
                <TextInput
                  className="modalInput"
                  id="ModelOrVersion"
                  name="ModelOrVersion"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData["modelVersion"] ? modalData["modelVersion"] : ""
                  }
                />
              )}
            </FormGroup>
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label
                className="text-bold"
                htmlFor="SerialNumber"
                hint={
                  viewOnly ? (
                    ""
                  ) : (
                    <span className="text-italic"> (Required)</span>
                  )
                }
              >
                {"Serial Number"}
              </Label>
              {viewOnly ? (
                <div tabIndex="0" id="SerialNumber">
                  {modalData["serialNumber"]}
                </div>
              ) : (
                <TextInput
                  className="modalInput"
                  id="SerialNumber"
                  name="SerialNumber"
                  type="text"
                  defaultValue={
                    modalData["serialNumber"] ? modalData["serialNumber"] : ""
                  }
                />
              )}
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            {viewOnly ? (
              <div>
                <Label className="text-bold" htmlFor="Hg-Converter-Indicator">
                  Hg Converter Indicator
                </Label>
                <div tabIndex="0" id="Hg-Converter-Indicator">
                  {modalData["hgConverterInd"] ? "Yes" : "No"}
                </div>
              </div>
            ) : (
              <Fieldset
                legend="Hg Converter Indicator"
                className=" display-inline-flex"
                id="HgConverterIndicator"
              >
                <Radio
                  id="Hg-Converter-Indicator_1"
                  name="Hg-Converter-Indicator"
                  label="Yes"
                  value="Yes"
                  className="padding-right-1"
                  defaultChecked={modalData["hgConverterInd"] ? true : null}
                />
                <Radio
                  id="Hg-Converter-Indicator_2"
                  name="Hg-Converter-Indicator"
                  label="No"
                  value="No"
                  className="padding-left-1"
                  defaultChecked={!modalData["hgConverterInd"] ? true : null}
                  disabled={viewOnly && modalData["hgConverterInd"]}
                />
              </Fieldset>
            )}
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <div className="grid-row">
              <div className="grid-col ">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="startDate">
                    <div>Start Date and Time</div>
                    <div>mm/dd/yyyy</div>
                  </Label>
                  {viewOnly ? (
                    <div tabIndex="0" id="StartDateAndTime">
                      {startDate ? startDate : ""}
                    </div>
                  ) : startDate !== null ? (
                    <DatePicker
                      className="margin-0"
                      id="startDate"
                      name="startDate"
                      defaultValue={startDate}
                    />
                  ) : (
                    ""
                  )}
                </FormGroup>
              </div>
              <div className="grid-col">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="startHour">
                    <div />
                    <div>hh</div>
                  </Label>
                  {viewOnly ? (
                    <div tabIndex="0" id="startHour">
                      {startHour ? startHour : ""}
                    </div>
                  ) : startHour !== null ? (
                    <SelectBox
                      className="margin-0"
                      caption="hh"
                      options={timeOptions}
                      initialSelection={startHour}
                      selectKey="time"
                    />
                  ) : null}
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <div className="grid-row">
              <div className="grid-col ">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="endDate">
                    <div>End Date and Time</div>
                    <div>mm/dd/yyyy</div>
                  </Label>
                  {viewOnly ? (
                    <div tabIndex="0" id="EndDateAndTime">
                      {startDate ? startDate : ""}
                    </div>
                  ) : endDate !== null ? (
                    <DatePicker
                      className="margin-0"
                      id="endDate"
                      name="endDate"
                      defaultValue={endDate}
                    />
                  ) : (
                    ""
                  )}
                </FormGroup>
              </div>
              <div className="grid-col">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="endHour">
                    <div />
                    <div>hh</div>
                  </Label>
                  {viewOnly ? (
                    <div tabIndex="0" id="endHour">
                      {endHour ? endHour : ""}
                    </div>
                  ) : endHour !== null ? (
                    <SelectBox
                      className="margin-0"
                      caption="hh"
                      options={timeOptions}
                      initialSelection={endHour}
                      selectKey="time"
                    />
                  ) : null}
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemComponentsModal;
