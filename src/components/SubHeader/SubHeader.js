import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import {
  Menu,
  PrimaryNav,
  NavDropDownButton,
  Title,
  Button,
  Link as USWDSLink,
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
    "/images/icons/menu-item-expand.svg"
  );

  let profileMenuLinkItems = [
    { menu: "Manage Login", link: config.app.cdxBaseUrl },
  ];

  if (config.app.enableManageDelegations !== "false") {
    profileMenuLinkItems.push({
      menu: "Manage Delegations",
      link: `${config.app.cbsBaseUrl}${config.app.cbsManageDelegationsPath}`,
    });
  }

  const userProfileMenuLinks = {
    label: <span className="margin-right-1 text-no-wrap">User Profile</span>,
    items: profileMenuLinkItems,
  };

  const subHeaderMenuList = [
    {
      label: <span className="margin-right-1 text-no-wrap">Resources</span>,
      items: [
        { menu: "FAQs", link: `/faqs` },
        { menu: "Resources", link: `/resources` },
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
      items: [
        { menu: "Help/Support", link: `/help-support`, tab: false },
        {
          menu: "Contact Us",
          link: `https://www.epa.gov/airmarkets/forms/ecmps-beta-contact-us`,
          tab: true,
        },
      ],
    },
    {
      label: (
        <span className="margin-right-1 text-no-wrap" title="Coming Soon">
          <span className="margin-right-20 menu-item-separator">|</span>
          Regulatory Partners
        </span>
      ),
      items: [{ menu: "", link: "" }],
    },
    // {
    //   label: (
    //     <span className="margin-right-1 text-no-wrap">
    //       <span className="margin-right-20 menu-item-separator">|</span>Site Map
    //     </span>
    //   ),
    //   items: [],
    // },
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
    if (userProfileExpanded === true) {
      toggleUserProfileDropdown();
    }
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
    if (userProfileExpanded === true) {
      document.querySelector("#logoutBtn").tabIndex = 0;
      setUserProfileIcon(
        "/images/icons/menu-item-expand.svg"
      );
    } else {
      document.querySelector("#logoutBtn").tabIndex = -1;
      setUserProfileIcon(
        "/images/icons/menu-item-collapse.svg"
      );
      setNavDropdownOpen((prevNavDropdownOpen) => {
        return Array(prevNavDropdownOpen.length).fill(false);
      });
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
      <div className="padding-y-2 mobile-lg:padding-x-1 desktop:padding-x-4">
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
            id="btnMobileMenu"
            type="button"
            className="bg-transparent margin-0 float-right clearfix desktop:display-none padding-0 width-auto margin-top-1 margin-right-2"
          >
            <img
              src={"/images/icons/mobile-menu-expand.svg"}
              alt="Expandable Menu"
            />
          </Button>
          <div className="float-right">
            <PrimaryNav
              className="float-left desktop:margin-top-1 desktop-lg:margin-top-0"
              items={subHeaderMenuList.map((el, i) => {
                if (el.items.length === 0) {
                  return (
                    <>
                      <Link
                        href={config.app.path}
                        target="_blank"
                        title={el.label}
                        aria-label={el.label}
                        onClick={() => handleSubMenuClick(i)}
                      >
                        {el.label}
                      </Link>
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
                        items={el.items.map((item) =>
                          item.tab ? (
                            <USWDSLink
                              href={item.link}
                              rel={item.link}
                              target="_blank"
                            >
                              {item.menu}
                            </USWDSLink>
                          ) : (
                            <Link to={item.link}>{item.menu}</Link>
                          )
                        )}
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
            {user ? (
              <>
                <span
                  data-testid="loggedInUserInitials"
                  data-initials={initials}
                  className="text-bold float-right clearfix cursor-pointer mobile:margin-top-1 desktop:margin-top-1 desktop:margin-top-2 desktop-lg:margin-top-0 margin-left-2"
                  id="loggedInUserInitials"
                  aria-expanded="false"
                >
                  <img
                    id="toggleDropDown"
                    src={userProfileIcon}
                    className="margin-top-neg-1 position-relative left-neg-1"
                    tabIndex="0"
                    alt="Expand menu"
                    onClick={() => toggleUserProfileDropdown()}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        toggleUserProfileDropdown();
                      }
                    }}
                  />
                  <span className="text-bold text-white text-no-wrap position-relative left-neg-2 top-neg-2">
                    Welcome, {user.firstName}!
                  </span>
                  <span className="text-bold text-white text-no-wrap clearfix position-relative top-neg-2 margin-x-2">
                    <Button
                      type="button"
                      id="logoutBtn"
                      epa-testid="logoutBtn"
                      outline={true}
                      onClick={() => logOut()}
                      title="Click this button to logout"
                      className="text-white border-white text-no-wrap"
                    >
                      Log Out
                    </Button>
                  </span>
                  {userProfileExpanded ? (
                    <span className="position-relative top-neg-2">
                      <Menu
                        className="font-body-sm"
                        style={{ fontWeight: "normal" }}
                        items={userProfileMenuLinks.items.map((item) => (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.menu}
                          </a>
                        ))}
                        isOpen={true}
                      />
                    </span>
                  ) : null}
                </span>
              </>
            ) : (
              <span className="text-bold text-white text-no-wrap clearfix position-relative margin-x-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};
