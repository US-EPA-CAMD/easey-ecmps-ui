import React, { useEffect, useMemo, useState } from "react";

import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import Modal from "../../Modal/Modal";
import Details from "../../Details/Details";
import DataTableSystemsComponents from "../DataTableSystemsComponents/DataTableSystemsComponents";
import DataTableRender from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

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
}) => {
  const [show, setShow] = useState(false);
  const [monitoringSystems, setMonitoringSystems] = useState([]);
  const [secondLevel, setSecondLevel] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    mpApi.getMonitoringSystems(locationSelectValue).then((res) => {
      setDataLoaded(true);
      setMonitoringSystems(res.data);
      console.log('systems',res.data)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue]);

  const closeModalHandler = () => setShow(false);

  const [modalData, setModalData] = useState([
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: "05/04/2009 0" },
    { value: "05/04/2009 0" },
  ]);
  const [selected, setSelected] = useState([]);

  // const openModal = (value, selection) => {
  //   setSelected(selection);
  //   setShow(value);
  // };

  // *** row handler onclick event listener
  const selectedRowHandler = (selection) => {
  //   openModal(true, selection.cells);
    setSelected(selection.cells);
    setShow(true);
  };

  useEffect(() => {
    setModalData(
      selected.map((info) => {
        return {
          header: info.column,
          value: info.value,
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

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
  const viewOnly = true;
  return (
    <>
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <div className="methodTable">
        <DataTableRender
          dataLoaded={dataLoaded}
          pagination
          filter
          data={data}
          columnNames={columnNames}
          openHandler={selectedRowHandler}
          actionsBTN="View"
        />
      </div>
      {show ? (
        <Modal
          secondLevel={true}
          show={show}
          close={closeModalHandler}
          showCancel
          showSave
          children={
            <div>
              {secondLevel ? (
                ""
              ) : (
                <Details viewOnly={viewOnly} modalData={modalData} />
              )}
              <DataTableSystemsComponents
                secondLevel={secondLevel}
                setSecondLevel={setSecondLevel}
                viewOnly={viewOnly}
                locationSelectValue={locationSelectValue}
                systemID={modalData.length > 1 ? modalData[0].value : 0}
              />
            </div>
          }
        />
      ) : null}
    </>
  );
};

export default DataTableSystems;
