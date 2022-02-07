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
      return (
        <USWDSLink
          className={
            noActive
              ? props.currentLink === `/ecmps${item.url}` ||
                props.currentLink === item.url
                ? "usa-current text-no-wrap"
                : "text-no-wrap"
              : "text-no-wrap"
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
    });
  };

  const wsItems = [
    <USWDSLink
      to="/workspace"
      rel="workspace"
      title="Go to the workspace page"
      key="wsKey"
      className={
        window.location.href.indexOf("/workspace") > -1 ? "usa-current" : ""
      }
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
  return (
    <div className="minh-tablet font-body-sm padding-3">
        {props.user ? (
        <div>
          <SideNav items={makeHeader(home, true, false)} />
          <SideNav items={wsItems} />
        </div>)
      : (<div>
          <SideNav items={makeHeader(home, true, false)} />
          <SideNav items={makeHeader(globalView, true, false)} />
        </div>)}
    </div>
  );
};

export default LeftNavigation;
