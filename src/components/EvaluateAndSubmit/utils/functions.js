import {
  getAllFacilities,
} from '../../../utils/api/facilityApi';


export const getDropDownFacilities = async () => {
  try {
    const facilities = (await getAllFacilities()).data;
    const formattedFacilities = facilities.map(({ facilityId, facilityName }) => ({
      id: facilityId,
      facilityName,
    }));
    return formattedFacilities;
  } catch (error) {
    return [];
  }
};
