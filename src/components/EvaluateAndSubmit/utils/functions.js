import { getFacilityById } from '../../../utils/api/facilityApi';

export const formatPermissions = async (permissions, setPermissions) => {
  const facilityIds = permissions.map((facility) => facility.id);
  const facilities = await Promise.all(facilityIds.map(getFacilityById));

  facilities.forEach((facility, index) => {
    const currentFacility = permissions[index];
    permissions[index].facilityName = facility.data.facilityName;
    currentFacility.active = true;
    currentFacility.name = 'Test';
  });
  setPermissions(permissions);
};
