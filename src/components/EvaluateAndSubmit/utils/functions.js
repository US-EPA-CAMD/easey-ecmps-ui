import { getAllFacilities } from "../../../utils/api/facilityApi";

export const getDropDownFacilities = async () => {
  const facilities = (await getAllFacilities()).data;
  const formattedFacilities = facilities.map(
    ({ facilityId, facilityName }) => ({
      id: facilityId,
      facilityName,
    })
  );
  return formattedFacilities;
};

export const canSelectRow = (
  row,
  rowType,
  componentType,
  permissions,
  userId
) => {
  const rowSubmissionAllowed =
    row.submissionAvailabilityCode === "REQUIRE" ||
    row.submissionAvailabilityCode === "GRANTED" ||
    row.submissionAvailabilityCode === null ||
    row.submissionAvailabilityCode === undefined ||
    row.submissionAvailabilityCode === "";

  if (
    row.checkedOutBy &&
    row.checkedOutBy !== "" &&
    row.checkedOutBy !== userId
  ) {
    return false;
  }

  if (componentType === "Submission") {
    //Submission page criteria
    if (
      ["PASS", "INFO", "ERR"].includes(row.evalStatusCode) &&
      rowSubmissionAllowed &&
      (permissions.current === null ||
        permissions.current
          .get(parseInt(row.orisCode))
          ?.includes(`DS${rowType}`))
    ) {
      return true;
    }
  } else {
    // Evaluate page criteria
    if (["EVAL", "ERR"].includes(row.evalStatusCode)) {
      return true;
    }
  }

  return false;
};
