import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanCPMSQualifications";
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
  CPMS_QUALIFICATIONS_SECTION_NAME,
  CPMS_QUALIFICATIONS_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";
import { returnsFocusMpDatatableCreateBTN } from "../../../additional-functions/ensure-508";

export const DataTableCPMSQualifications = ({
  mdmData,
  loadDropdownsData,
  locationSelectValue,
  qualSelectValue,
  user,
  checkout,
  inactive,
  revertedState,
  setRevertedState,
  setOpenCPMS,
  openCPMS,
  setUpdateCPMS,
  updateCPMS,
  setCreatingChild,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [qualCpmsData, setQualCpmsData] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState([]);

  const dropdownArray = [["qualificationDataYear"]];
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  useEffect(() => {
    if (
      updateCPMS ||
      updateTable ||
      qualCpmsData.length <= 0 ||
      locationSelectValue ||
      qualSelectValue ||
      revertedState
    ) {
      mpApi
        .getCPMSQualifications(locationSelectValue, qualSelectValue)
        .then((res) => {
          setQualCpmsData(res.data);

          setDataLoaded(true);
          setUpdateTable(false);
          setRevertedState(false);
          setUpdateCPMS(false);
        })
        .catch((error) => console.log("getCPMSQualifications failed", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, updateCPMS]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (mdmData.length === 0) {
      loadDropdownsData(CPMS_QUALIFICATIONS_SECTION_NAME, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData]);

  const [selectedQualCpms, setSelectedQualCpms] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Qualification Data Year",
    "Stack Test Number",
    "Operating Limit",
  ];

  const data = useMemo(() => {
    if (qualCpmsData.length > 0) {
      return fs.getMonitoringPlansCPMSQualifications(qualCpmsData);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualCpmsData]);

  const openCpmsQualModal = (row, bool, create) => {
    setOpenCPMS(true);
    setCreatingChild(create);
    let cpmsData = null;

    if (qualCpmsData.length > 0 && !create) {
      cpmsData = qualCpmsData.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedQualCpms(cpmsData);
    }
    setSelectedModalData(
      modalViewData(
        cpmsData,
        {
          qualificationDataYear: [
            "Qualification Data Year",
            "nonFilteredDropdown",
            "",
          ],
          stackTestNumber: ["Stack Test Number", "input", ""],
          operatingLimit: ["Operating Limit", "input", ""],
        },
        {},
        create,
        mdmData
      )
    );

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });

    if (create) {
      returnsFocusMpDatatableCreateBTN("Create Qualification CPMS", 1000);
    }
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
      setOpenCPMS(false);
      resetIsDataChanged();
      removeChangeEventListeners(".modalUserInput");
    }
    returnsFocusMpDatatableCreateBTN("Create Qualification CPMS");
  };

  return (
    <div className="methodTable react-transition fade-in">
      {openCPMS ? (
        <div>
          <ModalDetails
            modalData={selectedQualCpms}
            backBtn={backBtnHandler}
            data={selectedModalData}
            cols={2}
            // title={`Qualification Percent: ${selectedQualPct["id"]}`}
            title={"Qualification CPMS"}
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
          openHandler={openCpmsQualModal}
          actionsBtn={"View"}
          tableTitle={"Qualification CPMS"}
          componentStyling="systemsCompTable"
          addBtnName={"Create Qualification CPMS"}
          addBtn={openCpmsQualModal}
          ariaLabel={"CPMS Qualifications"}
        />
      ) : (
        <Preloader />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mdmData: state.dropdowns[CPMS_QUALIFICATIONS_STORE_NAME],
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
)(DataTableCPMSQualifications);
export { mapDispatchToProps };
export { mapStateToProps };
