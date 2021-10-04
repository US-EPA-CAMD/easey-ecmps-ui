import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableMats = ({
  locationSelectValue,
  user,
  checkout,
  revertedState,
  setRevertedState,
  // inactive,
  // settingInactiveCheckBox,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [matsMethods, setMatsMethods] = useState([]);
  const totalOptions = useRetrieveDropdownApi(
    ["parameterCode", "monitoringMethodCode"],
    true
  );
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      matsMethods.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
        setMatsMethods(res.data);
        setDataLoaded(true);
      });
      setUpdateTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);
  const [selectedMatsMethods, setSelectedMatsMethods] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter",
    "Methodology",
    "Begin Date and Time",
    "End Date and Time",
  ];

  const payload = {
    locationId: locationSelectValue,
    id: null,
    supplementalMATSMonitoringMethodCode: null,
    supplementalMATSParameterCode: null,
    beginDate: null,
    beginHour: 0,
    endDate: null,
    endHour: 0,
  };
  const data = useMemo(() => {
    if (matsMethods.length > 0) {
      return fs.getMonitoringPlansMatsMethodsTableRecords(matsMethods);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matsMethods]);
  const testing = () => {
    openMatsModal(false, false, true);
    saveMats();
  };

  const testing2 = () => {
    openMatsModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      false
    );
  };
  const testing3 = () => {
    openMatsModal(false, false, true);
    createMats();
  };

  const saveMats = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
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

    setUpdateTable(true);
  };
  const createMats = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    console.log("checking results before api call", payload);
    mpApi
      .createMats(userInput)
      .then((result) => {
        console.log("checking results", result, payload);
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
        setShow(false);
      });
    setUpdateTable(true);
  };

  const [createNewMats, setCreateNewMats] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const openMatsModal = (row, bool, create) => {
    let mats = null;
    setCreateNewMats(create);
    if (matsMethods.length > 0 && !create) {
      mats = matsMethods.filter((element) => element.id === row.col5)[0];
      setSelectedMatsMethods(mats);
    }
    setSelectedModalData(
      modalViewData(
        mats,
        {
          supplementalMATSParameterCode: ["Parameter", "dropdown", ""],
          supplementalMATSMonitoringMethodCode: [
            "Methodology",
            "dropdown",
            "",
          ],
        },
        {
          beginDate: ["Start Date", "date", ""],
          beginHour: ["Start Time", "time", ""],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalOptions
      )
    );
    setShow(true);

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  const closeModalHandler = () => {
    if (window.isDataChanged === true) {
      if (window.confirm(unsavedDataMessage) === true) {
        setShow(false);
        removeChangeEventListeners(".modalUserInput");
      }
    } else {
      setShow(false);
      removeChangeEventListeners(".modalUserInput");
    }
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn"
        onClick={() => testing()}
      />
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn2"
        onClick={() => testing2()}
      />
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn3"
        onClick={() => testing3()}
      />

      <DataTableRender
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        // actionsBtn={"View"}
        checkout={checkout}
        user={user}
        openHandler={openMatsModal}
        actionsBtn={"View"}
        addBtn={openMatsModal}
        addBtnName={"Create MATS"}
      />

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewMats ? createMats : saveMats}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={
            createNewMats ? "Create MATS" : "Component: Monitoring MATS Methods"
          }
          exitBTN={createNewMats ? "Create MATS" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedMatsMethods}
                data={selectedModalData}
                cols={2}
                title={"Component: Monitoring MATS Methods"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableMats;
