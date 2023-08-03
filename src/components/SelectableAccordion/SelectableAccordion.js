import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  addScreenReaderLabelForCollapses,
  cleanUp508,
  ensure508,
} from "../../additional-functions/ensure-508";
import { oneSecond } from "../../config";

const columnMappings = [
  {
    name: "Facility ID (ORISPL)",
    selector: (row) => row.oris,
  },
  {
    name: "Facility Name",
    selector: (row) => row.facName,
  },

  {
    name: "Unit Info",
    selector: (row) => row.unitInfo,
  },
];

export const SelectableAccordion = ({
  items,
  setCanCheck,
  submissionActionLog,
  setSubmissionActionLog,
}) => {
  const [itemStates, setItemStates] = useState(items);

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
    <div className="usa-accordion" data-testid="selectable-accordion-wrapper">
      {items.map((element, idx) => {
        return (
          <div key={idx}>
            <DataTable
              noHeader={true}
              className={`data-display-table react-transition fade-in`}
              columns={columnMappings}
              fixedHeader
              fixedHeaderScrollHeight="150px"
              data={element.facData}
            />
            <div className="margin-bottom-3">
              <h4 className="usa-accordion__heading">
                <button
                  type="button"
                  className="usa-accordion__button"
                  aria-expanded={itemStates[idx].expanded}
                  onClick={() => {
                    setSubmissionActionLog({
                      ...submissionActionLog,
                      [`certStatement${idx}`]: new Date(),
                    });

                    itemStates[idx].expanded = !itemStates[idx].expanded;
                    itemStates[idx].hasExpanded = true;

                    let canCheck = true;
                    for (const state of itemStates) {
                      if (!state.hasExpanded) {
                        canCheck = false;
                      }
                    }

                    setCanCheck(canCheck);
                    setItemStates([...itemStates]);
                  }}
                >
                  {element.title}
                </button>
              </h4>
              <div
                className="usa-accordion__content margin-4"
                hidden={!itemStates[idx].expanded}
              >
                <p className="no-max-width">{element.content}</p>
              </div>
            </div>
            {idx < items.length - 1 && (
              <span className="margin-1 break-line-bold" />
            )}
          </div>
        );
      })}
    </div>
  );
};
