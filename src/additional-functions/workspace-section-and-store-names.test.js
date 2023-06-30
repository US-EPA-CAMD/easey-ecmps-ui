import { convertSectionToStoreName } from './workspace-section-and-store-names';

describe('convertSectionToStoreName function', () => {
  const MONITORING_PLAN_STORE_NAME = 'monitoringPlans';
  const QA_CERT_TEST_SUMMARY_STORE_NAME = 'qaCertTestSummary';
  const QA_CERT_EVENT_STORE_NAME = 'qaCertEvent';
  const EXPORT_STORE_NAME = 'export';
  const EMISSIONS_STORE_NAME = 'emissions';

  it('should return monitoringPlans when input is monitoringPlans', () => {
    expect(convertSectionToStoreName(MONITORING_PLAN_STORE_NAME)).toBe('monitoringPlans');
  });

  it('should return qaCertTestSummary when input is qaCertTestSummary', () => {
    expect(convertSectionToStoreName(QA_CERT_TEST_SUMMARY_STORE_NAME)).toBe('qaCertTestSummary');
  });

  it('should return qaCertEvent when input is qaCertEvent', () => {
    expect(convertSectionToStoreName(QA_CERT_EVENT_STORE_NAME)).toBe('qaCertEvent');
  });

  it('should return export when input is export', () => {
    expect(convertSectionToStoreName(EXPORT_STORE_NAME)).toBe('export');
  });

  it('should return emissions when input is emissions', () => {
    expect(convertSectionToStoreName(EMISSIONS_STORE_NAME)).toBe('emissions');
  });

  it('should return an empty string when input does not match any known store name', () => {
    expect(convertSectionToStoreName('false')).toBe('');
  });
});
