import React, { useContext } from "react";
import { ErrorSuppressionFiltersContext } from "../error-suppression-context";

export const ErrorSuppressionFilters = ()=>{

    const ctxFilters = useContext(ErrorSuppressionFiltersContext);

    return (<div>ErrorSupressionFilters Component</div>);
}
