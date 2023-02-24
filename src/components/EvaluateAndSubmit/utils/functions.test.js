import { getFacilityById } from "../../../utils/api/facilityApi";
import { formatPermissions } from "./functions";

jest.mock('../../../utils/api/facilityApi', () => ({
  getFacilityById: jest.fn(),
}));

describe('formatPermissions', () => {
  let permissions, setPermissions;

  beforeEach(() => {
    permissions = [
      { id: 1, facilityName: 'Facility 1' },
      { id: 2, facilityName: 'Facility 2' },
      { id: 3, facilityName: 'Facility 3' },
    ];
    setPermissions = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should format permissions correctly', async () => {
    const facilityData = [
      { data: { facilityName: 'Facility 1' } },
      { data: { facilityName: 'Facility 2' } },
      { data: { facilityName: 'Facility 3' } },
    ];
    getFacilityById.mockImplementation((id) => facilityData[id - 1]);
    await formatPermissions(permissions, setPermissions);

    expect(setPermissions).toHaveBeenCalledTimes(1);
    expect(setPermissions).toHaveBeenCalledWith([
      { id: 1, facilityName: 'Facility 1', active: true, name: 'Test' },
      { id: 2, facilityName: 'Facility 2', active: true, name: 'Test' },
      { id: 3, facilityName: 'Facility 3', active: true, name: 'Test' },
    ]);
  });
});
