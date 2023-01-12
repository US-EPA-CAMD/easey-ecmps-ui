import React, { useState, createContext } from "react";

export const useSuppressionFiltersStore = () => {
    const [checkType, setCheckType] = useState();
    const [checkNumber, setCheckNumber] = useState();
    const [checkResult, setCheckResult] = useState();
    const [facility, setFacility] = useState();
    const [locations, setLocations] = useState();
    const [active, setActive] = useState();
    const [reason, setReason] = useState();
    const [addDateAfter, setAddDateAfter] = useState();
    const [addDateBefore, setAddDateBefore] = useState();

    return {
        checkType,
        setCheckType,
        checkNumber,
        setCheckNumber,
        checkResult,
        setCheckResult,
        facility,
        setFacility,
        locations,
        setLocations,
        active,
        setActive,
        reason,
        setReason,
        addDateAfter,
        setAddDateAfter,
        addDateBefore,
        setAddDateBefore,
    }
}

export const ErrorSuppressionFiltersContext = createContext();

export const ErrorSuppressionFiltersContextProvider = ({ children }) => (
    <ErrorSuppressionFiltersContext.Provider value={useSuppressionFiltersStore()}>
        {children}
    </ErrorSuppressionFiltersContext.Provider>
);

