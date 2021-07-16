import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";

import DataTableRender from "../../DataTableRender/DataTableRender";

import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

export const DataTableMethod = ({
  locationSelectValue,
  matsTableHandler,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
}) => {
  const [methods, setMethods] = useState([]);
  const [matsMethods, setMatsMethods] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedMonitoringMethod, setSelectedMonitoringMethod] = useState(
    null
  );
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    mpApi.getMonitoringMethods(locationSelectValue).then((res) => {
      setMethods(res.data);
      setDataLoaded(true);
    });
    mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
      setMatsMethods(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter",
    "Methodology",
    "Substitute Data Approach",
    "Bypass Approach",
    "Begin Date and Time",
    "End Date and Time",
  ];

  // cant unit test properly
  const [createNewMethod, setCreateNewMethod] = useState(false);
  const openMethodModal = (row, bool, create) => {
    let monMethod = null;
    setCreateNewMethod(create);
    if (methods.length > 0 && !create) {
      monMethod = methods.filter((element) => element.id === row.col7)[0];
      setSelectedMonitoringMethod(monMethod);
    }
    setSelectedModalData(
      modalViewData(
        monMethod,
        {
          parameterCode: ["Parameter", "dropdown"],
          methodCode: ["Methodology", "dropdown"],
          subDataCode: ["Substitute Data Approach", "dropdown"],
          bypassApproachCode: ["Bypass Approach", "dropdown"],
        },
        {
          beginDate: ["Start Date", "date"],
          beginHour: ["Start Time", "time"],
          endDate: ["End Date", "date"],
          endHour: ["End Time", "time"],
        },
        create
      )
    );
    setShow(true);
  };

  const data = useMemo(() => {
    if (methods.length > 0) {
      const activeOnly = getActiveData(methods);
      const inactiveOnly = getInactiveData(methods);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === methods.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansMethodsTableRecords(methods);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === methods.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansMethodsTableRecords(methods);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansMethodsTableRecords(
        !inactive[0] ? getActiveData(methods) : methods
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods, inactive]);

  useEffect(() => {
    if (matsTableHandler) {
      if (matsMethods.length < 1) {
        matsTableHandler(false);
      } else {
        matsTableHandler(true);
      }
    }
  }, [matsMethods.length, matsTableHandler]);

  const closeModalHandler = () => setShow(false);

  const saveMethods = () => {
    const payload = {
      monLocId: locationSelectValue,
      id: null,
      parameterCode: null,
      subDataCode: null,
      bypassApproachCode: null,
      methodCode: null,
      beginDate: null,
      beginHour: 0,
      endDate: null,
      endHour: 0,
    };

    const userInput = extractUserInput(payload, ".modalUserInput");

    mpApi
      .saveMonitoringMethods(userInput)
      .then((result) => {
        console.log(result);
        // openModal(false);
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
        // openModal(false);
        setShow(false);
      });
  };
  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

      <DataTableRender
        openHandler={openMethodModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openMethodModal}
        addBtnName={"Create Method"}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={saveMethods}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={
            createNewMethod ? "Create Method" : "Component: Monitoring Methods"
          }
          createNew={createNewMethod ? "Create Method" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedMonitoringMethod}
                data={selectedModalData}
                cols={2}
                title={"Component: Monitoring Methods"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableMethod;
