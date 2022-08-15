export const MONITORING_PLAN_STORE_NAME = "monitoringPlans";
export const QA_CERT_TEST_SUMMARY_STORE_NAME = "qaCertTestSummary";
export const EXPORT_STORE_NAME = "export";
export const EMISSIONS_DAILY_STORE_NAME = "emissionsDaily";

export const convertSectionToStoreName = (dataTableName) => {
  let storeName = "";
  switch (dataTableName) {
    case MONITORING_PLAN_STORE_NAME:
      storeName = MONITORING_PLAN_STORE_NAME;
      break;
    case QA_CERT_TEST_SUMMARY_STORE_NAME:
      storeName = QA_CERT_TEST_SUMMARY_STORE_NAME;
      break;
    case EXPORT_STORE_NAME:
      storeName = EXPORT_STORE_NAME;
      break;
    case EMISSIONS_DAILY_STORE_NAME:
      storeName = EMISSIONS_DAILY_STORE_NAME;
      break;
    default:
      break;
  }
  return storeName;
};
