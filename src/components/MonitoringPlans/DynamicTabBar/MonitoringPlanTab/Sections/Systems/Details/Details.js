import React, { useEffect,useState } from "react";
import {
  Label,
  FormGroup,
  Form,
  TextInput,
  DatePicker,
} from "@trussworks/react-uswds";

import "./Details.css";

import SelectBox from "./SelectBox/SelectBox";
import { types, fuels, designations } from "./SystemDescriptions";

const Details = ({ modalData, viewOnly }) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [startHour, setStartHour] = React.useState(null);
  const [endHour, setEndHour] = React.useState(null);
  const [modalState, setModalSet] = useState([]);

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
    if (modalData.length > 1) {
      setModalSet([
        modalData[0].value,
        modalData[1].value,
        modalData[2].value,
        modalData[3].value,
        modalData[4].value,
        modalData[5].value,
      ]);
      const startDateString = modalData[4].value.split(/[ ,]+/);
      const [day, month, year] = startDateString[0].split("/");
      setStartDate(`${year}-${day}-${month}`);
      setStartHour(startDateString[1]);

      if (modalData[5] !== "") {
        const endDateString = modalData[5].value.split(/[ ,]+/);
        const [eday, emonth, eyear] = endDateString[0].split("/");
        setEndDate(`${eyear}-${eday}-${emonth}`);
        setEndHour(endDateString[1]);
      }
    }
  }, [modalData]);
  return (
    <div>
      {
        <div className="modalDetails">
          <h2>
            Monitoring Systems: {modalData.length >= 1 ? modalState[0] : ""}
          </h2>
          <Form>
            <div className="modalRow">
              <div className="modalColumn">
                <FormGroup className="dateLabels">
                  <Label
                    htmlFor="otherInput"
                    hint={<span className="requiredItalics"> (Required)</span>}
                  >
                    System ID
                  </Label>
                  <TextInput
                    className="modalInput"
                    id="otherInput"
                    name="otherInput"
                    type="text"
                    disabled={viewOnly}
                    defaultValue={modalData.length >= 1 ? modalState[0] : ""}
                  />
                </FormGroup>
              </div>
              <div className="modalColumnRight">
                <SelectBox
                  caption="System Designation"
                  options={designations}
                  selectKey="code"
                  required
                  viewOnly={viewOnly}
                  initialSelection={modalData.length >= 1 ? modalState[2] : ""}
                />
              </div>
            </div>
            <div className="modalRow">
              <div className="modalColumn">
                <SelectBox
                  caption="System Type"
                  options={types}
                  initialSelection={modalData.length >= 1 ? modalState[1] : ""}
                  selectKey="code"
                  viewOnly={viewOnly}
                  required
                />
              </div>
              <div className="modalColumnRight">
                <SelectBox
                  caption="Fuel Type"
                  options={fuels}
                  initialSelection={modalData.length >= 1 ? modalState[3] : ""}
                  selectKey="code"
                  viewOnly={viewOnly}
                  required
                />
              </div>
            </div>
            <div className="modalRow">
              <div className="modalColumn">
                <div className="dateLabels">
                  <Label id="dateStart">Start Date and Time (Required)</Label>

                  <div className="modalColumnDate dateLabels">
                    <div className="usa-hint" id="dateStart">
                      mm/dd/yyyy
                    </div>
                    {startDate !== null ? (
                      <DatePicker
                        id="dateStart"
                        name="dateStart"
                        disabled={viewOnly}
                        defaultValue={startDate}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="modalColumnDateRight">
                    {startHour !== null ? (
                      <SelectBox
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
              <div className="modalColumnRight">
                <div className="dateLabels">
                  <Label id="dateEnd">End Date and Time</Label>

                  <div className="modalColumnDate dateLabels">
                    <div className="usa-hint" id="dateEnd">
                      mm/dd/yyyy
                    </div>
                    {endDate !== null ? (
                      <DatePicker
                        id="dateEnd"
                        name="dateEnd"
                        disabled={viewOnly}
                        defaultValue={endDate}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="modalColumnDateRight">
                    {endHour !== null ? (
                      <SelectBox
                        caption="hh"
                        options={timeOptions}
                        initialSelection={endHour}
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
            </div>
          </Form>
        </div>
      }
    </div>
  );
};

export default Details;
