import React, { useEffect, useState } from "react";
import {
  Label,
  FormGroup,
  Form,
  TextInput,
  DatePicker,
} from "@trussworks/react-uswds";

import "./Details.scss";

import SelectBox from "../DetailsSelectBox/DetailsSelectBox";
import { types, fuels, designations } from "./SystemDescriptions";

const Details = ({ modalData, viewOnly }) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate] = React.useState(null);
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
      viewOnly
        ? setStartDate(`${day}-${month}-${year}`)
        : setStartDate(`${year}-${day}-${month}`);
      setStartHour(startDateString[1]);

      if (modalData[5] !== "") {
        const endDateString = modalData[5].value.split(/[ ,]+/);
        const [eday, emonth, eyear] = endDateString[0].split("/");
        viewOnly
          ? setEndHour(`${eday}-${emonth}-${eyear}`)
          : setEndHour(`${eyear}-${eday}-${emonth}`);
        setEndHour(endDateString[1]);
      }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalData]);
  return (
    <div>
      {
        <div className="modalDetails ">
          <h2>
            Monitoring Systems: {modalData.length >= 1 ? modalState[0] : ""}
          </h2>
          <Form>
            <div className=" grid-row">
              <div className="grid-col padding-bottom-2 padding-right-3">
                <FormGroup className="margin-top-0">
                  <Label
                    className="margin-0"
                    htmlFor="otherInput"
                    hint={
                      viewOnly ? (
                        ""
                      ) : (
                        <span className="text-italic"> (Required)</span>
                      )
                    }
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
              <div className="grid-col">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0" htmlFor="sysdes">
                      System Designation
                    </Label>
                    <TextInput
                      className="modalInput"
                      id="sysdes"
                      name="sysdes"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={modalData.length >= 1 ? modalState[2] : ""}
                    />
                  </FormGroup>
                ) : (
                  <SelectBox
                    caption="System Designation"
                    options={designations}
                    selectKey="code"
                    required
                    viewOnly={viewOnly}
                    initialSelection={
                      modalData.length >= 1 ? modalState[2] : ""
                    }
                  />
                )}
              </div>
            </div>
            <div className="grid-row">
              <div className="grid-col padding-bottom-2 padding-right-3">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0" htmlFor="systype">
                      System Type
                    </Label>
                    <TextInput
                      className="modalInput"
                      id="systype"
                      name="systype"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={modalData.length >= 1 ? modalState[1] : ""}
                    />
                  </FormGroup>
                ) : (
                  <SelectBox
                    caption="System Type"
                    options={types}
                    initialSelection={
                      modalData.length >= 1 ? modalState[1] : ""
                    }
                    selectKey="code"
                    viewOnly={viewOnly}
                    required
                  />
                )}
              </div>
              <div className="grid-col">
                {viewOnly ? (
                  <FormGroup className="margin-top-0">
                    <Label className="margin-0" htmlFor="fueltype">
                      Fuel Type
                    </Label>
                    <TextInput
                      className="modalInput"
                      id="fueltype"
                      name="fueltype"
                      type="text"
                      disabled={viewOnly}
                      defaultValue={modalData.length >= 1 ? modalState[3] : ""}
                    />
                  </FormGroup>
                ) : (
                  <SelectBox
                    caption="Fuel Type"
                    options={fuels}
                    initialSelection={
                      modalData.length >= 1 ? modalState[3] : ""
                    }
                    selectKey="code"
                    viewOnly={viewOnly}
                    required
                  />
                )}
              </div>
            </div>
            <div className="grid-row">
              <div className="grid-col padding-bottom-2 padding-right-3">
                <Label className="margin-0" id="dateStart">
                  Start Date and Time {viewOnly ? "" : "(Required)"}
                </Label>
                <div className="grid-row">
                  <div className="grid-col">
                    {viewOnly ? (
                      <FormGroup className="margin-top-0">
                        <Label className="margin-0" htmlFor="startDate">
                          mm/dd/yyyy
                        </Label>
                        <TextInput
                          className="modalInput"
                          id="startDate"
                          name="startDate"
                          type="text"
                          disabled={viewOnly}
                          defaultValue={startDate}
                        />
                      </FormGroup>
                    ) : (
                      <div>
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
                          defaultValue={startHour!== "-undefined-undefined"? startHour:0}
                        />
                      </FormGroup>
                    ) : startHour !== null ? (
                      <SelectBox
                        caption="hh"
                        options={timeOptions}
                        initialSelection={startHour}
                        selectKey="time"
                        viewOnly={viewOnly}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="grid-col">
                <Label className="margin-0" id="dateEnd">
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
                          defaultValue={
                            endDate !== "undefined--undefined" ? endDate : ""
                          }
                        />
                      </FormGroup>
                    ) : (
                      <>
                        <div className="usa-hint" id="dateEnd">
                          mm/dd/yyyy
                        </div>
                        
                          <DatePicker
                            id="dateEnd"
                            name="dateEnd"
                            disabled={viewOnly}
                            defaultValue={endDate!==null?endDate:null}
                          />
                        
                      </>
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
                    ) : endHour !== null ? (
                      <SelectBox
                        className="margin-0"
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
