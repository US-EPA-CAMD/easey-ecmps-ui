import React, { useState } from "react";
import UploadModal from "../UploadModal/UploadModal";
import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";
import {
  exportEmissionsData,
  importEmissionsData,
} from "../../utils/api/emissionsApi";
import { useSelector } from "react-redux";

// This is a very temporary bandaid fix for a problem in the API where the export sends back null for some of the 
// child data lists and when you try to import that, it throws an error because 
const deepRemoveVal = (obj, val = null) => {
  for (const k in obj) {
    if (obj[k] === val) {
      delete obj[k];
    }
    if (Array.isArray(obj[k])) {
      for (const i of obj[k]) deepRemoveVal(i);
    }
  }

  return obj;
};

export const ImportHistoricalDataModal = ({
  closeModalHandler,
  setIsLoading,
  setFinishedLoading,
  importedFileErrorMsgs,
  setImportedFileErrorMsgs,
}) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  const selectedConfig =123

  const historicalImport = () => {
    if (selectedYear === null || selectedQuarter === null || !selectedConfig)
      return;

    setIsLoading(true);
    setFinishedLoading(false);

    exportEmissionsData(selectedConfig.id, selectedYear, selectedQuarter, false)
      .then(({ data: exportResponse }) => {
        deepRemoveVal(exportResponse);
        return importEmissionsData(exportResponse);
      })
      .then(({ data: importResponse, status }) => {
        if (status === 201) {
          setImportedFileErrorMsgs([]);
        } else if (importResponse?.message)
          setImportedFileErrorMsgs(
            importResponse?.message?.split(",") || [`HTTP ${status} Error`]
          );
        else {
          setImportedFileErrorMsgs([`HTTP ${status} Error`]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setFinishedLoading(true);
      });
  };

  const setYearAndQuarter = (reportingPeriodObj) => {
    const { calendarYear, quarter } = reportingPeriodObj;
    setSelectedYear(calendarYear);
    setSelectedQuarter(quarter);
  };

  return (
    <UploadModal
      port={historicalImport}
      show={true}
      title="Import Historical Data"
      close={closeModalHandler}
      showCancel={true}
      showSeparators={true}
      importedFileErrorMsgs={importedFileErrorMsgs}
      successMsg={"Emissions historical Data has been successfully imported"}
      width={"600px"}
    >
      <ReportingPeriodSelector
        isExport={false}
        reportingPeriodSelectionHandler={setYearAndQuarter}
        setLoading={false}
        getInitSelection={setYearAndQuarter}
      />
    </UploadModal>
  );
};
