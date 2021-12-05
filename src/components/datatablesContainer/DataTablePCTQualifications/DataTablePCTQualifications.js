import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanPCTQualifications";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import ModalDetails from "../../ModalDetails/ModalDetails";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  resetIsDataChanged,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTablePCTQualifications = ({
  locationSelectValue,
  qualSelectValue,
  user,
  checkout,
  inactive,
  revertedState,
  setRevertedState,
  setOpenPCT,
  openPCT,
  setUpdatePCT,
  updatePCT,
  setCreatingChild,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [qualPctData, setQualPctData] = useState([]);
  const totalOptions = useRetrieveDropdownApi([
    "qualificationYear",
    "yr1QualificationDataYear",
    "yr2QualificationDataYear",
    "yr3QualificationDataYear",
    "yr1QualificationDataTypeCode",
    "yr2QualificationDataTypeCode",
    "yr3QualificationDataTypeCode",
  ]);
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState([]);


  useEffect(() => {
    if (
      updatePCT ||
      updateTable ||
      qualPctData.length <= 0 ||
      locationSelectValue ||
      qualSelectValue ||
      revertedState
    ) {
      mpApi
        .getPCTQualifications(locationSelectValue, qualSelectValue)
        .then((res) => {
          setQualPctData(res.data);
          setDataLoaded(true);
          setUpdateTable(false);
          setRevertedState(false);
          setUpdatePCT(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, updatePCT]);
  const [selectedQualPct, setSelectedQualPct] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Qualification Year",
    "Average Percent Value",
    "Data Year 1",
    "Data Year 2",
    "Data Year 3",
  ];

  const data = useMemo(() => {
    if (qualPctData.length > 0) {
      return fs.getMonitoringPlansPCTQualifications(qualPctData);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualPctData, inactive]);

  const openPctQualModal = (row, bool, create) => {
    setOpenPCT(true);
    setCreatingChild(create);
    let pctData = null;

    if (qualPctData.length > 0 && !create) {
      pctData = qualPctData.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedQualPct(pctData);
    }

    setSelectedModalData(
      modalViewData(
        pctData,
        {
          qualificationYear: ["Qualification Year", "dropdown", ""],
          averagePercentValue: ["Average Percent Value", "input", ""],
          emptyfield: ["", "skip", ""],
          yr1QualificationDataYear: ["Data Year 1", "dropdown", ""],
          yr1QualificationDataTypeCode: ["Year 1 Type Code", "dropdown", ""],
          yr1PercentageValue: ["Year 1 Percentage Value", "input", ""],

          yr2QualificationDataYear: ["Data Year 2", "dropdown", ""],
          yr2QualificationDataTypeCode: ["Year 2 Type Code", "dropdown", ""],
          yr2PercentageValue: ["Year 2 Percentage Value", "input", ""],

          yr3QualificationDataYear: ["Data Year 3", "dropdown", ""],
          yr3QualificationDataTypeCode: ["Year 3 Type Code", "dropdown", ""],
          yr3PercentageValue: ["Year 3 Percentage Value", "input", ""],
        },
        {},
        create,
        totalOptions
      )
    );

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  const backBtnHandler = () => {
    // when cancel is clicked in unsaved changed modal
    if (
      window.isDataChanged === true &&
      window.confirm(unsavedDataMessage) === false
    ) {
      // do nothing
    }
    // otherwise return back to parent qual and reset change tracker
    else {
      setOpenPCT(false);
      resetIsDataChanged();
      removeChangeEventListeners(".modalUserInput");
    }
  };

  return (
    <div className="methodTable react-transition fade-in">
      {openPCT ? (
        <div>
          <ModalDetails
            modalData={selectedQualPct}
            backBtn={backBtnHandler}
            data={selectedModalData}
            cols={3}
            // title={`Qualification Percent: ${selectedQualPct["id"]}`}
            title={"Qualification Percent"}
            viewOnly={!(user && checkout)}
          />
        </div>
      ) : (
        <DataTableRender
          columnNames={columnNames}
          data={data}
          dataLoaded={dataLoaded}
          checkout={checkout}
          user={user}
          openHandler={openPctQualModal}
          actionsBtn={checkout ? "View/Edit" : "View"}
          tableTitle={"Qualification Percent"}
          componentStyling="systemsCompTable"
          addBtnName={"Create Qualification Percent"}
          addBtn={openPctQualModal}
        />
      )}
    </div>
  );
};

export default DataTablePCTQualifications;
