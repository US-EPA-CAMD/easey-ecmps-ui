import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import Modal from "../../Modal/Modal";
import DataTableSystemsComponents from "../DataTableSystemsComponents/DataTableSystemsComponents";
import DataTableRender from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import ModalDetails from "../../ModalDetails/ModalDetails";
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
} from "@trussworks/react-uswds";
import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

export const DataTableSystems = ({
  locationSelectValue,
  inactive,
  user,
  checkout,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  showModal = false,
}) => {
  const [show, setShow] = useState(showModal);
  const [monitoringSystems, setMonitoringSystems] = useState([]);
  const [secondLevel, setSecondLevel] = useState(false);
  // const [firstLevel, setFirstLevel] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      monitoringSystems.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringSystems(locationSelectValue).then((res) => {
        setMonitoringSystems(res.data);
        setDataLoaded(true);
      });
      setUpdateTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);

  const closeModalHandler = () => {
    setSecondLevel(false);
    setShow(false);
  };
  // const [modalData, setModalData] = useState([
  //   { value: 1 },
  //   { value: 1 },
  //   { value: 1 },
  //   { value: 1 },
  //   { value: "05/04/2009 0" },
  //   { value: "05/04/2009 0" },
  // ]);
  const [selected, setSelected] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);

  // *** row handler onclick event listener
  const openSystem = (row, bool, create) => {
    let selectSystem = null;
    
    setCreateNewSystem(create);
    if (monitoringSystems.length > 0 && !create) {
      selectSystem = monitoringSystems.filter(
        (element) => element.id === row.col7
      )[0];
      setSelected(row.cells);
      console.log('row inside',row,selected)
    }console.log('row',row,selected)
    setSelectedModalData(
      modalViewData(
        selectSystem,
        {
          systemIdentifier: ["System ID", "input", "required"],
          systemDesignationCode: ["System Designation", "dropdown", "required"],
          systemTypeCode: ["System Type", "dropdown", "required"],
          fuelCode: ["Fuel Type", "dropdown", "required"],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        false
      )
    );
    if (create) {
      setSecondLevel(create);
    }
    setShow(true);
  };
  const [createNewSystem, setCreateNewSystem] = useState(false);
  // useEffect(() => {
  //   setModalData(
  //     selected.map((info) => {
  //       return {
  //         header: info.column,
  //         value: info.value,
  //       };
  //     })
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [show]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "System ID",
    "System Type",
    "System Designation",
    "Fuel Type",
    "Begin Date and Time",
    "End Date and Time",
  ];

  const [currentBar, setCurrentBar] = useState("");
  const breadCrumbs = (lastBread) => {
    const breadBar = (
      <BreadcrumbBar className="padding-0">
        <Breadcrumb onClick={() => setSecondLevel(false)}>
          <BreadcrumbLink>
            <span>System</span>
          </BreadcrumbLink>
        </Breadcrumb>

        <Breadcrumb current>
          <span>{lastBread}</span>
        </Breadcrumb>
      </BreadcrumbBar>
    );
    setCurrentBar(breadBar);
    if (secondLevel) {
      setCurrentBar("");
    }
  };
  useEffect(() => {
    if (!secondLevel) {
      setCurrentBar("");
    }
  }, [secondLevel]);

  const setBread = (val, currentBread) => {
    setSecondLevel(val);
    breadCrumbs(currentBread);
  };

  const [createBTN, setCreateBTN] = useState("Create");
  const createBtn = (val) => {
    setCreateBTN(`${val}`);
  };
  // *** memoize data
  const data = useMemo(() => {
    if (monitoringSystems.length > 0) {
      const activeOnly = getActiveData(monitoringSystems);
      const inactiveOnly = getInactiveData(monitoringSystems);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === monitoringSystems.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === monitoringSystems.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
      }

      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansSystemsTableRecords(
        !inactive[0] ? getActiveData(monitoringSystems) : monitoringSystems
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringSystems, inactive]);
  return (
    <>
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <div className="methodTable ">
        <DataTableRender
          dataLoaded={dataLoaded}
          data={data}
          columnNames={columnNames}
          openHandler={openSystem}
          actionsBtn="View"
          checkout={checkout}
          user={user}
          addBtn={openSystem}
          addBtnName={"Create System"}
        />
      </div>
      {show ? (
        createNewSystem ? (
          <Modal
            show={show}
            close={closeModalHandler}
            showCancel={!(user && checkout)}
            showSave={user && checkout}
            breadCrumbBar={currentBar}
            title={"Create System"}
            createNew="Create System"
            children={
              <ModalDetails
                modalData={selected}
                data={selectedModalData}
                cols={2}
                title={`Create System`}
                viewOnly={!(user && checkout)}
              />
            }
          />
        ) : (
          <Modal
            secondLevel={secondLevel}
            show={show}
            close={closeModalHandler}
            showCancel={!(user && checkout)}
            showSave={user && checkout}
            breadCrumbBar={currentBar}
            title={`System: ${selected[0]["value"]}`}
            createNew={createBTN}
            children={
              <div>
                {secondLevel ? (
                  ""
                ) : (
                  <ModalDetails
                    modalData={selected}
                    data={selectedModalData}
                    cols={2}
                    title={`System: ${selected[0]["value"]}`}
                    viewOnly={!(user && checkout)}
                  />
                )}
                <DataTableSystemsComponents
                  secondLevel={secondLevel}
                  setSecondLevel={setBread}
                  viewOnly={false}
                  user={user}
                  checkout={checkout}
                  setCreateBtn={createBtn}
                  locationSelectValue={locationSelectValue}
                  systemID={selected.length > 1 ? selected[0].value : 0}
                />
              </div>
            }
          />
        )
      ) : null}
    </>
  );
};

export default DataTableSystems;
