import { getDropDownFacilities } from './functions';
import * as facilityApi from '../../../utils/api/facilityApi'

const data = [
  {
    facilityRecordId: 1,
    facilityId: 3,
    facilityName: 'Barry',
    stateCode: 'AL',
  },
];

describe('getDropDownFacilities', () => {
  beforeEach(() => {
    jest.spyOn(facilityApi, 'getAllFacilities').mockResolvedValue({ data })
  });

  test('should format facilities correctly', async () => {
    const facilities = await getDropDownFacilities();
    expect(facilities[0].id).toEqual(data[0].facilityId);
    expect(facilities[0].facilityName).toEqual(data[0].facilityName);
  });
});
