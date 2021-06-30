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
    const [year, month, day] = modalData["beginDate"].split("-");
    !viewOnly
      ? setStartDate(`${year}-${month}-${day}`)
      : setStartDate(`${month}-${day}-${year}`);
    setStartHour(modalData["beginHour"]);

    if (modalData["endDate"] !== null) {
      const [eyear, emonth, eday] = modalData["endDate"].split("-");
      !viewOnly
        ? setEndDate(`${eyear}-${emonth}-${eday}`)
        : setEndDate(`${emonth}-${eday}-${eyear}`);
      setEndHour(modalData["endHour"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalData]);
  return (
    <div className="systemsCompTable">
      <div className="grid-container margin-bottom-2">
        <div className="display-inline-flex padding-top-1 padding-bottom-3">
          <h3 className="text-bold">Component: Monitoring Methods</h3>
          <input
            type="hidden"
            epadataname="id"
            id="id"
            name="id"
            className="modalUserInput"
            value={modalData["id"]}
          />
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label className="text-bold" htmlFor="Parameter">
                Parameter
              </Label>
              {!viewOnly ? (
                <SelectBox
                  className="modalUserInput"
                  epadataname="parameterCode"
                  caption="Parameter"
                  options={parameterCodes}
                  initialSelection={modalData["parameterCode"]}
                  selectKey="code"
                  id="Parameter"
                  epa-testid="Parameter"
                  name="Parameter"
                  required
                  secondOption="name"
                />
              ) : (
                <div tabIndex="0" id="Parameter">
                  {modalData["parameterCode"]
                    ? findValue(parameterCodes, modalData["parameterCode"])
                    : ""}
                </div>
              )}
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <FormGroup className="margin-top-0">
              <Label className="text-bold" htmlFor="Methodology">
                Methodology
              </Label>
              {!viewOnly ? (
                <SelectBox
                  className="modalUserInput"
                  epadataname="methodCode"
                  caption="Methodology"
                  options={methodCodes}
                  initialSelection={modalData["methodCode"]}
                  selectKey="code"
                  id="Methodology"
                  epa-testid="Methodology"
                  name="Methodology"
                  required
                  secondOption="name"
                />
              ) : (
                <div tabIndex="0" id="Methodology">
                  {modalData["methodCode"]
                    ? findValue(methodCodes, modalData["methodCode"])
                    : ""}
                </div>
              )}
            </FormGroup>
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <FormGroup className="margin-top-0">
              <Label className="text-bold" htmlFor="SubstituteDataApproach">
                Substitute Data Approach
              </Label>
              {!viewOnly ? (
                <SelectBox
                  caption="Substitute Data Approach"
                  options={substituteDataApproachCodes}
                  initialSelection={modalData["subDataCode"]}
                  selectKey="code"
                  className="modalUserInput"
                  epadataname="subDataCode"
                  id="SubstituteDataApproach"
                  epa-testid="SubstituteDataApproach"
                  name="SubstituteDataApproach"
                  required
                  secondOption="name"
                />
              ) : (
                <div tabIndex="0" id="SubstituteDataApproach">
                  {modalData["subDataCode"]
                    ? findValue(
                        substituteDataApproachCodes,
                        modalData["subDataCode"]
                      )
                    : ""}
                </div>
              )}
            </FormGroup>
          </div>
          <div className="tablet:grid-col padding-left-2">
            <FormGroup className="margin-top-0">
              <Label className="text-bold" htmlFor="BypassApproach">
                Bypass Approach
              </Label>
              {!viewOnly ? (
                <SelectBox
                  className="modalUserInput"
                  caption="Bypass Approach"
                  options={bypassApproachCodes}
                  initialSelection={modalData["bypassApproachCode"]}
                  selectKey="code"
                  id="BypassApproach"
                  epadataname="bypassApproachCode"
                  epa-testid="BypassApproach"
                  name="BypassApproach"
                  required
                  secondOption="name"
                />
              ) : (
                <div tabIndex="0" id="BypassApproach">
                  {modalData["bypassApproachCode"]
                    ? findValue(
                        bypassApproachCodes,
                        modalData["bypassApproachCode"]
                      )
                    : ""}
                </div>
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
                    Start Date and Time
                    <br />
                    mm/dd/yyyy
                  </Label>
                  {!viewOnly ? (
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
                          defaultValue={startDate}
                          onChange={() => void 0}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div tabIndex="0" id="startDate">
                      {startDate ? startDate : ""}
                    </div>
                  )}
                </FormGroup>
              </div>
            </div>
            <div className="grid-row">
              <div className="grid-col">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold width-9" htmlFor="startHour">
                    hh
                  </Label>
                  {!viewOnly ? (
                    startHour !== null ? (
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
                      />
                    ) : (
                      ""
                    )
                  ) : (
                    <div id="startHour">{startHour ? startHour : ""}</div>
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
                    <br />
                    mm/dd/yyyy
                  </Label>
                  {!viewOnly ? (
                    <div>
                      <div className="usa-hint" id="endDate">
                        mm/dd/yyyy
                      </div>
                      {startDate !== null ? (
                        <DatePicker
                          className="margin-0 modalUserInput"
                          id="endDate"
                          name="endDate"
                          epadataname="endDate"
                          epa-testid="endDate"
                          disabled={viewOnly}
                          defaultValue={endDate}
                          onChange={() => void 0}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div tabIndex="0" id="endDate">
                      {endDate ? endDate : ""}
                    </div>
                  )}
                </FormGroup>
              </div>
            </div>
            <div className="grid-row">
              <div className="grid-col">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="endHour">
                    hh
                  </Label>
                  {!viewOnly ? (
                    startHour !== null ? (
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
                      />
                    ) : (
                      ""
                    )
                  ) : (
                    <div tabIndex="0" id="endHour">
                      {endHour ? endHour : endHour}
                    </div>
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

export default MethodModal;
