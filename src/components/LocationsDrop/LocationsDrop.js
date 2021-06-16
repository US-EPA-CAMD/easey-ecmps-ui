import React, { useState, useEffect } from "react";

import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";
import { setLocationSelectionState } from "../../store/actions/dynamicFacilityTab";
import { setActiveTab } from "../../store/actions/activeTab";
const LocationDrop = ({
  orisCode,
  caption,
  options,
  selectKey,
  initialSelection,
  selectionHandler,
  tabs,
  activeTab,
}) => {
  console.log('initial',initialSelection,options)
  const getIndex = (val) => {
    return options.findIndex((obj) => obj.id === val);
  };


  const handleChange = (val) => {
    // setSelectionState(getIndex(val.target.value));
    console.log('[getIndex(val.target.value), val.target.value]',[getIndex(val.target.value), val.target.value])
    selectionHandler([getIndex(val.target.value), val.target.value]);
  };

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={info.id} value={info.id}>
          {info[selectKey]}
        </option>
      );
    });
  };


  return (
    <div>
      {" "}
        <div>
          {/* need to add default value later */}
          <FormGroup className="margin-right-2 margin-bottom-1">
            <Label htmlFor={caption + initialSelection[0]}>{caption}</Label>
            <Dropdown
              name="optionList"
              id={initialSelection[0]}
              // issue here, the inital selection is return index,
              // id need value to match with id
              value={options[initialSelection[0]] ? options[initialSelection[0]].id:options[0].id}
              onChange={(e) => handleChange(e)}
            >
              {populateOptions(options)}
            </Dropdown>
          </FormGroup>
        </div>
      ) 
    </div>
  );
};

export default (LocationDrop);
