const unitStackCol = {
  name: "Unit Stack",
  width: "175px",
  selector: (row) => row.unitStack,
  sortable: true,
  center: true,
}

const systemComponentIdCol = {
  name: "System/Component ID",
  width: "250px",
  selector: (row) => {
    const systemIdentifier = row.systemIdentifier
    const componentIdentifier = row.componentIdentifier
    return `${systemIdentifier}/${componentIdentifier}`
  },
  sortable: true,
  wrap: true,
  center: true,
}

const submissionAvailabilityDescriptionCol = {
  name: "Submission Availability Description",
  width: "350px",
  selector: (row) => row.submissionAvailabilityDescription,
  sortable: true,
  center: true,
}

const severityDescriptionCol = {
  name: "Severity Description",
  width: "250px",
  selector: (row) => row.severityDescription,
  sortable: true,
}

export const testSummaryCols = [
  unitStackCol,
  systemComponentIdCol,
  {
    name: "Test Number",
    width: "200px",
    selector: (row) => row.testNumber,
    sortable: true,
    center: true,
  },
  {
    name: "Test Type Code",
    width: "200px",
    selector: (row) => row.testTypeCode,
    sortable: true,
    center: true,
  },
  {
    name: "Reporting Period",
    width: "225px",
    selector: (row) => row.yearQuarter,
    sortable: true,
    center: true,
  },
  {
    name: "Begin Date/Time",
    width: "225px",
    selector: (row) => row.beginDateTime,
    sortable: true,
    center: true,
  },
  {
    name: "End Date/Time",
    width: "200px",
    selector: (row) => row.endDateTime,
    sortable: true,
    center: true,
  },
  submissionAvailabilityDescriptionCol,
  severityDescriptionCol,
]


export const certEventsCols = [
  unitStackCol,
  systemComponentIdCol,
  {
    name: "Cert Event Code",
    width: "200px",
    selector: (row) => row.certEventCode,
    sortable: true,
  },
  {
    name: "Event Date/Time",
    width: "215px",
    selector: (row) => row.eventDateTime,
    sortable: true,
  },
  {
    name: "Required Test Code",
    width: "225px",
    selector: (row) => row.requiredTestCode,
    sortable: true,
  },
  {
    name: "Conditional Date/Time",
    width: "250px",
    selector: (row) => row.conditionalDateTime,
    sortable: true,
  },
  {
    name: "Last Completed Date/Time",
    width: "275px",
    selector: (row) => row.lastCompletedDateTime,
    sortable: true,
  },
  submissionAvailabilityDescriptionCol,
  severityDescriptionCol,
]

export const testExtensionExemptionCols = [
  unitStackCol,
  systemComponentIdCol,
  {
    name: "Fuel Code",
    width: "160px",
    selector: (row) => row.fuelCode,
    sortable: true,
  },
  {
    name: "Extension Exemption Code",
    width: "275px",
    selector: (row) => row.extensionExemptionCode,
    sortable: true,
  },
  {
    name: "Hours Used",
    width: "175px",
    selector: (row) => row.hoursUsed,
    sortable: true,
  },
  {
    name: "Span Scale Code",
    width: "200px",
    selector: (row) => row.spanScaleCode,
    sortable: true,
  },
  submissionAvailabilityDescriptionCol,
  severityDescriptionCol,
]