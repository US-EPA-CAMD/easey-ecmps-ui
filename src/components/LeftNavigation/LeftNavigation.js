import React, { useState } from "react";
import Accessories from "../Accessories/Accessories";
import { Button, SideNav } from "@trussworks/react-uswds";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";

import { Link } from "react-router-dom";
import { Link as USWDSLink } from "@trussworks/react-uswds";

export const LeftNavigation = (props) => {
  const [currentRoute, setCurrentRoute] = useState(
    window.location.href.replace(`${window.location.origin}`, "")
  );

  const head = [
    { name: "Home", url: "/" },
    { name: "Monitoring Plans", url: "/monitoring-plans" },
    { name: "QA & Certifications", url: "/qa_certifications" },
    { name: "Emissions", url: "/emission" },
  ];

  const workSpace = [
    { name: "Monitoring Plans", url: "/workspace/monitoring-plans" },
    { name: "QA & Certifications", url: "/workspace/qa_certifications" },
    { name: "Emissions", url: "/workspace/emission" },
  ];

  const handleRouteChange = (event, url) => {
    setCurrentRoute(url);
  };

  const makeHeader = (arr) => {
    return arr.map((item) => {
      return (
        <USWDSLink
          className={currentRoute === item.url ? "usa-current" : ""}
          variant="unstyled"
          asCustom={Link}
          to={item.url}
          exact="true"
          rel={item.name}
          title={`Go to ${item.name} page`}
          key={item.name}
          onClick={(event) => handleRouteChange(event, item.url)}
        >
          {item.name}
        </USWDSLink>
      );
    });
  };

  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);
  const openModal = (value) => {
    setShow(value);
  };
  const wsItems = [
    <USWDSLink
      to="/workspace"
      rel="workspace"
      title="Go to the workspace page"
      className={
        window.location.href.indexOf("/workspace") > -1 ? "usa-current" : ""
      }
    >
      Workspace
    </USWDSLink>,
    [<SideNav key="sideNav" items={makeHeader(workSpace)} isSubnav={true} />],
  ];
  return (
    <div className="minh-tablet font-body-sm padding-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <SideNav items={makeHeader(head)} />

      {props.user ? <SideNav items={wsItems} /> : ""}
      <div className="padding-bottom-4 position-absolute bottom-3">
        {!props.user ? (
          <div className="padding-bottom-2">
            <Button
              type="button"
              outline={true}
              id="openModalBTN"
              epa-testid="openModalBTN"
              onClick={() => openModal(true)}
            >
              Log In
            </Button>
          </div>
        ) : null}

        <Accessories user={props.user} logOut={props.logOut} />
      </div>
      {show ? (
        <Modal show={show} close={closeModalHandler} children={<Login />} />
      ) : null}
    </div>
  );
};

export default LeftNavigation;
