import React, { useState } from "react";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

export const DetailsSelectBox = ({
  caption,
  options,
  selectKey,
  initialSelection,
  viewOnly,
  required,
  secondOption,
  className,
  epadataname,
  id,
  handler,
  hyphenatedCaption,
  eventHandler,
  disableDropdownFlag,
  mainDropdownChange,
}) => {

  console.log('disableDropdownFlag',disableDropdownFlag)
  const [selectionState, setSelectionState] = useState(
    initialSelection ? initialSelection : null
  );

  const handleChange = (val) => {
    setSelectionState(val.target.value);
    if (handler) {
      handler(val.target.value);
    }
  };
  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={index} value={info[selectKey]}>
          {info[secondOption ? secondOption : selectKey]}
        </option>
      );
    });
  };
  return (
    <div>
      <div>
        <FormGroup className="margin-top-0">
          {caption ? (
            <Label
              htmlFor={hyphenatedCaption}
              hint={required ? <span> (Required)</span> : ""}
            >
              {caption}
            </Label>
          ) : (
            ""
          )}
          <Dropdown
            name={caption}
            // weird bug without this
            value={
              disableDropdownFlag
                ? "select"
                : selectionState !== null
                ? selectionState
                : initialSelection
            }
            disabled={viewOnly || disableDropdownFlag}
            id={id === null ? caption : id}
            className={className}
            epadataname={epadataname}
            onChange={(e) => handleChange(e)}
          >
            {populateOptions(options)}
          </Dropdown>
        </FormGroup>
      </div>
    </div>
  );
};
export default DetailsSelectBox;
