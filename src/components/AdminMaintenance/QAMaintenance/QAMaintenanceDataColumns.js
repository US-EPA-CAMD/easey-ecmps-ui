const unitStackCol = {
  name: <span>{'Unit Stack'}</span>,
  width: '175px',
  selector: row => row.unitStack,
  sortable: true,
};

const systemComponentIdCol = {
  name: <span>{'System/Component ID'}</span>,
  width: '250px',
  selector: row => {
    const systemIdentifier = row.systemIdentifier;
    const componentIdentifier = row.componentIdentifier;

    if (systemIdentifier !== null && componentIdentifier === null) {
      return `${systemIdentifier}`;
    } else if (systemIdentifier === null && componentIdentifier !== null) {
      return `${componentIdentifier}`;
    } else if (systemIdentifier === null && componentIdentifier === null) {
      return ``;
    }
    return `${systemIdentifier}/${componentIdentifier}`;
  },
  sortable: true,
  wrap: true,
};

const submissionAvailabilityDescriptionCol = {
  name: <span>{'Submission Availability Description'}</span>,
  width: '350px',
  selector: row => row.submissionAvailabilityDescription,
  sortable: true,
};

const severityDescriptionCol = {
  name: <span>{'Severity Description'}</span>,
  width: '250px',
  selector: row => row.severityDescription,
  sortable: true,
};

const requireResubmissionReasonCol = {
  name: <span>{'Resubmission Reason'}</span>,
  width: '250pxpx',
  selector: row => row.resubExplanation,
  sortable: true,
};

export const testSummaryCols = [
  unitStackCol,
  systemComponentIdCol,
  {
    name: <span>{'Test Number'}</span>,
    width: '200px',
    selector: row => row.testNumber,
    sortable: true,
  },
  {
    name: <span>{'Test Type Code'}</span>,
    width: '200px',
    selector: row => row.testTypeCode,
    sortable: true,
  },
  {
    name: <span>{'Reporting Period'}</span>,
    width: '225px',
    selector: row => row.yearQuarter,
    sortable: true,
  },
  {
    name: <span>{'Begin Date/Time'}</span>,
    width: '225px',
    selector: row => row.beginDateTime,
    sortable: true,
  },
  {
    name: <span>{'End Date/Time'}</span>,
    width: '200px',
    selector: row => row.endDateTime,
    sortable: true,
  },
  submissionAvailabilityDescriptionCol,
  severityDescriptionCol,
  requireResubmissionReasonCol,
  {
    name: <span>{'Record Id'}</span>,
    selector: row => row.id,
    sortable: true,
  },
];

export const certEventsCols = [
  unitStackCol,
  systemComponentIdCol,
  {
    name: <span>{'Cert Event Code'}</span>,
    width: '200px',
    selector: row => row.certEventCode,
    sortable: true,
  },
  {
    name: <span>{'Event Date/Time'}</span>,
    width: '215px',
    selector: row => row.eventDateTime,
    sortable: true,
  },
  {
    name: <span>{'Required Test Code'}</span>,
    width: '225px',
    selector: row => row.requiredTestCode,
    sortable: true,
  },
  {
    name: <span>{'Conditional Date/Time'}</span>,
    width: '250px',
    selector: row => row.conditionalDateTime,
    sortable: true,
  },
  {
    name: <span>{'Last Completed Date/Time'}</span>,
    width: '275px',
    selector: row => row.lastCompletedDateTime,
    sortable: true,
  },
  submissionAvailabilityDescriptionCol,
  severityDescriptionCol,
  requireResubmissionReasonCol,
  {
    name: <span>{'Record Id'}</span>,
    selector: row => row.id,
    sortable: true,
  },
];

export const testExtensionExemptionCols = [
  unitStackCol,
  systemComponentIdCol,
  {
    name: <span>{'Fuel Code'}</span>,
    width: '160px',
    selector: row => row.fuelCode,
    sortable: true,
  },
  {
    name: <span>{'Extension Exemption Code'}</span>,
    width: '275px',
    selector: row => row.extensionExemptionCode,
    sortable: true,
  },
  {
    name: <span>{'Hours Used'}</span>,
    width: '175px',
    selector: row => row.hoursUsed,
    sortable: true,
  },
  {
    name: <span>{'Span Scale Code'}</span>,
    width: '200px',
    selector: row => row.spanScaleCode,
    sortable: true,
  },
  submissionAvailabilityDescriptionCol,
  severityDescriptionCol,
  requireResubmissionReasonCol,
  {
    name: <span>{'Record Id'}</span>,
    selector: row => row.id,
    sortable: true,
  },
];
