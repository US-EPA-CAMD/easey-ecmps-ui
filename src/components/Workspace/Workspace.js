import { NavDropDownButton, MegaMenu } from "@trussworks/react-uswds";
import React, { useState } from "react";
import { NavLink,useLocation  } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

import "./Workspace.scss";

const Workspace = () => {
  const cdxUser = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;
const firstName = cdxUser && cdxUser.firstName ? cdxUser.firstName : false;

const location = useLocation().pathname;
console.log('location',location)
  const [open, setOpen] = useState(true);
  const subMenu = [
    <NavLink
    className="text-no-underline text-white"
      to={`/monitoring-plans/${firstName}`}
      rel="Monitoring Plans"
      activeClassName=" activeLink"
      isActive={()=> location === `/monitoring-plans/${firstName}` }
      title="Go to the Monitoring Plans page"
    >
      Monitoring Plans
    </NavLink>
,
    <NavLink
      className="text-no-underline text-white"
      to="/qa_certifications"
      activeClassName=" activeLink"
      rel={"QA & Certifications"}
      title={"Go to the QA & Certifications page"}
    >
      { " QA & Certifications"}
    </NavLink>
 ,
    <NavLink
      className="text-no-underline text-white"
      activeClassName=" activeLink"
      to="/emissions"
      rel="Emissions"
      
      title="Go to the Emissions page"
    >
    Emissions
    </NavLink>
  ];
  const testing = (news) => {
    setOpen(!news);
  };
  const workSpace = (
    <>
      <div className="workspaceMenu">
        <NavDropDownButton
          className="bg-base text-white width-auto padding-left-0"
          onToggle={() => {
            testing(open);
          }}
          menuId="MenuDropDown"
          isOpen={open}
          label={<div className="text-underline">Workspace</div>}
          isCurrent={open}
        />
        <MegaMenu
          key="workspace"
          items={[subMenu]}
          isOpen={open}
          id={"MenuDropDown"}
          className="position-relative top-neg-2 left-5"
        />
      </div>
    </>
  );

  return (
    <div className="flex-auto">
      {/* <div className="iconLine iconDiv">
        <FontAwesomeIcon icon={faDesktop} className="text-white font-body-md" />
      </div> */}
      <div className="workspaceDropDown">{workSpace}</div>
    </div>
  );
};

export default Workspace;
