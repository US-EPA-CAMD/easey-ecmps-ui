import React from "react";

import { FormGroup, Label, FileInput, Alert } from "@trussworks/react-uswds";
import "./ImportModal.scss";

const ImportModal = ({
  setDisablePortBtn,
  complete,
  setFileName,
  fileName,
  setHasFormatError,
  setHasInvalidJsonError,
  importApiErrors,
  importedFileErrorMsgs,
  setImportedFile,
}) => {
  const validateJSON = (name, type, event) => {
    const fileTypeManual = name.split(".");

    if (fileTypeManual[fileTypeManual.length - 1] !== "json") {
      setHasFormatError(true);
      setDisablePortBtn(true);
    } else {
      setFileName(name);
      readFile(event);
    }
  };

  function readFile(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event) {
    try {
      JSON.parse(event.target.result);
      setImportedFile(JSON.parse(event.target.result));
      console.log(
        JSON.parse(event.target.result),
        "JSON.parse(event.target.result)"
      );
      setHasFormatError(false);
      setHasInvalidJsonError(false);
      setDisablePortBtn(false);
    } catch (e) {
      console.log("invalid json file error: ", e);
      setHasInvalidJsonError(true);
      setHasFormatError(false);
      setDisablePortBtn(true);
    }
  }

  const onChangeHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateJSON(file.name, file.type, e);
    } else {
      setDisablePortBtn(true);
      setHasFormatError(false);
      setHasInvalidJsonError(false);
    }
  };

  return (
    <div className="import-modal-container">
      {complete && importedFileErrorMsgs.length === 0 ? (
        <span id="fileName">{fileName}</span>
      ) : complete && importedFileErrorMsgs.length > 0 ? (
        <div className="overflow-y-auto maxh-mobile">
          <div className="padding-right-2 padding-left-3" aria-live="polite">
            {importedFileErrorMsgs.map((error, i) => (
              <Alert type="error" slim noIcon key={i} role="alert">
                {error}
              </Alert>
            ))}
          </div>
        </div>
      ) : (
        <FormGroup>
          <Label htmlFor="file-input-single"> Upload MP JSON File</Label>
          <FileInput
            id="file-input-single"
            name="file-input-single"
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
        </FormGroup>
      )}
      {/* need to center in modal */}
    </div>
  );
};

export default ImportModal;
