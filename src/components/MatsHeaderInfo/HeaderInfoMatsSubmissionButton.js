import { Button } from "@trussworks/react-uswds";
import { at } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import config from "../../config";

const HeaderInfoMatsSubmissionButton = ({
  checkedOutConfigs,
  selectedConfig,
  user,
}) => {
  const navigate = useNavigate();
  const [id] = useState(uuidv4());

  const isCheckedOutByUser =
    checkedOutConfigs.find(
      (config) => config["monPlanId"] === selectedConfig.id
    )?.checkedOutBy === user.userId;
  const acceptedRoles = at(config.app, [
    "sponsorRole",
    "submitterRole",
    "initialAuthorizerRole",
  ]);
  const hasRequiredRole = user.roles?.some((role) =>
    acceptedRoles.includes(role)
  );

  const onClick = () => {
    navigate("new-submission", {
      relative: "path",
      state: { selectedConfigId: selectedConfig.id },
    });
  };

  return (
    isCheckedOutByUser &&
    hasRequiredRole && (
      <Button
        type="button"
        className=""
        id={`submission-button-${id}`}
        outline={false}
        onClick={onClick}
      >
        New Submission
      </Button>
    )
  );
};

export default HeaderInfoMatsSubmissionButton;
