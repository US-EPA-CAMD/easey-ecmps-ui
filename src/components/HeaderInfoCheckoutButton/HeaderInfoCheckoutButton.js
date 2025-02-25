import { CreateOutlined, LockOpenSharp } from "@material-ui/icons";
import { Button } from "@trussworks/react-uswds";
import log from "loglevel";
import React from "react";

import { checkoutAPI } from "../../additional-functions/checkout";

export const HeaderInfoCheckoutButton = ({
  checkedOutConfigs,
  selectedConfig,
  setCheckout,
  user,
}) => {
  const checkoutState = checkedOutConfigs.find((config) => config["monPlanId"] === selectedConfig.id);
  const isCheckedOut = !!checkoutState;
  const isCheckedOutByUser = isCheckedOut && checkoutState["checkedOutBy"] === user.userId;
  const userHasCheckout = checkedOutConfigs.some((plan) => plan["checkedOutBy"] === user.userId);

  // direction -> false = check back in
  // direction -> true = check out
  const checkoutStateHandler = (direction) => {
    // trigger checkout API
    // - POST if direction is TRUE (adding new record to checkouts table)
    // - DELETE if direction is FALSE (removing record from checkouts table)
    checkoutAPI(direction, selectedConfig.id, setCheckout)
      .catch((error) => {
        log.error("Error during checkout", error);
      });
  };
  return (
    <>
      {user && (
        <>
          {isCheckedOutByUser ? (
            <Button
              type="button"
              //autofocus // TODO: See if this can be removed
              outline={false}
              tabIndex={0}
              aria-label={`Check back in the configuration `}
              onClick={() => checkoutStateHandler(false)}
              id="checkInBTN"
              epa-testid="checkInBTN"
            >
              <LockOpenSharp /> {"Check Back In"}
            </Button>
          ) : //selectedConfig.active && // TODO: See if this can be removed
              !isCheckedOut &&
              !userHasCheckout ? (
            <Button
              type="button"
              //autoFocus // TODO: See if this can be removed
              outline={true}
              tabIndex={0}
              aria-label={`Check out the configuration`}
              onClick={() => checkoutStateHandler(true)}
              id="checkOutBTN"
              epa-testid="checkOutBTN"
            >
              <CreateOutlined color="primary" /> {"Check Out"}
            </Button>
          ) : null}
        </>
      )}
    </>
  );
};

export default HeaderInfoCheckoutButton;
