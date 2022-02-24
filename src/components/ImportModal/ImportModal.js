import React from "react";

import { FormGroup, Label, FileInput } from "@trussworks/react-uswds";
import "./ImportModal.scss";

const ImportModal = ({ setDisablePortBtn, disablePortBtn }) => {
  const settingImportBtn = (name, type, event) => {
    const fileTypeManual = name.split(".");

    if (fileTypeManual[fileTypeManual.length - 1] !== "json") {
      console.log("failed", fileTypeManual);
      setDisablePortBtn(true);
    } else {
      setDisablePortBtn(false);
    }
    // const reader = new FileReader();
    // reader.onload = ({ target: { result } }) => {
    //   if (!validateJSON(result)) {
    //     alert("Please select JSON files only!");
    //     this.value = "";
    //     return;
    //   }
    //   // display the contents of the file
    //   console.log(result);
    // };
    // reader.readAsText(event.target.files.file);
  };

  // const validateJSON = (data) => {
  //   try {
  //     JSON.parse(data);
  //   } catch {
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <div className="import-modal-container">
      {/* need to center in modal */}
      <FormGroup>
        <Label htmlFor="file-input-single"> Upload MP JSON File</Label>
        <FileInput
          id="file-input-single"
          name="file-input-single"
          accept=".json"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0];
              console.log(file.name);
              console.log(file.type);
              settingImportBtn(file.name, file.type, e);
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
          onError={() => {
            const fileInput = document.querySelector("#file-input-single");
            console.log("clear error message2");
            console.log(fileInput.value);
            if (fileInput.value === "") {
              console.log("show error message2");
            }
          }}
          onErrorCapture={() => {
            const fileInput = document.querySelector("#file-input-single");
            console.log("clear error message1");
            console.log(fileInput.value);
            if (fileInput.value === "") {
              console.log("show error message1");
            }
          }}
        />
      </FormGroup>
    </div>
  );
};

export default ImportModal;
