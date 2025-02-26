import { Link } from "@trussworks/react-uswds";
import { at } from "lodash";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import config from "../../config";

export const HeaderInfoMatsSubmissionButton = ({
  checkedOutConfigs,
  selectedConfig,
  user,
}) => {
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

  return (
    isCheckedOutByUser &&
    hasRequiredRole && (
      <Link
        className="usa-button"
        id={`submission-button-${id}`}
        variant="unstyled"
        asCustom={NavLink}
        to={`/workspace/mats-data-submission/${selectedConfig.id}`}
      >
        New Submission
      </Link>
    )
  );
};

export default HeaderInfoMatsSubmissionButton;
