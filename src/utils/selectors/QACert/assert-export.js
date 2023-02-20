import { qaCertificationEventDataCols, qaTestExtensionExemptionDataCols, qaTestSummaryCols } from "../../constants/tableColumns";

const testSummary = 'Test Summary';
const qaCertEvents = 'QA Certification Events';
const testExtExe = 'Test Extension Exemptions';

export const getExportTableCols = (tableName) => {
  switch (tableName) {
    case testSummary:
      return qaTestSummaryCols;
    case qaCertEvents:
      return qaCertificationEventDataCols;
    case testExtExe:
      return qaTestExtensionExemptionDataCols;
    default:
      throw new Error(`getExportTableCols case not implemented for ${tableName}`);
  }
}
