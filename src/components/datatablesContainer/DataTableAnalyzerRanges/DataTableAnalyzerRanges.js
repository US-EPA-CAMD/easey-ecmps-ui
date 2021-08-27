import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import DataTableRender from "../../DataTableRender/DataTableRender";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

export const DataTableAnalyzerRanges = ({
  user,
  checkout,
  selectedRanges,
  setThirdLevel,
  thirdLevel,
  setOpenFuelFlowsView,
  setComponentView,
  setSelectedModalData,
  setCreateNewAnalyzerRange,
  setSaveAnalyzerRange,
  setSelectedRange,
  updateAnalyzerRangeTable,
  // inactive,
  // settingInactiveCheckBox,
}) => {
  const [rangesLoaded, setRangesLoaded] = useState(false);
  const [ranges, setRanges] = useState([]);
  const [updateTable, setUpdateTable] = useState(updateAnalyzerRangeTable);
  const rangesColumnNames = ["Range", "Date and Time"];
  const totalRangesOptions = useRetrieveDropdownApi(
    ["analyzerRangeCode"],
  );
  useEffect(() => {
    console.log('selectedRanges',selectedRanges)
    if (updateTable || ranges.length <= 0) {
      mpApi
        .getMonitoringAnalyzerRanges(
          selectedRanges.locationId,
          selectedRanges.componentRecordId
        )
        .then((res) => {
          setRanges(res.data);
          console.log("res.data", res.data);
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
   openAnalyzerRanges(false,false,true);
 }
  // row is just the data in the datatable row, need to compare it to the entire API dataset to get correct data
  const openAnalyzerRanges = (row, bool, create) => {
    let selectRange = null;
    setCreateNewAnalyzerRange(create);
    setOpenFuelFlowsView(false);
    setComponentView(true);
    // if (create) {
    //   setCreateBtn("Create Analyzer Range");
    //   setCreateBtnAPI(createAnalyzerRange);
    // }
    if (ranges.length > 0 && !create) {
      selectRange = ranges.filter((element) => element.id === row.col3)[0];
      setSelectedRange(selectRange);
      // setCreateBtn("Go Back");
      // if (user && checkout) {
      //   setCreateBtn("Save and Go Back");
      //   setCreateBtnAPI(saveComponents);
      // }
      // console.log(selectComponents, "selectComponents");
      // setOpenAnalyzer(selectRange);
    }

    setSelectedModalData(
      modalViewData(
        selectRange,
        {
          analyzerRangeCode: ["Range", "dropdown", "required"],
          dualRangeIndicator: ["Dual Range Indicator", "radio", ""],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalRangesOptions
      )
    );
    setThirdLevel(true, "Analyzer Ranges");
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
