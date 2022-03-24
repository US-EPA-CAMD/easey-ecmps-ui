import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanLMEQualifications";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import ModalDetails from "../../ModalDetails/ModalDetails";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  resetIsDataChanged,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

import { Preloader } from "@us-epa-camd/easey-design-system";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  convertSectionToStoreName,
  LME_QUALIFICATIONS_SECTION_NAME,
  LME_QUALIFICATIONS_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";

export const DataTableLMEQualifications = ({
  mdmData,
  loadDropdownsData,
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
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState([]);

  const dropdownArray = [["qualificationDataYear"]];
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

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
          setQualLmeData(res.data);
          setDataLoaded(true);
          setUpdateTable(false);
          setRevertedState(false);
          setUpdateLME(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, updateLME]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (mdmData.length === 0) {
      loadDropdownsData(LME_QUALIFICATIONS_SECTION_NAME, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData]);

  const [selectedQualLme, setSelectedQualLme] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Qualification Data Year",
    "Operating Hours",
    "SO2 Tons",
    "NOx Tons",
  ];

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

    setSelectedModalData(
      modalViewData(
        lmeData,
        {
          qualificationDataYear: [
            "Qualification Data Year",
            "dropdown",
            "",
            "",
          ],
          operatingHours: ["Operating Hours", "input", "", ""],
          so2Tons: ["SO2 Tons", "input", "", ""],
          noxTons: ["NOx Tons", "input", "", ""],
        },
        {},
        create,
        mdmData
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
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testBtn"
        onClick={() => {
          backBtnHandler();
          openLmeQualModal(false, false, true);
        }}
      />
      {openLME ? (
        <div>
          <ModalDetails
            modalData={selectedQualLme}
            backBtn={backBtnHandler}
            data={selectedModalData}
            cols={2}
            title={"Qualification LME"}
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
          openHandler={openLmeQualModal}
          actionsBtn={"View"}
          tableTitle={"Qualification LME"}
          componentStyling="systemsCompTable"
          addBtnName={"Create Qualification LME"}
          addBtn={openLmeQualModal}
          ariaLabel={"LME Qualifications"}
        />
      ) : (
        <Preloader />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mdmData: state.dropdowns[LME_QUALIFICATIONS_STORE_NAME],
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
)(DataTableLMEQualifications);
export { mapDispatchToProps };
export { mapStateToProps };
