import React, { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowDownwardSharp } from '@material-ui/icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ReviewAndSubmitTables.scss';
import {
  addScreenReaderLabelForCollapses,
  cleanUp508,
  ensure508,
} from '../../../additional-functions/ensure-508';
import { oneSecond } from '../../../config';
import { formatDate } from '../../../utils/functions';

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

const ReviewAndSubmitTables = ({ monPlans }) => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const handleSelectedFiles = useCallback(
    (files) => setSelectedFiles(files),
    []
  );

  const monPlanTable = {
    columns: monPlanColumns,
    data: monPlans,
    name: 'Monitoring Plan',
  };
  const tables = [monPlanTable];
  console.log({ monPlanTable, selectedFiles });
  const [activeTables, setActiveTables] = useState(
    tables.reduce((acc, curr) => ({ ...acc, [curr.name]: true }), {})
  );
  const showOrHideTable = (name) =>
    setActiveTables({
      ...activeTables,
      [name]: !activeTables[name],
    });
  useEffect(() => {
    setTimeout(() => {
      ensure508();
    }, oneSecond);

    return () => {
      cleanUp508();
      addScreenReaderLabelForCollapses();
    };
  }, []);
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
              <DataTable
                columns={columns}
                data={data}
                noHeader={true}
                highlightOnHover={true}
                selectableRows={true}
                responsive={false}
                striped={true}
                persistTableHead={false}
                sortIcon={
                  <ArrowDownwardSharp
                    className="margin-left-2 text-primary"
                    id="bdfSortIcon"
                  />
                }
                onSelectedRowsChange={handleSelectedFiles}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAndSubmitTables;
