import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fiveSeconds } from '../config';
import { getCheckedOutLocations } from '../utils/api/monitoringPlansApi';
import * as types from '../store/actions/actionTypes';
import _ from 'lodash';

const useGetCheckedOutLocations = () => {
  const checkedOutLocationsRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    obtainCheckedOutLocations({ checkedOutLocationsRef, dispatch }).then();
    const interval = setInterval(
      () =>
        obtainCheckedOutLocations({ checkedOutLocationsRef, dispatch }).then(),
      fiveSeconds
    );
    return () => clearInterval(interval); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const obtainCheckedOutLocations = async ({
  checkedOutLocationsRef,
  dispatch,
}) => {
  const checkedOutLocationResult = await getCheckedOutLocations().then();
  let checkedOutLocationsList = [];
  if (checkedOutLocationResult) {
    const checkedOutLocationResultData = checkedOutLocationResult.data;
    if (!dispatch) {
      return checkedOutLocationResultData;
    }
    if (!checkedOutLocationsRef) {
      dispatch({
        type: types.SET_CHECKED_OUT_LOCATIONS,
        checkedOutLocations: checkedOutLocationResultData,
      });
      return checkedOutLocationResultData;
    }
    if (
      checkedOutLocationResultData &&
      !_.isEqual(checkedOutLocationsRef.current, checkedOutLocationResultData)
    ) {
      checkedOutLocationsList = checkedOutLocationResultData;
      dispatch({
        type: types.SET_CHECKED_OUT_LOCATIONS,
        checkedOutLocations: checkedOutLocationsList,
      });
      checkedOutLocationsRef.current = checkedOutLocationResultData;
    }
      return checkedOutLocationResultData;
  }
};

export default useGetCheckedOutLocations;
