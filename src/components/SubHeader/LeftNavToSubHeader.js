import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Header,
  NavDropDownButton,
  PrimaryNav,
} from "@trussworks/react-uswds";
import "./SubHeader.scss";
import { MenuSharp } from "@material-ui/icons";
import config from "../../config";
import {
  globalView,
  getWorkspacePaths,
  home,
  systemAdmin,
} from "../../utils/constants/menuTopics";

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

    return arr !== undefined ? arr.map((el, i) => {
      if (el.children) {
        return renderNavDropDown(el, i);
      } else {
        return renderLink(el, i);
      }
    }) : [];
    
    function renderNavDropDown(el, i) {
      return (
        <div>
          <NavDropDownButton
            key={i}
            label={el.name}
            menuId={`menu-${el.name}`}
            isOpen={navDropdownOpen[i]}
            onToggle={() => handleToggleNavDropdown(i)}
            className={getNavDropDownButtonClassName(el)}
            isCurrent={true}
          />
          <Menu
            className="font-sans-md mobile-lg:font-sans-sm usa-current "
            items={el.children.map((item) => renderLink(item, item.name))}
            isOpen={navDropdownOpen[i]}
          />
        </div>
      );
    }
    
    function renderLink(el, i) {
      return (
        <Link
          key={i}
          aria-label={getAriaLabel(el)}
          className={getLinkClassName(el)}
          title={getTitle(el)}
          to={el.url}
          onClick={() => handleCloseSubMenus(i, el.url)}
        >
          {el.name}
        </Link>
      );
    }
    
    function getNavDropDownButtonClassName(el) {
      return window.location.href.indexOf(`${el.url}`) > -1
        ? "wkspaceMainMenu current-app-subitem font-sans-md mobile-lg:font-sans-sm text-no-wrap no-subitems"
        : " font-sans-md mobile-lg:font-sans-sm text-no-wrap no-subitems";
    }
    
    function getAriaLabel(el) {
      return el.name !== "Home"
        ? isWorkspace
          ? `${el.name} - Workspace`
          : `${el.name} - Global-View`
        : "Go to Home";
    }
    
    function getLinkClassName(el) {
      return props.currentLink === `/${el.url}` || props.currentLink === el.url
        ? " current-app-subitem"
        : "";
    }
    
    function getTitle(el) {
      return el.name !== "Home"
        ? isWorkspace
          ? ` Go to ${el.name} - Workspace page`
          : `Go to ${el.name} - Global-View page`
        : "Go to Home page";
    }
    
  };

  const makeWKspaceSubHeader = () => {
    let workspaceLinks = [];

    if (
      props.user?.roles?.includes(config.app.sponsorRole) ||
      props.user?.roles?.includes(config.app.submitterRole) ||
      props.user?.roles?.includes(config.app.initialAuthorizerRole) ||
      props.user?.roles?.includes(config.app.preparerRole)
    ) {
      workspaceLinks = makeHeader(workSpace, true, true);
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

  const handleCloseSubMenus = (i, url) => {
    const updatedArray = navDropdownOpen.map(() => false);
    props.setCurrentLink(url);
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
              <PrimaryNav
                items={makeWKspaceSubHeader()}
                mobileExpanded={false}
                type="primary"
              />
            ) : (
              <PrimaryNav
                type="primary"
                items={makeHeader(globalView, true, false)}
                mobileExpanded={false}
              />
            )}
          </div>
        </div>
      </Header>
    </div>
  );
};

export default LeftNavToSubHeader;
