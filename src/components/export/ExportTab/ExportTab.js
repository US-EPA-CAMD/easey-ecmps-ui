import React, { useCallback, useEffect, useRef, useState } from "react";
import download from "downloadjs";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";

import { EXPORT_STORE_NAME } from "../../../additional-functions/workspace-section-and-store-names";
import ReportingPeriodSelector from "../../ReportingPeriodSelector/ReportingPeriodSelector";
import { ExportTable } from "../ExportTable/ExportTable";
import {
  monPlanColumns,
  qaTestSummaryColumns,
  qaCertEventColumns,
  qaTeeColumns,
  emissionsColumns,
} from "../../EvaluateAndSubmit/ColumnMappings";
import {
  getQATestSummaryReviewSubmit,
  getQACertEventReviewSubmit,
  getQATeeReviewSubmit,
  exportQA,
} from "../../../utils/api/qaCertificationsAPI";
import {
  getEmissionsReviewSubmit,
  exportEmissionsDataDownload,
} from "../../../utils/api/emissionsApi";
import {
  getMonitoringPlans,
  exportMonitoringPlanDownload,
} from "../../../utils/api/monitoringPlansApi";
import { getUser } from "../../../utils/functions";
import UploadModal from "../../UploadModal/UploadModal";
import { useDispatch, useSelector } from "react-redux";
import { setExportState } from "../../../store/actions/dynamicFacilityTab";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { getReportingPeriods } from "../../../utils/api/qaCertificationsAPI";
import { extractUserInput } from "../../../additional-functions/extract-user-input";

export const ExportTab = ({
  facility,
  selectedConfigId,
  orisCode,
  workspaceSection,
}) => {
  const [canExport, setCanExport] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [reportingPeriod, setReportingPeriod] = useState("");
  const [tableData, setTableData] = useState([]);

  const storedYear = useRef();
  const storedQuarter = useRef();

  const exportState = useSelector((state) => {
    const exportTabs = state.openedFacilityTabs.export;
    const curTabObj = exportTabs.find(
      (tab) => tab.selectedConfig.id === selectedConfigId,
    );
    return curTabObj?.exportState ?? null;
  });

  const dispatch = useDispatch();

  const currentTab = useSelector((state) =>
    state.openedFacilityTabs[EXPORT_STORE_NAME].find(
      (t) => t.selectedConfig.id === selectedConfigId
    )
  );

  const selectedConfig = useSelector((state) => state.monitoringPlans[orisCode]?.find((mp) => mp.id === selectedConfigId));

  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName =
    facility.split("(")[1].replace(")", "") +
    (selectedConfig?.active ? "" : " Inactive");

  const selectedUnits = selectedConfig?.monitoringLocationData
    .filter((ml) => ml.unitId)
    .map((data) => data.unitId) ?? [];
  const selectedStacks = selectedConfig?.monitoringLocationData
    .filter((ml) => ml.stackPipeId)
    .map((data) => data.stackPipeId) ?? [];

  const dataTypes = [
    {
      title: "Monitor Plan",
      columns: monPlanColumns,
      dataFetch: getMonitoringPlans,
      selectedRows: useRef([]),
      reportCode: "MPP",
      uniqueIdField: "id",
    },
    {
      title: "Test Data",
      columns: qaTestSummaryColumns,
      dataFetch: getQATestSummaryReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "TEST_DETAIL",
      uniqueIdField: "testSumId",
    },
    {
      title: "QA Certification Events",
      columns: qaCertEventColumns,
      dataFetch: getQACertEventReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "QCE",
      uniqueIdField: "qaCertEventIdentifier",
    },
    {
      title: "Test Extension Exemptions Data",
      columns: qaTeeColumns,
      dataFetch: getQATeeReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "TEE",
      uniqueIdField: "testExtensionExemptionIdentifier",
    },

    {
      title: "Emissions",
      columns: emissionsColumns,
      dataFetch: getEmissionsReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "EM",
      uniqueIdField: "submissionId",
    },
  ];

  useEffect(() => {
    const fetchTableData = async () => {
      const promises = dataTypes.map((dt) =>
        dt.dataFetch([orisCode], [selectedConfigId], dt.reportCode === 'MPP' ? null : [reportingPeriod])
      );
      const responses = await Promise.all(promises);

      const tableData = responses.map((resp) => resp.data);
      setTableData(tableData);
    };
    fetchTableData();
    // causes inf rerender: dataTypes (dataTypes is not a primitive)
  }, [reportingPeriod, orisCode, selectedConfigId]);

  const reportingPeriodSelectionHandler = (selectedObj) => {
    const { id, calendarYear, quarter } = selectedObj;
    setReportingPeriod(`${calendarYear} Q${quarter}`);

    storedYear.current = calendarYear;
    storedQuarter.current = quarter;

    const newExportState = {
      ...exportState,
      reportingPeriodId: id,
    };

    dispatch(
      setExportState(selectedConfigId, newExportState, workspaceSection)
    );
  };

  const getInitSelection = (reportingPeriodObj) => {
    const { calendarYear, quarter } = reportingPeriodObj;
    setReportingPeriod(`${calendarYear} Q${quarter}`);
    storedYear.current = calendarYear;
    storedQuarter.current = quarter;
  };

  const downloadQaData = async () => {
    const exportJson = await exportQA(
      orisCode,
      selectedUnits,
      selectedStacks,
      null,
      null,
      { isOfficial: !getUser(), isHistoricalImport: false },
      dataTypes[1].selectedRows.current.map((d) => d.testSumId),
      dataTypes[2].selectedRows.current.map((d) => d.qaCertEventIdentifier),
      dataTypes[3].selectedRows.current.map(
        (d) => d.testExtensionExemptionIdentifier
      )
    );

    download(
      JSON.stringify(exportJson.data, null, "\t"),
      `QA & Certification | Export - ${facilityMainName}.json`
    );
  };

  const exportClickHandler = async () => {
    let selectedItems = 0;
    for (const section of dataTypes) {
      selectedItems += section.selectedRows.current.length;
    }

    if (selectedItems <= 0) {
      return;
    }

    setIsExporting(true);
    const promises = [];

    // export monitoring plan
    if (dataTypes[0].selectedRows.current.length > 0) {
      promises.push(exportMonitoringPlanDownload(selectedConfigId));
    }

    //export qa
    if (
      dataTypes[1].selectedRows.current.length > 0 ||
      dataTypes[2].selectedRows.current.length > 0 ||
      dataTypes[3].selectedRows.current.length > 0
    ) {
      promises.push(downloadQaData());
    }

    // export emissions
    if (dataTypes[4].selectedRows.current.length > 0) {
      promises.push(
        exportEmissionsDataDownload(
          facility,
          selectedConfigId,
          storedYear.current,
          storedQuarter.current,
          getUser() !== null
        )
      );
    }

    await Promise.all(promises);
    setIsExporting(false);
  };

  const dispatchSetExportState = (newExportState) => {
    dispatch(
      setExportState(selectedConfigId, newExportState, workspaceSection)
    );
  };

  const canToggleExport = useCallback(() => {
    let selectedItems = 0;
    for (const dataChunk of dataTypes) {
      selectedItems += dataChunk.selectedRows.current.length;
    }

    setCanExport(selectedItems > 0);
  }, []);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const handleReportLoad = async () => {
    const controlInputs = {
      year: ["Years with Emissions Data", "dropdown", "", ""],
    };
    const resp = await getReportingPeriods(true);

    const calendarYear = Object.values(
      resp.data?.reduce(
        (acc, obj) => ({
          ...acc,
          [obj.calendarYear]: {
            code: obj.calendarYear,
            name: obj.calendarYear,
          },
        }),
        {}
      )
    );

    setSelectedModalData(
      modalViewData(
        {},
        controlInputs,
        undefined,
        true,
        {
          year: [{ code: 0, name: "All Years" }, ...calendarYear.reverse()],
        },
        "emissionSummaryReport",
        "emissionSummaryReport",
        true,
        "emissionSummaryReport"
      )
    );
    setShowFilterModal(true);
  };

  const viewEmissionSummaryReport = () => {
    const payload = {
      year: "string",
    };
    const userInput = extractUserInput(payload, ".modalUserInput");
    const { year } = userInput;

    setShowFilterModal(false);
    const additionalParams = `&monitorPlanId=${selectedConfigId}${
      !!parseInt(year) ? `&year=${year}` : ""
    }`;
    const reportTitle = "Emissions Summary Report";
    const url = `/workspace/reports?reportCode=EMSR&facilityId=${orisCode}${additionalParams}`;
    const reportWindowParams = [
      // eslint-disable-next-line no-restricted-globals
      `height=${screen.height}`,
      // eslint-disable-next-line no-restricted-globals
      `width=${screen.width}`,
      //`fullscreen=yes`,
    ].join(",");

    window.open(url, reportTitle, reportWindowParams); //eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <div>
      <div className="border-bottom-1px border-base-lighter padding-bottom-2">
        <div className="grid-row">
          <div className="grid-col">
            <h3 className="font-body-lg margin-y-0">{facilityMainName}</h3>
            <h3
              className="facility-header-text-cutoff margin-top-0"
              style={{ maxWidth: "50%" }}
              title={facilityAdditionalName}
            >
              {facilityAdditionalName}
            </h3>
          </div>
        </div>

        <div className="display-flex flex-row flex-justify">
          <ReportingPeriodSelector
            isExport={true}
            dataTypes={dataTypes.filter((e) => e.checked)}
            reportingPeriodSelectionHandler={reportingPeriodSelectionHandler}
            exportState={exportState}
            getInitSelection={getInitSelection}
            isQaCert={true}
          />

          <div className="flex-align-self-center">
            <Button
              disabled={!canExport}
              type={"button"}
              className="padding-x-6 padding-y-1.5"
              onClick={exportClickHandler}
            >
              Export
            </Button>
            <Button
              type={"button"}
              className="padding-x-6 padding-y-1.5"
              onClick={handleReportLoad}
            >
              Emissions Summary Report
            </Button>
          </div>
        </div>
      </div>

      <div className="border-bottom-1px border-base-lighter padding-bottom-2">
        {dataTypes.map((dt, index) => {
          return (
            <ExportTable
              toggleExportCallback={canToggleExport}
              key={dt.uniqueIdField}
              title={dt.title}
              columns={dt.columns}
              providedData={tableData[index]}
              selectedDataRef={dt.selectedRows}
              reportCode={dt.reportCode}
              exportState={exportState}
              dispatchSetExportState={dispatchSetExportState}
              uniqueIdField={dt.uniqueIdField}
            />
          );
        })}
      </div>

      <div className="grid-row">
        <center className="grid-col-3 grid-offset-9 margin-y-auto padding-top-2">
          <Button
            disabled={!canExport}
            type={"button"}
            size="big"
            className="width-full maxw-card-lg"
            onClick={exportClickHandler}
          >
            Export
          </Button>
        </center>
      </div>

      {isExporting && (
        <UploadModal
          width={"30%"}
          left={"35%"}
          children={<Preloader />}
          preloader
        />
      )}

      {showFilterModal ? (
        <Modal
          title={"Select Report Criteria"}
          show={showFilterModal}
          close={() => setShowFilterModal(false)}
          showDarkBg
          showSave
          extraBtnText
          exitBTN="View Report"
          save={viewEmissionSummaryReport}
          width="34%"
          left="33%"
          fixedWidth={true}
        >
          <ModalDetails
            modalData={null}
            data={selectedModalData}
            cols={3}
            viewOnly={false}
          />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExportTab;
