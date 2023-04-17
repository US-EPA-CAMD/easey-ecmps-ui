import { formatDateTime } from '../functions'

export const qaTestSummaryCols = [
	{
		name: "Unit or StackPipe ID",
		selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
		sortable: true,
	},
	{
		name: "System or Component ID",
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
		wrap: true,
		compact: true,
		minWidth: '120px'
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
		name: "Unit or StackPipe ID",
		selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
		sortable: true,
	},
	{
		name: "System or Component ID",
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
		name: "Unit or StackPipe ID",
		selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
		sortable: true,
	},
	{
		name: "System or Component ID",
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
		name: "fuelCode",
		selector: (row) => row.fuelCode,
		sortable: true,
	},
	{
		name: "Extension or Exemption Code",
		selector: (row) => row.extensionOrExemptionCode,
		sortable: true,
	},
]
