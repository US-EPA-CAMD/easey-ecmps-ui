import React, { useState, useEffect } from "react";

import { FormGroup, Label, FileInput, Alert } from "@trussworks/react-uswds";
import { checkingCorrectSchema,formatSchemaErrors } from "./import-functions";
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
        break;
      case QA_CERT_TEST_SUMMARY_STORE_NAME:
        qaApi
          .getQASchema()
          .then(({ data }) => {
            setQaSchema(data);
            setLabel("Upload QA JSON File");
          })
          .catch((err) => console.log(err));
        break;
      case EMISSIONS_STORE_NAME:
        emApi
          .getEmissionsSchema()
          .then(({ data }) => {
            setEmSchema(data);
            setLabel("Upload Emissions JSON File");
          })
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    mpApi
      .getMPSchema()
      .then(({ data }) => {
        setMpSchema(data);
      })
      .catch((err) => console.log(err));
    qaApi
      .getQASchema()
      .then(({ data }) => {
        setQaSchema(data);
      })
      .catch((err) => console.log(err));
    emApi
      .getEmissionsSchema()
      .then(({ data }) => {
        setEmSchema(data);
      })
      .catch((err) => console.log(err));
    switch (workspaceSection) {
      case MONITORING_PLAN_STORE_NAME:
        setLabel("Upload MP JSON File");
        break;
      case QA_CERT_TEST_SUMMARY_STORE_NAME:
        setLabel("Upload QA JSON File");
        break;
      case EMISSIONS_STORE_NAME:
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
  // const checkingCorrectSchema = (file,workspace ,errorChecks,setSchemaErrors) => {
  //   var Validator = require("jsonschema").Validator;
  //   var v = new Validator();
  //   switch (workspace) {
  //     case MONITORING_PLAN_STORE_NAME:
  //       // correct schema
  //       if (v.validate(file, mpSchema).valid) {
  //         errorChecks(false);
  //         // correct schema, just errors
  //       } else {
  //         errorChecks(true);
  //         formatSchemaErrors(v.validate(file, mpSchema),setSchemaErrors);
  //       } // incorrect schema with section
  //       if (!file.unitStackConfigurations) {
  //         errorChecks(true);
  //         setSchemaErrors(["Only Monitoring Plan (MP) files may be imported"]);
  //       }
  //       break;
  //     case QA_CERT_TEST_SUMMARY_STORE_NAME:
  //       // correct schema
  //       if (v.validate(file, qaSchema).valid) {
  //         errorChecks(false);
  //         // correct schema, just errors
  //       } else {
  //         errorChecks(true);
  //         formatSchemaErrors(v.validate(file, qaSchema),setSchemaErrors);
  //       } // incorrect schema with section
  //       if (!file.testSummaryData) {
  //         errorChecks(true);
  //         setSchemaErrors(["Only QA Test Data files may be imported"]);
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // };
  // const formatSchemaErrors = (errors,setSchemaErrors) => {
  //   setDisablePortBtn(true);
  //   const formattedErrors = errors.errors.map((error) => {
  //     console.log(error, "file errors");
  //     return error.stack;
  //   });
  //   setSchemaErrors(formattedErrors);
  // };
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
      checkingCorrectSchema(fileLoaded,workspaceSection,errorChecks,setSchemaErrors,qaSchema,mpSchema,emSchema,setDisablePortBtn);
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
  // && typeof importedFileErrorMsgs.data.message === "string"

  return (
    <div className="import-modal-container">
      {complete &&
      importedFileErrorMsgs !== undefined &&
      importedFileErrorMsgs !== null &&
      successResponses.includes(importedFileErrorMsgs.status) ? (
        <span id="fileName">{fileName}</span>
      ) : complete && importedFileErrorMsgs?.length > 0 ? (
        <div className="overflow-y-auto maxh-mobile">
          <div className="padding-right-2 padding-left-3 " aria-live="polite">
            {" "}
            {importedFileErrorMsgs.map((error, i) => (
              <Alert
                type="error"
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
      ) : (
        <div>
          {schemaErrors.length > 0 ? (
            <div className="overflow-y-auto maxh-mobile">
              <div
                className="padding-right-2 padding-left-3 "
                aria-live="polite"
              >
                {schemaErrors.map((error, i) => (
                  <Alert
                    type="error"
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
          ) : (
            ""
          )}
          <FormGroup>
            <Label htmlFor="file-input-single">{label}</Label>
            <FileInput
              id="file-input-single"
              name="file-input-single"
              onChange={onChangeHandler}
            />
          </FormGroup>
        </div>
      )}
      {/* need to center in modal */}
    </div>
  );
};

export default ImportModal;
