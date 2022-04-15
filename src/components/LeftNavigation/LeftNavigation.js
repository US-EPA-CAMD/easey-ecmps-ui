import React from "react";
import { SideNav, Link as USWDSLink } from "@trussworks/react-uswds";

import { Link } from "react-router-dom";

import { globalView, workSpace, home } from "../../utils/constants/menuTopics";

export const LeftNavigation = (props) => {
  const handleRouteChange = (event, url) => {
    props.setCurrentLink(url);
  };

  const makeHeader = (arr, noActive, isWorkspace) => {
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
                ? "usa-current"
                : ""
            }
          >
            {`${item.name}`}
          </USWDSLink>,
          <SideNav
            key="sideNav"
            items={makeHeader(item.children, true, true)}
            isSubnav={true}
          />,
        ];
      } else {
        return (
          <USWDSLink
            className={
              noActive
                ? props.currentLink === `/ecmps${item.url}` ||
                  props.currentLink === item.url
                  ? "usa-current text-wrap"
                  : "text-wrap"
                : "text-wrap"
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
            id={`${item.name.split(" ").join("")}${workspaceText}`}
            onClick={(event) => handleRouteChange(event, item.url)}
          >
            {item.name}
          </USWDSLink>
        );
      }
    });
  };

  const wsItems = makeHeader(workSpace, true, true);
  return (
    <div className="minh-tablet font-body-sm padding-3">
      {props.user ? (
        <div>
          <SideNav items={makeHeader(home, true, false)} />
          <SideNav items={wsItems} />
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
