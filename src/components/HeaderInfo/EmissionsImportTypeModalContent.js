import { Label, Select } from "@trussworks/react-uswds";
import React from "react";

export const EmissionsImportTypeModalContent = ({ onChange }) => {
  return (
    <>
      <Label htmlFor="emissions-import-type-selector">
        Import Historical or File Data
      </Label>
      <Select id="emissions-import-type-selector" onChange={onChange}>
        <option>Select Data Type to Import</option>
        <option key="1" value="file">
          Import From File
        </option>
        <option key="2" value="historical">
          Import From Historical Data
        </option>
      </Select>
    </>
  );
};
