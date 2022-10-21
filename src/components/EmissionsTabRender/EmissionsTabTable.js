import { DataTableRender } from "../DataTableRender/DataTableRender";
import React from "react";
import { useGetEmissionViewData } from "./useGetEmissionViewData";

export const EmissionsTabTable = ({
  viewCode,
  monitorPlanId,
  year,
  quarter,
  unitIds,
  stackPipeIds,
}) => {
  const { columnNames, data, isDataLoaded } = useGetEmissionViewData(
    viewCode,
    monitorPlanId,
    year,
    quarter,
    unitIds,
    stackPipeIds
  );

  return (
    <DataTableRender
      dataLoaded={isDataLoaded}
      columnNames={columnNames}
      data={data}
    />
  );
};

export const getEmissionsTabTableRenders = (
  viewCode,
  monitorPlanId,
  year,
  quarter,
  unitIds,
  stackPipeIds
) => {
  if (!viewCode || year.length <= 0 || quarter.length <= 0) {
    return [[null, ""]];
  }

  return [
    [
      <EmissionsTabTable
        viewCode={viewCode.code}
        monitorPlanId={monitorPlanId}
        year={year}
        quarter={quarter}
        unitIds={unitIds}
        stackPipeIds={stackPipeIds}
      />,
      viewCode.name,
    ],
  ];
};
