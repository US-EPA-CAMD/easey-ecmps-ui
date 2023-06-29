import React, { useState, useRef, useEffect } from "react";
import FilterFormAdmin from "./FilterFormAdmin/FilterFormAdmin";
import { getAllFacilities } from "../../utils/api/facilityApi";
import {
  QA_CERT_DATA_MAINTENANCE_STORE_NAME,
  SUBMISSION_ACCESS_STORE_NAME,
} from "../../additional-functions/system-admin-section-and-store-names";
import { submissionAccessTitle, qaCertDataMaintenanceTitle } from "../../utils/constants/moduleTitles";
import { EmSubmissionData } from "./EmSubmissionData/EmSubmissionData";

export const AdminMaintenance = ({ section }) => {
  const [title, setTitle] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isTableDataLoading, setIsTableDataLoading] = useState(false);
  const [reloadTableData, setReloadTableData] = useState(false);
  const [currentFilters, setCurrentFilters] = useState();

  // This array contains the rows that are selected in the table. Use this to do logic to disable/enable buttons
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    switch (section) {
      case SUBMISSION_ACCESS_STORE_NAME:
        document.title = submissionAccessTitle;
        setTitle(submissionAccessTitle);
        break;
      case QA_CERT_DATA_MAINTENANCE_STORE_NAME:
        document.title = qaCertDataMaintenanceTitle;
        setTitle(qaCertDataMaintenanceTitle);
        break;
      default:
        break;
    }
  }, [section]);
  const [facilityList, setFacilityList] = useState([]);

  useEffect(() => {
    getAllFacilities()
      .then(({ data }) => {
        const formattedFacilities = data.map((f) => ({
          value: f.facilityId,
          label: `${f.facilityName} (${f.facilityId})`,
        }));
        setFacilityList(formattedFacilities);

        // The following lines of code are hacks to mitigate an issue with the ComboBox USWDS component.
        // BUG: When the page is initially loaded, clicking on the combobox only brings up an empty list.
        //      The data does not populate until the second click. The below code does the initial click
        //      on the ComboBox and then focuses away again. Tab is then reset to where it was when page
        //      initially loaded.
        const previouslyFocusedEle = document.activeElement;
        document.getElementById("facility-name").click();
        document.activeElement.blur();
        previouslyFocusedEle.tabIndex = 0;
        previouslyFocusedEle.focus();
        previouslyFocusedEle.tabIndex = -1;
      })
      .catch((error) => {
        console.error("Error getting facilities", error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="react-transition fade-in padding-x-3">
      <h2 className="page-header margin-top-2">{title}</h2>
      <hr />
      <FilterFormAdmin
        facilities={facilityList}
        section={section}
        setTableData={setTableData}
        setIsTableDataLoading={setIsTableDataLoading}
        setCurrentFilters={setCurrentFilters}
        reloadTableData={reloadTableData}
        setReloadTableData={setReloadTableData}
        setSelectedRows={setSelectedRows}
      />
      <hr />
      <EmSubmissionData data={tableData} isLoading={isTableDataLoading} currentFilters={currentFilters} setReloadTableData={setReloadTableData} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
    </div>
  );
};