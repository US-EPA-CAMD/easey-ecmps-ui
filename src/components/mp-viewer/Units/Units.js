import React, { useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/facilities";
import UnitDetailView from "../UnitDetailView/UnitDetailView";
import UnitsTableRender from "../UnitsTableRender/UnitsTableRender";

import "./Units.scss";

export const UnitsDataTable = ({ facility }) => {
  const [operatingOnly, setOperatingOnly] = useState(true);
  const [unitDetail, setUnitDetail] = useState(null);
  const operatingOnlyHandler = (evt) => {
    operatingOnly ? setOperatingOnly(false) : setOperatingOnly(true);
  };
  const selectedRowHandler = (unitId) => {
    setUnitDetail(fs.getSelectedUnitDetail(unitId, facility));
  };
  const columns = useMemo(
    () => [
      {
        Header: "Unit ID",
        accessor: "col1",
        width: "100px",
      },
      {
        Header: "Commence Operation Date",
        accessor: "col2",
        width: "270px",
      },
      {
        Header: "Status",
        accessor: "col3",
        width: "120px",
      },
    ],
    []
  );

  const formatRecords = (records) => {
    records.forEach((e) => {
      const date = new Date(e.col2);
      e.col2 = `${("0" + (date.getMonth() + 1)).slice(
        -2
      )}/${date.getDate()}/${date.getFullYear()}`;
      e.col3 = e.col3 === "OPR" ? "Operating" : "Retired";
    });
    return records;
  };

  const data = useMemo(() => {
    setUnitDetail(null);
    if (facility) {
      const records = fs.getUnitsTableRecords(facility);
      if (operatingOnly) {
        return formatRecords(records).filter((d) => d.col3 === "Operating");
      } else {
        return formatRecords(records);
      }
    } else {
      return [{ col2: "Loading list of Units..." }];
    }
  }, [operatingOnly, facility]);

  return (
    <div className="grid-row">
      <div className="grid-col">
        <UnitsTableRender
          columns={columns}
          data={data}
          checkBoxHandler={operatingOnlyHandler}
          selectedRowHandler={selectedRowHandler}
        />
      </div>
      <div className="grid-col">
        <UnitDetailView className="grid-col" unitDetail={unitDetail} />
      </div>
    </div>
  );
};

export default UnitsDataTable;
