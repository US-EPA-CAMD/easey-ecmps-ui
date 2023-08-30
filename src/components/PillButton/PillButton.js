import React from "react";
import { Button } from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const PillButton = ({tooltip, index, label, onClick, onRemove}) => {
  return (
    <div className="display-inline-flex margin-bottom-05">
      <Button
        type="button"
        className="padding-1 padding-right-0 margin-0 radius-0 radius-left-lg bg-primary"
        title={tooltip}
        onClick={(evt) => onClick ? onClick(index, label, evt.target) : null}
      >
        {label}
      </Button>
      <Button
        type="button"
        aria-label={`Remove selection for ${label}`}
        className="padding-y-0 padding-left-1 padding-right-1 radius-0 radius-right-lg bg-primary"
        data-testid={`${index}-remove`}
        onClick={() => onRemove(index, label)}
      >
        <FontAwesomeIcon icon={faWindowClose} />
      </Button>
    </div>
  );
};

export default PillButton;
