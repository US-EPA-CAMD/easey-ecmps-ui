import React from "react";
import { SideNav, Link as USWDSLink } from "@trussworks/react-uswds";
import config from "../../config";
import "./LeftNavigation.scss";
import { Link } from "react-router-dom";
import {
  globalView,
  getWorkspacePaths,
  home,
  systemAdmin,
} from "../../utils/constants/menuTopics";

const workSpace = getWorkspacePaths();

export const LeftNavigation = (props) => {
  const handleRouteChange = (event, url) => {
    props.setCurrentLink(url);
  };

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

    return arr.map((item) => {
      const workspaceText = isWorkspace ? "_wks" : "";

      if (item.children) {
        return [
          <USWDSLink
            to={`${item.url}`}
            rel={`${item.url}`}
            title={`Go to the ${item.name} page`}
            key="wsKey"
            className={
              window.location.href.indexOf(`${item.url}`) > -1
                ? "usa-current wkspaceMainMenu"
                : ""
            }
          >
            {`${item.name}`}
          </USWDSLink>,
          <SideNav
            key="sideNav"
            items={makeHeader(item.children, false, true)}
            isSubnav={true}
          />,
        ];
      } else {
        return (
          <USWDSLink
            className={
              noActive
                ? props.currentLink === `/${item.url}` ||
                  props.currentLink === item.url
                  ? "usa-current text-wrap  usa-sidenav usa-current wkspaceMainMenu"
                  : "text-wrap"
                : props.currentLink === `/${item.url}` ||
                  props.currentLink === item.url
                  ? "emulateCurrentLink "
                  : "text-wrap "
            }
            aria-label={
              item.name !== "Home"
                ? isWorkspace
                  ? `${item.name} - Workspace`
                  : `${item.name} - Global-View`
                : "Go to Home"
            }
            variant="unstyled"
            asCustom={Link}
            to={item.url}
            exact="true"
            rel={item.name}
            title={
              item.name !== "Home"
                ? isWorkspace
                  ? ` Go to ${item.name} - Workspace page`
                  : `Go to ${item.name} - Global-View page`
                : "Go to Home page"
            }
            key={item.url}
            id={`${item.name
              .replaceAll(" ", "")
              .replaceAll("&", "And")}${workspaceText}`}
            onClick={(event) => handleRouteChange(event, item.url)}
          >
            {item.name}
          </USWDSLink>
        );
      }
    });
  };

  const makeWKspaceHeader = () => {
    let workspaceLinks = [];

    if (
      props.user?.roles?.includes(config.app.sponsorRole) ||
      props.user?.roles?.includes(config.app.initialAuthorizerRole) ||
      props.user?.roles?.includes(config.app.submitterRole) ||
      props.user?.roles?.includes(config.app.preparerRole)
    ) {
      workspaceLinks = [
        <USWDSLink
          to="/workspace"
          rel="workspace"
          title="Go to the workspace page"
          key="wsKey"
        >
          Workspace
        </USWDSLink>,
        [
          <SideNav
            key="sideNav"
            items={makeHeader(workSpace, true, true)}
            isSubnav={true}
          />,
        ],
      ];
    }

    if (
      //Include systemAdmin side panel if the user has the correct role
      props.user?.roles?.includes(config.app.adminRole)
    ) {
      workspaceLinks.push([
        <SideNav
          key="adminNav"
          items={makeHeader(systemAdmin, true, true)}
          isSubnav={false}
        />,
      ]);
    }

    return workspaceLinks;
  };

  return (
    <div className="minh-tablet font-body-sm padding-3 leftNav">
      {props.user ? (
        <div>
          <SideNav items={makeHeader(home, true, true)} />
          <SideNav items={makeWKspaceHeader()} />
        </div>
      ) : (
        <div>
          <SideNav items={makeHeader(home, true, false)} />
          <SideNav items={makeHeader(globalView, true, false)} />
        </div>
      )}
    </div>
  );
};

export default LeftNavigation;
