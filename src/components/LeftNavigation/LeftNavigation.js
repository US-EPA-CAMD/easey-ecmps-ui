import React, { useEffect, useState } from "react";
import Accessories from "../Accessories/Accessories";
import { Button, SideNav } from "@trussworks/react-uswds";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import { NavLink } from "react-router-dom";
import "./LeftNavigation.css";
const cdxUser = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;
const firstName = cdxUser && cdxUser.firstName ? cdxUser.firstName : false;

const LeftNavigation = () => {
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
  const makeHeader = (arr, subFlag) => {
    return arr.map((item) => {
      return (
        <NavLink
          className={subFlag ? "text-normal" : ""}
          activeClassName=" usa-current text-primary-dark"
          to={item.url}
          exact={true}
          rel={item.name}
          title={`Go to ${item.name} page`}
        >
          {item.name}
        </NavLink>
      );
    });
  };
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const checkLoggedIn = () => {
    if (cdxUser && firstName) {
      setUserLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);
  const openModal = (value) => {
    setShow(value);
  };
  const wsItems = [
    <NavLink
      activeClassName=" usa-current text-primary-dark"
      to="/workspace"
      rel="workspace"
      title="Go to the workspace page"
    >
      Workspace
    </NavLink>,
    [<SideNav items={makeHeader(workSpace, true)} isSubnav />],
  ];
  return (
    <div className="bg-base-lightest width-full height-full font-body-sm padding-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <SideNav items={makeHeader(head)} />

      {userLoggedIn ? <SideNav items={wsItems} /> : ""}
      <div className="padding-bottom-4 position-absolute bottom-0">
        {!cdxUser ? (
          <Button type="button" onClick={() => openModal(true)}>
            Log In
          </Button>
        ) : null}

        <Accessories />
      </div>
      {show ? (
        <Modal show={show} close={closeModalHandler} children={<Login />} />
      ) : null}
    </div>
  );
};

export default LeftNavigation;
