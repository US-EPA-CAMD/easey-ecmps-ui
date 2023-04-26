import { formatDateTime } from '../functions'
import { sortByPeriodAbbreviation } from '../../components/EvaluateAndSubmit/ColumnMappings'

export const qaTestSummaryCols = [
	{
		name: "Unit/ StackPipe ID",
		selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
		sortable: true,
	},
	{
		name: "System/ Component ID",
		selector: (row) =>
			row.monitoringSystemID ? row.monitoringSystemID : row.componentID,
		sortable: true,
	},
	{
		name: "Test Type Code",
		selector: (row) => row.testTypeCode,
		sortable: true,
	},
	{
		name: "Test Number",
		selector: (row) => row.testNumber,
		sortable: true,
		// wrap: true,
		compact: true,
		minWidth: '180px'
	},
	{
		name: "Test Reason Code",
		selector: (row) => row.testReasonCode,
		sortable: true,
	},
	{
		name: "Test Result Code",
		selector: (row) => row.testResultCode,
		sortable: true,
	},
	{
		name: "Year/Quarter",
		selector: (row) => row.year && row.quarter ? `${row.year} Q${row.quarter}` : "",
		sortFunction: sortByPeriodAbbreviation,
		sortable: true,
	},
	{
		name: "Begin Date/Time",
		selector: (row) =>
			formatDateTime(row.endDate, row.endHour, row.endMinute),
		sortable: true,
		wrap: true
	},
	{
		name: "End Date/Time",
		selector: (row) =>
			formatDateTime(row.endDate, row.endHour, row.endMinute),
		sortable: true,
		wrap: true
	},
];

export const qaCertificationEventDataCols = [
	{
		name: "Unit/ StackPipe ID",
		selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
		sortable: true,
	},
	{
		name: "System/ Component ID",
		selector: (row) =>
			row.monitoringSystemID ? row.monitoringSystemID : row.componentID,
		sortable: true,
	},
	{
		name: "Event Code",
		selector: (row) => row.qaCertEventCode,
		sortable: true,
	},
	{
		name: "Event Date/Time",
		selector: (row) => formatDateTime(row.qaCertEventDate, row.qaCertEventHour, null),
		sortable: true,
	},
	{
		name: "Required Test Code",
		selector: (row) => row.requiredTestCode,
		sortable: true,
	},
]

export const qaTestExtensionExemptionDataCols = [
	{
		name: "Unit/ StackPipe ID",
		selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
		sortable: true,
	},
	{
		name: "System/ Component ID",
		selector: (row) =>
			row.monitoringSystemID ? row.monitoringSystemID : row.componentID,
		sortable: true,
	},
	{
		name: "Submission Availability Code",
		selector: (row) => row.submissionAvailabilityCode,
		sortable: true,
	},
	{
		name: "Pending Status Code",
		selector: (row) => row.pendingStatusCode,
		sortable: true,
	},
	{
		name: "Eval Status Code",
		selector: (row) => row.evalStatusCode,
		sortable: true,
	},
	{
		name: "Year/Quarter",
		selector: (row) => row.year && row.quarter ? `${row.year} Q${row.quarter}` : "",
		sortFunction: sortByPeriodAbbreviation,
		sortable: true,
	},
	{
		name: "Fuel Code",
		selector: (row) => row.fuelCode,
		sortable: true,
	},
	{
		name: "Extension/ Exemption Code",
		selector: (row) => row.extensionOrExemptionCode,
		sortable: true,
	},
]
