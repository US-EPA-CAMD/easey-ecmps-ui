export const MONITORING_PLAN_STORE_NAME = "monitoringPlans";
export const QA_CERT_TEST_SUMMARY_STORE_NAME = "qaCertTestSummary";

export const convertSectionToStoreName = (dataTableName) => {
  let storeName = "";
  switch (dataTableName) {
    case MONITORING_PLAN_STORE_NAME:
      storeName = MONITORING_PLAN_STORE_NAME;
      break;
    case QA_CERT_TEST_SUMMARY_STORE_NAME:
      storeName = QA_CERT_TEST_SUMMARY_STORE_NAME;
      break;
    default:
      break;
  }
  return storeName;
};
