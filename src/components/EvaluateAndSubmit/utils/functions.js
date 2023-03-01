import {
  getAllFacilities,
} from '../../../utils/api/facilityApi';


export const getDropDownFacilities = async () => {
  const facilities = (await getAllFacilities()).data;
  const formattedFacilities = facilities.map(({ facilityId, facilityName }) => ({
    id: facilityId,
    facilityName,
  }));
  return formattedFacilities;
};
