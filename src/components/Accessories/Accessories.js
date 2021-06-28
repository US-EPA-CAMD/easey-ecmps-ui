import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@trussworks/react-uswds";

const cdx_user = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;
const firstName = cdx_user && cdx_user.firstName ? cdx_user.firstName : "X";
const lastName = cdx_user && cdx_user.lastName ? cdx_user.lastName : "X";

const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

const Accessories = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const checkLoggedIn = () => {
    if (cdx_user && firstName) {
      setUserLoggedIn(true);
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("cdx_user");
    window.location = "/login";
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="accessoriesLinks">
      {userLoggedIn ? (
        <div>
          <div className="accessoryLink">
            <p data-initials={initials} className="usa-current text-bold">
              {" "}
              Welcome, {firstName}
            </p>
          </div>
          {userLoggedIn && (
            <div className="accessoryLink">
              <Button type="button" outline={true} onClick={() => logOut()}>
                Log Out
              </Button>
            </div>
          )}
          <p className="margin-top-2 text-primary-vivid">
            <Link
              to="./profile"
              rel="Profile"
              title="Go to the Profile page"
              className="accessoryLink"
            >
              Profile
            </Link>
          </p>
          <p className="text-primary-vivid">
            <Link
              className="accessoryLink"
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
        <Link
          to="./apps"
          rel=" CAMD Apps"
          title="Go to the CAMPD Apps page"
          className="accessoryLink "
          
        >
          CAMD Apps
        </Link>
      </p>
      <p>
        <Link to="./help" rel="help" title="Go to the help page" className="">
          {"Help & Contact"}
        </Link>
      </p>
    </div>
  );
};

export default Accessories;
