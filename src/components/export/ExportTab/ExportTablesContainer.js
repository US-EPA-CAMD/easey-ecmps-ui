import { Preloader } from '@us-epa-camd/easey-design-system';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowDownwardSharp } from "@material-ui/icons";

import { getQATestSummary } from '../../../utils/api/qaCertificationsAPI';

const ExportTablesContainer = props => {
  const { selectionData, orisCode } = props
  const { beginDate: beginDateOption, endDate: endDateOption } = selectionData
  const [qaTestSummaryData, setQATestSummaryData] = useState()

  useEffect(() => {
    console.log('use effect export tables container')

    const fetchQATestSummary = async () => {
      const result = await getQATestSummary(orisCode, beginDateOption, endDateOption)
      setQATestSummaryData(result.data)
    }
    fetchQATestSummary()
  }, [beginDateOption, endDateOption])

  const rows = qaTestSummaryData?.map(obj => {
    const { id, componentID: componentId, testNumber, testResultCode, beginDate, beginHour, endDate, endHour } = obj
    return { id, componentId, testNumber, testResultCode, beginDate, beginHour, endDate, endHour }
  })

  const dataTable = <div className='margin-x-3 margin-y-4'>
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
      columns={qaTestSummaryCols}
      data={rows}
      selectableRows
    />
  </div>

  const tableContent = qaTestSummaryData ? dataTable : <Preloader />

  return (
    <>
      {tableContent}
    </>
  )
}

export default ExportTablesContainer

const qaTestSummaryCols = [
  {
    name: 'Unit or Stack Pipe ID',
    selector: row => row.unitOrStackPipeId,
  },
  {
    name: 'Component ID',
    selector: row => row.componentId,
  },
  {
    name: 'Test Number',
    selector: row => row.testNumber,
  },
  {
    name: 'Test Result Code',
    selector: row => row.testResultCode,
  },
  {
    name: 'Begin Date',
    selector: row => row.beginDate,
  },
  {
    name: 'Begin Hour',
    selector: row => row.beginHour,
  },
  {
    name: 'End Date',
    selector: row => row.endDate,
  },
  {
    name: 'End Hour',
    selector: row => row.endHour,
  },
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
]
