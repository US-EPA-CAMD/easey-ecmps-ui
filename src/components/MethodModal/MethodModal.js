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
// import {
//   componentTypes,
//   acqMethodCode,
//   basisCode
// } from "./SystemComponentsData";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";

const MethodModal = ({ modalData, viewOnly, backBTN }) => {
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
        <div className="display-inline-flex padding-top-3 padding-bottomm-3">
          <Button
            aria-label="go back to systems details"
            onClick={() => backBTN(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className=" font-body-sm" />
          </Button>

          <h3>Component: {modalData.componentIdentifier}</h3>
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
                  defaultValue={''
                    // modalData.componentTypeCode
                    //   ? findValue(componentTypes, modalData.componentTypeCode)
                    //   : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Parameter"
                options={[]]}
                initialSelection={1}
                selectKey="code"
                id ={"Parameter"}
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
                  defaultValue={''
                    // modalData.componentTypeCode
                    //   ? findValue(componentTypes, modalData.componentTypeCode)
                    //   : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Methodology"
                options={[]]}
                initialSelection={1}
                selectKey="code"
                id ={"Methodology"}
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
                  defaultValue={''
                    // modalData.componentTypeCode
                    //   ? findValue(componentTypes, modalData.componentTypeCode)
                    //   : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Substitute Data Approach"
                options={[]]}
                initialSelection={1}
                selectKey="code"
                id ={"SubstituteDataApproach"}
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
                  Parameter
                </Label>
                <TextInput
                  className="modalInput"
                  id="BypassApproach"
                  epa-testid="BypassApproach"
                  name="BypassApproach"
                  type="text"
                  disabled={viewOnly}
                  defaultValue={''
                    // modalData.componentTypeCode
                    //   ? findValue(componentTypes, modalData.componentTypeCode)
                    //   : ""
                  }
                />
              </FormGroup>
            ) : (
              <SelectBox
                caption="Bypass Approach"
                options={[]]}
                initialSelection={1}
                selectKey="code"
                id ={"BypassApproach"}
                viewOnly={viewOnly}
                required
                secondOption="name"
              />
            )}
          </div>
        </div>
        <div className="grid-row padding-top-2">
          <div className="tablet:grid-col">
            <Label className="margin-0" id="StartDateAndTime">
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
            <Label className="margin-0" id="EndDateAndTime">
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

export default MethodModal;
