import React from "react";

import { FormGroup, Label, FileInput } from "@trussworks/react-uswds";
import "./ImportModal.scss";

const ImportModal = () => {
  return (
    <div className="import-modal-container">
      {/* need to center in modal */}
      <FormGroup>
        <Label htmlFor="file-input-single"> Upload JSON File</Label>
        <FileInput
          id="file-input-single"
          name="file-input-single"
          accept=".json"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0];
              console.log(file.name);
              console.log(file.type);
            }
          }}
          onDrop={() => {
            const fileInput = document.querySelector("#file-input-single");
            console.log("clear error message");
            console.log(fileInput.value);
            if (fileInput.value === "") {
              console.log("show error message");
            }
          }}
        />
      </FormGroup>
    </div>
  );
};

export default ImportModal;
