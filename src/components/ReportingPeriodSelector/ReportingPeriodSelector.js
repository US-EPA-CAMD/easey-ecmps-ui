import React, { useEffect, useState } from "react";
import { Dropdown, Label } from "@trussworks/react-uswds";
import { getReportingPeriod } from "../../utils/api/qaCertificationsAPI";
import "./ReportingPeriodSelector.scss";
import { successResponses } from "../../utils/api/apiUtils";

const ReportingPeriodSelector = ({
  isExport,
  dataTypes,
  reportingPeriodSelectionHandler,
  exportState,
  getInitSelection,
  setLoading,
}) => {
  const [reportingPeriods, setReportingPeriods] = useState(null);
  const [years, setYears] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [selectedReportingPeriod, setSelectedReportingPeriod] = useState(null);

  useEffect(() => {

    const fetchReportingPeriods = async () => {
      try {
        setLoading(true);
        //
        const resp = await getReportingPeriod(true);
        console.log('resp', resp);

        const periodsFromMostRecent = resp.data.reverse()

        const mostRecentPeriod = { ...periodsFromMostRecent[0] }
        // mostRecentPeriod.selected = true
        setSelectedReportingPeriod(mostRecentPeriod)

        console.log('periodsFromMostrecent', periodsFromMostRecent);


        setReportingPeriods(periodsFromMostRecent);

        setLoading(false);
      } catch (error) {
        console.log('error fetching reporting periods', error)
      }
    }

    if (reportingPeriods === null) {
      fetchReportingPeriods();
    }

    // OLD
    // if (reportingPeriod === null) {
    //   setLoading && setLoading(true);
    //   getReportingPeriod(true).then((res) => {
    //     if (exportState && exportState.reportingPeriodId) {
    //       // retain state as tab is opened back
    //       setReportingPeriod(
    //         res.data.map((e) => {
    //           e.selected = false;
    //           if (exportState.reportingPeriodId === e.id) {
    //             e.selected = true;
    //           }
    //           return e;
    //         })
    //       );
    //     } else {
    //       setReportingPeriod(
    //         res.data.map((e, i) => {
    //           e.selected = false;
    //           if (i === res.data.length - 1) {
    //             // tab is new so set the latest reporting period
    //             e.selected = true;
    //           }
    //           return e;
    //         })
    //       );
    //     }
    //     setLoading && setLoading(false);
    //   })
    // } else if (years.length === 0 && quarters.length === 0) {
    //   setYears(
    //     new Set(
    //       reportingPeriod
    //         .map((e) => e.calendarYear)
    //         .sort()
    //         .reverse()
    //     )
    //   );
    //   const selectedObj = reportingPeriod.find((e) => e.selected);
    //   const quarterObjs = reportingPeriod.filter(
    //     (e) => e.calendarYear === selectedObj.calendarYear
    //   );
    //   setQuarters(quarterObjs.map((e) => e.quarter));
    //   getInitSelection(reportingPeriod.find((e) => e.selected));
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateReportingPeriod = (selectedObj) => {
    setReportingPeriods(
      [...reportingPeriods].map((e) => {
        if (e.id === selectedObj.id) {
          e.selected = true;
        } else {
          e.selected = false;
        }
        return e;
      })
    );
    reportingPeriodSelectionHandler(selectedObj);
  };
  const yearSelectionHandler = (event) => {
    const selectedObj = reportingPeriods.find(
      (e) =>
        Number(e.calendarYear) === Number(event.target.value) && e.quarter === 1
    );
    updateReportingPeriod(selectedObj);
    const quarterObjs = reportingPeriods.filter(
      (e) => Number(e.calendarYear) === Number(event.target.value)
    );
    setQuarters(quarterObjs.map((e) => e.quarter));
  };
  const quarterSelectionHandler = (event) => {
    const selectedYear = reportingPeriods.find((e) => e.selected).calendarYear;
    const selectedObj = reportingPeriods.find(
      (e) =>
        Number(e.quarter) === Number(event.target.value) &&
        e.calendarYear === selectedYear
    );
    updateReportingPeriod(selectedObj);
  };

  const yearQuarterSelectionHandler = (event) => {
    const selectedId = Number(event.target.value)
    const newSelectedPeriod = reportingPeriods.find(period => period.id === selectedId)
    setSelectedReportingPeriod(newSelectedPeriod);
    reportingPeriodSelectionHandler(newSelectedPeriod);
  }

  const populateYears = () => {
    const options = [];
    years.forEach((year, i) => {
      options.push(
        <option key={i} value={year}>
          {year}
        </option>
      );
    });
    return options;
  };

  return (
    <>
      {reportingPeriods && (
        <div
          id="reporting-period-wrapper"
          className="display-flex flex-row flex-justify"
        >
          {/* <div>
            <Label className="inline-label" htmlFor="year-dropdown">
              Year
            </Label>
            <Dropdown
              id="year-dropdown"
              name="year-dropdown"
              className="width-15"
              onChange={yearSelectionHandler}
              value={reportingPeriods.find((e) => e.selected).calendarYear}
              disabled={
                isExport &&
                dataTypes.filter((e) => e.checked).length === 1 &&
                dataTypes.find((e) => e.name === "monitoring-plan")?.checked
              }
            >
              {populateYears()}
            </Dropdown>
          </div> */}

          {/* <div>
            <Label className="inline-label" htmlFor="quarter-dropdown">
              Quarter
            </Label>
            <Dropdown
              id="quarter-dropdown"
              name="quarter-dropdown"
              className="width-15"
              onChange={quarterSelectionHandler}
              value={reportingPeriod.find((e) => e.selected).quarter}
              disabled={
                isExport &&
                dataTypes.filter((e) => e.checked).length === 1 &&
                dataTypes.find((e) => e.name === "monitoring-plan")?.checked
              }
            >
              {quarters.map((quarter, i) => (
                <option key={i} value={quarter}>{`Q${quarter}`}</option>
              ))}
            </Dropdown>
          </div> */}

          <div>
            <Label className="inline-label" htmlFor="year-quarter-dropdown">
              Rerporting Period
            </Label>
            <Dropdown
              id="year-quarter-dropdown"
              name="year-quarter-dropdown"
              className="width-15"
              onChange={yearQuarterSelectionHandler}
              value={selectedReportingPeriod.id}
              disabled={
                isExport &&
                dataTypes.filter((e) => e.checked).length === 1 &&
                dataTypes.find((e) => e.name === "monitoring-plan")?.checked
              }
            >
              {reportingPeriods.map(period =>
                <option key={period.id} value={period.id}>{period.periodAbbreviation}</option>
              )}
            </Dropdown>
          </div>

          <div className="aria-live">
            <Label htmlFor="reporting-period">Reporting Period</Label>
            <div id="reporting-period" className="padding-top-1">
              <div>
                <strong>Begin Date: </strong>
                {selectedReportingPeriod.beginDate}
              </div>
              <div>
                <strong>End Date: </strong>
                {selectedReportingPeriod.endDate}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportingPeriodSelector;
