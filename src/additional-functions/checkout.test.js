import { checkoutAPI } from './checkout';
import {
  deleteCheckInMonitoringPlanConfiguration,
  postCheckoutMonitoringPlanConfiguration,
} from '../utils/api/monitoringPlansApi';
import { MONITORING_PLAN_STORE_NAME } from './workspace-section-and-store-names';

jest.mock('../utils/api/monitoringPlansApi');

describe('checkoutAPI', () => {
  const mockSetCheckout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.setItem('cdx_user', JSON.stringify({ userId: '123' }));
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should call deleteCheckInMonitoringPlanConfiguration and setCheckout with false when direction is falsy', async () => {
    const monitorPlanId = 'mp-123';
    const configID = 'config-123';
    const direction = false;

    const mockDeleteCheckInMonitoringPlanConfiguration = jest
      .fn()
      .mockResolvedValue({});
    deleteCheckInMonitoringPlanConfiguration.mockImplementation(
      mockDeleteCheckInMonitoringPlanConfiguration
    );

    await checkoutAPI(direction, configID, monitorPlanId, mockSetCheckout);

    expect(mockDeleteCheckInMonitoringPlanConfiguration).toHaveBeenCalledWith(
      monitorPlanId
    );
    expect(mockSetCheckout).toHaveBeenCalledWith(
      false,
      configID,
      MONITORING_PLAN_STORE_NAME
    );
  });

  it('should call postCheckoutMonitoringPlanConfiguration and setCheckout with true when direction is truthy', async () => {
    const monitorPlanId = 'mp-123';
    const configID = 'config-123';
    const direction = true;

    const mockPostCheckoutMonitoringPlanConfiguration = jest
      .fn()
      .mockResolvedValue({});
    postCheckoutMonitoringPlanConfiguration.mockImplementation(
      mockPostCheckoutMonitoringPlanConfiguration
    );

    await checkoutAPI(direction, configID, monitorPlanId, mockSetCheckout);

    expect(mockPostCheckoutMonitoringPlanConfiguration).toHaveBeenCalledWith(
      monitorPlanId,
      '123'
    );
    expect(mockSetCheckout).toHaveBeenCalledWith(
      true,
      configID,
      MONITORING_PLAN_STORE_NAME
    );
  });

  it('should handle errors when deleteCheckInMonitoringPlanConfiguration returns undefined', async () => {
    const monitorPlanId = 'mp-123';
    const configID = 'config-123';
    const direction = false;

    const mockDeleteCheckInMonitoringPlanConfiguration = jest
      .fn()
      .mockResolvedValue(undefined);
    deleteCheckInMonitoringPlanConfiguration.mockImplementation(
      mockDeleteCheckInMonitoringPlanConfiguration
    );

    await checkoutAPI(direction, configID, monitorPlanId, mockSetCheckout);

    expect(mockDeleteCheckInMonitoringPlanConfiguration).toHaveBeenCalledWith(
      monitorPlanId
    );
    expect(mockSetCheckout).toHaveBeenCalledWith(
      false,
      configID,
      MONITORING_PLAN_STORE_NAME
    );
  });

  it('should handle errors when postCheckoutMonitoringPlanConfiguration returns undefined', async () => {
    const monitorPlanId = 'mp-123';
    const configID = 'config-123';
    const direction = true;

    const mockPostCheckoutMonitoringPlanConfiguration = jest
      .fn()
      .mockResolvedValue(undefined);
    postCheckoutMonitoringPlanConfiguration.mockImplementation(
      mockPostCheckoutMonitoringPlanConfiguration
    );

    await checkoutAPI(direction, configID, monitorPlanId, mockSetCheckout);

    expect(mockPostCheckoutMonitoringPlanConfiguration).toHaveBeenCalledWith(
      monitorPlanId,
      '123'
    );
    expect(mockSetCheckout).toHaveBeenCalledWith(
      true,
      configID,
      MONITORING_PLAN_STORE_NAME
    );
  });
});
