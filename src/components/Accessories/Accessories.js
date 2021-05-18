import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTh,
  faUser,
  faCog,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const cdx_user = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;
const firstName = cdx_user && cdx_user.firstName ? cdx_user.firstName : false;

const Accessories = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [profileTitle, setProfileTitle] = useState("Profile");

  const checkLoggedIn = () => {
    if (cdx_user && firstName) {
      setProfileTitle(`Hello "${firstName}"`);
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
      <div className="accessoryLink">
        <FontAwesomeIcon icon={faTh} className="text-white font-body-sm" />
        <Link
          to="./apps"
          rel=" CAMD Apps"
          title="Go to the  CAMD Apps page"
          className="text-white"
        >
          CAMD Apps
        </Link>
      </div>
      <div className="accessoryLink">
        <FontAwesomeIcon icon={faUser} className="text-white font-body-sm" />
        <Link
          to="./profile"
          rel="Profile"
          title="Go to the Profile page"
          className="text-white"
        >
          {profileTitle}
        </Link>
      </div>
      <div className="text-white">
        <FontAwesomeIcon icon={faCog} className="text-white font-body-sm" />
        <Link
          className="text-white"
          to="./account_manage"
          rel=" Account Management"
          title="Go to the Account Management page"
        >
          Account Management
        </Link>
      </div>
      <div className="accessoryLink">
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-white font-body-sm"
        />
        <Link
          to="./help"
          rel="help"
          title="Go to the help page"
          className="text-white"
        >
          {"Help & Contact"}
        </Link>
      </div>
      {userLoggedIn && (
        <div className="accessoryLink">
          <Button type="button" onClick={() => logOut()}>
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Accessories;
