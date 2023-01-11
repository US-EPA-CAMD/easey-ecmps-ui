import React from "react";
import * as modules from "../../utils/constants/moduleTitles";
import { ErrorSuppressionFilters } from "./ErrorSuppressionFilters/ErrorSuppressionFilters";
import { ErrorSuppressionDataContainer } from "./ErrorSuppressionDataContainer/ErrorSuppressionDataContainer";
import { ErrorSuppressionFiltersContextProvider } from "./error-suppression-context";

export const ErrorSuppression = () => {

  return (
    <ErrorSuppressionFiltersContextProvider>
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
          <ErrorSuppressionFilters/>
          <hr/>
          <ErrorSuppressionDataContainer />
        </div>
      </div>
    </ErrorSuppressionFiltersContextProvider>
  );
};
