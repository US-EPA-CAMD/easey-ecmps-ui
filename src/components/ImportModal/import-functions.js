import {
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  MONITORING_PLAN_STORE_NAME,
  EMISSIONS_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";

const validate = require('jsonschema').validate;

export const checkingCorrectSchema = (
  file,
  workspace,
  errorChecks,
  setSchemaErrors,
  qaSchema,
  mpSchema,
  emissionsSchema,
  setDisablePortBtn
) => {
  let results = null;

  switch (workspace) {
    case MONITORING_PLAN_STORE_NAME:
      results = validate(file, mpSchema);
      // correct schema
      if (results.valid) {
        errorChecks(false);
        // correct schema, just errors
      } else {
        errorChecks(true);
        formatSchemaErrors(
          results,
          setSchemaErrors,
          setDisablePortBtn
        );
      } // incorrect schema with section
      if (!file.unitStackConfigurations) {
        errorChecks(true);
        setSchemaErrors(["Only Monitoring Plan (MP) files may be imported"]);
      }
      break;
    case QA_CERT_TEST_SUMMARY_STORE_NAME:
      results = validate(file, qaSchema);
      // correct schema
      if (results.valid) {
        errorChecks(false);
        // correct schema, just errors
      } else {
        errorChecks(true);
        formatSchemaErrors(
          results,
          setSchemaErrors,
          setDisablePortBtn
        );
      } // incorrect schema with section
      if (!file.testSummaryData) {
        errorChecks(true);
        setSchemaErrors(["Only QA Test Data files may be imported"]);
      }
      break;
    case EMISSIONS_STORE_NAME:
      results = validate(file, emissionsSchema);
      // correct schema
      if (results.valid) {
        errorChecks(false);
        // correct schema, just errors
      } else {
        errorChecks(true);
        formatSchemaErrors(
          results,
          setSchemaErrors,
          setDisablePortBtn
        );
      } // incorrect schema with section
      if (!file.quarter) {
        errorChecks(true);
        setSchemaErrors(["Only Emissions files may be imported"]);
      }
      break;

    default:
      break;
  }
};

export const formatSchemaErrors = (
  errors,
  setSchemaErrors,
  setDisablePortBtn
) => {
  setDisablePortBtn(true);
  const formattedErrors = errors.errors.map((error) => {
    return error.stack;
  });
  setSchemaErrors(formattedErrors);
};
