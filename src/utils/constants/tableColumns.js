import { formatDateTime } from '../functions'
import { sortByPeriodAbbreviation } from '../../components/EvaluateAndSubmit/ColumnMappings'

export const qaTestSummaryCols = [
	{
		name: <span>{"Unit/Stack Pipe ID"}</span>,
		selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
		sortable: true,
	},
	{
		name: <span>{"System/Component ID"}</span>,
		selector: (row) =>
			row.monitoringSystemId ? row.monitoringSystemId : row.componentId,
		sortable: true,
	},
	{
		name: <span>{"Test Type Code"}</span>,
		selector: (row) => row.testTypeCode,
		sortable: true,
	},
	{
		name: <span>{"Test Number"}</span>,
		selector: (row) => row.testNumber,
		sortable: true,
		// wrap: true,
		compact: true,
		minWidth: '180px'
	},
	{
		name: <span>{"Test Reason Code"}</span>,
		selector: (row) => row.testReasonCode,
		sortable: true,
	},
	{
		name: <span>{"Test Result Code"}</span>,
		selector: (row) => row.testResultCode,
		sortable: true,
	},
	{
		name: <span>{"Year/Quarter"}</span>,
		selector: (row) => row.year && row.quarter ? `${row.year} Q${row.quarter}` : "",
		sortFunction: sortByPeriodAbbreviation,
		sortable: true,
	},
	{
		name: <span>{"Begin Date/Time"}</span>,
		selector: (row) =>
			formatDateTime(row.beginDate, row.beginHour, row.beginMinute),
		sortable: true,
		wrap: true
	},
	{
		name: <span>{"End Date/Time"}</span>,
		selector: (row) =>
			formatDateTime(row.endDate, row.endHour, row.endMinute),
		sortable: true,
		wrap: true
	},
];

export const qaCertificationEventDataCols = [
	{
		name: <span>{"Unit/Stack Pipe ID"}</span>,
		selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
		sortable: true,
	},
	{
		name: <span>{"System/Component ID"}</span>,
		selector: (row) =>
			row.monitoringSystemId ? row.monitoringSystemId : row.componentId,
		sortable: true,
	},
	{
		name: <span>{"Event Code"}</span>,
		selector: (row) => row.certificationEventCode,
		sortable: true,
	},
	{
		name: <span>{"Event Date/Time"}</span>,
		selector: (row) => formatDateTime(row.certificaitonEventDate, row.certificationEventHour, null),
		sortable: true,
	},
	{
		name: <span>{"Required Test Code"}</span>,
		selector: (row) => row.requiredTestCode,
		sortable: true,
	},
]

export const qaTestExtensionExemptionDataCols = [
	{
		name: <span>{"Unit/Stack Pipe ID"}</span>,
		selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
		sortable: true,
	},
	{
		name: <span>{"System/Component ID"}</span>,
		selector: (row) =>
			row.monitoringSystemId ? row.monitoringSystemId : row.componentId,
		sortable: true,
	},
	{
		name: <span>{"Submission Availability Code"}</span>,
		selector: (row) => row.submissionAvailabilityCode,
		sortable: true,
	},
	{
		name: <span>{"Pending Status Code"}</span>,
		selector: (row) => row.pendingStatusCode,
		sortable: true,
	},
	{
		name: <span>{"Year/Quarter"}</span>,
		selector: (row) => row.year && row.quarter ? `${row.year} Q${row.quarter}` : "",
		sortFunction: sortByPeriodAbbreviation,
		sortable: true,
	},
	{
		name: <span>{"Fuel Code"}</span>,
		selector: (row) => row.fuelCode,
		sortable: true,
	},
	{
		name: <span>{"Extension/ Exemption Code"}</span>,
		selector: (row) => row.extensionOrExemptionCode,
		sortable: true,
	},
]
