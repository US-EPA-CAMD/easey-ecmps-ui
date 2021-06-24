import React, { useEffect, useMemo,useState } from "react";

import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import DataTableRender from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import log from "loglevel";

export const DataTableMats = ({
  locationSelect,
}) => {
  const [matsMethods,setMatsMethods] = useState([])
  useEffect(() => {
    if (matsMethods.length === 0) {
      mpApi
      .getMonitoringMatsMethods(locationSelect)
      .then((res) => {
        setMatsMethods(res.data);
      })
      .catch((err) => {
        log(err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [];
  columnNames.push("Parameter");
  columnNames.push("Methodology");
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

  const data = useMemo(() => {
    if (matsMethods.length > 0 ) {
      return fs.getMonitoringPlansMatsMethodsTableRecords(
        matsMethods
      );
    } else {
      return [{ col2: "Loading list of Supplemental Methods" }];
    }
  }, [ matsMethods]);

  return (
    <div className="methodTable">
      <DataTableRender columns={columns} data={data} />
    </div>
  );
};


export default (DataTableMats);
