import { DataTableRender } from "../DataTableRender/DataTableRender";
import React from "react";
import { useGetEmissionViewData } from "./useGetEmissionViewData";

export const EmissionsTabTable = ({
  viewCode,
  monitorPlanId,
  reportingPeriods,
  unitIds,
  stackPipeIds,
}) => {
  const { columnNames, data, isDataLoaded } = useGetEmissionViewData(
    viewCode,
    monitorPlanId,
    reportingPeriods,
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
  reportingPeriods,
  unitIds,
  stackPipeIds
) => {
  return [
    [
      <EmissionsTabTable
        viewCode={viewCode.code}
        monitorPlanId={monitorPlanId}
        reportingPeriods={reportingPeriods}
        unitIds={unitIds}
        stackPipeIds={stackPipeIds}
      />,
      viewCode.name,
    ],
  ];
};
