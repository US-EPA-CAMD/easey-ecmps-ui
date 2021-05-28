import { NavDropDownButton, MegaMenu } from "@trussworks/react-uswds";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Workspace.scss";

const Workspace = () => {
  const [open, setOpen] = useState(true);
  const subMenu = [
    <NavLink
      className="text-no-underline text-white"
      to="/monitoring-plans/"
      rel="Monitoring Plans"
      activeClassName=" activeLink"
      title="Go to the Monitoring Plans page"
    >
      Monitoring Plans
    </NavLink>,
    <NavLink
      className="text-no-underline text-white"
      to="/qa_certifications"
      activeClassName=" activeLink"
      rel={"QA & Certifications"}
      title={"Go to the QA & Certifications page"}
    >
      {" QA & Certifications"}
    </NavLink>,
    <NavLink
      className="text-no-underline text-white"
      activeClassName=" activeLink"
      to="/emissions"
      rel="Emissions"
      title="Go to the Emissions page"
    >
      Emissions
    </NavLink>,
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
      <div className="workspaceDropDown">{workSpace}</div>
    </div>
  );
};

export default Workspace;
