import React, { useState } from "react";
import DataTable from "react-data-table-component";

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
    name: "Unit/Stack/Pipe ID",
    selector: (row) => row.unitStackPipe,
  },
];

export const SelectableAccordion = ({ items, setCanCheck }) => {
  const [itemStates, setItemStates] = useState(items);

  return (
    <div className="usa-accordion">
      {items.map((element, idx) => {
        return (
          <div key={idx}>
            <DataTable
              noHeader={true}
              className={`data-display-table react-transition fade-in`}
              columns={columnMappings}
              fixedHeader
              fixedHeaderScrollHeight="100px"
              data={element.facData}
            />
            <div className="margin-bottom-3">
              <h4 className="usa-accordion__heading">
                <button
                  type="button"
                  className="usa-accordion__button"
                  aria-expanded={itemStates[idx].expanded}
                  onClick={() => {
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
                className="usa-accordion__content usa-prose margin-4"
                hidden={!itemStates[idx].expanded}
              >
                <p className="">{element.content}</p>
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
