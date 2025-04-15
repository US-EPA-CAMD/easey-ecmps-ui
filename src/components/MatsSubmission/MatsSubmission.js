import { ArrowBackSharp } from '@material-ui/icons';
import {
  Alert,
  Button,
  Grid,
  GridContainer,
  Label,
} from '@trussworks/react-uswds';
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
import {
  createMatsSubmission,
  deleteMatsSubmission,
} from '../../utils/api/qaCertificationsAPI';
import { dataStatus } from '../../utils/constants/dataStatus';
import { matsModule } from '../../utils/constants/moduleTitles';
import { formatErrorResponse } from '../../utils/functions';
import FileInput from '../FileInput/FileInput';
import MatsCodeSelect from '../MatsCodeSelect/MatsCodeSelect';
import SizedPreloader from '../SizedPreloader/SizedPreloader';
import DatePicker from './DatePicker';
import LocationSelect from './LocationSelect';
import ReportingPeriodSelect from './ReportingPeriodSelect';
import SubmissionSignSubmitModal from './SubmissionSignSubmitModal';
import SubmissionWarningsModal from './SubmissionWarningsModal';
import TextInput from './TextInput';

import './MatsSubmission.scss';

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

  const originalSubmission = location.state?.originalSubmission;
  const selectedConfigId = location.state?.selectedConfigId;

  const selectedConfig = useSelector((state) =>
    Object.values(state.monitoringPlans)
      .flat()
      .find((mp) => mp.id === selectedConfigId),
  );

  /* INTERNAL STATE */

  const [files, setFiles] = useState({
    ertFile: null,
    payloadFile: null,
    supportingFiles: [],
  });
  const [metadataPayload, setMetadataPayload] = useState({});
  const [reportType, setReportType] = useState(
    originalSubmission?.reportTypeCode ?? '',
  );
  const [submissionErrors, setSubmissionErrors] = useState([]);
  const [submissionId, setSubmissionId] = useState(null);
  const [submissionInitStatus, setSubmissionInitStatus] = useState(
    dataStatus.IDLE,
  );
  const [submissionInitWarnings, setSubmissionInitWarnings] = useState([]);

  /* CALCULATED VALUES */

  const isCheckedOutByUser =
    selectedConfigId &&
    checkedOutConfigs.find((config) => config['monPlanId'] === selectedConfigId)
      ?.checkedOutBy === user.userId;

  /* HANDLERS */

  const cancelSubmission = () => {
    const locationId = metadataPayload.locationId;
    if (submissionId && locationId) {
      deleteMatsSubmission(submissionId, locationId);
    }
    setSubmissionInitStatus(dataStatus.IDLE);
  };

  const handleSignSubmitModalClose = () => {
    cancelSubmission();
  };

  const handleSignSubmitModalSave = () => {
    setSubmissionInitStatus(dataStatus.IDLE);
  };

  const handleWarningsModalClose = () => {
    cancelSubmission();
    setSubmissionInitWarnings([]);
  };

  const handleWarningsModalSave = () => {
    setSubmissionInitWarnings([]);
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();

    setSubmissionErrors([]);
    setSubmissionId(null);
    setSubmissionInitWarnings([]);
    setSubmissionInitStatus(dataStatus.PENDING);
    try {
      const res = await createMatsSubmission(
        createSubmissionPayload(metadataPayload, files),
        metadataPayload.locationId,
      );
      const { id, warnings } = res.data;
      setSubmissionId(id);
      setSubmissionInitStatus(dataStatus.SUCCESS);
      if (warnings.length) {
        setSubmissionInitWarnings(warnings);
      }
    } catch (err) {
      setSubmissionInitStatus(dataStatus.ERROR);
      setSubmissionErrors(formatErrorResponse(parseErrorMessage(err)));
    }
  };

  /* RENDER */

  if (!selectedConfig) {
    log.error('Selected configuration not found');
    return <Navigate to=".." relative="path" />;
  }

  if (!isCheckedOutByUser) {
    return <Navigate to=".." relative="path" />;
  }

  return (
    <div
      className="react-transition fade-in margin-bottom-3 padding-x-3"
      id="mats-submission"
    >
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
          <span className="usa-label display-inline">Facility Name:</span>{' '}
          {selectedConfig.facilityName}
        </p>
        <p>
          <span className="usa-label display-inline">ORIS Code:</span>{' '}
          {selectedConfig.orisCode}
        </p>
        <p>
          <span className="usa-label display-inline">FRS ID:</span>{' '}
          {selectedConfig.facilityRegistrySystemId || 'None'}
        </p>
        <MatsCodeSelect
          className="margin-bottom-2"
          disabled={!!originalSubmission}
          label="Report Type"
          optionsStoreName={MATS_REPORT_TYPE_CODES_STORE_NAME}
          setValue={setReportType}
          value={reportType}
        />
        <hr className="margin-y-4" />
        <GridContainer>
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
          <div className="display-flex flex-justify-end">
            {submissionInitStatus === dataStatus.PENDING ? (
              <SizedPreloader size={5} />
            ) : (
              <Button type="submit" className="margin-top-2">
                Submit
              </Button>
            )}
          </div>
          {submissionInitStatus === dataStatus.SUCCESS && (
            <>
              {submissionInitWarnings.length > 0 ? (
                <SubmissionWarningsModal
                  onClose={handleWarningsModalClose}
                  onSave={handleWarningsModalSave}
                  warnings={submissionInitWarnings}
                />
              ) : (
                <SubmissionSignSubmitModal
                  onClose={handleSignSubmitModalClose}
                  onSave={handleSignSubmitModalSave}
                />
              )}
            </>
          )}
          {submissionInitStatus === dataStatus.ERROR && (
            <>
              {submissionErrors.map((error) => (
                <Alert key={error} type="error" slim noIcon headingLevel="h3">
                  {error}
                </Alert>
              ))}
            </>
          )}
        </GridContainer>
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
    originalSubmission?.averagingGroupCode ?? '',
  );
  const [location, setLocation] = useState(
    originalSubmission?.locationId ?? '',
  );
  const [pollutants, setPollutants] = useState(
    originalSubmission?.pollutantCodes ?? [],
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
    originalSubmission?.testMethodCodes ?? [],
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

  const tryParseInt = (value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      return null;
    }
    return parsedValue;
  };

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
        tryParseInt(reportingPeriod.split(' ')[0]),
      ),
      quarter: includeIfInReportType(
        'reportingPeriod',
        tryParseInt(reportingPeriod.split(' ')[1]?.substring(1)),
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
    <div className="margin-top-2">
      <Grid row gap>
        {fieldIsInReportType('location') && (
          <Grid className="margin-bottom-2" tablet={{ col: 6 }}>
            <LocationSelect
              options={selectedConfig.monitoringLocationData}
              setValue={setLocation}
              value={location}
            />
          </Grid>
        )}
        {fieldIsInReportType('averagingGroup') && (
          <Grid className="margin-bottom-2" tablet={{ col: 6 }}>
            <MatsCodeSelect
              label="Averaging Group"
              optionsStoreName={MATS_AVERAGING_GROUP_CODES_STORE_NAME}
              setValue={setAveragingGroup}
              value={averagingGroup}
            />
          </Grid>
        )}
        {fieldIsInReportType('pollutants') && (
          <Grid className="margin-bottom-2" tablet={{ col: 6 }}>
            <MatsCodeSelect
              disabled={pollutantsDisabled}
              label="Pollutants"
              multiple
              optionsStoreName={MATS_POLLUTANT_CODES_STORE_NAME}
              setValue={setPollutants}
              value={pollutants}
            />
          </Grid>
        )}
        {fieldIsInReportType('testMethods') && (
          <Grid className="margin-bottom-2" tablet={{ col: 6 }}>
            <MatsCodeSelect
              label="Test Methods"
              multiple
              optionsStoreName={MATS_TEST_METHOD_CODES_STORE_NAME}
              setValue={setTestMethods}
              value={testMethods}
            />
          </Grid>
        )}
        {fieldIsInReportType('testNumber') && (
          <Grid className="margin-bottom-2" tablet={{ col: 6 }}>
            <TextInput
              label="Test Number"
              setValue={setTestNumber}
              value={testNumber}
            />
          </Grid>
        )}
        {fieldIsInReportType('testDate') && (
          <Grid className="margin-bottom-2" tablet={{ col: 6 }}>
            <DatePicker
              label="Test Date"
              setValue={setTestDate}
              value={testDate}
            />
          </Grid>
        )}
        {fieldIsInReportType('testComment') && (
          <Grid className="margin-bottom-2" tablet={{ col: 6 }}>
            <TextInput
              label="Test Comment"
              setValue={setTestComment}
              value={testComment}
            />
          </Grid>
        )}
        {fieldIsInReportType('reportingPeriod') && (
          <Grid className="margin-bottom-2" tablet={{ col: 6 }}>
            <ReportingPeriodSelect
              setValue={setReportingPeriod}
              value={reportingPeriod}
            />
          </Grid>
        )}
      </Grid>
    </div>
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
    <>
      <Label className="margin-bottom-1" htmlFor={id}>
        {label}
      </Label>
      <Grid
        row
        className="display-flex flex-align-center flex-row flex-justify-start gap"
      >
        <FileInput
          accept={accept}
          className="margin-bottom-2"
          id={id}
          onChange={(e) => onChange(e.target?.files[0])}
          ref={fileInputRef}
        />
        <Button
          className="margin-bottom-2 margin-right-0"
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
        <Button
          className="margin-bottom-2 margin-right-0"
          type="button"
          onClick={() => {
            fileInputRef.current?.clearFiles();
            onRemove();
          }}
        >
          Remove
        </Button>
      </Grid>
    </>
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
      {fileIsInReportType('SUPPORTING') && (
        <section>
          <h4>Supporting PDF(s)</h4>
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
          <Button
            className="margin-top-1"
            type="button"
            onClick={addPdfInput}
            unstyled
          >
            Add More
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
