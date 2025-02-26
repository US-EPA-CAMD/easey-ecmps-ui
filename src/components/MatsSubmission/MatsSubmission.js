import React from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const MatsSubmission = ({
  user,

  /* MAPPED PROPS */
  checkedOutConfigs,
}) => {
  const { configId } = useParams();

  const isCheckedOutByUser =
    checkedOutConfigs.find((config) => config["monPlanId"] === configId)?.checkedOutBy === user.userId;

  if (!isCheckedOutByUser) {
    return <Navigate to="/workspace/mats-data-submission" />;
  }

  return <></>;
};

export const mapStateToProps = (state) => ({
  checkedOutConfigs: state.checkedOutLocations,
});

export default connect(mapStateToProps)(MatsSubmission);
