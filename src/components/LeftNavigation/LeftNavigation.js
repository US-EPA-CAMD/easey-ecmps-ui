import React from "react";
import { SideNav, Link as USWDSLink } from "@trussworks/react-uswds";
import "./LeftNavigation.scss";
import { Link } from "react-router-dom";
import {
  globalView,
  getWorkspacePaths,
  home,
  getSystemAdmin,
} from "../../utils/constants/menuTopics";

const workSpace = getWorkspacePaths();

export const LeftNavigation = (props) => {
  const handleRouteChange = (event, url) => {
    props.setCurrentLink(url);
  };

  const makeHeader = (arr, noActive, mainModule) => {
    // Filter workspace based on user roles
    if (mainModule=== "workspace" && props.user && props.user["roles"]) {
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
      const workspaceText = props.user ? "_wks" : "";

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
        let title = "Go to Home Page";
        let ariaTitle = "Go to Home Page";

        switch (mainModule) {
          case "system admin":
            title = ` Go to ${item.name} - system admin page`;
            ariaTitle = `${item.name}`;
            break;
          case "workspace":
            if (props.user) {
              title = ` Go to ${item.name} - workspace page`;
              ariaTitle = `${item.name} - Workspace`;
            }
            break;

          case "global":
            title = ` Go to ${item.name} - global-view page`;
            ariaTitle = `${item.name} - Global-View`;

            break;
          default:
            break;
        }

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
            aria-label={ariaTitle}
            variant="unstyled"
            asCustom={Link}
            to={item.url}
            exact="true"
            rel={item.name}
            title={title}
            key={item.url}
            id={`${item.name
              .split(" ")
              .join("")
              .replace("&", "And")}${workspaceText}`}
            onClick={(event) => handleRouteChange(event, item.url)}
          >
            {item.name}
          </USWDSLink>
        );
      }
    });
  };

  const makeWKspaceHeader = () => {
    return [
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
          items={makeHeader(workSpace, true, "workspace")}
          isSubnav={true}
        />,
      ],
    ];
  };

  return (
    <div className="minh-tablet font-body-sm padding-3 leftNav">
      {props.user ? (
        <div>
          <SideNav items={makeHeader(home, true, "home")} />
          <SideNav items={makeWKspaceHeader()} />
          <SideNav
            items={makeHeader(getSystemAdmin(), true, "System Administration")}
          />
        </div>
      ) : (
        <div>
          <SideNav items={makeHeader(home, true, "home")} />
          <SideNav items={makeHeader(globalView, true, "global")} />
        </div>
      )}
    </div>
  );
};

export default LeftNavigation;
