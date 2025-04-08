import { ArrowBackSharp } from '@material-ui/icons';
import { Button, Grid, GridContainer, Label } from '@trussworks/react-uswds';
import { uniqueId } from 'lodash';
import log from 'loglevel';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { connect, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import {
  MATS_AVERAGING_GROUP_CODES_STORE_NAME,
  MATS_POLLUTANT_CODES_STORE_NAME,
  MATS_REPORT_TYPE_CODES_STORE_NAME,
  MATS_TEST_METHOD_CODES_STORE_NAME,
} from '../../additional-functions/data-table-section-and-store-names';
import { parseErrorMessage } from '../../utils/api/apiUtils';
import { createMatsSubmission } from '../../utils/api/qaCertificationsAPI';
import { dataStatus } from '../../utils/constants/dataStatus';
import { matsModule } from '../../utils/constants/moduleTitles';
import FileInput from '../FileInput/FileInput';
import MatsCodeSelect from '../MatsCodeSelect/MatsCodeSelect';
import Modal from '../Modal/Modal';
import SizedPreloader from '../SizedPreloader/SizedPreloader';
import DatePicker from './DatePicker';
import LocationSelect from './LocationSelect';
import ReportingPeriodSelect from './ReportingPeriodSelect';
import TextInput from './TextInput';

const reportTypeInputMappings = [
  {
    codes: ['LEED', 'LEEQ', 'PST', 'PS11', 'RATA', 'RCA', 'RRA'],
    fields: [
      'location',
      'averagingGroup',
      'pollutants',
      'testMethods',
      'testNumber',
      'testDate',
      'testComment',
    ],
    files: ['ERT', 'SUPPORTING'],
  },
  {
    codes: ['NOTIFY'],
    fields: [
      'location',
      'averagingGroup',
      'pollutants',
      'testMethods',
      'testNumber',
      'testDate',
      'testComment',
    ],
    files: ['ERT', 'SUPPORTING'],
  },
  {
    codes: ['CR'],
    fields: [
      'location',
      'averagingGroup',
      'pollutants',
      'testMethods',
      'testNumber',
      'testDate',
      'testComment',
      'reportingPeriod',
    ],
    files: ['ERT', 'SUPPORTING'],
  },
  {
    codes: ['ACA', 'SVA'],
    fields: ['location', 'pollutants', 'testMethods', 'testNumber', 'testDate'],
    files: ['PAYLOAD'],
  },
  {
    codes: ['EMPM'],
    fields: ['location', 'pollutants', 'reportingPeriod'],
    files: ['PAYLOAD'],
  },
];

function createSubmissionPayload(metadata, files) {
  const formData = new FormData();
  formData.append('metadata', JSON.stringify(metadata));
  if (files.ertFile)
    formData.append('ertFile', files.ertFile, files.ertFile.name);
  if (files.payloadFile)
    formData.append('payloadFile', files.payloadFile, files.payloadFile.name);
  files.supportingFiles.forEach((file) => {
    formData.append('supportingFiles', file, file.name);
  });
  return formData;
}

const MatsSubmission = ({
  user,

  /* MAPPED PROPS */
  checkedOutConfigs,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  /* EXTERNAL STATE */

  // TODO: Uncomment this and remove mock data when done developing the UI.
  //const originalSubmission = location.state?.originalSubmission;
  const originalSubmission = useMemo(
    () => ({
      id: 2,
      averagingGroup: {
        code: 'NONE',
        description: 'EGU is not in an emissions averaging group',
      },
      facilityName: 'Delta Energy Park',
      frsId: null,
      location: {
        id: 'CBS-6ac708a8-0127-4ef4-806e-9388b544e4ab',
        name: 'DEPC2',
      },
      orisCode: 63259,
      pollutants: [],
      quarter: 1,
      reportType: {
        code: 'CR',
        description: 'Compliance Report',
      },
      status: {
        code: 'COMPLETE',
        description: 'Completed',
      },
      testComment: 'THIS IS ANOTHER TEST',
      testDate: '2025-02-27T05:00:00.000Z',
      testMethods: [],
      testNumber: '12345',
      year: 2025,
    }),
    [],
  );
  const selectedConfigId = location.state?.selectedConfigId;

  // TODO: Uncomment this and remove mock data when done developing the UI.
  //const selectedConfig = useSelector((state) =>
  //  Object.values(state.monitoringPlans)
  //    .flat()
  //    .find((mp) => mp.id === selectedConfigId),
  //);

  const selectedConfig = useMemo(
    () => ({
      id: 'SDM4661-9D60966839D048AD989BDD49DB09CC80',
      facId: 8470,
      facilityName: 'Delta Energy Park',
      facilityRegistrySystemId: null,
      configTypeCode: null,
      lastUpdated: '2024-11-01T18:09:28.226Z',
      updatedStatusFlag: 'N',
      needsEvalFlag: 'Y',
      checkSessionId: 'a37696bf-6aa3-5f70-f195-283a6927bc60',
      orisCode: 63259,
      name: 'DEPC2',
      beginReportPeriodId: 116,
      endReportPeriodId: null,
      active: true,
      monitoringPlanCommentData: [],
      pendingStatusCode: null,
      evalStatusCode: 'PASS',
      evalStatusCodeDescription: 'Passed',
      unitStackConfigurationData: [],
      reportingFrequencies: [],
      monitoringLocationData: [
        {
          id: 'CBS-6ac708a8-0127-4ef4-806e-9388b544e4ab',
          unitRecordId: 91368,
          unitId: 'DEPC2',
          stackPipeRecordId: null,
          stackPipeId: null,
          name: 'DEPC2',
          type: 'unit',
          active: true,
          activeDate: null,
          retireDate: null,
          nonLoadBasedIndicator: 0,
          monitoringLocationAttribData: [],
          unitCapacityData: [],
          unitControlData: [],
          unitFuelData: [],
          monitoringMethodData: [],
          supplementalMATSMonitoringMethodData: [],
          monitoringFormulaData: [],
          monitoringDefaultData: [],
          monitoringSpanData: [],
          rectangularDuctWAFData: [],
          monitoringLoadData: [],
          componentData: [],
          monitoringSystemData: [],
          monitoringQualificationData: [],
        },
      ],
      userId: 'MDIEBOLD_DP',
      addDate: '2021-09-24T16:21:12.000Z',
      updateDate: '2024-11-01T18:09:28.226Z',
      submissionId: 464,
      submissionAvailabilityCode: 'UPDATED',
      submissionAvailabilityCodeDescription: 'Updated on Host',
      lastEvaluatedDate: '2024-11-01T18:12:04.346Z',
      beginReportPeriodDescription: '2021 Q4',
    }),
    [],
  );

  /* INTERNAL STATE */

  const [files, setFiles] = useState({
    ertFile: null,
    payloadFile: null,
    supportingFiles: [],
  });
  const [reportType, setReportType] = useState(
    originalSubmission?.reportType.code ?? '',
  );
  const [metadataPayload, setMetadataPayload] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(dataStatus.IDLE);
  const [submissionErrors, setSubmissionErrors] = useState([]);
  const [submissionCheckStatus, setSubmissionCheckStatus] = useState(
    dataStatus.IDLE,
  );
  const [submissionCheckWarnings, setSubmissionCheckWarnings] = useState([]);
  const [submissionCheckErrors, setSubmissionCheckErrors] = useState([]);

  /* CALCULATED VALUES */

  const isCheckedOutByUser =
    selectedConfigId &&
    checkedOutConfigs.find((config) => config['monPlanId'] === selectedConfigId)
      ?.checkedOutBy === user.userId;

  /* HANDLERS */

  const handleInitialSubmit = async (e) => {
    e.preventDefault();

    const payload = createSubmissionPayload(metadataPayload, files);

    setSubmissionCheckStatus(dataStatus.PENDING);
    try {
      const res = await createMatsSubmission(payload, { draft: true });
      const { warnings } = res.data;
      setSubmissionCheckStatus(dataStatus.SUCCESS);
      setSubmissionCheckWarnings(warnings);
    } catch (err) {
      const parsedError = parseErrorMessage(err);
      setSubmissionCheckStatus(dataStatus.ERROR);
      // TODO: Try to parse if the error message is a JSON array.
      setSubmissionCheckErrors([parsedError]);
    }
  };

  /* RENDER */

  if (!selectedConfig) {
    log.error('Selected configuration not found');
    return <Navigate to=".." relative="path" />;
  }

  // TODO: Uncomment this when done developing the UI.
  //if (!isCheckedOutByUser) {
  //  return <Navigate to=".." relative="path" />;
  //}

  return (
    <div className="react-transition fade-in margin-bottom-3 padding-x-3">
      <Button
        className="margin-top-2"
        onClick={() => navigate(-1)}
        type="button"
        unstyled
      >
        <ArrowBackSharp /> Return to Submission Grid
      </Button>
      <h2 className="page-header margin-top-2">{matsModule}</h2>
      <form onSubmit={handleInitialSubmit}>
        <h3>Metadata</h3>
        <p>
          <span className="usa-label">ORIS Code:</span>{' '}
          {selectedConfig.orisCode}
        </p>
        <p>
          <span className="usa-label">FRS ID:</span>{' '}
          {selectedConfig.facilityRegistrySystemId || 'None'}
        </p>
        <MatsCodeSelect
          disabled={!!originalSubmission}
          label="Report Type"
          optionsStoreName={MATS_REPORT_TYPE_CODES_STORE_NAME}
          setValue={setReportType}
          value={reportType}
        />
        {reportType && (
          <>
            <MetadataInputs
              onUpdate={setMetadataPayload}
              originalSubmission={originalSubmission}
              reportType={reportType}
              selectedConfig={selectedConfig}
            />
            <h3>File Input</h3>
            <FileInputs onUpdate={setFiles} reportType={reportType} />
          </>
        )}
        {submissionCheckStatus === dataStatus.PENDING ? (
          <SizedPreloader size={5} />
        ) : (
          <Button type="submit" className="margin-top-2">
            Submit
          </Button>
        )}
        {submissionCheckStatus === dataStatus.SUCCESS && (
          <>{submissionCheckWarnings.length > 0 ? <></> : <></>}</>
        )}
      </form>
    </div>
  );
};

const MetadataInputs = ({
  onUpdate = (_newMetadataPayload) => {},
  originalSubmission,
  selectedConfig,
  reportType,
}) => {
  const [averagingGroup, setAveragingGroup] = useState(
    originalSubmission?.averagingGroup.code ?? '',
  );
  const [location, setLocation] = useState(
    originalSubmission?.location.id ?? '',
  );
  const [pollutants, setPollutants] = useState(
    originalSubmission?.pollutants ?? [],
  );
  const [pollutantsDisabled, setPollutantsDisabled] = useState(false);
  const [reportingPeriod, setReportingPeriod] = useState(
    originalSubmission?.year && originalSubmission?.quarter
      ? `${originalSubmission.year} Q${originalSubmission.quarter}`
      : '',
  );
  const [testComment, setTestComment] = useState(
    originalSubmission?.testComment ?? '',
  );
  const [testDate, setTestDate] = useState(
    (originalSubmission?.testDate ?? '').substring(0, 10),
  );
  const [testMethods, setTestMethods] = useState(
    originalSubmission?.testMethods ?? [],
  );
  const [testNumber, setTestNumber] = useState(
    originalSubmission?.testNumber ?? '',
  );

  const reportTypeMapping = reportTypeInputMappings.find((mapping) =>
    mapping.codes.includes(reportType),
  );

  const fieldIsInReportType = useCallback(
    (fieldKey) => {
      if (!reportTypeMapping) return false;
      return reportTypeMapping.fields.includes(fieldKey);
    },
    [reportTypeMapping],
  );

  const includeIfInReportType = useCallback(
    (fieldKey, item) => {
      const emptyValue = Array.isArray(item) ? [] : null;
      return fieldIsInReportType(fieldKey) ? item : emptyValue;
    },
    [fieldIsInReportType],
  );

  useEffect(() => {
    onUpdate({
      locationId: includeIfInReportType('location', location),
      reportTypeCode: reportType,
      averagingGroupCode: includeIfInReportType(
        'averagingGroup',
        averagingGroup,
      ),
      pollutantCodes: includeIfInReportType('pollutants', pollutants),
      testNumber: includeIfInReportType('testNumber', testNumber),
      testDate: includeIfInReportType('testDate', testDate),
      testComment: includeIfInReportType('testComment', testComment),
      testMethodCodes: includeIfInReportType('testMethods', testMethods),
      year: includeIfInReportType(
        'reportingPeriod',
        reportingPeriod.split(' ')[0],
      ),
      quarter: includeIfInReportType(
        'reportingPeriod',
        reportingPeriod.split(' ')[1]?.substring(1),
      ),
      originalSubmissionId: originalSubmission?.id,
      facilityId: selectedConfig.facId,
      monitorPlanId: selectedConfig.id,
      statusCode: 'NEW',
    });
  }, [
    averagingGroup,
    includeIfInReportType,
    location,
    onUpdate,
    originalSubmission,
    pollutants,
    reportType,
    reportingPeriod,
    selectedConfig,
    testComment,
    testDate,
    testMethods,
    testNumber,
  ]);

  const [prevReportType, setPrevReportType] = useState('');
  if (prevReportType !== reportType) {
    setPrevReportType(reportType);
    if (['ACA', 'SVA', 'EMPM'].includes(reportType)) {
      setPollutants(['FPM']);
      setPollutantsDisabled(true);
    } else {
      setPollutantsDisabled(false);
    }
  }

  return (
    <>
      {fieldIsInReportType('location') && (
        <LocationSelect
          options={selectedConfig.monitoringLocationData}
          setValue={setLocation}
          value={location}
        />
      )}
      {fieldIsInReportType('averagingGroup') && (
        <MatsCodeSelect
          label="Averaging Group"
          optionsStoreName={MATS_AVERAGING_GROUP_CODES_STORE_NAME}
          setValue={setAveragingGroup}
          value={averagingGroup}
        />
      )}
      {fieldIsInReportType('pollutants') && (
        <MatsCodeSelect
          disabled={pollutantsDisabled}
          label="Pollutants"
          multiple
          optionsStoreName={MATS_POLLUTANT_CODES_STORE_NAME}
          setValue={setPollutants}
          value={pollutants}
        />
      )}
      {fieldIsInReportType('testMethods') && (
        <MatsCodeSelect
          label="Test Methods"
          multiple
          optionsStoreName={MATS_TEST_METHOD_CODES_STORE_NAME}
          setValue={setTestMethods}
          value={testMethods}
        />
      )}
      {fieldIsInReportType('testNumber') && (
        <TextInput
          label="Test Number"
          setValue={setTestNumber}
          value={testNumber}
        />
      )}
      {fieldIsInReportType('testDate') && (
        <DatePicker label="Test Date" setValue={setTestDate} value={testDate} />
      )}
      {fieldIsInReportType('testComment') && (
        <TextInput
          label="Test Comment"
          setValue={setTestComment}
          value={testComment}
        />
      )}
      {fieldIsInReportType('reportingPeriod') && (
        <ReportingPeriodSelect
          setValue={setReportingPeriod}
          value={reportingPeriod}
        />
      )}
    </>
  );
};

const FileInputRow = ({
  accept = '',
  label,
  onChange = (_file) => {},
  onRemove = () => {},
}) => {
  const [id] = useState(uniqueId(`${label.replace(' ', '')}-file-input-`));
  const fileInputRef = useRef(null);

  return (
    <Grid row>
      <Grid tablet={{ col: 6 }}>
        <Label htmlFor={id}>{label}</Label>
        <FileInput
          accept={accept}
          id={id}
          onChange={(e) => onChange(e.target?.files[0])}
          ref={fileInputRef}
        />
      </Grid>
      <Grid tablet={{ col: 2 }}>
        <Button
          type="button"
          onClick={() => {
            const file = fileInputRef.current?.files[0];
            if (!file) return;
            const fileUrl = URL.createObjectURL(file);
            window.open(fileUrl, '_blank');
          }}
        >
          Preview
        </Button>
      </Grid>
      <Grid tablet={{ col: 2 }}>
        <Button
          type="button"
          onClick={() => {
            fileInputRef.current?.clearFiles();
            onRemove();
          }}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};

const FileInputs = ({ onUpdate = (_newFiles) => {}, reportType }) => {
  const [pdfInputs, setPdfInputs] = useState([{ id: uniqueId() }]);

  const [ertFile, setErtFile] = useState(null);
  const [payloadFile, setPayloadFile] = useState(null);
  const [supportingFiles, setSupportingFiles] = useState({});

  const addPdfInput = () => {
    setPdfInputs((prev) => [...prev, { id: uniqueId() }]);
  };

  const removePdfInput = (id) => {
    setSupportingFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[id];
      return newFiles;
    });

    if (pdfInputs.length <= 1) return;
    setPdfInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const reportTypeMapping = reportTypeInputMappings.find((mapping) =>
    mapping.codes.includes(reportType),
  );

  const fileIsInReportType = useCallback(
    (fileKey) => {
      if (!reportTypeMapping) return false;
      return reportTypeMapping.files.includes(fileKey);
    },
    [reportTypeMapping],
  );

  const includeIfInReportType = useCallback(
    (fileKey, item) => {
      const emptyValue = Array.isArray(item) ? [] : null;
      return fileIsInReportType(fileKey) ? item : emptyValue;
    },
    [fileIsInReportType],
  );

  useEffect(() => {
    onUpdate({
      ertFile: includeIfInReportType('ERT', ertFile),
      payloadFile: includeIfInReportType('PAYLOAD', payloadFile),
      supportingFiles: includeIfInReportType(
        'SUPPORTING',
        Object.values(supportingFiles),
      ),
    });
  }, [ertFile, includeIfInReportType, onUpdate, payloadFile, supportingFiles]);

  return (
    <>
      <GridContainer>
        {fileIsInReportType('ERT') && (
          <FileInputRow
            label="ERT XML"
            accept=".xml"
            onChange={(file) => setErtFile(file)}
            onRemove={() => setErtFile(null)}
          />
        )}
        {fileIsInReportType('PAYLOAD') && (
          <FileInputRow
            label="Payload PDF, XML, or JSON"
            accept=".pdf,.xml,.json"
            onChange={(file) => setPayloadFile(file)}
            onRemove={() => setPayloadFile(null)}
          />
        )}
      </GridContainer>
      {fileIsInReportType('SUPPORTING') && (
        <section>
          <h4>Supporting PDF(s)</h4>
          <GridContainer>
            {pdfInputs.map(({ id }, i) => (
              <FileInputRow
                accept=".pdf"
                key={id}
                label={`PDF ${i + 1}`}
                onChange={(file) => {
                  setSupportingFiles((prev) => ({ ...prev, [id]: file }));
                }}
                onRemove={() => removePdfInput(id)}
              />
            ))}
          </GridContainer>
          <Button type="button" onClick={addPdfInput}>
            Add
          </Button>
        </section>
      )}
    </>
  );
};

export const mapStateToProps = (state) => ({
  checkedOutConfigs: state.checkedOutLocations,
});

export default connect(mapStateToProps)(MatsSubmission);
