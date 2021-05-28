import React, { useEffect, useState } from "react";
import Accessories from "../Accessories/Accessories";
import Workspace from "../Workspace/Workspace";
import Title from "../Title/Title";
import { Button } from "@trussworks/react-uswds";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";

const cdx_user = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;
const firstName = cdx_user && cdx_user.firstName ? cdx_user.firstName : false;

const LeftNavigation = () => {
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

  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);
  const openModal = (value) => {
    setShow(value);
  };
  return (
    <div className="bg-base width-full height-full font-body-sm padding-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`}></div>
      <Title />
      <Workspace />
      <div className="padding-bottom-4 position-absolute bottom-0">
        {!cdx_user ? (
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
