import { Preloader } from '@us-epa-camd/easey-design-system';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
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

  const tableContent = qaTestSummaryData ? <DataTable columns={qaTestSummaryCols} data={rows} selectableRows /> : <Preloader />

  return (
    <>
      <h1>Test Summary</h1>
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
