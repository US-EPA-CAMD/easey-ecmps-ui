import React, { useEffect, useState } from "react";
import { Label, FormGroup, DatePicker } from "@trussworks/react-uswds";
import {
  bypassApproachCodes,
  substituteDataApproachCodes,
  parameterCodes,
  methodCodes,
} from "../datatablesContainer/DataTableMethod/MethodModalData";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";

import * as dmApi from "../../utils/api/dataManagementApi";

const MethodModal = ({ modalData, viewOnly }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);

  const [parameterCodesOptions, setParameterCodesOptions] = useState(null);
  const [methodCodesOptions, setMethodCodesOptions] = useState(null);
  const [
    substituteDataApproachOptions,
    setsubstituteDataApproachOptions,
  ] = useState(null);
  const [bypassCodesOptions, setBypassCodesOptions] = useState(null);

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

  // *** obtain data for dropdowns
  useEffect(() => {
    dmApi.getAllParameterCodes().then((response) => {
      const options = response.data.map((option) => {
        return {
          code: option["parameterCode"],
          name: option["parameterCodeDescription"],
        };
      });

      options.unshift({ code: "", name: "" });
      setParameterCodesOptions(options);
    });

    dmApi.getAllMethodCodes().then((response) => {
      const options = response.data.map((option) => {
        return {
          code: option["methodCode"],
          name: option["methodCodeDescription"],
        };
      });

      options.unshift({ code: "", name: "" });
      setMethodCodesOptions(options);
    });

    dmApi.getAllSubstituteDataCodes().then((response) => {
      const options = response.data.map((option) => {
        return {
          code: option["subDataCode"],
          name: option["subDataCodeDescription"],
        };
      });

      options.unshift({ code: "", name: "" });
      setsubstituteDataApproachOptions(options);
    });

    dmApi.getAllBypassApproachCodes().then((response) => {
      const options = response.data.map((option) => {
        return {
          code: option["bypassApproachCode"],
          name: option["bypassApproachCodeDescription"],
        };
      });

      options.unshift({ code: "", name: "" });
      setBypassCodesOptions(options);
    });
  }, []);

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
      <div className="grid-container padding-0 margin-bottom-2">
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
                Parameter {!viewOnly ? "(Required)" : null}
              </Label>
              {!viewOnly ? (
                <SelectBox
                  className="modalUserInput"
                  epadataname="parameterCode"
                  options={
                    parameterCodesOptions !== null
                      ? parameterCodesOptions
                      : [{}]
                  }
                  initialSelection={modalData["parameterCode"]}
                  selectKey="code"
                  id="Parameter"
                  epa-testid="Parameter"
                  name="Parameter"
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
                Methodology {!viewOnly ? "(Required)" : null}
              </Label>
              {!viewOnly ? (
                <SelectBox
                  className="modalUserInput"
                  epadataname="methodCode"
                  options={
                    methodCodesOptions !== null ? methodCodesOptions : [{}]
                  }
                  initialSelection={modalData["methodCode"]}
                  selectKey="code"
                  id="Methodology"
                  epa-testid="Methodology"
                  name="Methodology"
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
                Substitute Data Approach {!viewOnly ? "(Required)" : null}
              </Label>
              {!viewOnly ? (
                <SelectBox
                  options={
                    substituteDataApproachOptions !== null
                      ? substituteDataApproachOptions
                      : [{}]
                  }
                  initialSelection={modalData["subDataCode"]}
                  selectKey="code"
                  className="modalUserInput"
                  epadataname="subDataCode"
                  id="SubstituteDataApproach"
                  epa-testid="SubstituteDataApproach"
                  name="SubstituteDataApproach"
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
                Bypass Approach {!viewOnly ? "(Required)" : null}
              </Label>
              {!viewOnly ? (
                <SelectBox
                  className="modalUserInput"
                  /*caption="Bypass Approach"*/
                  options={
                    bypassCodesOptions !== null ? bypassCodesOptions : [{}]
                  }
                  initialSelection={modalData["bypassApproachCode"]}
                  selectKey="code"
                  id="BypassApproach"
                  epadataname="bypassApproachCode"
                  epa-testid="BypassApproach"
                  name="BypassApproach"
                  /*required*/
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
                    Start Date {!viewOnly ? "(Required)" : null}
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
          </div>
          <div className="tablet:grid-col padding-left-2">
            <div className="grid-row">
              <div className="grid-col ">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="startHour">
                    Start Time {!viewOnly ? "(Required)" : null}
                  </Label>
                  {!viewOnly ? (
                    startHour !== null ? (
                      <SelectBox
                        className="margin-0 width-15 modalUserInput"
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
                    <div tabIndex="0" id="startHour">
                      {startHour ? startHour : ""}
                    </div>
                  )}
                </FormGroup>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <div className="grid-row">
              <div className="grid-col">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="endDate">
                    End Date
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
          </div>
          <div className="tablet:grid-col padding-left-2">
            <div className="grid-row">
              <div className="grid-col">
                <FormGroup className="margin-top-0">
                  <Label className="text-bold" htmlFor="endHour">
                    End Time
                  </Label>
                  {!viewOnly ? (
                    startHour !== null ? (
                      <SelectBox
                        className="margin-0 width-15 modalUserInput"
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
                      {endHour ? endHour : ""}
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
