import React , { useEffect, useState } from 'react';
import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";
import { getQATestSummaryByReportingPeriod } from "../../utils/api/qaCertificationsAPI";
import DataTable from "react-data-table-component";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { ArrowDownwardSharp } from "@material-ui/icons";

const QAImportHistoricalDataPreview = ({
  locations
}) =>{
  const [ reportingPeriodObj, setReportingPeriodObj ] = useState(null);
  const [ testSummaryData, setTestSummaryData ] = useState(null);
  const [ previewData, setPreviewData ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const fetchDataPreviewRecords = () =>{
    if(reportingPeriodObj && !previewData){
      const allPromises = [];
      setLoading(true);
      locations.forEach(e=>{
        allPromises.push(
          getQATestSummaryByReportingPeriod(e.id, reportingPeriodObj.beginDate, reportingPeriodObj.endDate)
        ); 
      });
      Promise.all(allPromises).then(res=>{
        console.log("res",res);
        setTestSummaryData(res.map(e=>e.data).flat());
        setPreviewData(true);
        setLoading(false);
      });
    }
  };

  useEffect(()=>{
    if(testSummaryData === null){
      fetchDataPreviewRecords();
    }
  },[reportingPeriodObj]);

  const getInitSelection = (selectedObj) =>{
    setReportingPeriodObj(selectedObj);
  };

  const reportingPeroidSelectionHandler = (selectedObj) =>{
    setReportingPeriodObj(selectedObj);
    if(previewData){
      setPreviewData(false);
    }
  }
  const columns = [
    {
      name: 'Unit or StackPipe ID',
      selector: row => row.unitId? row.unitId : row.stackPipeId,
      sortable: true,
    },
    {
      name: 'Component ID',
      selector: row => row.componentId,
      sortable: true,
    },
    {
      name: 'Test Number',
      selector: row => row.testNumber,
      sortable: true,
    },
    {
      name: 'Begin Date',
      selector: row => row.beginDate,
      sortable: true,
    },
    {
      name: 'Begin Hour',
      selector: row => row.beginHour && row.beginMinute ? `${row.beginHour}:${row.beginMinute}` : '',
      sortable: true,
    },
    {
      name: 'End Date',
      selector: row => row.endDate,
      sortable: true,
    },
    {
      name: 'End Hour',
      selector: row => row.endHour && row.endMinute ? `${row.endHour}:${row.endMinute}` : '',
      sortable: true,
    }
  ];

  return(
    <>
      <div className="grid-row">
        <div className='grid-col-8 float-left padding-left-3'>
          <ReportingPeriodSelector
            isExport={false}
            dataTypes={null}
            reportingPeroidSelectionHandler = {reportingPeroidSelectionHandler}
            exportState={null}
            getInitSelection={getInitSelection}
            setLoading={setLoading}
          />
        </div>
        <div className='grid-col-fill padding-x-9 padding-top-3'>
          <Button
            className='width-card'
            onClick={()=>fetchDataPreviewRecords()}
          >
            Preview
          </Button>
        </div>
      </div>
      {
        loading ? <Preloader/> :
          testSummaryData && previewData && (
            <div className='margin-x-3 margin-y-4'>
              <h3 className='margin-y-1'>Test Summary</h3> 
              <DataTable 
                responsive={true}
                fixedHeader={true}
                noHeader={true} 
                striped={false}
                highlightOnHover={true}
                sortIcon={
                  <ArrowDownwardSharp className="margin-left-2 text-primary" />
                } 
                columns={columns} 
                data={testSummaryData} 
                selectableRows 
              />
            </div>
          ) 
      }
    </>
    )
};

export default QAImportHistoricalDataPreview;