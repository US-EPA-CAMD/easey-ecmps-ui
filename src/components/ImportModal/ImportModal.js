import React from "react";

import { FormGroup, Label, FileInput } from "@trussworks/react-uswds";
const ImportModal = () => {
  return (
    <div>
      {" "}
      {/* need to center in modal */}
      <FormGroup error>
        <Label htmlFor="file-input-single">Upload MP JSON file</Label>
        <FileInput id="file-input-single" name="file-input-single" accept= ".json" onInvalid = { (e) => console.log("error is",e)} />
      </FormGroup>
    </div>
  );
};

export default ImportModal;
