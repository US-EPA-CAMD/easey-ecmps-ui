import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Header,
  NavDropDownButton,
  PrimaryNav,
  NavList,
} from "@trussworks/react-uswds";
import "./SubHeader.scss";
import { getAppNavItems } from "../../utils/constants/menuTopics";
import { MenuSharp } from "@material-ui/icons";
import config from "../../config";
import {
  globalView,
  getWorkspacePaths,
  home,
  systemAdmin,
} from "../../utils/constants/menuTopics";

const appNavItems = getAppNavItems();
const workSpace = getWorkspacePaths();
export const LeftNavToSubHeader = (props) => {
  const [navDropdownOpen, setNavDropdownOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const makeHeader = (arr, noActive, isWorkspace) => {
    // Filter workspace based on user roles
    if (isWorkspace && props.user && props.user["roles"]) {
      arr = arr.filter((row) => {
        if (row["requiredRoles"]) {
          for (const role of row.requiredRoles) {
            if (props.user.roles.includes(role)) {
              return true;
            }
          }
          return false;
        } else {
          return true; //Return true for all side menu items not requiring a certain role
        }
      });
    }

    return arr.map((el, i) => {
      const workspaceText = isWorkspace ? "_wks" : "";

      if (el.children) {
        return (
          <div>
            <NavDropDownButton
              key={i}
              label={el.label}
              menuId={`menu-${el.name}`}
              isOpen={navDropdownOpen[i]}
              onToggle={() => {
                handleToggleNavDropdown(i);
              }}
              className={`font-sans-md mobile-lg:font-sans-sm text-no-wrap no-subitems`}
              label={`${el.name}`}
            
            />
            <Menu
              className="font-sans-md mobile-lg:font-sans-sm usa-current "
              items={el.children.map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  onClick={() => handleCloseSubMenus(i)}
                >
                  {item.name}
                </Link>
              ))}
              isOpen={navDropdownOpen[i]}
            />
          </div>
        );
      } else {
        return (
          <Link
          isCurrent={true}
            key={i}
            to={el.url}
            onClick={() => handleCloseSubMenus(i)}
          >
            {el.name}
          </Link>
        );
      }
    });
  };

  const makeWKspaceSubHeader = () => {
    let workspaceLinks = [];

    if (
      props.user?.roles?.includes(config.app.sponsorRole) ||
      props.user?.roles?.includes(config.app.submitterRole) ||
      props.user?.roles?.includes(config.app.preparerRole)
    ) {
      workspaceLinks = makeHeader(workSpace, true, false);
    }

    if (
      //Include systemAdmin side panel if the user has the correct role
      props.user?.roles?.includes(config.app.adminRole)
    ) {
      workspaceLinks.push(makeHeader(systemAdmin, true, true));
    }

    return workspaceLinks;
  };

  const handleToggleNavDropdown = (column) => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(false);
      newOpenState[column] = !prevNavDropdownOpen[column];
      return newOpenState;
    });
  };

  const handleSubMenuClick = (column) => {
    handleToggleNavDropdown(column);
  };

  const handleCloseSubMenus = () => {
    const updatedArray = navDropdownOpen.map(() => false);
    setNavDropdownOpen(updatedArray);
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
            <PrimaryNav items={makeHeader(home, true, false)}></PrimaryNav>
            {props.user ? (
              <NavList
                items={makeWKspaceSubHeader()}
                mobileExpanded={true}
                type="primary"
              />
            ) : (
              <NavList
              type="primary"
                items={makeHeader(globalView, true, false)}
                mobileExpanded={true}
              />
            )}
          </div>
        </div>
      </Header>
    </div>
  );
};

export default LeftNavToSubHeader;
