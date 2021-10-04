import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import {
  Menu,
  Header,
  PrimaryNav,
  NavDropDownButton,
  Title,
  Button,
} from "@trussworks/react-uswds";

import "./SubHeader.scss";
import { logOut } from "../../utils/api/easeyAuthApi";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";

export const SubHeader = ({ user, setCurrentLink }) => {
  let initials = "xx";
  if (user) {
    initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }

  const [userProfileExpanded, setUserProfileExpanded] = useState(false);

  const [userProfileIcon, setUserProfileIcon] = useState(
    `${process.env.PUBLIC_URL}/images/icons/menu-item-expand.svg`
  );

  const subHeaderMenuList = [
    {
      label: <span className="margin-right-1 text-no-wrap">Resources</span>,
      items: [
        { menu: "FAQs", link: "/faqs" },
        { menu: "Resources", link: "/resources" },
      ],
    },
    {
      label: (
        <span className="margin-right-1 text-no-wrap">
          <span
            className="margin-right-20 menu-item-separator"
            style={{ color: "#365b8f" }}
          >
            |
          </span>
          Help/Support
        </span>
      ),
      items: [{ menu: "Help/Support", link: "/help-support" }],
    },
    {
      label: (
        <span className="margin-right-1 text-no-wrap">
          <span className="margin-right-20 menu-item-separator">|</span>
          Regulatory Partners
        </span>
      ),
      items: [{ menu: "", link: "" }],
    },
    {
      label: (
        <span className="margin-right-1 text-no-wrap">
          <span className="margin-right-20 menu-item-separator">|</span>Site Map
        </span>
      ),
      items: [],
    },
  ];

  useEffect(() => {
    setCategorySelected([false, false, false, false, false]);
  }, []);

  const [navDropdownOpen, setNavDropdownOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [categorySelected, setCategorySelected] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleToggleNavDropdown = (column) => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(false);
      newOpenState[column] = !prevNavDropdownOpen[column];
      return newOpenState;
    });
  };

  const handleSubMenuClick = (column) => {
    setCurrentLink(false);
    handleToggleNavDropdown(column);

    setCategorySelected([false, false, false, false, false]);
  };

  const toggleUserProfileDropdown = () => {
    console.log(userProfileExpanded);
    if (userProfileExpanded === true) {
      setUserProfileIcon(
        `${process.env.PUBLIC_URL}/images/icons/menu-item-expand.svg`
      );
    } else {
      setUserProfileIcon(
        `${process.env.PUBLIC_URL}/images/icons/menu-item-collapse.svg`
      );
    }

    setUserProfileExpanded(!userProfileExpanded);
  };

  const [show, setShow] = useState(false);

  const [loginBtn, setLoginBtn] = useState(document.activeElement);

  const closeModalHandler = () => {
    setShow(false);
    loginBtn.focus();
  };

  const openModal = (value) => {
    setShow(value);
  };

  return (
    <div className="subheader-wrapper bg-primary-dark ">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <Header className="padding-y-2 mobile-lg:padding-x-1 desktop:padding-x-4">
        <div className="usa-nav-container clearfix padding-x-0 desktop-lg:margin-top-3">
          <Title className="float-left margin-1 margin-top-0 desktop:margin-top-1  desktop-lg:margin-top-0 ">
            <h1 className="display-inline-block text-white text-bold desktop-lg:font-sans-2xl desktop:font-sans-2xl mobile-lg:font-sans-xl margin-0">
              ECMPS
            </h1>
            <span
              className="display-none
              desktop-lg:display-inline-block desktop-lg:margin-left-1 text-white text-normal font-sans-sm width-card-lg text-wrap"
            >
              Emissions Collection and Monitoring Plan System
            </span>
          </Title>

          <Button
            type="button"
            className="bg-transparent margin-0 float-right clearfix desktop:display-none padding-0 width-auto margin-top-1 margin-right-2"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icons/mobile-menu-expand.svg`}
              alt="Expandable Menu"
            />
          </Button>
          {user ? (
            <div>
              <span className="text-bold text-white text-no-wrap float-right clearfix position-relative margin-x-2">
                <Button
                  type="button"
                  id="logoutBtn"
                  epa-testid="logoutBtn"
                  outline={true}
                  onClick={(event) => logOut(event)}
                  title="Click this button to logout"
                  className="text-white border-white text-no-wrap"
                >
                  Log Out
                </Button>
              </span>
              <span className="text-bold text-white text-no-wrap float-right clearfix position-relative top-1 margin-x-1 display-none widescreen:display-block">
                Welcome, {user.firstName}!
              </span>
              <span
                data-initials={initials}
                className="text-bold float-right clearfix cursor-pointer mobile:margin-top-1 desktop:margin-top-1 desktop:margin-top-2 desktop-lg:margin-top-0 margin-left-5"
                tabIndex="0"
                id="loggedInUserInitials"
                aria-expanded="false"
                onClick={() => toggleUserProfileDropdown()}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    toggleUserProfileDropdown();
                  }
                }}
              >
                <img
                  src={userProfileIcon}
                  className="margin-top-neg-1 position-relative left-neg-1"
                  aria-hidden={true}
                  tabIndex="-1"
                  alt="Expand menu"
                />
              </span>
            </div>
          ) : (
            <span className="text-bold text-white text-no-wrap float-right clearfix position-relative margin-x-2">
              <Button
                type="button"
                outline={true}
                id="openModalBTN"
                epa-testid="openModalBTN"
                onClick={() => {
                  setLoginBtn(document.activeElement);
                  openModal(true);
                }}
                className="text-white border-white text-no-wrap"
              >
                Log In
              </Button>
              {show ? (
                <Modal
                  show={show}
                  close={closeModalHandler}
                  children={<Login isModal={true} />}
                />
              ) : null}
            </span>
          )}
          <PrimaryNav
            className="float-right desktop:margin-top-1 desktop-lg:margin-top-0"
            items={subHeaderMenuList.map((el, i) => {
              if (el.items.length === 0) {
                return (
                  <>
                    <a
                      href={config.app.path}
                      title={el.label}
                      aria-label={el.label}
                      onClick={() => handleSubMenuClick(i)}
                    >
                      {el.label}
                    </a>
                    {categorySelected[i] === true ? (
                      <div className="menu-underline" />
                    ) : null}
                  </>
                );
              } else {
                return (
                  <>
                    <NavDropDownButton
                      key={i}
                      label={el.label}
                      menuId={`menu-${el.label}`}
                      isOpen={navDropdownOpen[i]}
                      onToggle={() => {
                        handleToggleNavDropdown(i);
                      }}
                      className="text-white"
                    />
                    <Menu
                      id={
                        i === subHeaderMenuList.length - 1
                          ? `extended-nav-section-last`
                          : null
                      }
                      className="font-body-sm"
                      items={el.items.map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          onClick={() => handleSubMenuClick(i)}
                        >
                          {item.menu}
                        </Link>
                      ))}
                      isOpen={navDropdownOpen[i]}
                    />
                    {categorySelected[i] === true ? (
                      <div className="menu-underline" />
                    ) : null}
                  </>
                );
              }
            })}
          />
        </div>
      </Header>
    </div>
  );
};

export default SubHeader;
