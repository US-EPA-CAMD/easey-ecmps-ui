import React, { useState, createContext } from "react";

// initVals is only necessary atm for testing purposes (see ErrorSuppressionDataContainer.test)
export const useSuppressionFiltersStore = () => {
    const [checkType, setCheckType] = useState();
    const [checkNumber, setCheckNumber] = useState();
    const [checkResult, setCheckResult] = useState();
    const [facility, setFacility] = useState();
    const [locations, setLocations] = useState();
    const [active, setActive] = useState();
    const [reasonCode, setReasonCode] = useState();
    const [addDateAfter, setAddDateAfter] = useState();
    const [addDateBefore, setAddDateBefore] = useState();

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
        reasonCode,
        setReasonCode,
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

