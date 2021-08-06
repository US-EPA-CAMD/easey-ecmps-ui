import { oneSecond } from "../config";

const customSortIcon = ".__rdt_custom_sort_icon__";
const tableCol = ".rdt_TableCol";
const table = ".rdt_Table";

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

  // *** add aria sorted-by to data tables
  addInitialAriaSort();

  // *** change auto-generated attribute value
  changeGridCellAttributeValue();

  // *** assign aria sort handlers
  assignAriaSortHandlersToDatatable();
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
  }, oneSecond * 0.5);
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
  document.querySelectorAll(table).forEach((element) => {
    const defaultLabel = document.querySelector(".data-table-title")
      ? document.querySelector(".data-table-title").textContent
      : "Data Table";

    element.setAttribute("aria-label", defaultLabel);
  });
};

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
    document.querySelectorAll(tableCol).forEach((column) => {
      // *** traverse all sort icons
      if (column.querySelectorAll(customSortIcon).length > 0) {
        // *** isolate the svg element of the icon
        const sortIcon = column.querySelector(".MuiSvgIcon-root");

        // *** if svg element is displayed, set
        if (window.getComputedStyle(sortIcon).opacity === "1") {
          const sortedBy = column
            .closest(tableCol)
            .querySelector("div:nth-child(1)").textContent;

          if (column.querySelector(customSortIcon).classList.contains("asc")) {
            column
              .closest(tableCol)
              .setAttribute(
                "aria-label",
                `Sorted by ${sortedBy} in ascending order`
              );
          } else if (
            column.querySelector(customSortIcon).classList.contains("desc")
          ) {
            column
              .closest(tableCol)
              .setAttribute(
                "aria-label",
                `Sorted by ${sortedBy} in descending order`
              );
          }
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
  // *** disregard any events that don't result in sorting
  if (
    (event.type === "keydown" && event.key !== "Enter") ||
    event.type === "click"
  ) {
    // *** make sure aria-sort attribute is set
    switch (event.target.closest(tableCol).getAttribute("aria-sort")) {
      // * flip any column currently marked as "sorted" to the opposite of currently chosen direction
      case "ascending":
        event.target.closest(tableCol).setAttribute("aria-sort", "descending");
        break;

      // * flip any column currently marked as "sorted" to the opposite of currently chosen direction
      case "descending":
        event.target.closest(tableCol).setAttribute("aria-sort", "ascending");
        break;

      // * default direction is descending
      default:
        event.target.closest(tableCol).setAttribute("aria-sort", "descending");
        break;
    }
  }
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
    document.querySelectorAll(tableCol).forEach((element) => {
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
  document.querySelectorAll(tableCol).forEach((element) => {
    element.removeEventListener("click", setAriaSort);
    element.removeEventListener("keydown", setAriaSort);
  });
};
