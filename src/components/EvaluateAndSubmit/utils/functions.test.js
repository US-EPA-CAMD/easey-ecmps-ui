import { getDropDownFacilities } from './functions';
const data = [
  {
    facilityRecordId: 1,
    facilityId: 3,
    facilityName: 'Barry',
    stateCode: 'AL',
  },
];
const mockFacilityCall = jest.fn().mockResolvedValue({ data });
jest.mock('../../../utils/api/facilityApi', () => ({
  getAllFacilities: () => mockFacilityCall(),
}));

describe('getDropDownFacilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should format facilities correctly', async () => {
    const facilities = await getDropDownFacilities();
    expect(facilities[0].id).toEqual(data[0].facilityId);
    expect(facilities[0].facilityName).toEqual(data[0].facilityName);
  });
});
