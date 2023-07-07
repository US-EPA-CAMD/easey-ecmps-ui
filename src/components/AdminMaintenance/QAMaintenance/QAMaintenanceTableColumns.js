export const testSummaryCols = [
  {
    name: "Unit Stack",
    width: "auto",
    selector: (row) => row.unitStack,
    sortable: true,
    center: true,
  },
  {
    name: "System/Component ID",
    width: "auto",
    selector: (row) => {
      const systemIdentifier = row.systemIdentifier
      const componentIdentifier = row.componentIdentifier
      return `${systemIdentifier}/${componentIdentifier}`
    },
    sortable: true,
    wrap: true,
    center: true,
  },
  {
    name: "Test Number",
    width: "auto",
    selector: (row) => row.testNumber,
    sortable: true,
    center: true,
  },
  {
    name: "Test Type Code",
    width: "auto",
    selector: (row) => row.testTypeCode,
    sortable: true,
    center: true,
  },
  {
    name: "Reporting Period",
    width: "auto",
    selector: (row) => row.yearQuarter,
    sortable: true,
    center: true,
  },
  {
    name: "Begin Date/Time",
    width: "auto",
    selector: (row) => row.beginDateTime,
    sortable: true,
    center: true,
  },
  {
    name: "End Date/Time",
    width: "auto",
    selector: (row) => row.endDateTime,
    sortable: true,
    center: true,
  },
  {
    name: "Submission Availability Description",
    width: "auto",
    selector: (row) => row.submissionAvailabilityDescription,
    classNames: ['multiline-header'],
    sortable: true,
    center: true,
  },
  {
    name: "Severity Description",
    width: "auto",
    selector: (row) => row.severityDescription,
    sortable: true,
    center: true,
  },
]


export const certEventsCols = [
  {
    name: "Unit Stack",
    width: "150px",
    selector: (row) => row.unitStack,
    sortable: true,
  },
  {
    name: "System/Component ID",
    width: "150px",
    selector: (row) => {
      const systemIdentifier = row.systemIdentifier
      const componentIdentifier = row.componentIdentifier
      return `${systemIdentifier}/${componentIdentifier}`
    },
    sortable: true,
  },
  {
    name: "Cert Event Code",
    width: "150px",
    selector: (row) => row.certEventCode,
    sortable: true,
  },
  {
    name: "Event Date/Time",
    width: "150px",
    selector: (row) => row.eventDateTime,
    sortable: true,
  },
  {
    name: "Required Test Code",
    width: "150px",
    selector: (row) => row.requiredTestCode,
    sortable: true,
  },
  {
    name: "Conditional Date/Time",
    width: "150px",
    selector: (row) => row.conditionalDateTime,
    sortable: true,
  },
  {
    name: "Last Completed Date/Time",
    width: "150px",
    selector: (row) => row.lastCompletedDateTime,
    sortable: true,
  },
  {
    name: "Submission Availability Description",
    width: "150px",
    selector: (row) => row.submissionAvailabilityDescription,
    sortable: true,
  },
  {
    name: "Severity Description",
    width: "150px",
    selector: (row) => row.severityDescription,
    sortable: true,
  },
]

export const testExtensionExemptionCols = [
  {
    name: "Unit Stack",
    width: "150px",
    selector: (row) => row.unitStack,
    sortable: true,
  },
  {
    name: "System/Component ID",
    width: "150px",
    selector: (row) => {
      const systemIdentifier = row.systemIdentifier
      const componentIdentifier = row.componentIdentifier
      return `${systemIdentifier}/${componentIdentifier}`
    },
    sortable: true,
  },
  {
    name: "Fuel Code",
    width: "150px",
    selector: (row) => row.fuelCode,
    sortable: true,
  },
  {
    name: "Extension Exemption Code",
    width: "150px",
    selector: (row) => row.extensionExemptionCode,
    sortable: true,
  },
  {
    name: "Hours Used",
    width: "150px",
    selector: (row) => row.hoursUsed,
    sortable: true,
  },
  {
    name: "Span Scale Code",
    width: "150px",
    selector: (row) => row.spanScaleCode,
    sortable: true,
  },
  {
    name: "Submission Availability Description",
    width: "150px",
    selector: (row) => row.submissionAvailabilityDescription,
    sortable: true,
  },
  {
    name: "Severity Description",
    width: "150px",
    selector: (row) => row.severityDescription,
    sortable: true,
  },
]