import React, { useState } from "react";
import UploadModal from "../UploadModal/UploadModal";
import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";
import {
  exportEmissionsData,
  importEmissionsData,
} from "../../utils/api/emissionsApi";
import { useSelector } from "react-redux";

export const ImportHistoricalDataModal = ({
  closeModalHandler,
  setIsLoading,
  setFinishedLoading,
  importedFileErrorMsgs,
  setImportedFileErrorMsgs,
  workspaceSectionName
}) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  const selectedConfig = useSelector(
    (state) =>
      state.openedFacilityTabs.emissions.find((em) => em.checkout === true)
        ?.selectedConfig
  );

  const historicalImport = () => {
    if (selectedYear === null || selectedQuarter === null || !selectedConfig)
      return;

    setIsLoading(true);
    setFinishedLoading(false);

    exportEmissionsData(selectedConfig.id, selectedYear, selectedQuarter, false)
      .then(({ data: exportResponse }) => {
        console.log(exportResponse)
        return importEmissionsData(exportResponse);
      })
      .then(({ data: importResponse, status }) => {
        if (status === 201) {
          setImportedFileErrorMsgs([]);
        } else if (importResponse?.message) {
          if(Array.isArray(importResponse.message)) {
            setImportedFileErrorMsgs(
              importResponse?.message || [`HTTP ${status} Error`]
            );
          } else {
            setImportedFileErrorMsgs(
              importResponse?.message?.split(",") || [`HTTP ${status} Error`]
            );
          }
        } else {
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
      title={`Import Historical ${workspaceSectionName} Data`}
      close={closeModalHandler}
      showCancel={true}
      showSeparators={true}
      importedFileErrorMsgs={importedFileErrorMsgs}
      successMsg={`${workspaceSectionName} historical Data has been successfully imported`}
      width={"600px"}
    >
      <ReportingPeriodSelector
        isExport={false}
        reportingPeriodSelectionHandler={setYearAndQuarter}
        getInitSelection={setYearAndQuarter}
      />
    </UploadModal>
  );
};
