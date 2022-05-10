import React, { useState, useEffect } from "react";

import { FormGroup, Label, FileInput, Alert } from "@trussworks/react-uswds";

import * as mpApi from "../../utils/api/monitoringPlansApi";
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
  const [mpSchema, setMpSchema] = useState([]);
  useEffect(() => {
    mpApi.getMPSchema().then((res) => {
      setMpSchema(res.data);
    });
  }, []);
  const [schemaErrors, setSchemaErrors] = useState([]);
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

  const formatSchemaErrors = (errors) => {
    const formattedErrors = errors.errors.map((error) => {
      console.log(error);
      return error.stack;
    });

    setSchemaErrors(formattedErrors);
  };
  function readFile(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event) {
    try {
      const fileLoaded = JSON.parse(event.target.result);
      setImportedFile(fileLoaded);

      var util = require("util");
      var Validator = require("jsonschema").Validator;
      var v = new Validator();
      var schemaaa = {
        id: "age",
        type: "object",
        properties: {
          age: { type: "number" },
          name: { type: "string" },
        },
      };

      if (v.validate(fileLoaded, mpSchema).valid) {
        setHasFormatError(false);
        setHasInvalidJsonError(false);
        setDisablePortBtn(false);
      } else {
        formatSchemaErrors(v.validate(fileLoaded, mpSchema));
      }
    } catch (e) {
      console.log("invalid json file error: ", e);
      setHasInvalidJsonError(true);
      setHasFormatError(false);
      setDisablePortBtn(true);
    }
  }

  const onChangeHandler = (e) => {
    setSchemaErrors([]);
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
          <div
            className="padding-right-2 padding-left-3 "
            aria-live="polite"
          > { console.log('imported error',importedFileErrorMsgs)}
            {importedFileErrorMsgs.map((error, i) => (
              <Alert type="error" slim noIcon key={i} role="alert">
                {error}
              </Alert>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {schemaErrors.length > 0 ? (
            <div className="overflow-y-auto maxh-mobile">
              <div
                className="padding-right-2 padding-left-3 "
                aria-live="polite"
              >
                {schemaErrors.map((error, i) => (
                <Alert type="error" slim noIcon key={i} role="alert">
                  {error}
                </Alert>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
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
        </div>
      )}
      {/* need to center in modal */}
    </div>
  );
};

export default ImportModal;
