import React, { useState, useEffect } from "react";
import { Link, SiteAlert } from "@trussworks/react-uswds";

import { Header } from "@us-epa-camd/easey-design-system";
import { AppVersion } from "@us-epa-camd/easey-design-system";

import { SubHeader } from "../SubHeader/SubHeader";
import { LeftNavigation } from "../LeftNavigation/LeftNavigation";
import { LeftNavToSubHeader } from "../SubHeader/LeftNavToSubHeader";
import { ErrorSharp, CloseSharp } from "@material-ui/icons";

import config from "../../config";

import "./Layout.scss";
import { hideAppError } from "../../additional-functions/app-error";

import { getContent } from "../../utils/api/contentApi";

const Layout = (props) => {
  const [outageMsgContent, setOutageMsgContent] = useState();

  useEffect(() => {
    getContent("/ecmps/layout/outage-message.json").then((resp) => {
      setOutageMsgContent(resp.data);
    });
  }, []);

  useEffect(() => {
    var elem = document.querySelector(".usa-alert__heading");
    if (elem) {
      elem.outerHTML = '<h2 class="usa-alert__heading">' + elem.innerHTML + "</h2>";
    }
  }, [outageMsgContent]);

  // noinspection JSCheckFunctionSignatures
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  return (
    <div id="layoutContainer">
      <div className="react-transition fade-in padding-bottom-5" id="layout">
        <div id="skipNav">
          <Link className="skip-to-content-link" href={"#main"}>
            Skip to content
          </Link>
        </div>

        <div id="topHeader" className="topHeader">
          <Header environment={config.app.env} />
          <SubHeader user={props.user} setCurrentLink={props.setCurrentLink} />
        </div>
        <div id="leftNavToSubHeader">
          <LeftNavToSubHeader />
        </div>
        <div className="grid-row">
          <div
            id="leftNav"
            className="grid-col-2 bg-base-lightest display-none desktop-lg:display-block widescreen:display-block"
          >
            <LeftNavigation
              user={props.user}
              logOut={props.logOut}
              currentLink={props.currentLink}
              setCurrentLink={props.setCurrentLink}
            />
          </div>
          <div className="grid-col minh-tablet-lg" id="main">
            {outageMsgContent && outageMsgContent.enabled === "true" ? (
              <SiteAlert variant="info" heading={outageMsgContent.heading}>
                {outageMsgContent.message}
              </SiteAlert>
            ) : null}
            <div
              id="appErrorMessage"
              tabIndex="-1"
              className="border-red border-1px margin-y-2 padding-2 bg-secondary-lighter
                         text-bold text-secondary-vivid react-transition display-none"
            >
              <ErrorSharp className="margin-right-2" />
              <CloseSharp
                className="float-right cursor-pointer"
                onClick={() => hideAppError()}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    hideAppError();
                  }
                }}
              />
              <span
                id="appErrorMessageText"
                className="position-relative top-neg-1"
              />
            </div>
            <main class="margin-x-2">
              {childrenWithProps}{" "}
            </main>
          </div>
        </div>
        <div id="footer" className="position-fixed bottom-0 width-full">
          <AppVersion
            version={config.app.version}
            publishDate={config.app.published}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
