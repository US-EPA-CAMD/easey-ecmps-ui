import { Dropdown, Label } from "@trussworks/react-uswds";
import React, {useState} from "react";
import UploadModal from "../UploadModal/UploadModal";
import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";

export const ImportHistoricalDataModalContent = ({closeModalHandler})=>{

    const [reportingPeriod, setSelectedReportingPeriod] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState(null);

    const historicalImport = ()=>{
    }

    const setYearAndQuarter = (reportingPeriodObj)=>{
        const { calendarYear, quarter } = reportingPeriodObj;
        setSelectedYear(calendarYear);
        setSelectedQuarter(quarter);
    }

    return (
        <UploadModal
            port={historicalImport}
            show={true}
            title="Import Historical Data"
            close={()=>closeModalHandler()}
            showCancel={true}
            showSeparators={true}
            width={"600px"}
        >
            <ReportingPeriodSelector
                isExport={false}
                reportingPeriodSelectionHandler={setYearAndQuarter}
                setLoading={false}
                getInitSelection={setYearAndQuarter}
            />
        </UploadModal>
    );
}
