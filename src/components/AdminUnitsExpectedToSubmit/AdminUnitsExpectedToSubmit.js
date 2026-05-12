import React, { useState, useEffect } from "react";
import log from "loglevel";
import FilterFormUnitsExpected from "./FilterFormUnitsExpected";
import { getAllFacilities } from "../../utils/api/facilityApi";
import { getAllPrograms, getAllStates } from "../../utils/api/dataManagementApi";
import { getReportingPeriods } from "../../utils/api/mdmApi";
import { unitsExpectedTitle } from "../../utils/constants/moduleTitles";
import { UnitsExpectedData } from "./UnitsExpectedData";

export const UnitsExpectedToSubmit = () => {
  const [title, setTitle] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isTableDataLoading, setIsTableDataLoading] = useState(false);
  const [reportingPeriods, setReportingPeriods] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [facilityList, setFacilityList] = useState([]);

  useEffect(() => {
    document.title = unitsExpectedTitle;
    setTitle(unitsExpectedTitle);

    getAllFacilities()
      .then(({ data }) => {
        const formattedFacilities = data.items.map((f) => ({
          value: f.facilityRecordId,
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
      });

    getAllPrograms()
      .then(({ data }) => {
        setPrograms(data?.items);
      })
      .catch(error => {
        log.error("Error getting programs", error);
      });

       getAllStates()
      .then(({ data }) => {
        setStates(data?.items);
      })
      .catch(error => {
        log.error("Error getting State", error);
      });

  }, []);
  

  return (
    <div className="react-transition fade-in padding-x-3">
      <h2 className="page-header margin-top-2">{title}</h2>
      <hr />
      <FilterFormUnitsExpected
        facilities={facilityList}
        programs={programs}
        states={states}
        reportingPeriods={reportingPeriods}
        setTableData={setTableData}
        setIsTableDataLoading={setIsTableDataLoading}
        setSelectedRows={setSelectedRows}
      />
      <hr />
      <UnitsExpectedData
        data={tableData}
        isLoading={isTableDataLoading}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
};