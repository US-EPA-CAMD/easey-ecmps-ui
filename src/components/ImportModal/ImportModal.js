import React, { useState, useEffect } from "react";

import { FormGroup, Label, Alert } from "@trussworks/react-uswds";
import { FileInput } from "../FileInput/FileInput";
import { checkingCorrectSchema } from "./import-functions";
import {
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  MONITORING_PLAN_STORE_NAME,
  EMISSIONS_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import * as mpApi from "../../utils/api/monitoringPlansApi";

import * as qaApi from "../../utils/api/qaCertificationsAPI";

import * as emApi from "../../utils/api/emissionsApi";

import { successResponses } from "../../utils/api/apiUtils.js";
import "./ImportModal.scss";

const ImportModal = ({
  setDisablePortBtn,
  complete,
  setFileName,
  fileName,
  setHasFormatError,
  setHasInvalidJsonError,
  importedFileErrorMsgs,
  setImportedFile,
  workspaceSection,
}) => {
  const [mpSchema, setMpSchema] = useState([]);
  const [qaSchema, setQaSchema] = useState([]);
  const [emSchema, setEmSchema] = useState([]);
  const [schemaErrors, setSchemaErrors] = useState([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    switch (workspaceSection) {
      case MONITORING_PLAN_STORE_NAME:
        mpApi
          .getMPSchema()
          .then(({ data }) => {
            setMpSchema(data);
            setLabel("Upload MP JSON File");
          })
          .catch((err) => console.log(err));
        setLabel("Upload MP JSON File");
        break;
      case QA_CERT_TEST_SUMMARY_STORE_NAME:
        qaApi
          .getQASchema()
          .then(({ data }) => {
            setQaSchema(data);
            setLabel("Upload QA JSON File");
          })
          .catch((err) => console.log(err));
        setLabel("Upload QA JSON File");
        break;
      case EMISSIONS_STORE_NAME:
        emApi
          .getEmissionsSchema()
          .then(({ data }) => {
            setEmSchema(data);
            setLabel("Upload Emissions JSON File");
          })
          .catch((err) => console.log(err));
        setLabel("Upload Emissions JSON File");
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const errorChecks = (flag) => {
    if (flag) {
      setDisablePortBtn(true);
    } else {
      setHasFormatError(false);
      setHasInvalidJsonError(false);
      setDisablePortBtn(false);
    }
  };

  const readFile = (event) => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  const onReaderLoad = (event) => {
    try {
      setSchemaErrors([]);
      const fileLoaded = JSON.parse(event.target.result);
      setImportedFile(fileLoaded);
      checkingCorrectSchema(
        fileLoaded,
        workspaceSection,
        errorChecks,
        setSchemaErrors,
        qaSchema,
        mpSchema,
        emSchema,
        setDisablePortBtn
      );
    } catch (e) {
      setHasInvalidJsonError(true);
      setHasFormatError(false);
      setDisablePortBtn(true);
    }
  };
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

  let content;
  if (
    complete &&
    importedFileErrorMsgs !== undefined &&
    importedFileErrorMsgs !== null &&
    successResponses.includes(importedFileErrorMsgs.status)
  ) {
    // file import was successful
    content = <span id="fileName">{fileName}</span>;
  } else if (complete && importedFileErrorMsgs?.length > 0) {
    // error importing file
    content = (
      <div className="overflow-y-auto maxh-mobile">
        <div className="padding-right-2 padding-left-3 " aria-live="polite">
          {Array.isArray(importedFileErrorMsgs) ? (
            importedFileErrorMsgs.map((error, i) => (
              <Alert
                type="error"
                headingLevel="h4"
                slim
                noIcon
                key={`${i}-${error}`}
                role="alert"
              >
                {error}
              </Alert>
            ))
          ) : (
            <Alert
              type="error"
              headingLevel="h4"
              slim
              noIcon
              key={`1-${importedFileErrorMsgs}`}
              role="alert"
            >
              {importedFileErrorMsgs}
            </Alert>
          )}
        </div>
      </div>
    );
  } else {
    content = (
      <div>
        {schemaErrors.length > 0 && (
          <div className="overflow-y-auto maxh-mobile">
            <div className="padding-right-2 padding-left-3 " aria-live="polite">
              {schemaErrors.map((error, i) => (
                <Alert
                  type="error"
                  headingLevel="h4"
                  slim
                  noIcon
                  key={`${i}-${error}`}
                  role="alert"
                >
                  {error}
                </Alert>
              ))}
            </div>
          </div>
        )}
        {/* show file picker if import process not complete */}
        {!complete && (
          <FormGroup>
            <Label htmlFor="file-input-single">{label}</Label>
            <FileInput
              id="file-input-single"
              name="file-input-single"
              onChange={onChangeHandler}
            />
          </FormGroup>
        )}
      </div>
    );
  }

  return <div className="import-modal-container">{content}</div>;
};

export default ImportModal;
