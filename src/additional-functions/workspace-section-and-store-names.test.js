import { convertSectionToStoreName } from './workspace-section-and-store-names';

describe('workspace store names', () => {
  const MONITORING_PLAN_STORE_NAME = 'monitoringPlans';
  const QA_CERT_TEST_SUMMARY_STORE_NAME = 'qaCertTestSummary';
  const QA_CERT_EVENT_STORE_NAME = 'qaCertEvent';
  const EXPORT_STORE_NAME = 'export';
  const EMISSIONS_STORE_NAME = 'emissions';

  it('should test with valid input', () => {
    expect(convertSectionToStoreName(MONITORING_PLAN_STORE_NAME)).toBe(
      'monitoringPlans'
    );
    expect(convertSectionToStoreName(QA_CERT_TEST_SUMMARY_STORE_NAME)).toBe(
      'qaCertTestSummary'
    );
    expect(convertSectionToStoreName(QA_CERT_EVENT_STORE_NAME)).toBe(
      'qaCertEvent'
    );
    expect(convertSectionToStoreName(EXPORT_STORE_NAME)).toBe('export');
    expect(convertSectionToStoreName(EMISSIONS_STORE_NAME)).toBe('emissions');
    expect(convertSectionToStoreName('false')).toBe('');
  });
});
