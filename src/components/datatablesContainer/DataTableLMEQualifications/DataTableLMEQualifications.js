import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanLMEQualifications";
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

export const DataTableLMEQualifications = ({
  locationSelectValue,
  qualSelectValue,
  user,
  checkout,
  inactive,
  revertedState,
  setRevertedState,
  setOpenLME,
  openLME,
  setUpdateLME,
  updateLME,
  setCreatingChild,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [qualLmeData, setQualLmeData] = useState([]);
  const totalOptions = useRetrieveDropdownApi([
    "qualificationDataYear"

  ]);
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState([]);
  const [openBtn, setOpenBtn] = useState(null);

  useEffect(() => {
    if (
      updateLME ||
      updateTable ||
      qualLmeData.length <= 0 ||
      locationSelectValue ||
      qualSelectValue ||
      revertedState
    ) {
      mpApi
        .getLMEQualifications(locationSelectValue, qualSelectValue)
        .then((res) => {
          console.log('res lme',locationSelectValue, qualSelectValue)
          setQualLmeData(res.data);
          setDataLoaded(true);
          setUpdateTable(false);
          setRevertedState(false);
          setUpdateLME(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, updateLME]);
  const [selectedQualLme, setSelectedQualLme] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Qualification Data Year",
    "Operating Hours",
    "SO2 Tons",
    "NOx Tons",
  ];

  // const payload = {
  //   id: null,
  //   qualificationYear: "",
  //   averagePercentValue: "",
  //   yr1QualificationDataYear: "",
  //   yr1QualificationDataTypeCode: "",
  //   yr1PercentageValue: "",
  //   yr2QualificationDataYear: "",
  //   yr2QualificationDataTypeCode: "",
  //   yr2PercentageValue: "",
  //   yr3QualificationDataYear: "",
  //   yr3QualificationDataTypeCode: "",
  //   yr3PercentageValue: "",
  // };

  const data = useMemo(() => {
    if (qualLmeData.length > 0) {
      return fs.getMonitoringPlansLMEQualifications(qualLmeData);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualLmeData, inactive]);

  const openLmeQualModal = (row, bool, create) => {
    setOpenLME(true);
    setCreatingChild(create);
    let lmeData = null;

    if (qualLmeData.length > 0 && !create) {
      lmeData = qualLmeData.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedQualLme(lmeData);
    }
    console.log(totalOptions);

    setSelectedModalData(
      modalViewData(
        lmeData,
        {
          qualificationDataYear: ["Qualification Data Year", "dropdown", ""],
          operatingHours: ["Operating Hours", "input", ""],
          so2Tons: ["SO2 Tons", "input", ""],
          noxTons: ["NOx Tons", "input", ""],
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
      setOpenLME(false);
      resetIsDataChanged();
      removeChangeEventListeners(".modalUserInput");
    }
  };

  return (
    <div className="methodTable react-transition fade-in">
      {openLME ? (
        <div>
          <ModalDetails
            modalData={selectedQualLme}
            backBtn={backBtnHandler}
            data={selectedModalData}
            cols={2}
            // title={`Qualification Percent: ${selectedQualPct["id"]}`}
            title={"Qualification LME"}
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
          openHandler={openLmeQualModal}
          actionsBtn={checkout ? "View/Edit" : "View"}
          tableTitle={"Qualification LME"}
          componentStyling="systemsCompTable"
          addBtnName={"Create Qualification LME"}
          addBtn={openLmeQualModal}
        />
      )}
    </div>
  );
};

export default DataTableLMEQualifications;
