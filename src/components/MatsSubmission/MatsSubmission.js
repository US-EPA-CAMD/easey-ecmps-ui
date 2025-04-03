import { ArrowBackSharp } from '@material-ui/icons';
import { Button } from '@trussworks/react-uswds';
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import {
  MATS_POLLUTANT_CODES_STORE_NAME,
  MATS_REPORT_TYPE_CODES_STORE_NAME,
  MATS_TEST_METHOD_CODES_STORE_NAME,
} from '../../additional-functions/data-table-section-and-store-names';
import { matsModule } from '../../utils/constants/moduleTitles';
import MatsCodeSelect from '../MatsCodeSelect/MatsCodeSelect';
import DatePicker from './DatePicker';
import LocationSelect from './LocationSelect';
import ReportingPeriodSelect from './ReportingPeriodSelect';
import TextInput from './TextInput';

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
  const originalSubmission = {
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
  };
  const selectedConfigId = location.state?.selectedConfigId;

  // TODO: Uncomment this and remove mock data when done developing the UI.
  //const selectedConfig = useSelector((state) =>
  //  Object.values(state.monitoringPlans)
  //    .flat()
  //    .find((mp) => mp.id === selectedConfigId),
  //);
  const selectedConfig = {
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
  };

  /* INTERNAL STATE */

  const [formLocation, setFormLocation] = useState(
    originalSubmission?.location.id ?? '',
  );
  const [formPollutants, setFormPollutants] = useState(
    originalSubmission?.pollutants ?? [],
  );
  const [formReportType, setFormReportType] = useState(
    originalSubmission?.reportType.code ?? '',
  );
  const [formReportingPeriod, setFormReportingPeriod] = useState(
    originalSubmission?.year && originalSubmission?.quarter
      ? `${originalSubmission.year} Q${originalSubmission.quarter}`
      : '',
  );
  const [formTestComment, setFormTestComment] = useState(
    originalSubmission?.testComment ?? '',
  );
  const [formTestDate, setFormTestDate] = useState(
    (originalSubmission?.testDate ?? '').substring(0, 10),
  );
  const [formTestMethods, setFormTestMethods] = useState(
    originalSubmission?.testMethods ?? [],
  );
  const [formTestNumber, setFormTestNumber] = useState(
    originalSubmission?.testNumber ?? '',
  );

  /* CALCULATED VALUES */

  const isCheckedOutByUser =
    selectedConfigId &&
    checkedOutConfigs.find((config) => config['monPlanId'] === selectedConfigId)
      ?.checkedOutBy === user.userId;

  // TODO: Uncomment this when done developing the UI.
  //if (!isCheckedOutByUser) {
  //  return <Navigate to=".." relative="path" />;
  //}

  return (
    <div className="react-transition fade-in padding-x-3">
      <Button
        className="margin-top-2"
        onClick={() => navigate(-1)}
        type="button"
        unstyled
      >
        <ArrowBackSharp /> Return to Submission Grid
      </Button>
      <h2 className="page-header margin-top-2">{matsModule}</h2>
      <h3>Metadata</h3>
      <MatsCodeSelect
        disabled={!!originalSubmission}
        label="Report Type"
        optionsStoreName={MATS_REPORT_TYPE_CODES_STORE_NAME}
        setValue={setFormReportType}
        value={formReportType}
      />
      <LocationSelect
        options={selectedConfig?.monitoringLocationData}
        setValue={setFormLocation}
        value={formLocation}
      />
      <MatsCodeSelect
        multiple
        label="Pollutants"
        optionsStoreName={MATS_POLLUTANT_CODES_STORE_NAME}
        setValue={setFormPollutants}
        value={formPollutants}
      />
      <MatsCodeSelect
        multiple
        label="Test Methods"
        optionsStoreName={MATS_TEST_METHOD_CODES_STORE_NAME}
        setValue={setFormTestMethods}
        value={formTestMethods}
      />
      <TextInput
        label="Test Number"
        setValue={setFormTestNumber}
        value={formTestNumber}
      />
      <DatePicker
        label="Test Date"
        setValue={setFormTestDate}
        value={formTestDate}
      />
      <TextInput
        label="Test Comment"
        setValue={setFormTestComment}
        value={formTestComment}
      />
      <ReportingPeriodSelect
        setValue={setFormReportingPeriod}
        value={formReportingPeriod}
      />
    </div>
  );
};

export const mapStateToProps = (state) => ({
  checkedOutConfigs: state.checkedOutLocations,
});

export default connect(mapStateToProps)(MatsSubmission);
