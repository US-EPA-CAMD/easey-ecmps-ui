import { CreateOutlined, LockOpenSharp } from "@material-ui/icons";
import { Button } from "@trussworks/react-uswds";
import React from "react";
import { connect } from "react-redux";

import {
  checkPlanIn as _checkPlanIn,
  checkPlanOut as _checkPlanOut,
} from "../../additional-functions/checkout";

export const HeaderInfoCheckoutButton = ({
  checkedOutConfigs,
  selectedConfig,
  user,

  /* MAPPED PROPS */
  checkPlanIn,
  checkPlanOut,
}) => {
  const checkoutState = checkedOutConfigs.find(
    (config) => config["monPlanId"] === selectedConfig.id
  );
  const isCheckedOut = !!checkoutState;
  const isCheckedOutByUser =
    isCheckedOut && checkoutState["checkedOutBy"] === user.userId;
  const userHasCheckout = checkedOutConfigs.some(
    (plan) => plan["checkedOutBy"] === user.userId
  );

  return (
    <>
      {user && (
        <>
          {isCheckedOutByUser ? (
            <Button
              type="button"
              outline={false}
              tabIndex={0}
              aria-label={`Check back in the configuration `}
              onClick={() => checkPlanIn(selectedConfig.id)}
              id="checkInBTN"
              epa-testid="checkInBTN"
            >
              <LockOpenSharp /> {"Check Back In"}
            </Button>
          ) : !isCheckedOut && !userHasCheckout ? (
            <Button
              type="button"
              outline={true}
              tabIndex={0}
              aria-label={`Check out the configuration`}
              onClick={() => checkPlanOut(selectedConfig.id)}
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

export const mapDispatchToProps = (dispatch) => {
  return {
    checkPlanIn: _checkPlanIn(dispatch),
    checkPlanOut: _checkPlanOut(dispatch),
  };
};

export default connect(undefined, mapDispatchToProps)(HeaderInfoCheckoutButton);
