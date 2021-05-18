import { NavDropDownButton, MegaMenu } from "@trussworks/react-uswds";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

import "./Workspace.scss";

const Workspace = () => {
  const [open, setOpen] = useState(true);
  const subMenu = [
    <Link
      to="./monitoring-plans"
      rel="Monitoring Plans"
      title="Go to the Monitoring Plans page"
    >
      - Monitoring Plans
    </Link>,
    <Link
      to="./qa_certifications"
      rel={"QA & Certifications"}
      title={"Go to the QA & Certifications page"}
    >
      {"- QA & Certifications"}
    </Link>,
    <Link to="./emissions" rel="Emissions" title="Go to the Emissions page">
      - Emissions
    </Link>,
  ];
  const testing = (news) => {
    setOpen(!news);
  };
  const workSpace = (
    <>
      <div className="workspaceMenu">
        <NavDropDownButton
          className="bg-base text-white width-auto"
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
      <div className="iconLine iconDiv">
        <FontAwesomeIcon icon={faDesktop} className="text-white font-body-md" />
      </div>
      <div className="workspaceDropDown">{workSpace}</div>
    </div>
  );
};

export default Workspace;
