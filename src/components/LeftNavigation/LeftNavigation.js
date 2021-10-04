import React, { useState } from "react";
import { SideNav, Link as USWDSLink } from "@trussworks/react-uswds";

import { Link } from "react-router-dom";

import { head, workSpace } from "../../utils/constants/menuTopics";

export const LeftNavigation = (props) => {
  const handleRouteChange = (event, url) => {
    props.setCurrentLink(url);
  };

  const makeHeader = (arr, noActive) => {
    return arr.map((item) => {
      return (
        <USWDSLink
          className={
            noActive
              ? // currentRoute === item.url ||
                props.currentLink === `/ecmps${item.url}` ||
                props.currentLink === item.url
                ? "usa-current text-no-wrap"
                : "text-no-wrap"
              : "text-no-wrap"
          }
          variant="unstyled"
          asCustom={Link}
          to={item.url}
          exact="true"
          rel={item.name}
          title={`Go to ${item.name} page`}
          key={item.url}
          id={`${item.name.split(" ").join("")}`}
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
        items={makeHeader(workSpace, true)}
        isSubnav={true}
      />,
    ],
  ];
  return (
    <div className="minh-tablet font-body-sm padding-3">
      {props.currentLink ? (
        <SideNav items={makeHeader(head, true)} />
      ) : (
        <SideNav items={makeHeader(head, false)} />
      )}

      {props.user ? (
        <div className="margin-top-7">
          <SideNav items={wsItems} />
        </div>
      ) : null}
    </div>
  );
};

export default LeftNavigation;
