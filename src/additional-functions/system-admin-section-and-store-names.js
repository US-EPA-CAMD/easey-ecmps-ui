export const SUBMISSION_ACCESS_STORE_NAME = "emSubmissionAccess";
export const QA_CERT_DATA_MAINTENANCE_STORE_NAME = "qaDataMaintenance";

export const convertSystemAdminSectionToStoreName = (dataTableName) => {
  let storeName = "";
  switch (dataTableName) {
    case SUBMISSION_ACCESS_STORE_NAME:
      storeName = SUBMISSION_ACCESS_STORE_NAME;
      break;
    case QA_CERT_DATA_MAINTENANCE_STORE_NAME:
      storeName = QA_CERT_DATA_MAINTENANCE_STORE_NAME;
      break;
    default:
      break;
  }
  return storeName;
};
