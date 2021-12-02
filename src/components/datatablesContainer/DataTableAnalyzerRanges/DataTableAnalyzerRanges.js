import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import { attachChangeEventListeners } from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableAnalyzerRanges = ({
  user,
  checkout,
  selectedRanges,
  setThirdLevel,
  thirdLevel,
  setOpenFuelFlowsView,
  setComponentView,
  setSelectedModalData,
  // setCreateNewAnalyzerRange,
  // setSaveAnalyzerRange,
  setSelectedRange,
  updateAnalyzerRangeTable,
  setCreateAnalyzerRangesFlag,
  // setCreateBtn,
  // setCreateBtnAPI,
  // inactive,
  // settingInactiveCheckBox,
}) => {
  const [rangesLoaded, setRangesLoaded] = useState(false);
  const [ranges, setRanges] = useState([]);
  const [updateTable, setUpdateTable] = useState(updateAnalyzerRangeTable);
  const rangesColumnNames = ["Range", "Date and Time"];
  const totalRangesOptions = useRetrieveDropdownApi(["analyzerRangeCode"]);
  useEffect(() => {
    if (updateTable || ranges.length <= 0) {
      mpApi
        .getMonitoringAnalyzerRanges(
          selectedRanges.locationId,
          selectedRanges.componentRecordId
        )
        .then((res) => {
          setRanges(res.data);
          setRangesLoaded(true);
        });
      setUpdateTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRanges, updateTable]);

  const rangeData = useMemo(() => {
    if (ranges.length > 0) {
      return fs.getMonitoringPlansSystemsAnalyzerRangesTableRecords(ranges);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ranges]);
  const testing = () => {
    openAnalyzerRanges(false, false, true);
  };
  const testing1 = () => {
    // need a valid row id for first paramter
    // const range = {
    //   active: false,
    //   addDate: "2009-02-20",
    //   analyzerRangeCode: "H",
    //   beginDate: "1993-10-01",
    //   beginHour: "0",
    //   componentRecordId: "CAMD-60A6D62FDAB14840BFCF67E049B4B4C5",
    //   dualRangeIndicator: "0",
    //   endDate: "2019-11-06",
    //   endHour: "14",
    //   id: "CAMD-A39804B8C17A4478970F7B2CCBF429B6",
    //   updateDate: "2020-01-23",
    //   userId: "bvick",
    // };
    openAnalyzerRanges(
      { col3: "CAMD-A39804B8C17A4478970F7B2CCBF429B6" },
      false,
      false
    );
  };
  // row is just the data in the datatable row, need to compare it to the entire API dataset to get correct data
  const openAnalyzerRanges = (row, bool, create) => {
    let selectRange = null;
    setOpenFuelFlowsView(false);
    setComponentView(true);

    setCreateAnalyzerRangesFlag(create);

    if (ranges.length > 0 && !create) {
      selectRange = ranges.filter((element) => element.id === row.col3)[0];
      setSelectedRange(selectRange);
    }

    setSelectedModalData(
      modalViewData(
        selectRange,
        {
          analyzerRangeCode: ["Range", "dropdown", ""],
          dualRangeIndicator: ["Dual Range Indicator", "radio", ""],
        },
        {
          beginDate: ["Start Date", "date", ""],
          beginHour: ["Start Time", "time", ""],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalRangesOptions
      )
    );
    setThirdLevel(true, "Analyzer Ranges", create? true:false);

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };
  return (
    <div className="methodTable">
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn"
        onClick={() => testing()}
      />
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn1"
        onClick={() => testing1()}
      />
      <DataTableRender
        columnNames={rangesColumnNames}
        data={rangeData}
        openHandler={openAnalyzerRanges}
        tableTitle="Analyzer Ranges"
        componentStyling="systemsCompTable"
        tableStyling="grid-container"
        dataLoaded={rangesLoaded}
        actionsBtn={"View"}
        user={user}
        checkout={checkout}
        addBtn={openAnalyzerRanges}
        addBtnName={"Create New Analyzer Range"}
      />
    </div>
  );
};

export default DataTableAnalyzerRanges;
