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
    obtainCheckedOutLocations().then();
    const interval = setInterval(
      () => obtainCheckedOutLocations().then(),
      fiveSeconds
    );
    return () => clearInterval(interval);//eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const obtainCheckedOutLocations = async () => {
    const checkedOutLocationResult = await getCheckedOutLocations().then();
    let checkedOutLocationsList = [];
    if (checkedOutLocationResult) {
      if (
        checkedOutLocationResult.data &&
        !_.isEqual(
          checkedOutLocationsRef.current,
          checkedOutLocationResult.data
        )
      ) {
        checkedOutLocationsList = checkedOutLocationResult.data;
        dispatch({
          type: types.SET_CHECKED_OUT_LOCATIONS,
          checkedOutLocations: checkedOutLocationsList,
        });
        checkedOutLocationsRef.current = checkedOutLocationResult.data;
      }
    }
  };
};


export default useGetCheckedOutLocations;
