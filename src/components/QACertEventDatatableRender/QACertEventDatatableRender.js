import React, { useState, useEffect } from 'react';
import { normalizeRowObjectFormat } from '../../additional-functions/react-data-table-component';

import {
  changeGridCellAttributeValue,
  returnsFocusDatatableExpandBTN,
} from '../../additional-functions/ensure-508';
// *** local
import { oneSecond } from '../../config';
/*********** COMPONENTS ***********/
// *** 3rd party
import { Add, Remove, ArrowDownwardSharp } from '@material-ui/icons';
import { Button } from '@trussworks/react-uswds';
import DataTable from 'react-data-table-component';
import {
  getEmptyRows,
  getTableRowActionAriaLabel,
} from '../../utils/selectors/QACert/TestSummary';

import { cleanUp508, ensure508 } from '../../additional-functions/ensure-508';
import ConfirmActionModal from '../ConfirmActionModal/ConfirmActionModal';

const QACertEventDatatableRender = ({
  columnNames,
  actionColumnName,
  columnWidth,
  openHandler,
  data,
  user,
  actionsBtn,
  expandableRowComp,
  onRemoveHandler,
  evaluate,
  noDataComp,
  isCheckedOut,
  dataTableName,
}) => {
  const columns = [];
  columnNames.forEach((name, index) => {
    switch (name) {
      default:
        columns.push({
          name,
          selector: `col${index + 1}`,
          sortable: true,
          wrap: true,
          width: `${columnWidth}%`,
          style: {
            justifyContent: 'left',
          },
        });
        break;
    }
  });
  useEffect(() => {
    setTimeout(() => {
      const header = document.querySelector('[role="heading"');

      if (header !== null) {
        header.remove();
      }
    });
    setTimeout(() => {
      ensure508(dataTableName);
    }, oneSecond);

    return () => {
      cleanUp508();
    };
  }, []);

  const [totalExpand, setTotalExpand] = useState([]);

  useEffect(() => {
    const emptyArr = [];
    for (let i = 0; i < data.length; i++) {
      emptyArr.push(0);
    }
    setTotalExpand(emptyArr);
    changeGridCellAttributeValue();
  }, [data]);

  const expandRowBTN = (index) => {
    const arr = [...totalExpand];
    // hasnt been touched or had been closed
    if (!totalExpand[index] || totalExpand[index] === 0) {
      arr[index] = 1;
    } else {
      // closes it
      arr[index] = 0;
    }
    setTotalExpand(arr);
  };

  const createExpandBTNS = (index, row) => {
    return !totalExpand[index] || totalExpand[index] === 0 ? (
      <Add
        className="expandBTN "
        onClick={() => {
          expandRowBTN(index);
          returnsFocusDatatableExpandBTN(
            dataTableName.replaceAll(' ', '-'),
            index,
            false,
            row.col1
          );
          row.expanded = true;
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            expandRowBTN(index);
            returnsFocusDatatableExpandBTN(
              dataTableName.replaceAll(' ', '-'),
              index,
              false,
              row.col1
            );
            row.expanded = true;
          }
        }}
        title={`Click to expand row ${index + 1}`}
        name={`expand row ${index + 1}`}
        id={`expandRow${dataTableName.replaceAll(' ', '-')}${row.col1}${
          index + 1
        }`}
        aria-expanded={false}
        role="button"
        tabIndex="0"
        aria-hidden="false"
      />
    ) : (
      <Remove
        className="expandBTN "
        onClick={() => {
          expandRowBTN(index);
          returnsFocusDatatableExpandBTN(
            dataTableName.replaceAll(' ', '-'),
            index,
            true,
            row.col1
          );
          row.expanded = false;
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            expandRowBTN(index);
            returnsFocusDatatableExpandBTN(
              dataTableName.replaceAll(' ', '-'),
              index,
              true,
              row.col1
            );
            row.expanded = false;
          }
        }}
        title={`Click to collapse row ${index + 1}`}
        name={`collapse row ${index + 1}`}
        id={`collapseRow${dataTableName.replaceAll(' ', '-')}${row.col1}${
          index + 1
        }`}
        role="button"
        tabIndex="0"
        aria-expanded={true}
        aria-hidden="false"
      />
    );
  };

  if (actionsBtn) {
    if (actionsBtn === 'View') {
      columns.unshift({
        name: actionColumnName,
        button: true,
        width: user ? (evaluate ? '25%' : '20%') : `${columnWidth}%`,
        style: {
          justifyContent: 'left',
          // width:'fit-content'
        },
        cell: (row, index) => {
          // *** normalize the row object to be in the format expected by DynamicTabs
          const normalizedRow = normalizeRowObjectFormat(row, columnNames);
          return (
            <div>
              {/* user is logged in and config is checked out */}
              {user && isCheckedOut ? (
                <div className="editViewExpandGroup ">
                  {data.length > 0 && (
                    <>
                      {evaluate ? <Button>Evaluate</Button> : null}
                      <Button
                        type="button"
                        epa-testid="btnOpen"
                        className="cursor-pointer open-modal-button"
                        id={`btnEditView${dataTableName.replaceAll(' ', '-')}${
                          index + 1
                        }`}
                        onClick={() => {
                          openHandler(normalizedRow, false, null, index);
                        }}
                        role="button"
                      >
                        {'Edit'}
                      </Button>
                      <RemoveButton
                        onConfirm={() => onRemoveHandler(normalizedRow)}
                      />
                      {expandableRowComp ? createExpandBTNS(index, row) : null}
                    </>
                  )}
                </div>
              ) : (
                // user is not logged in (in public record)
                <div className="editViewExpandGroup ">
                  <Button
                    type="button"
                    epa-testid="btnOpen"
                    className="cursor-pointer open-modal-button"
                    aria-label={getTableRowActionAriaLabel(
                      dataTableName,
                      row,
                      'View'
                    )}
                    outline={true}
                    id={`btnEditView${dataTableName.replaceAll(' ', '-')}${
                      index + 1
                    }`}
                    onClick={() => {
                      openHandler(normalizedRow, false, null, index);
                    }}
                    role="button"
                  >
                    {'View'}
                  </Button>
                  {expandableRowComp ? createExpandBTNS(index, row) : null}
                </div>
              )}
            </div>
          );
        },
      });
    }
  }

  return (
    <div
      aria-live="polite"
      className="padding-3"
      id={dataTableName.replaceAll(' ', '-')}
    >
      <DataTable
        sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
        className={`data-display-table react-transition fade-in`}
        columns={columns}
        data={
          data.length > 0
            ? data
            : user && isCheckedOut
            ? getEmptyRows(columns)
            : []
        }
        expandableRows
        expandableRowsHideExpander
        expandableRowExpanded={(row) => row.expanded}
        expandableRowsComponent={expandableRowComp}
        noDataComponent={noDataComp}
      />
    </div>
  );
};

export default QACertEventDatatableRender;

const RemoveButton = ({ onConfirm }) => {
  return (
    <ConfirmActionModal
      buttonText="Remove"
      description="Are you sure you want to remove the selected data?"
      onConfirm={onConfirm}
    />
  );
};