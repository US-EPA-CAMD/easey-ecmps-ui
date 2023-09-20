import React, { useState } from "react";
import UploadModal from "../UploadModal/UploadModal";
import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";
import {
  exportEmissionsData,
  importEmissionsData,
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
      const exportResp = await exportEmissionsData(selectedConfig.id, selectedYear, selectedQuarter, false)
      if (!successResponses.includes(exportResp.status)) {
        throw exportResp // go to catch block
      }

      // if exported data is empty
      if( Object.keys(exportResp.data).length === 0 ){
        throw {
          data:{
            message:["Import unsuccessful. There is no data for this reporting period"]
          }
        }
      }
        
      const importResp = await importEmissionsData(exportResp.data);
      if (!successResponses.includes(importResp.status)) {
        throw importResp // go to catch block
      }

      setImportedFileErrorMsgs([]);
      portCallback(selectedYear, selectedQuarter)
    } catch (error) {
      console.log(JSON.stringify(error))
      const errorMsgs = error?.data?.message ?? ['There was an error importing historical data']
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
        reportingPeriodSelectionHandler={setYearAndQuarter}
        getInitSelection={setYearAndQuarter}
      />
    </UploadModal>
  );
};
