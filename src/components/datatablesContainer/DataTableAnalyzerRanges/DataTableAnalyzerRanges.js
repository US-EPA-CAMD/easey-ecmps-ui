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
  // inactive,
  // settingInactiveCheckBox,
}) => {
  const [rangesLoaded, setRangesLoaded] = useState(false);
  const [ranges, setRanges] = useState([]);
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const rangesColumnNames = ["Range", "Date and Time"];
  const totalOptions = useRetrieveDropdownApi(
    ["parameterCode", "methodCode"],
    true
  );

  useEffect(() => {
    if (updateTable || ranges.length <= 0 || locationSelectValue) {
      mpApi
        .getMonitoringAnalyzerRanges(
          selectedRange.monLocId,
          selectedRange.componentId
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
      /*const activeOnly = getActiveData(matsMethods);
      const inactiveOnly = getInactiveData(matsMethods);*/

      // // only active data >  disable checkbox and unchecks it
      // if (activeOnly.length === matsMethods.length) {
      //   // uncheck it and disable checkbox
      //   //function parameters ( check flag, disable flag )
      //   settingInactiveCheckBox(false, true);
      //   return fs.getMonitoringPlansMatsMethodsTableRecords(matsMethods);
      // }

      // // only inactive data > disables checkbox and checks it
      // if (inactiveOnly.length === matsMethods.length) {
      //   //check it and disable checkbox
      //   settingInactiveCheckBox(true, true);
      //   return fs.getMonitoringPlansMatsMethodsTableRecords(matsMethods);
      // }
      // resets checkbox
      // settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansSystemsAnalyzerRangesTableRecords(
        // !inactive[0] ?
        //  getActiveData(matsMethods) :
        ranges
      );
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ranges]);
  //   const testing = () => {
  //     openMatsModal(false, false, true);
  //     saveMethods();
  //   };

  //   const testing2 = () => {
  //     openMatsModal(
  //       { col5: "CAMD-BAC9D84563F24FE08057AF5643C8602C" },
  //       false,
  //       false
  //     );
  //   };
//   const saveMethods = () => {
//     const payload = {
//       monLocId: locationSelectValue,
//       id: null,
//       matsMethodCode: null,
//       matsMethodParameterCode: null,
//       beginDate: null,
//       beginHour: 0,
//       endDate: null,
//       endHour: 0,
//     };

//     const userInput = extractUserInput(payload, ".modalUserInput");
//     console.log(userInput, "user");
//     mpApi
//       .saveMonitoringMats(userInput)
//       .then((result) => {
//         console.log(result);
//         setShow(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setShow(false);
//       });
//     mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
//       console.log("testing save", res.data);
//     });
//     setUpdateTable(true);
//   };

//   const [selectedModalData, setSelectedModalData] = useState(null);
  //   const openMatsModal = (row, bool, create) => {
  //     let mats = null;
  //     setCreateNewMats(create);
  //     if (matsMethods.length > 0 && !create) {
  //       mats = matsMethods.filter((element) => element.id === row.col5)[0];
  //       setSelectedMatsMethods(mats);
  //     }
  //     setSelectedModalData(
  //       modalViewData(
  //         mats,
  //         {
  //           matsMethodParameterCode: ["Parameter", "dropdown", "required"],
  //           matsMethodCode: ["Methodology", "dropdown", "required"],
  //         },
  //         {
  //           beginDate: ["Start Date", "date", "required"],
  //           beginHour: ["Start Time", "time", "required"],
  //           endDate: ["End Date", "date", ""],
  //           endHour: ["End Time", "time", ""],
  //         },
  //         create,
  //         totalOptions
  //       )
  //     );
  //     setShow(true);
  //   };

  return (
    <div className="methodTable">
      {/* 
      <input
        role="button"
        type="hidden"
        id="testingBtn"
        onClick={() => testing()}
      />
      <input
        role="button"
        type="hidden"
        id="testingBtn2"
        onClick={() => testing2()}
      /> */}

      <DataTableRender
        columnNames={rangesColumnNames}
        data={rangeData}
        openHandler={()=>console.log('open')}
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
