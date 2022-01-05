import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanLEEQualifications";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import ModalDetails from "../../ModalDetails/ModalDetails";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  resetIsDataChanged,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

import { Preloader } from "../../Preloader/Preloader";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  convertSectionToStoreName,
  LEE_QUALIFICATIONS_SECTION_NAME,
  LEE_QUALIFICATIONS_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";

export const DataTableLEEQualifications = ({
  mdmData,
  loadDropdownsData,
  locationSelectValue,
  qualSelectValue,
  user,
  checkout,
  inactive,
  revertedState,
  setRevertedState,
  setOpenLEE,
  openLEE,
  setUpdateLEE,
  updateLEE,
  setCreatingChild,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [qualLeeData, setQualLeeData] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState([]);

  const dropdownArray = [
    ["parameterCode", "qualificationTestType", "unitsOfStandard"],
  ];
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  useEffect(() => {
    if (
      updateLEE ||
      updateTable ||
      qualLeeData.length <= 0 ||
      locationSelectValue ||
      qualSelectValue ||
      revertedState
    ) {
      mpApi
        .getLEEQualifications(locationSelectValue, qualSelectValue)
        .then((res) => {
          setQualLeeData(res.data);

          setDataLoaded(true);
          setUpdateTable(false);
          setRevertedState(false);
          setUpdateLEE(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, updateLEE]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (mdmData.length === 0) {
      loadDropdownsData(LEE_QUALIFICATIONS_SECTION_NAME, dropdownArray);
      setDropdownsLoaded(true);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedQualLee, setSelectedQualLee] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Qualification Test Date",
    "Parameter Code",
    "Qualification Test Type",
    "Potential Annual Hg Mass Emissions",
    "Applicable Emission Standard",
    "Units of Standard",
    "Percentage of Emission Standard",
  ];

  const data = useMemo(() => {
    if (qualLeeData.length > 0) {
      return fs.getMonitoringPlansLEEQualifications(qualLeeData);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualLeeData, inactive]);

  const openLeeQualModal = (row, bool, create) => {
    setOpenLEE(true);
    setCreatingChild(create);
    let leeData = null;

    if (qualLeeData.length > 0 && !create) {
      leeData = qualLeeData.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedQualLee(leeData);
    }

    setSelectedModalData(
      modalViewData(
        leeData,
        {
          qualificationTestDate: ["Qualification Test Date", "date", ""],
          skip: ["", "skip", ""],
          parameterCode: ["Parameter Code", "dropdown", ""],
          qualificationTestType: ["Qualification Test Type", "dropdown", ""],
          potentialAnnualHgMassEmissions: [
            "Potential Annual Hg Mass Emissions",
            "input",
            "",
          ],
          applicableEmissionStandard: [
            "Applicable Emission Standard",
            "input",
            "",
          ],
          unitsOfStandard: ["Units of Standard", "dropdown", ""],
          percentageOfEmissionStandard: [
            "Percentage of Emission Standard",
            "input",
            "",
          ],
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
      setOpenLEE(false);
      resetIsDataChanged();
      removeChangeEventListeners(".modalUserInput");
    }
  };

  return (
    <div className="methodTable react-transition fade-in">
      {openLEE ? (
        <div>
          <ModalDetails
            modalData={selectedQualLee}
            backBtn={backBtnHandler}
            data={selectedModalData}
            cols={2}
            // title={`Qualification Percent: ${selectedQualPct["id"]}`}
            title={"Qualification LEE"}
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
          openHandler={openLeeQualModal}
          actionsBtn={checkout ? "View/Edit" : "View"}
          tableTitle={"Qualification LEE"}
          componentStyling="systemsCompTable"
          addBtnName={"Create Qualification LEE"}
          addBtn={openLeeQualModal}
        />
      ) : (
        <Preloader />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mdmData: state.dropdowns[LEE_QUALIFICATIONS_STORE_NAME],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDropdownsData: (section, dropdownArray) => {
      dispatch(
        loadDropdowns(convertSectionToStoreName(section), dropdownArray)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableLEEQualifications);
export { mapDispatchToProps };
export { mapStateToProps };
