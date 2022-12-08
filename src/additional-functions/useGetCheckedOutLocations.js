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
    const interval = setInterval(
      () => obtainCheckedOutLocations().then(),
      fiveSeconds
    );
    return () => clearInterval(interval);//eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log({ checkedOutLocationsRef });
  }, [checkedOutLocationsRef]);
  const obtainCheckedOutLocations = async () => {
    const checkedOutLocationResult = await getCheckedOutLocations().then();
    let checkedOutLocationsList = [];
    if (checkedOutLocationResult) {
      if (
        checkedOutLocationResult.data &&
        checkedOutLocationResult.data.length > 0 &&
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

const mockCheckedOutLocation = {
    "facId": 946,
    "monPlanId": "MDC-A176443524F0445CA3FDB90DB059D5A5",
    "checkedOutOn": "2022-12-08T14:54:31.881Z",
    "checkedOutBy": "rboehme-dp",
    "lastActivity": "2022-12-08T14:54:31.881Z"
};

export default useGetCheckedOutLocations;
