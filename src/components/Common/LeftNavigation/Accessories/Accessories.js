import React from "react";
import "./Accessories.css";
import {
  BsFillGearFill,
  BsFillPersonFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoIosHelpCircle } from "react-icons/io";
const Accessories = () => {
  return (
    <div className="accessoriesLinks">
      <div className="accessoryLink">
        <BsFillGrid3X3GapFill style={{ fill: "white" }} />
        <Link to="./apps" rel=" CAMD Apps" title="Go to the  CAMD Apps page">
          CAMD Apps
        </Link>
      </div>
      <div className="accessoryLink">
        <BsFillPersonFill style={{ fill: "white" }} />
        <Link to="./profile" rel="Profile" title="Go to the Profile page">
          Profile
        </Link>
      </div>
      <div className="accessoryLink">
        <BsFillGearFill style={{ fill: "white" }} />
        <Link
          to="./account_manage"
          rel=" Account Management"
          title="Go to the Account Management page"
        >
          Account Management
        </Link>
      </div>
      <div className="accessoryLink">
        <IoIosHelpCircle style={{ fill: "white" }} />
        <Link to="./help" rel="help" title="Go to the help page">
          {"Help & Contact"}
        </Link>
      </div>
    </div>
  );
};

export default Accessories;
