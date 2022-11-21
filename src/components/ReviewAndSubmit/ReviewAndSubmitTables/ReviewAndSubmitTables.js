import React, { useCallback, useState } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ReviewAndSubmitTables.scss';

import { formatDate } from '../../../utils/functions';
import ReviewAndSubmitTableRender from '../ReviewAndSubmitTableRender/ReviewAndSubmitTableRender';

const monPlanColumns = [
  { name: 'ORIS Code', selector: 'orisCode', sortable: true },
  { name: 'Facility Name', selector: 'facilityName', sortable: true },
  { name: 'Configuration', selector: 'id', sortable: true },
  { name: 'Last Modified By', selector: 'userId', sortable: true },
  {
    name: 'Last Modified Date',
    selector: (row) => formatDate(row.updateDate),
    sortable: true,
  },
  { name: 'Eval Status', selector: 'evalStatusCode', sortable: true },
  {
    name: 'Submission Status',
    selector: 'submissionAvailabilityCode',
    sortable: true,
  },
];

const ReviewAndSubmitTables = ({ monPlans, selectedMonPlansRef }) => {
  const handleSelectedMonPlanFiles = useCallback(
    (files) => selectedMonPlansRef.current = files,// eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const monPlanTable = {
    columns: monPlanColumns,
    data: monPlans,
    name: 'Monitoring Plan',
  };
  const tables = [monPlanTable];
  // console.log({ monPlanTable, selectedMPFiles });
  const [activeTables, setActiveTables] = useState(
    tables.reduce((acc, curr) => ({ ...acc, [curr.name]: true }), {})
  );
  const showOrHideTable = (name) =>
    setActiveTables({
      ...activeTables,
      [name]: !activeTables[name],
    });

  const dataTableProps = {
    'Monitoring Plan': {
      onSelectedRowsChange: handleSelectedMonPlanFiles
    },
  };
  return (
    <div>
      {tables.map((table, i) => {
        const { name, columns, data } = table;
        return (
          <div className="" key={i}>
            <div className="padding-y-5 display-flex">
              <span>
                {activeTables[name] ? (
                  <FontAwesomeIcon
                    role="button"
                    icon={faChevronUp}
                    className="padding-3 bg-base-lighter"
                    onClick={() => showOrHideTable(name)}
                  />
                ) : (
                  <FontAwesomeIcon
                    role="button"
                    icon={faChevronDown}
                    className="padding-3 bg-base-lighter"
                    onClick={() => showOrHideTable(name)}
                  />
                )}
              </span>
              <h3 className="padding-x-3">{name}</h3>
            </div>
            <div
              className={
                activeTables[name]
                  ? 'data-display-table maxh-mobile overflow-y-auto overflow-x-auto'
                  : 'display-none'
              }
            >
              <ReviewAndSubmitTableRender
                columns={columns}
                data={data}
                dataTableName={'Monitoring Plan'}
                dataTableProps={dataTableProps[name]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAndSubmitTables;
