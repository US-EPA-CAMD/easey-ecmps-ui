import React, { useState, useEffect } from "react";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

const SectionDrop = ({
  orisCode,
  caption,
  selectKey,
  selectionHandler,
  initialSelection,
  required,
  monitoringPlans,
  activeTab,
}) => {
  const getIndex = (val) => {
    return sections.findIndex((obj) => obj.name === val);
  };

  const sections = [
    { name: "Loads" },
    { name: "Location Attributes" },
    { name: "Monitoring Defaults" },
    { name: "Monitoring Methods" },
    { name: "Monitoring Systems" },
    { name: "Qualifications" },
    { name: "Rectangular Duct WAFs" },
    { name: "Reporting Frequency" },
    { name: "Span, Range, and Formulas" },
    { name: "Unit Information" },
    { name: "Stack/Pipe Information" },
  ];

  const [selectionState, setSelectionState] = useState(
    initialSelection ? initialSelection : 0
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));

    selectionHandler(getIndex(val.target.value), orisCode);
  };

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={info.id} value={info.name}>
          {info[selectKey]}
        </option>
      );
    });
  };

  // usef
  useEffect(() => {
    setSelectionState(initialSelection);
  }, [initialSelection]);

  return (
    <div>
      <div>
        <FormGroup className="margin-right-2 margin-bottom-1">
          <Label htmlFor={caption + initialSelection}>{caption}</Label>
          <Dropdown
            id={orisCode}
            name={"optionList " + orisCode}
            value={sections[selectionState][selectKey]}
            onChange={(e) => handleChange(e)}
          >
            {populateOptions(sections)}
          </Dropdown>
        </FormGroup>
      </div>
    </div>
  );
};

export default SectionDrop;
