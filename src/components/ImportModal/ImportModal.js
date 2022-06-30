import React, { useState, useEffect } from "react";

import { FormGroup, Label, FileInput, Alert } from "@trussworks/react-uswds";

import {
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  MONITORING_PLAN_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import * as mpApi from "../../utils/api/monitoringPlansApi";

import * as qaApi from "../../utils/api/qaCertificationsAPI";
import { successResponses } from "../../utils/api/apiUtils.js";
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
  workspaceSection,
}) => {
  const [schema, setSchema] = useState([]);
  useEffect(() => {
    switch (workspaceSection) {
      case MONITORING_PLAN_STORE_NAME:
        mpApi.getMPSchema().then((res) => {
          console.log("res scheme", res.data);
          setSchema(res.data);
        });
        break;

      case QA_CERT_TEST_SUMMARY_STORE_NAME:
        qaApi.getQASchema().then((res) => {
          setSchema(res.data);
        });
        break;
      default:
        break;
    }
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
      console.log(error, "file errors");
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
      setSchemaErrors([]);
      const fileLoaded = JSON.parse(event.target.result);
      setImportedFile(fileLoaded);

      var Validator = require("jsonschema").Validator;
      var v = new Validator();

      if (v.validate(fileLoaded, schema).valid) {
        setHasFormatError(false);
        setHasInvalidJsonError(false);
        setDisablePortBtn(false);
      } else {
        formatSchemaErrors(v.validate(fileLoaded, schema));
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
  // && typeof importedFileErrorMsgs.data.message === "string"

  return (
    <div className="import-modal-container">
      {complete &&
      importedFileErrorMsgs !== undefined &&
      successResponses.includes(importedFileErrorMsgs.status) ? (
        <span id="fileName">{fileName}</span>
      ) : complete && importedFileErrorMsgs.length > 0 ? (
        <div className="overflow-y-auto maxh-mobile">
          <div className="padding-right-2 padding-left-3 " aria-live="polite">
            {" "}
            {console.log("import errors", importedFileErrorMsgs)}
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
