import React, { useState, useEffect } from "react";
import {
  BsFillGearFill,
  BsFillPersonFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoIosHelpCircle } from "react-icons/io";
import { Button } from "@trussworks/react-uswds";

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
        <BsFillGrid3X3GapFill style={{ fill: "white" }} />
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
        <BsFillPersonFill style={{ fill: "white" }} />
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
        <BsFillGearFill style={{ fill: "white" }} />
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
        <IoIosHelpCircle style={{ fill: "white" }} />
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
