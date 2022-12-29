import React from "react";
import { Button } from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const PillButton = (props) => {
  return (
    <div className="display-inline-flex margin-bottom-05">
      <Button
        type="button"
        className="padding-1 padding-right-0 margin-0 radius-0 radius-left-lg bg-primary"
        title={props.tooltip}
        onClick={(evt) => props.onClick(props.index, props.label, evt.target)}
        disabled={props.disableButton}
        aria-label={!props.disableButton ? `Modify` : null}
      >
        {props.label}
      </Button>
      <Button
        type="button"
        aria-label={`Remove selection for ${props.label}`}
        className="padding-y-0 padding-left-1 padding-right-1 radius-0 radius-right-lg bg-primary"
        data-testid={`${props.index}-remove`}
        onClick={() => props.onRemove(props.index, props.label)}
      >
        <FontAwesomeIcon icon={faWindowClose} />
      </Button>
    </div>
  );
};

export default PillButton;
