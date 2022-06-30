import React , { useState } from 'react';
import ReportingPeriodSelector from "../../ReportingPeriodSelector/ReportingPeriodSelector";
import { Checkbox, Button } from "@trussworks/react-uswds";
import ExportTablesContainer from './ExportTablesContainer';

const ExportTab = ({
  facility,
  selectedConfig,
  orisCode,
  exportState,
  setExportState,
  workspaceSection
}) =>{
  
  console.log('export tab render');
  console.log('exportState', exportState);

  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");
  const [ dataTypes, setDataTypes ] = useState([
    { label: "Monitoring Plan", name: "monitoring-plan", checked: exportState? exportState.checkedDataTypes.includes('monitoring-plan'): false},
    { label: "QA & Certification", name: "qa-and-certification", checked: exportState ? exportState.checkedDataTypes.includes('qa-and-certification'): false},
    { label: "Emissions", name: "emissions", checked:  exportState ? exportState.checkedDataTypes.includes('emissions'): false}
  ]);
  const [ reportingPeriod, setReportingPeriod ] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState()

  const dataTypeSelectionHanlder =(e) =>{
    const dataTypesCopy = [...dataTypes];
    const index = dataTypesCopy.findIndex(d => d.name === e.target.name);
    if(index > -1){
      dataTypesCopy[index].checked = e.target.checked;
      setDataTypes(dataTypesCopy);
    }
    setExportState(selectedConfig.id, {
      checkedDataTypes : dataTypesCopy.filter(e=>e.checked).map(e=>e.name),
      reportingPeriodId : reportingPeriod.id
      },workspaceSection);
  };
  const reportingPeroidSelectionHandler = (selectedObj) =>{
    console.log('selected obj in exort tab', selectedObj);
    const { id, beginDate, endDate } = selectedObj;
    setReportingPeriod({id, beginDate, endDate});
    setExportState(selectedConfig.id, {
      checkedDataTypes : dataTypes.filter(e=>e.checked).map(e=>e.name),
      reportingPeriodId : selectedObj.id
    }, workspaceSection);
  }
  const getInitSelection = (reportingPeriodObj) => {
    console.log(reportingPeriodObj);
    const { id, beginDate, endDate } = reportingPeriodObj;
    setReportingPeriod({id, beginDate, endDate})
  }
  return(
    <div className="margin-x-3 grid-container">
      <div className="grid-row">
        <h3 className="display-inline-block">
          <span className="font-body-lg">{facilityMainName}</span>
        </h3>{" "}
      </div>
      <div className=" grid-row text-bold font-body-xl display-block">
        {facilityAdditionalName}
      </div>
      <div className="grid-row margin-top-3">
        <div className='grid-col-3'>
          {
            dataTypes.map((d,i) =>(
              <Checkbox
                id={d.name}
                name={d.name}
                label={<strong>{d.label}</strong>}
                checked={d.checked}
                onChange={dataTypeSelectionHanlder}
                key={i}
              />
            ))
          }
        </div>
        <div className='grid-col-6'>
          <ReportingPeriodSelector
            isExport={true}
            dataTypes={dataTypes.filter(e=>e.checked)}
            reportingPeroidSelectionHandler = {reportingPeroidSelectionHandler}
            exportState={exportState}
            getInitSelection={getInitSelection}
          />
        </div>
        <div className='grid-col-3 padding-left-8 padding-top-3'>
          <Button
            className='width-card'
            disabled={dataTypes.filter(e=>e.checked).length === 0 || (dataTypes.filter(e=>e.checked).length === 1 && dataTypes.find(e=> e.name ==="monitoring-plan").checked)}
            onClick={() => setSelectedOptions({beginDate: reportingPeriod.beginDate, endDate: reportingPeriod.endDate})}
          >
            Preview
          </Button>
        </div>
      </div>
      <ExportTablesContainer selectionData={selectedOptions} orisCode={orisCode}/>
    </div>

  )
};

export default ExportTab;