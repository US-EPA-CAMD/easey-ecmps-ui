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
		name: "Begin Date/Hr/Min",
		selector: (row) =>
			row.beginDate && row.beginHour && row.beginMinute
				? `${row.beginDate} ${row.beginHour}:${row.beginMinute}`
				: row.beginDate !== null && row.beginHour !== null
					? `${row.beginDate} ${row.beginHour}`
					: "",
		sortable: true,
		wrap: true,
		compact: true,
	},
	{
		name: "End Date/Hr/Min",
		selector: (row) =>
			row.endDate && row.endHour && row.endMinute
				? `${row.endDate} ${row.endHour}:${row.endMinute}`
				: row.endDate !== null && row.endHour !== null
					? `${row.endDate} ${row.endHour}`
					: "",
		sortable: true,
		wrap: true,
		compact: true,
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
		name: "Event Date",
		selector: (row) => row.qaCertEventDate,
		sortable: true,
	},
	{
		name: "Event Hour",
		selector: (row) => row.qaCertEventHour,
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
