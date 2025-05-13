import React, { useState, useEffect } from "react";
import log from "loglevel";
import FilterFormAdminSubmissionReport from "../AdminSubmissionReport/FilterFormAdminSubmissionReport";
import { getAllFacilities } from "../../utils/api/facilityApi";

import { submissionReportTitle} from "../../utils/constants/moduleTitles";
import { getReportingPeriods } from "../../utils/api/mdmApi";
import { SubmissionReportData } from "./SubmissionReportData";


export const AdminSubmissionReport = () => {
  const [title, setTitle] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isTableDataLoading, setIsTableDataLoading] = useState(false);
  const [reportingPeriods, setReportingPeriods] = useState([]);

  // This array contains the rows that are selected in the table. Use this to do logic to disable/enable buttons
  // TBD feature
  const [selectedRows, setSelectedRows] = useState([]);

   useEffect(() => {
     
          document.title = submissionReportTitle;
          setTitle(submissionReportTitle);
       
    }, []);
  const [facilityList, setFacilityList] = useState([]);

  useEffect(() => {

    setTitle(submissionReportTitle);

    getAllFacilities()
      .then(({ data }) => {
        const formattedFacilities = data.items.map((f) => ({
          value: f.facilityId,
          label: `${f.facilityName} (${f.facilityId})`,
        }));
        setFacilityList(formattedFacilities);
      })
      .catch((error) => {
        log.error("Error getting facilities", error);
      });

    getReportingPeriods()
      .then(({ data }) => {
        setReportingPeriods(data?.items);
      })
      .catch(error => {
        log.error("Error getting reporting periods", error);
      })

  }, []);

  return (
    <div className="react-transition fade-in padding-x-3">
      <h2 className="page-header margin-top-2">{title}</h2>
      <hr />
      <FilterFormAdminSubmissionReport
        facilities={facilityList}
        setTableData={setTableData}
        setIsTableDataLoading={setIsTableDataLoading}
        setSelectedRows={setSelectedRows}
        reportingPeriods={reportingPeriods}
      />
      <hr />
      <SubmissionReportData
        data={tableData}
        isLoading={isTableDataLoading}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
};
