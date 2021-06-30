import React, { useEffect } from "react";
import {
  Label,
  FormGroup,
  TextInput,
  DatePicker,
} from "@trussworks/react-uswds";
import {
  bypassApproachCodes,
  substituteDataApproachCodes,
  parameterCodes,
  methodCodes,
} from "./MethodModalData";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";

const MethodModal = ({ modalData, viewOnly }) => {
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
      ? setStartDate(`${year}-${month}-${day}`)
      : setStartDate(`${month}-${day}-${year}`);
    setStartHour(modalData.beginHour);

    if (modalData.endDate !== null) {
      const [eyear, emonth, eday] = modalData.endDate.split("-");
      !viewOnly
        ? setEndDate(`${eyear}-${emonth}-${eday}`)
        : setEndDate(`${emonth}-${eday}-${eyear}`);
      setEndHour(modalData.endHour);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalData]);
  return (
    <div className="systemsCompTable">
      <div className="grid-container margin-bottom-2">
        <div className="display-inline-flex padding-top-3 padding-bottom-3">
          <h3>Component: Monitoring Methods</h3>
          <input
            type="hidden"
            epadataname="id"
            id="id"
            name="id"
            className="modalUserInput"
            value={modalData.id}
          />
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            {viewOnly ? (
              <FormGroup className="margin-top-0">
                <Label className="margin-0" htmlFor="Parameter">
                  Parameter
                </Label>
                <TextInput
                  className="modalInput"
                  id="Parameter"
                  epa-testid="Parameter"
                  name="Parameter"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData.parameterCode
                      ? findValue(parameterCodes, modalData.parameterCode)
                      : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                className="modalUserInput"
                epadataname="parameterCode"
                caption="Parameter"
                options={parameterCodes}
                initialSelection={modalData.parameterCode}
                selectKey="code"
                id="Parameter"
                epa-testid="Parameter"
                name="Parameter"
                viewOnly={viewOnly}
                required
                secondOption="name"
              />
            )}
          </div>
          <div className="tablet:grid-col padding-left-2">
            {viewOnly ? (
              <FormGroup className="margin-top-0">
                <Label className="margin-0" htmlFor="Methodology">
                  Methodology
                </Label>
                <TextInput
                  className="modalInput"
                  id="Methodology"
                  epa-testid="Methodology"
                  name="Methodology"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData.methodCode
                      ? findValue(methodCodes, modalData.methodCode)
                      : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                className="modalUserInput"
                epadataname="methodCode"
                caption="Methodology"
                options={methodCodes}
                initialSelection={modalData.methodCode}
                selectKey="code"
                id="Methodology"
                epa-testid="Methodology"
                name="Methodology"
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
                <Label className="margin-0" htmlFor="SubstituteDataApproach">
                  {"Substitute Data Approach"}
                </Label>
                <TextInput
                  className="modalInput"
                  id="SubstituteDataApproach"
                  epa-testid="SubstituteDataApproach"
                  name="SubstituteDataApproach"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData.subDataCode
                      ? findValue(
                          substituteDataApproachCodes,
                          modalData.subDataCode
                        )
                      : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Substitute Data Approach"
                options={substituteDataApproachCodes}
                initialSelection={modalData.subDataCode}
                selectKey="code"
                className="modalUserInput"
                epadataname="subDataCode"
                id="SubstituteDataApproach"
                epa-testid="SubstituteDataApproach"
                name="SubstituteDataApproach"
                viewOnly={viewOnly}
                required
                secondOption="name"
              />
            )}
          </div>
          <div className="tablet:grid-col padding-left-2">
            {viewOnly ? (
              <FormGroup className="margin-top-0">
                <Label className="margin-0" htmlFor="BypassApproach">
                  Bypass Approach
                </Label>
                <TextInput
                  className="modalInput"
                  id="BypassApproach"
                  epa-testid="BypassApproach"
                  name="BypassApproach"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={
                    modalData.bypassApproachCode
                      ? findValue(
                          bypassApproachCodes,
                          modalData.bypassApproachCode
                        )
                      : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                className="modalUserInput"
                caption="Bypass Approach"
                options={bypassApproachCodes}
                initialSelection={modalData.bypassApproachCode}
                selectKey="code"
                id="BypassApproach"
                epadataname="bypassApproachCode"
                epa-testid="BypassApproach"
                name="BypassApproach"
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
              htmlFor="startDate"
            >
              Start Date and Time
            </Label>
            <div className="grid-row">
              <div className="grid-col ">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0" htmlFor="startDate">
                      mm/dd/yyyy
                    </Label>
                    <TextInput
                      className="modalInput"
                      id="startDate"
                      name="startDate"
                      epa-testid="startData"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={startDate ? startDate : ""}
                    />
                  </FormGroup>
                ) : (
                  <div>
                    <div className="usa-hint" id="startDate">
                      mm/dd/yyyy
                    </div>
                    {startDate !== null ? (
                      <DatePicker
                        className="margin-0 modalUserInput"
                        id="startDate"
                        name="startDate"
                        epadataname="beginDate"
                        epa-testid="startDate"
                        disabled={viewOnly}
                        defaultValue={startDate}
                        onChange={() => void 0}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="grid-row">
              <div className="grid-col">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0 width-9" htmlFor="startHour">
                      hh
                    </Label>
                    <TextInput
                      className="modalInput"
                      id="startHour"
                      name="startHour"
                      epa-testid="startHour"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={startHour}
                    />
                  </FormGroup>
                ) : startHour !== null ? (
                  <SelectBox
                    className="margin-0 width-9 modalUserInput"
                    caption="hh"
                    id="startHour"
                    name="startHour"
                    epadataname="beginHour"
                    epa-testid="startHour"
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
                      epa-testid="endDate"
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
                    {endDate !== null ? (
                      <DatePicker
                        className="margin-0 modalUserInput"
                        id="endDate"
                        name="endDate"
                        epadataname="endDate"
                        epa-testid="endDate"
                        disabled={viewOnly}
                        defaultValue={endDate}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="grid-row">
              <div className="grid-col">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0" htmlFor="endHour">
                      hh
                    </Label>
                    <TextInput
                      className="width-9"
                      id="endHour"
                      name="endHour"
                      epa-testid="endHour"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={endHour}
                    />
                  </FormGroup>
                ) : startHour !== null ? (
                  <SelectBox
                    className="margin-0 width-9 modalUserInput"
                    caption="hh"
                    id="endHour"
                    name="endHour"
                    epadataname="endHour"
                    epa-testid="endHour"
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

export default MethodModal;
