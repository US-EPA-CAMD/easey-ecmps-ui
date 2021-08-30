import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Header, NavDropDownButton } from "@trussworks/react-uswds";

import "./SubHeader.scss";
import { appNavItems } from "../../utils/constants/menuTopics";

import { MenuSharp } from "@material-ui/icons";

export const LeftNavToSubHeader = () => {
  const [navDropdownOpen, setNavDropdownOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // const [categorySelected, setCategorySelected] = useState([
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);

  // useEffect(() => {
  //   setCategorySelected([false, false, false, false, false]);
  // }, []);

  const handleToggleNavDropdown = (column) => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(false);
      newOpenState[column] = !prevNavDropdownOpen[column];
      return newOpenState;
    });
  };

  const handleSubMenuClick = (column) => {
    handleToggleNavDropdown(column);

    // setCategorySelected([false, false, false, false, false]);
  };

  return (
    <div className="left-sidenav-to-header-wrapper">
      <div className="padding-y-1 text-bold font-body-lg mobile:display-block tablet:display-none bg-base-lightest">
        <MenuSharp className="margin-left-2 margin-right-1" />
        ECMPS Menu
      </div>
      <Header
        className="display-none tablet:display-block desktop-lg:display-none
      padding-y-0 mobile-lg:padding-x-2 desktop:padding-x-4 bg-base-lightest"
      >
        <div className="usa-nav-container clearfix padding-x-0 padding-bottom-2">
          <div className="text-center desktop:margin-top-1 desktop-lg:margin-top-0 display-inline-flex padding-left-1">
            {appNavItems.map((el, i) => {
              return (
                <div key={`${i}_${i}`}>
                  <NavDropDownButton
                    key={i}
                    label={el.label}
                    menuId={`menu-${el.label}`}
                    isOpen={navDropdownOpen[i]}
                    onToggle={() => {
                      handleToggleNavDropdown(i);
                    }}
                    className={`text-black text-normal font-sans-md mobile-lg:font-sans-sm text-no-wrap ${
                      el.items.length === 0
                        ? ` no-subitems `
                        : ` current-app-subitem `
                    }`}
                  />
                  <Menu
                    className="font-sans-md mobile-lg:font-sans-sm"
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
                </div>
              );
            })}
          </div>
        </div>
      </Header>
    </div>
  );
};

export default LeftNavToSubHeader;
