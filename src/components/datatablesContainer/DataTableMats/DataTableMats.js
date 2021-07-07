import React, { useEffect, useMemo, useState } from "react";

import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import DataTableRender from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";
export const DataTableMats = ({
  locationSelectValue,
  user,
  checkout,
  // inactive,
  // settingInactiveCheckBox,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [matsMethods, setMatsMethods] = useState([]);
  useEffect(() => {
    mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
      console.log("res", res.data);
      setMatsMethods(res.data);
      setDataLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter",
    "Methodology",
    "Begin Date and Time",
    "End Date and Time",
  ];

  const data = useMemo(() => {
    if (matsMethods.length > 0) {
      const activeOnly = getActiveData(matsMethods);
      const inactiveOnly = getInactiveData(matsMethods);

      // // only active data >  disable checkbox and unchecks it
      // if (activeOnly.length === matsMethods.length) {
      //   // uncheck it and disable checkbox
      //   //function parameters ( check flag, disable flag )
      //   settingInactiveCheckBox(false, true);
      //   return fs.getMonitoringPlansMatsMethodsTableRecords(matsMethods);
      // }

      // // only inactive data > disables checkbox and checks it
      // if (inactiveOnly.length === matsMethods.length) {
      //   //check it and disable checkbox
      //   settingInactiveCheckBox(true, true);
      //   return fs.getMonitoringPlansMatsMethodsTableRecords(matsMethods);
      // }
      // resets checkbox
      // settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansMatsMethodsTableRecords(
        // !inactive[0] ?
        //  getActiveData(matsMethods) :
        matsMethods
      );
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matsMethods]);

  return (
    <div className="methodTable">
      <DataTableRender
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        // actionsBtn={"View"}
        checkout={checkout}
        user={user}
      />
    </div>
  );
};

export default DataTableMats;
