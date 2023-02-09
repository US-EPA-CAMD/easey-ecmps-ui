import React, { useState, createContext } from "react";

// initVals is only necessary atm for testing purposes (see ErrorSuppressionDataContainer.test)
export const useSuppressionFiltersStore = (initVals={}) => {
    const [checkType, setCheckType] = useState(initVals.checkType);
    const [checkNumber, setCheckNumber] = useState(initVals.setCheckNumber);
    const [checkResult, setCheckResult] = useState(initVals.setCheckResult);
    const [facility, setFacility] = useState(initVals.setCheckResult);
    const [locations, setLocations] = useState(initVals.setCheckResult);
    const [active, setActive] = useState(initVals.setCheckResult);
    const [reason, setReason] = useState(initVals.setCheckResult);
    const [addDateAfter, setAddDateAfter] = useState(initVals.setCheckResult);
    const [addDateBefore, setAddDateBefore] = useState(initVals.setCheckResult);

    // These states maintain shared values from api calls
    const [transformedData, setTransformedData] = useState([])
    const [facilityList, setFacilityList] = useState([]);
    const [reasonCodeList, setReasonCodeList] = useState([]);

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
        facilityList, 
        setFacilityList,
        reasonCodeList, 
        setReasonCodeList,
        transformedData,
        setTransformedData,
    }
}

export const ErrorSuppressionFiltersContext = createContext();

export const ErrorSuppressionFiltersContextProvider = ({ children }) => (
    <ErrorSuppressionFiltersContext.Provider value={useSuppressionFiltersStore()}>
        {children}
    </ErrorSuppressionFiltersContext.Provider>
);

