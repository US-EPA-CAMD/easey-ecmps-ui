import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const MatsSubmission = ({
  user,

  /* MAPPED PROPS */
  checkedOutConfigs,
}) => {
  const location = useLocation();

  const selectedConfigId = location.state?.selectedConfigId;

  const isCheckedOutByUser =
    selectedConfigId &&
    checkedOutConfigs.find((config) => config["monPlanId"] === selectedConfigId)
      ?.checkedOutBy === user.userId;

  if (!isCheckedOutByUser) {
    return <Navigate to=".." relative="path" />;
  }

  return <></>;
};

export const mapStateToProps = (state) => ({
  checkedOutConfigs: state.checkedOutLocations,
});

export default connect(mapStateToProps)(MatsSubmission);
