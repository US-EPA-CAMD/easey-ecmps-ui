import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import { Button } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import MethodModal from "../../MethodModal/MethodModal";
import DataTableRender from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";
export const DataTableMethod = ({
  locationSelectValue,
  matsTableHandler,
  showActiveOnly,
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
  const columnNames = [];
  columnNames.push("Parameter");
  columnNames.push("Methodology");
  columnNames.push("Substitute Data Approach");
  columnNames.push("Bypass Approach");
  columnNames.push("Begin Date and Time");
  columnNames.push("End Date and Time");

  // *** generate columns array of object based on columnNames array above
  const columns = [];

  columnNames.forEach((name, index) => {
    columns.push({
      name,
      selector: `col${index + 1}`,
      sortable: true,
    });
  });
  columns.push({
    name: "Actions",
    button: true,
    width: "25%",
    cell: (row) => {
      // *** normalize the row object to be in the format expected by DynamicTabs
      // const normalizedRow = normalizeRowObjectFormat(row, columnNames);
      return (
        <div>
          {!(user && checkout) ? (
            <Button
              type="button"
              unstyled="true"
              epa-testid="btnOpenMethod"
              className="cursor-pointer open-modal-button"
              id="btnOpenMethod"
              // onClick={() => openConfig(row)}
              onClick={() => openMonitoringMethodsModal(row.col1, row.col2)}
              aria-label={`open method ${row.col1} `}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  openMonitoringMethodsModal(row.col1, row.col2);
                }
              }}
            >
              View
            </Button>
          ) : (
            <Button
              type="button"
              unstyled="true"
              epa-testid="btnOpenMethod"
              className="cursor-pointer margin-left-2 open-modal-button"
              onClick={() => openMonitoringMethodsModal(row.col1, row.col2)}
              aria-label={`edit method ${row.col1} `}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  openMonitoringMethodsModal(row.col1, row.col2);
                }
              }}
            >
              {"View / Edit"}
            </Button>
          )}
        </div>
      );
    },
  });

  const openMonitoringMethodsModal = (parameterCode, methodCode) => {
    if (methods.length > 0) {
      const monMethod = methods.filter(
        (element) =>
          element.parameterCode === parameterCode &&
          element.methodCode === methodCode
      )[0];

      setSelectedMonitoringMethod(monMethod);

      openModal(true);
    }
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

  const openModal = (value) => {
    setShow(value);
  };

  const saveMethods = () => {
    // *** construct payload
    const payloadInputs = document.querySelectorAll(".modalUserInput");
    const datepickerPayloads = document.querySelectorAll(
      ".usa-date-picker__internal-input"
    );

    const payloadArray = [];

    payloadInputs.forEach((input) => {
      if (input.id === undefined || input.id === null || input.id === "") {
        return;
      }
      const item = { name: "", value: "" };
      item.name = document.getElementById(input.id).attributes[
        "epadataname"
      ].value;
      item.value = document.getElementById(input.id).value;
      payloadArray.push(item);
    });

    datepickerPayloads.forEach((input) => {
      const item = { name: "", value: "" };
      item.name = input.attributes["epadataname"].value;
      item.value = input.value;
      payloadArray.push(item);
    });

    const payload = {
      monLocId: locationSelectValue,
      id: "",
      parameterCode: "",
      subDataCode: "",
      bypassApproachCode: "",
      methodCode: "",
      beginDate: "",
      beginHour: 0,
      endDate: "",
      endHour: 0,
    };

    payloadArray.forEach((item) => {
      payload[item.name] = item.value;
    });

    mpApi
      .saveMonitoringMethods(payload)
      .then((result) => {
        console.log(result);
        openModal(false);
      })
      .catch((error) => {
        console.log(error);
        openModal(false);
      });
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

      <DataTableRender columns={columns} data={data} dataLoaded={dataLoaded} />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={saveMethods}
          showCancel
          showSave={user && checkout}
          children={
            <div>
              <MethodModal
                modalData={selectedMonitoringMethod}
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
