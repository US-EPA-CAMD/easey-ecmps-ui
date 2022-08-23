import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import {
  createProtocolGas,
  updateProtocolGas,
  deleteProtocolGas,
  getRataSummary,
  createRataSummary
} from "../../../utils/api/qaCertificationsAPI.js";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";
import { mapRataSummaryToRows } from "../../../utils/selectors/QACert/TestSummary.js";
import { Button } from "@trussworks/react-uswds";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";
import { addAriaLabelToDatatable } from "../../../additional-functions/ensure-508";
/*********** COMPONENTS ***********/

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Preloader } from "@us-epa-camd/easey-design-system";

import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
// contains rata summary data table

const QARataSummaryExpandableRows = ({
  user,
  mdmData,
  loadDropdownsData,
  locId,
  testSumId,
  data
}) => {
  const rataId = data.id
  const [loading, setLoading] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [rataSummaryData, setRataSummaryData] = useState([])

  useEffect(() => {
    // if (rataSummaryData.length === 0 || updateTable) {
    //   setLoading(true);
    //   getRataSummary(locId, testSumId, 'rataId')
    //     .then((res) => {
    //       console.log('res.data', res.data);
    //       finishedLoadingData(res.data);
    //       setRataSummaryData(res.data);
    //       setLoading(false);
    //       console.log('rata summary data after setstate', rataSummaryData);
    //     })
    //     .catch((error) => {
    //       console.log("error", error);
    //     });
    //   setUpdateTable(false);
    // }

    const fetchData = async () => {
      setLoading(true)
      try {
        const resp = await getRataSummary(locId, testSumId, rataId)
        console.log('resp.data', resp.data);
        finishedLoadingData(resp.data)
        setRataSummaryData(resp.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
      setUpdateTable(false);
    }

    if (rataSummaryData.length === 0 || updateTable) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locId, testSumId, updateTable]);

  const rowData = useMemo(() => {
    const mappedData = mapRataSummaryToRows(rataSummaryData)
    console.log('mappedData', mappedData);
    return mapRataSummaryToRows(rataSummaryData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rataSummaryData]);

  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const [mainDropdownChange, setMainDropdownChange] = useState("");

  const [createNewData, setCreateNewData] = useState(false);
  const [prefilteredMdmData, setPrefilteredMdmData] = useState(false);

  const [complimentaryData, setComplimentaryData] = useState([]);

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const selectText = "-- Select a value --";
  //*****
  // pull these out and make components reuseable like monitoring plan
  const dropdownArray = [['operatingLevelCode', 'referenceMethodCode', 'apsCode', 'co2OrO2ReferenceMethodCode']];
  const dropdownArrayIsEmpty = dropdownArray[0].length === 0;

  const dataTableName = "RATA Summary";
  const columns = [
    'Operating Level Code',
    'Reference Method Code',
    'APS Indicator',
    'APS Code',
    'Relative Accuracy',
    'CO2 or O2 Reference Method Code',
  ];
  // controls modal detail form inputs
  const controlInputs = {
    operatingLevelCode: ["Operating Level Code", "dropdown", "", ""],
    referenceMethodCode: ["Reference Method Code", "dropdown", "", ""],
    apsIndicator: ["APS Indicator", "radio", "", ""],
    apsCode: ["APS Code", "dropdown", "", ""],
    relativeAccuracy: ["Relative Accuracy", "input", "", ""],
    co2OrO2ReferenceMethodCode: ["CO2 or O2 Reference Method Code", "dropdown", "", ""],
  };
  useEffect(() => {
    // Load MDM data (for dropdowns) only if we don't have them already
    if (mdmData && mdmData.length === 0) {
      loadDropdownsData(dataTableName, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }
  }, [mdmData, loadDropdownsData, dataTableName, dropdownArray]);

  const controlDatePickerInputs = {};
  const closeModalHandler = () => {
    if (window.isDataChanged === true) {
      if (window.confirm(unsavedDataMessage) === true) {
        executeOnClose();
      }
    } else {
      executeOnClose();
    }
  };
  const executeOnClose = () => {
    setReturnedFocusToLast(false);
    setShow(false);
    removeChangeEventListeners(".modalUserInput");
  };
  const finishedLoadingData = (loadedData) => {
    setDataPulled(loadedData);
    setDataLoaded(true);
    addAriaLabelToDatatable();
  };
  // Executed when "View" action is clicked
  const openModal = (row, bool, create) => {
    let selectedData = null;
    setCreateNewData(create);
    if (create) {
      // set first option (operating level code) to default blank
      controlInputs.operatingLevelCode = ["Operating Level Code", "dropdown", "", ""];
    }
    if (dataPulled.length > 0 && !create) {
      selectedData = dataPulled.filter(
        (element) => element.id === row[`id`]
      )[0];
      setSelectedRow(selectedData);
    }
    let mainDropdownName = "";
    let hasMainDropdown = false;
    for (const controlProperty in controlInputs) {
      if (controlInputs[controlProperty][1] === "mainDropdown") {
        mainDropdownName = controlProperty;
        hasMainDropdown = true;
        break;
      }
    }
    let prefilteredDataName;
    if (!dropdownArrayIsEmpty) {
      prefilteredDataName = dropdownArray[0][dropdownArray[0].length - 1];
    }
    let mainDropdownResult;
    // only applies if there is prefiltering based on a primary driver dropdown
    if (mainDropdownName !== "" && hasMainDropdown === true) {
      mainDropdownResult = mdmData[mainDropdownName].filter((o) =>
        mdmData[prefilteredDataName].some(
          (element, index, arr) => o.code === element[mainDropdownName]
        )
      );
      if (!mainDropdownResult.includes({ code: "", name: selectText })) {
        mainDropdownResult.unshift({ code: "", name: selectText });
      }
    } else {
      mainDropdownResult = [];
    }

    if (!dropdownArrayIsEmpty) {
      setPrefilteredMdmData(mdmData[prefilteredDataName]);
    }

    const prefilteredTotalName = dropdownArray[0][dropdownArray[0].length - 1];
    setSelectedModalData(
      modalViewData(
        selectedData,
        controlInputs,
        controlDatePickerInputs,
        create,
        mdmData,
        prefilteredDataName ? mdmData[prefilteredDataName] : "",
        mainDropdownName,
        mainDropdownResult,
        hasMainDropdown,
        prefilteredTotalName,
        false // no extra controls
      )
    );

    setShow(true);
    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  const saveData = () => {
    // const payload = {
    //   gasLevelCode: selectedRow.gasLevelCode,
    //   gasTypeCode: null,
    //   cylinderID: null,
    //   vendorID: null,
    //   expirationDate: null,
    // };

    // TODO: extract payload details from somewhere?
    const payload = {
      operatingLevelCode: selectedRow.operatingLevelCode,
      averageGrossUnitLoad: 0,
      referenceMethodCode: "string",
      meanCEMValue: 0,
      meanRATAReferenceValue: 1,
      meanDifference: 0,
      standardDeviationDifference: 0,
      confidenceCoefficient: 0,
      tValue: 0,
      apsIndicator: 0,
      apsCode: "string",
      relativeAccuracy: 0,
      biasAdjustmentFactor: 0,
      co2OrO2ReferenceMethodCode: "string",
      stackDiameter: 0,
      stackArea: 0,
      numberOfTraversePoints: 0,
      calculatedWAF: 0,
      defaultWAF: 0
    }
    const userInput = extractUserInput(payload, ".modalUserInput");

    // TODO: change function that is called when data is edited/saved
    updateProtocolGas(
      locId,
      testSumId,
      selectedRow.id,
      userInput
    )
      .then((res) => {
        setUpdateTable(true);
        executeOnClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createData = async () => {
    const uiControls = {
      gasLevelCode: null,
      gasTypeCode: null,
      cylinderID: null,
      vendorID: null,
      expirationDate: null,
    };
    const userInput = extractUserInput(uiControls, ".modalUserInput");
    // TODO: change function that is called when data is added
    createProtocolGas(locId, testSumId, userInput)
      .then((res) => {
        console.log("res", res);
        if (Object.prototype.toString.call(res) === "[object Array]") {
          alert(res[0]);
        } else {
          setUpdateTable(true);
          executeOnClose();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });


    try {
      const resp = await createRataSummary()
      console.log('resp', resp);
      if (Object.prototype.toString.call(resp) === "[object Array]") {
        alert(resp[0]);
      } else {
        setUpdateTable(true);
        executeOnClose();
      }
    } catch (error) {
      console.log('error creating rata summary', error)
    }
  };

  const onRemoveHandler = async (row) => {
    const { id: idToRemove, testSumId } = row;
    const resp = await deleteProtocolGas(
      locId,
      testSumId,
      idToRemove
    );
    if (resp.status === 200) {
      const dataPostRemove = rataSummaryData.filter(
        (rowData) => rowData.id !== idToRemove
      );
      setRataSummaryData(dataPostRemove)
    }
  };

  return (
    <div className="padding-y-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={15}
          data={rowData}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          actionColumnName={
            user ?
              <>
                <span className="padding-right-2">
                  {dataTableName}
                </span>
                <Button
                  epa-testid="btnOpen"
                  className="text-white"
                  onClick={() => openModal(false, false, true)}
                >
                  Add
                </Button>
              </>
              : dataTableName
          }
          actionsBtn={"View"}
          user={user}
          evaluate={false}
          noDataComp={
            user ?
              (<QADataTableRender
                columnNames={columns}
                columnWidth={15}
                data={[]}
                actionColumnName={
                  (
                    <>
                      <span className="padding-right-2">{dataTableName}</span>
                      <Button
                        epa-testid="btnOpen"
                        className="text-white"
                        onClick={() => openModal(false, false, true)}
                      >
                        Add
                      </Button>
                    </>
                  )
                }
                actionsBtn={"View"}
                user={user}
              />) : "There're no records available."
          }
        />
      ) : (
        <Preloader />
      )}

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewData ? createData : saveData}
          showCancel={!user ? true : false}
          showSave={user ? true : false}
          title={
            createNewData
              ? `Add  ${dataTableName}`
              : user
                ? ` Edit ${dataTableName}`
                : ` ${dataTableName}`
          }
          exitBTN={`Save and Close`}
          children={
            dropdownsLoaded ? (
              <div>
                <ModalDetails
                  modalData={selectedRow}
                  data={selectedModalData}
                  cols={2}
                  title={`${dataTableName}`}
                  viewOnly={!user ? true : false}
                  create={createNewData}
                />
              </div>
            ) : (
              <Preloader />
            )
          }
        />
      ) : null}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  const dataTableName = 'RATA Summary'
  return {
    mdmData: state.dropdowns[convertSectionToStoreName(dataTableName)],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDropdownsData: async (section, dropdownArray) =>
      dispatch(
        loadDropdowns(convertSectionToStoreName(section), dropdownArray)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QARataSummaryExpandableRows);
export { mapDispatchToProps };
export { mapStateToProps };
