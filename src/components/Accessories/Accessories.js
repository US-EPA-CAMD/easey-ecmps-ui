import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@trussworks/react-uswds";

const Accessories = ({ user, logOut }) => {
  let initials = "xx";
  if (user) {
    initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }

  return (
    <div className="accessoriesLinks">
      {user ? (
        <div>
          <div>
            <p data-initials={initials} className="usa-current text-bold">
              {" "}
              Welcome, {user.firstName}
            </p>
          </div>

          <div >
            <Button type="button" id = "logoutBTN" epa-testid="logoutBTN" outline={true} onClick={() => logOut()}>
              Log Out
            </Button>
          </div>

          <p className="margin-top-2 text-primary-vivid">
            <Link to="./profile" rel="Profile" title="Go to the Profile page">
              Profile
            </Link>
          </p>
          <p className="text-primary-vivid">
            <Link
              to="./account_manage"
              rel=" Account Management"
              title="Go to the Account Management page"
            >
              Account Management
            </Link>
          </p>
          <hr />
        </div>
      ) : (
        ""
      )}
      <p>
        <Link to="./apps" rel=" CAMD Apps" title="Go to the CAMPD Apps page">
          CAMD Apps
        </Link>
      </p>
      <p>
        <Link to="./help" rel="help" title="Go to the help page">
          {"Help & Contact"}
        </Link>
      </p>
    </div>
  );
};

export default Accessories;
