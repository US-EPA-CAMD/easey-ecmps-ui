import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanPCTQualifications";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import ModalDetails from "../../ModalDetails/ModalDetails";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import { Preloader } from "@us-epa-camd/easey-design-system";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  convertSectionToStoreName,
  PCT_QUALIFICATIONS_SECTION_NAME,
  PCT_QUALIFICATIONS_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  resetIsDataChanged,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTablePCTQualifications = ({
  mdmDataPCT,
  loadDropdownsData,
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

  const dropdownArray = [
    [
      "qualificationYear",
      "yr1QualificationDataYear",
      "yr2QualificationDataYear",
      "yr3QualificationDataYear",
      "yr1QualificationDataTypeCode",
      "yr2QualificationDataTypeCode",
      "yr3QualificationDataTypeCode",
    ],
  ];
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

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
          console.log("res.data", res.data);
          setQualPctData(res.data);
          setDataLoaded(true);
          setUpdateTable(false);
          setRevertedState(false);
          setUpdatePCT(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, updatePCT]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (mdmDataPCT !== undefined && mdmDataPCT.length === 0) {
      loadDropdownsData(PCT_QUALIFICATIONS_SECTION_NAME, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmDataPCT]);

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
        mdmDataPCT
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
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testBtn"
        onClick={() => {
          backBtnHandler();
          openPctQualModal(false, false, true);
        }}
      />
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
      ) : dropdownsLoaded ? (
        <DataTableRender
          columnNames={columnNames}
          data={data}
          dataLoaded={dataLoaded && dropdownsLoaded}
          checkout={checkout}
          user={user}
          openHandler={openPctQualModal}
          actionsBtn={"View"}
          tableTitle={"Qualification Percent"}
          componentStyling="systemsCompTable"
          addBtnName={"Create Qualification Percent"}
          addBtn={openPctQualModal}
          ariaLabel={"PCT Qualifications"}
        />
      ) : (
        <Preloader />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mdmDataPCT: state.dropdowns[PCT_QUALIFICATIONS_STORE_NAME],
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
)(DataTablePCTQualifications);
export { mapDispatchToProps };
export { mapStateToProps };
