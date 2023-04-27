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
  setLoading = () => { },
}) => {
  const [reportingPeriods, setReportingPeriods] = useState(null);
  const [selectedReportingPeriod, setSelectedReportingPeriod] = useState({});

  useEffect(() => {

    const fetchReportingPeriods = async () => {
      console.log('fetchRepPeriod called');
      try {
        setLoading(true);
        const resp = await getReportingPeriod(true);

        if (!successResponses.includes(resp.status)) {
          throw new Error(`Fetch reporting periods failed with status: ${resp.status}`)
        }

        const periodsFromMostRecent = resp.data.reverse()
        // if resp.data is empty this will evaluate to {}
        const mostRecentPeriod = { ...periodsFromMostRecent[0] }
        let curSelectedPeriod = mostRecentPeriod

        // set selected period to one from export state if it exists
        if (exportState?.reportingPeriodId) {
          curSelectedPeriod = periodsFromMostRecent.find(period => period.id === exportState.reportingPeriodId)
          // trigger rerender of parent component to load data tables when export state exists
          reportingPeriodSelectionHandler(curSelectedPeriod)
        }

        setReportingPeriods(periodsFromMostRecent)
        setSelectedReportingPeriod(curSelectedPeriod)
        setLoading(false);
      } catch (error) {
        console.log('error fetching reporting periods', error)
      }
    }

    fetchReportingPeriods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading]);

  const yearQuarterSelectionHandler = (event) => {
    const selectedId = Number(event.target.value)
    const newSelectedPeriod = reportingPeriods.find(period => period.id === selectedId)
    setSelectedReportingPeriod(newSelectedPeriod);
    reportingPeriodSelectionHandler(newSelectedPeriod);
  }

  return (
    <>
      {reportingPeriods && (
        <div
          id="reporting-period-wrapper"
          className="display-flex flex-row flex-justify"
        >
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
