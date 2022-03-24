import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import { attachChangeEventListeners } from "../../../additional-functions/prompt-to-save-unsaved-changes";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  convertSectionToStoreName,
  ANALYZER_RANGES_SECTION_NAME,
  ANALYZER_RANGES_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";

export const DataTableAnalyzerRanges = ({
  mdmData,
  loadDropdownsData,
  user,
  checkout,
  selectedRanges,
  setThirdLevel,
  thirdLevel,
  setOpenFuelFlowsView,
  setComponentView,
  setSelectedModalData,
  setSelectedRange,
  updateAnalyzerRangeTable,
  setUpdateAnalyzerRangeTable,
  setCreateAnalyzerRangesFlag,
}) => {
  const [rangesLoaded, setRangesLoaded] = useState(false);
  const [ranges, setRanges] = useState([]);
  const rangesColumnNames = ["Range", "Date and Time"];

  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);
  const dropdownArray = [["analyzerRangeCode"]];

  useEffect(() => {
    if (updateAnalyzerRangeTable || ranges.length <= 0) {
      mpApi
        .getMonitoringAnalyzerRanges(
          selectedRanges.locationId,
          selectedRanges.componentRecordId
        )
        .then((res) => {
          setRanges(res.data);
          setRangesLoaded(true);
        });
      setUpdateAnalyzerRangeTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRanges, updateAnalyzerRangeTable]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (mdmData.length === 0) {
      loadDropdownsData(ANALYZER_RANGES_SECTION_NAME, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData]);

  const rangeData = useMemo(() => {
    if (ranges.length > 0) {
      return fs.getMonitoringPlansSystemsAnalyzerRangesTableRecords(ranges);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ranges]);

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
        mdmData
      )
    );
    setThirdLevel(true, "Analyzer Ranges", create ? true : false);

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
        onClick={() => openAnalyzerRanges(false, false, true)}
      />
      />
      <DataTableRender
        columnNames={rangesColumnNames}
        data={rangeData}
        openHandler={openAnalyzerRanges}
        tableTitle="Analyzer Ranges"
        componentStyling="systemsCompTable"
        tableStyling="grid-container"
        dataLoaded={rangesLoaded && dropdownsLoaded}
        actionsBtn={"View"}
        user={user}
        checkout={checkout}
        addBtn={openAnalyzerRanges}
        addBtnName={"Create New Analyzer Range"}
        ariaLabel={"Analyzer Ranges"}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mdmData: state.dropdowns[ANALYZER_RANGES_STORE_NAME],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDropdownsData: async (section, dropdownArray) => {
      dispatch(
        loadDropdowns(convertSectionToStoreName(section), dropdownArray)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableAnalyzerRanges);
export { mapDispatchToProps };
export { mapStateToProps };
