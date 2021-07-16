import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import { subHeaderMenuList } from "../../utils/constants/menuTopics";
import {
  Menu,
  Header,
  PrimaryNav,
  NavDropDownButton,
  Title,
  Button,
} from "@trussworks/react-uswds";

import "./SubHeader.scss";

export const SubHeader = () => {
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
    handleToggleNavDropdown(column);

    setCategorySelected([false, false, false, false, false]);
  };

  const logOut = () => {};

  return (
    <div className="subheader-wrapper bg-primary-dark">
      <Header className="padding-y-2 mobile-lg:padding-x-2 desktop:padding-x-4">
        <div className="usa-nav-container clearfix padding-x-0">
          <Title className="float-left margin-0">
            <h1 className="display-inline-block text-white text-bold desktop-lg:font-sans-3xl desktop:font-sans-2xl mobile-lg:font-sans-xl margin-0">
              ECMPS
            </h1>
            <span
              className="display-none desktop:display-block
              desktop-lg:display-inline-block desktop-lg:margin-left-1 text-white text-normal font-sans-md width-card-lg text-wrap"
            >
              Emissions Collection and Monitoring Plan System
            </span>
          </Title>
          <Button className="desktop:display-none float-right bg-transparent margin-0 position-relative top-1">
            <img
              src={`${process.env.PUBLIC_URL}/images/icons/mobile-menu-expand.svg`}
              alt="Expandable Menu"
              className={"position-absolute bottom-1px"}
            />
          </Button>
          <PrimaryNav
            className="float-right desktop:margin-top-3 desktop-lg:margin-top-0"
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
                      className="font-body-xs"
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
