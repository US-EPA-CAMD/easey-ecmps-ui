import {
  Fieldset
} from "@trussworks/react-uswds";

import { useLocation } from "react-router-dom";
import config from "../../config";

const SignUpMigrate = () => {

  const location = useLocation();
  const viewProps = location.state ? location.state.viewProps : null;

  // Fallback values in case viewProps is null
  const defaultViewProps = {
    title: "Welcome",
    verbiage: "Plesae proceed to CDX to login or sign up",
    url: `${config.app.cdxIcamSignupPath}`,
    buttonLabel: "Login/Signup"
  };

  const { title, url, verbiage, buttonLabel } = viewProps || defaultViewProps;

  return (
    <div className="">
      <div className="padding-1">
          <Fieldset legend={title} legendStyle="large">
          <p> {verbiage} </p>
          <a id="signupMigrate" name="Button" className="usa-button margin-bottom-2" data-testid="component-signup-migrate-button" href={url}>{buttonLabel}</a>
        </Fieldset>
      </div>
    </div>
  );
};

export default SignUpMigrate;
