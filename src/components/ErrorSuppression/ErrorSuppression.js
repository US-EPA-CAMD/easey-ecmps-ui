import React from "react";
import * as modules from "../../utils/constants/moduleTitles";
import { ErrorSuppressionFilters } from "./ErrorSuppressionFilters/ErrorSuppressionFilters";
import { ErrorSuppressionDataContainer } from "./ErrorSuppressionDataContainer/ErrorSuppressionDataContainer";
import { ErrorSuppressionFiltersContextProvider } from "./context/error-suppression-context";
import { FileInput } from "@trussworks/react-uswds";
export const defaultDropdownText = "-- Select a value --";

export const ErrorSuppression = () => {

  return (
      <div className="react-transition fade-in padding-x-3">
        <div className="text-black margin-top-1 display-none tablet:display-block">
          <h2
            className="display-inline-block page-header margin-top-2"
            epa-testid={`${modules.error_supression_module
              .split(" ")
              .join("")}Title`}
          >
            {modules.error_supression_module}
          </h2>
          <hr/>
          <ErrorSuppressionFiltersContextProvider>
            <FileInput/>
            <ErrorSuppressionFilters/>
            <hr className="margin-top-4 margin-bottom-4"/>
            <ErrorSuppressionDataContainer />
          </ErrorSuppressionFiltersContextProvider>
        </div>
      </div>
  );
};
