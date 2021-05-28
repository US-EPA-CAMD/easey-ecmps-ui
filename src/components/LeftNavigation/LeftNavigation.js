import React, { useEffect, useState } from "react";
import Accessories from "../Accessories/Accessories";
import Workspace from "../Workspace/Workspace";
import { Button } from "@trussworks/react-uswds";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import { NavLink } from "react-router-dom";
import "./LeftNavigation.css";
const cdxUser = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;
const firstName = cdxUser && cdxUser.firstName ? cdxUser.firstName : false;

const LeftNavigation = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const checkLoggedIn = () => {
    if (cdxUser && firstName) {
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

  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);
  const openModal = (value) => {
    setShow(value);
  };

  return (
    <div className="bg-base width-full height-full font-body-sm padding-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`}></div>
      {/* <Title /> */}
      <div className="">
        <div className="grid-row">
          <NavLink
            className="text-no-underline text-white"
            activeClassName=" activeLink"
            to="/"
            exact={true}
            rel="Home"
            title="Go to the home page"
          >
            Home
          </NavLink>
        </div>
        <div className="grid-row">
          <NavLink
            className="text-no-underline text-white"
            to="/monitoring-plans"
            strict
            rel="Monitoring Plans"
            activeClassName=" activeLink"
            title="Go to the Monitoring Plans page"
          >
            Monitoring Plans
          </NavLink>
        </div>
        <div className="grid-row">
          <NavLink
            className="text-no-underline text-white"
            to="/qa_certifications"
            strict
            activeClassName=" activeLink"
            rel={"QA & Certifications"}
            title={"Go to the QA & Certifications page"}
          >
            {" QA & Certifications"}
          </NavLink>
        </div>

        <div className="grid-row">
          <NavLink
            className="text-no-underline text-white"
            activeClassName=" activeLink"
            strict
            to="/emissions"
            rel="Emissions"
            title="Go to the Emissions page"
          >
            Emissions
          </NavLink>
        </div>
      </div>
      {userLoggedIn ? <Workspace /> : ""}
      <div className="padding-bottom-4 position-absolute bottom-0">
        {!cdxUser ? (
          <Button onClick={() => openModal(true)}> Log In</Button>
        ) : (
          ""
        )}

        <Accessories />
      </div>
      {show ? (
        <Modal show={show} close={closeModalHandler} children={<Login />} />
      ) : (
        ""
      )}
    </div>
  );
};

export default LeftNavigation;
