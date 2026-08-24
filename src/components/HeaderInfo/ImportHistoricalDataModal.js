import React, { useState } from "react";
import UploadModal from "../UploadModal/UploadModal";
import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";
import {
  importFromHistorical,
} from "../../utils/api/emissionsApi";
import { useSelector } from "react-redux";
import { successResponses } from "../../utils/api/apiUtils";

export const ImportHistoricalDataModal = ({
  closeModalHandler,
  setIsLoading,
  setFinishedLoading,
  importedFileErrorMsgs,
  setImportedFileErrorMsgs,
  workspaceSectionName,
  portCallback, // callback functiona after successful import
}) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  const selectedConfig = useSelector(
    (state) =>
      state.openedFacilityTabs.emissions.find((em) => em.checkout === true)
        ?.selectedConfig
  );

  const historicalImport = async () => {
    if (selectedYear === null || selectedQuarter === null || !selectedConfig)
      return;

    setIsLoading(true);
    setFinishedLoading(false);

    try {
      const importResp = await importFromHistorical(selectedConfig.id, selectedYear, selectedQuarter);
      if (!successResponses.includes(importResp.status)) {
        throw importResp
      }
      
      setImportedFileErrorMsgs([]);
      portCallback(selectedYear, selectedQuarter)
    } catch (error) {
      const errorMsgs = error?.response?.data?.message ?? ['There was an error importing historical data']
      setImportedFileErrorMsgs(errorMsgs)
    } finally {
      setIsLoading(false);
      setFinishedLoading(true);
    }
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
        includeCurrentQuarter={false}
        reportingPeriodSelectionHandler={setYearAndQuarter}
        getInitSelection={setYearAndQuarter}
      />
    </UploadModal>
  );
};
