/*****************************************************
 * ensure508:
 *
 *   This is the "parent" function (i.e., it calls individual standalone functions),
 *   used to make sure all input present on the screen is in 508 complaint format
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const ensure508 = () => {
  // *** add aria label to all data tables
  addAriaLabelToDatatable();

  // *** move filter that may be present in datatable out of aria-live region
  moveDataTableSearchOutOfAriaLive();

  // *** add aria sorted-by to data tables
  addInitialAriaSort();

  // *** change auto-generated attribute value
  changeGridCellAttributeValue();

  // *** assign aria sort handlers
  assignAriaSortHandlersToDatatable();
  addScreenReaderLabelForCollapses();
};

/*****************************************************
 * cleanUp508:
 *
 *   This is the "parent" function (i.e., it calls individual standalone functions),
 *   used to clean up any modification made to ensure 508 compliance
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const cleanUp508 = () => {
  removeAriaSortHandlersFromDatatable();
};

/*****************************************************
 * changeGridCellAttributeValue:
 *
 *   This function is used to change auto-generated attribute value in order to
 *   make datatable 508 compliant
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const changeGridCellAttributeValue = () => {
  setTimeout(() => {
    // *** change auto-generated attribute role from "gridcell" to "cell"
    document.querySelectorAll(`[role="gridcell"]`).forEach((element) => {
      element.setAttribute("role", "cell");
    });
  });
};

export const moveDataTableSearchOutOfAriaLive = () => {
  // *** if 'search' table html element is present, move it
  if (document.querySelector("#datatableContainer table")) {
    document
      .querySelectorAll("#datatableContainer table")
      .forEach((element) => {
        document
          .querySelector("#datatableFilterContainer")
          .appendChild(document.querySelector("#datatableContainer table"));
      });
  }
};

export const addScreenReaderLabelForCollapses = () => {
  setTimeout(() => {
    document
      .querySelectorAll(`[aria-label="Expand Row"]`)
      .forEach((element) => {
        const fac = element.parentNode.parentNode.childNodes[1].outerText;
        element.setAttribute("aria-label", `Expand ${fac}`);
      });
  });

  setTimeout(() => {
    document
      .querySelectorAll(`[aria-label="Collapse Row"]`)
      .forEach((element) => {
        const fac = element.parentNode.parentNode.childNodes[1].outerText;
        element.setAttribute("aria-label", `Collapse ${fac}`);
      });
  });
};
/*****************************************************
 * addAriaLabelToDatatable:
 *
 *   This function is used to initially set aria-sort attribute appropriately
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const addAriaLabelToDatatable = () => {
  document.querySelectorAll(`.rdt_Table`).forEach((element) => {
    let label;
    let ariaLabelElement;

    const dataTableText = "DataTable for";
    const siblings = getAllSiblings(element.parentElement.parentElement);

    siblings.forEach((sib) => {
      if (
        sib.attributes &&
        sib.attributes[0] &&
        sib.attributes[0].name === "data-aria-label"
      ) {
        ariaLabelElement = sib;
      }
    });

    if (
      ariaLabelElement &&
      ariaLabelElement.tagName &&
      ariaLabelElement.tagName.toLowerCase() === "span"
    ) {
      let ariaLabel = ariaLabelElement.attributes[0].value;

      // Fixing spelling
      if (ariaLabel === "Unit Capacitys") {
        ariaLabel = "Unit Capacities";
      }

      label = `${dataTableText} ${ariaLabel}`;
    } else {
      // NOTE: if this aria-label text shows, we need to refactor the code to assign the correct label
      //       if this occurs, most likely the ariaLabel property is not assigned in the DataTableRender element
      label = "DataTable Aria Label Missing";
    }

    element.setAttribute("aria-label", label);
  });
};

/*****************************************************
 * getAllSiblings:
 *
 *   This function is used to retrieve the silbling elements of an element
 *
 *       Inputs:
 *              element & filter (optional)
 *       Outputs:
 *              sibling elements
 *****************************************************/

function getAllSiblings(elem, filter) {
  const sibs = [];
  elem = elem.parentNode.firstChild;
  do {
    if (elem.nodeType === 3) {
      continue;
    }
    if (!filter || filter(elem)) {
      sibs.push(elem);
    }
  } while ((elem = elem.nextSibling));
  return sibs;
}

/*****************************************************
 * addInitialAriaSort:
 *
 *   This function is used to initially set aria-sort attribute appropriately
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const addInitialAriaSort = () => {
  setTimeout(() => {
    document.querySelectorAll(`.rdt_TableCol_Sortable`).forEach((column) => {
      // *** traverse all sort icons
      if (column.querySelectorAll(".__rdt_custom_sort_icon__").length > 0) {
        // *** isolate the svg element of the icon
        const sortIcon = column.querySelector(".MuiSvgIcon-root");

        // *** if svg element is displayed, set
        if (sortIcon && window.getComputedStyle(sortIcon).opacity === "1") {
          if (
            column
              .querySelector(".__rdt_custom_sort_icon__")
              .classList.contains("asc")
          ) {
            column
              .closest(`.rdt_TableCol_Sortable`)
              .setAttribute("aria-sort", "ascending");
          } else if (
            column
              .querySelector(".__rdt_custom_sort_icon__")
              .classList.contains("desc")
          ) {
            column
              .closest(`.rdt_TableCol_Sortable`)
              .setAttribute("aria-sort", "descending");
          }
        } else {
          column
            .closest(`.rdt_TableCol_Sortable`)
            .setAttribute("aria-sort", "none");
        }
      }
    });
  });
};

/*****************************************************
 * setAriaSort:
 *
 *   This function is used to set aria-sort attribute appropriately
 *
 *       Inputs:
 *              event - browser event to which action is linked
 *       Outputs:
 *              none
 *****************************************************/
export const setAriaSort = (event) => {
  const currentColumn = event.target.closest(".rdt_TableCol_Sortable");
  const sortIcon = currentColumn.querySelector(".__rdt_custom_sort_icon__");

  // *** disregard any events that don't result in sorting
  if (
    (event.type === "keydown" && event.key !== "Enter") ||
    event.type === "click"
  ) {
    // *** make sure aria-sort attribute is set
    document.querySelectorAll(`.rdt_TableCol_Sortable`).forEach((column) => {
      if (column === currentColumn) {
        if (currentColumn.ariaSort === "none") {
          if (sortIcon && sortIcon.classList) {
            if (sortIcon.classList.contains("asc")) {
              currentColumn.ariaSort = "ascending";
            } else if (sortIcon.classList.contains("desc")) {
              currentColumn.ariaSort = "descending";
            }
          }
        } else {
          if (currentColumn.ariaSort === "ascending") {
            currentColumn.ariaSort = "descending";
          } else {
            currentColumn.ariaSort = "ascending";
          }
        }
      } else {
        column.ariaSort = "none";
      }
    });
  }

  changeGridCellAttributeValue();
};

/*****************************************************
 * assignAriaSortHandlersToDatatable:
 *
 *   This function is used to add event listeners to all sortable columns and make
 *   sure aria-sort attribute is set appropriately
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const assignAriaSortHandlersToDatatable = () => {
  setTimeout(() => {
    // *** only event being taken into account are the ones that result in sorting of the datatable
    document.querySelectorAll(".rdt_TableCol_Sortable").forEach((element) => {
      element.addEventListener("click", setAriaSort, true);
      element.addEventListener("keydown", setAriaSort, true);
    });
  });
};

/*****************************************************
 * removeAriaSortHandlersFromDatatable:
 *
 *   This function is used to clean up event listeners assigned to data table for
 *   508 compliance
 *****************************************************/
export const removeAriaSortHandlersFromDatatable = () => {
  document.querySelectorAll(".rdt_TableCol_Sortable").forEach((element) => {
    element.removeEventListener("click", setAriaSort);
    element.removeEventListener("keydown", setAriaSort);
  });
};

/*****************************************************
 * assignAriaLabelsToDatePickerButtons:
 *
 *   This function is used to add correct aria-labels to datepicker buttons
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const assignAriaLabelsToDatePickerButtons = () => {
  document.querySelectorAll(".usa-date-picker__button").forEach((element) => {
    element.ariaLabel =
      "Toggle Calendar for " + element.parentNode.querySelector("input").id;
  });
};


export const assignAriaLabelsToDataTable = (containerSelector, ariaLiveData) => {
  const table = document.querySelector(containerSelector).querySelector('[role="table"]')
  table.setAttribute('aria-label', 'Test-Summary-Data')

  const rowGroups = table.querySelectorAll('[role="rowgroup"]')

  if (rowGroups.length > 1) {
    const tableRows = rowGroups[1].querySelectorAll('[role="row"]')

    tableRows.forEach((row, idx) => {
      row.querySelector('input[type="checkbox"]').setAttribute('aria-label', `select-row-${ariaLiveData[idx]}`)

      row.querySelectorAll('[role="gridcell"').forEach(cell => {
        cell.setAttribute('role', `cell`)
      })
    })
  }
}