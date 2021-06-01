import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTh,
  faUser,
  faCog,
  faQuestionCircle,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const cdx_user = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;
const firstName = cdx_user && cdx_user.firstName ? cdx_user.firstName : false;

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
          <div className="">
            <FontAwesomeIcon icon={faUserCircle} className=" font-body-lg" />
            {" Welcome, "}
            {firstName}
          </div>
          {userLoggedIn && (
            <div className="accessoryLink">
              <Button type="button" onClick={() => logOut()}>
                Log Out
              </Button>
            </div>
          )}
          <div className="accessoryLink">
            <FontAwesomeIcon icon={faUser} className="font-body-sm" />
            <Link
              to="./profile"
              rel="Profile"
              title="Go to the Profile page"
              className=""
            >
              Profile
            </Link>
          </div>
          <div className="">
            <FontAwesomeIcon icon={faCog} className="font-body-sm" />
            <Link
              className=""
              to="./account_manage"
              rel=" Account Management"
              title="Go to the Account Management page"
            >
              Account Management
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="accessoryLink">
        <FontAwesomeIcon icon={faTh} className=" font-body-sm" />
        <Link
          to="./apps"
          rel=" CAMD Apps"
          title="Go to the  CAMD Apps page"
          className=""
        >
          CAMD Apps
        </Link>
      </div>
      <div className="accessoryLink">
        <FontAwesomeIcon icon={faQuestionCircle} className="font-body-sm" />
        <Link to="./help" rel="help" title="Go to the help page" className="">
          {"Help & Contact"}
        </Link>
      </div>
    </div>
  );
};

export default Accessories;
