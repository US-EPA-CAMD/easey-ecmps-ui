import { Button } from "@trussworks/react-uswds";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const HeaderInfoMatsSubmissionButton = ({ selectedConfig }) => {
  const navigate = useNavigate();
  const [id] = useState(uuidv4());

  const onClick = () => {
    navigate("create", {
      relative: "path",
      state: { selectedConfigId: selectedConfig.id },
    });
  };

  return (
    <Button
      type="button"
      className=""
      id={`submission-button-${id}`}
      outline={false}
      onClick={onClick}
    >
      New Submission
    </Button>
  );
};

export default HeaderInfoMatsSubmissionButton;
