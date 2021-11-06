import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanPCTQualifications";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTablePCTQualifications = ({
  locationSelectValue,
  qualSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  setOpenPCT,
  openPCT,
  selectedLocation,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [qualPctData, setQualPctData] = useState([]);
  const totalOptions = useRetrieveDropdownApi(["qualificationYear"], true);
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState([]);

  useEffect(() => {
    if (
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
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);
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

  const payload = {
    id: null,
    qualificationYear: "",
    averagePercentValue: "",
    yr1QualificationDataYear: "",
    yr1QualificationDataTypeCode: "",
    yr1PercentageValue: "",
    yr2QualificationDataYear: "",
    yr2QualificationDataTypeCode: "",
    yr2PercentageValue: "",
    yr3QualificationDataYear: "",
    yr3QualificationDataTypeCode: "",
    yr3PercentageValue: "",
  };
  const data = useMemo(() => {
    if (qualPctData.length > 0) {
      return fs.getMonitoringPlansPCTQualifications(qualPctData);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualPctData, inactive]);

  const openPctQualModal = (row, bool, create) => {
    setOpenPCT(true);
    openPCT = true;
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
          qualificationYear: ["Qualification Year", "input", ""],
          averagePercentValue: ["Average Percent Value", "input", ""],
          emptyfield: ["", "skip", ""],
          yr1QualificationDataYear: ["Data Year 1", "input", ""],
          yr1QualificationDataTypeCode: ["Year 1 Type Code", "input", ""],
          yr1PercentageValue: ["Year 1 Percentage Value", "input", ""],

          yr2QualificationDataYear: ["Data Year 2", "input", ""],
          yr2QualificationDataTypeCode: ["Year 2 Type Code", "input", ""],
          yr2PercentageValue: ["Year 2 Percentage Value", "input", ""],

          yr3QualificationDataYear: ["Data Year 3", "input", ""],
          yr3QualificationDataTypeCode: ["Year 3 Type Code", "input", ""],
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

  const [viewBtn, setViewBtn] = useState(null);

  return (
    <div className="methodTable react-transition fade-in">
      {openPCT ? (
        <div>
          <ModalDetails
            modalData={selectedQualPct}
            // backBtn={setBread}
            data={selectedModalData}
            cols={3}
            title={`Qualification Percent: ${qualPctData["id"]}`}
            viewOnly={true}
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
          actionsBtn={"View"}
          viewBtn={viewBtn}
          tableTitle={"Qualification Percent"}
          componentStyling="systemsCompTable"
        />
      )}
    </div>
  );
};

export default DataTablePCTQualifications;
