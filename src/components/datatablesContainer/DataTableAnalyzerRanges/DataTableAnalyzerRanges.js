import React, { useEffect, useMemo, useState } from "react";
// import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";

import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import DataTableRender from "../../DataTableRender/DataTableRender";

// import Modal from "../../Modal/Modal";
// import ModalDetails from "../../ModalDetails/ModalDetails";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

export const DataTableAnalyzerRanges = ({
  locationSelectValue,
  user,
  checkout,
  selectedRange,
  setThirdLevel,
  thirdLevel,
  openHandler,
  // inactive,
  // settingInactiveCheckBox,
}) => {
  const [rangesLoaded, setRangesLoaded] = useState(false);
  const [ranges, setRanges] = useState([]);
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const rangesColumnNames = ["Range", "Date and Time"];
  const totalOptions = useRetrieveDropdownApi(
    ["parameterCode", "monitoringMethodCode"],
    true
  );

  useEffect(() => {
    if (updateTable || ranges.length <= 0 || locationSelectValue) {
      mpApi
        .getMonitoringAnalyzerRanges(
          selectedRange.locationId,
          selectedRange.componentRecordId
        )
        .then((res) => {
          setRanges(res.data);
          setRangesLoaded(true);
        });
      setUpdateTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange, updateTable]);
  const [selectedMatsMethods, setSelectedMatsMethods] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)

  const rangeData = useMemo(() => {
    if (ranges.length > 0) {
      return fs.getMonitoringPlansSystemsAnalyzerRangesTableRecords(ranges);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ranges]);
 
  const saveAnalyzerRanges = () => {
    const payload = {
      monLocId: locationSelectValue,
      id: null,
      analyzerRangeCode: "string",
      dualRangeIndicator: 0,
      beginDate: null,
      beginHour: 0,
      endDate: null,
      endHour: 0,
    };

    const userInput = extractUserInput(payload, ".modalUserInput");
    // console.log(userInput, "user");
    mpApi
      .saveMonitoringMats(userInput)
      .then((result) => {
        console.log(result);
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
        setShow(false);
      });
    mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
      console.log("testing save", res.data);
    });
    setUpdateTable(true);
  };


  return (
    <div className="methodTable">

      <DataTableRender
        columnNames={rangesColumnNames}
        data={rangeData}
        openHandler={openHandler}
        tableTitle="Analyzer Ranges"
        componentStyling="systemsCompTable"
        tableStyling="grid-container"
        dataLoaded={rangesLoaded}
        actionsBtn={"View"}
        user={user}
        checkout={checkout}
        // addBtn={openComponent}
        addBtnName={"Add Component"}
      />
    </div>
  );
};

export default DataTableAnalyzerRanges;
