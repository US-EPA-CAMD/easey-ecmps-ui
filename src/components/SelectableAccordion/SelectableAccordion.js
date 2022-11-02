import React, { useState } from "react";
import "./SelectableAccordion.scss";

export const SelectableAccordion = ({ items, setCanCheck }) => {
  const [itemStates, setItemStates] = useState(items);

  return (
    <div className="usa-accordion">
      {items.map((element, idx) => {
        return (
          <div key={idx}>
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
              <p>{element.content}</p>
            </div>
            <span className="margin-1 break-line" />
          </div>
        );
      })}
    </div>
  );
};
