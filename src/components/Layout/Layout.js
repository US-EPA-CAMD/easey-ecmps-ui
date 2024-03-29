import React, { useState, useEffect } from "react";
import { Link, SiteAlert } from "@trussworks/react-uswds";

import { Header } from "@us-epa-camd/easey-design-system";
import { AppVersion } from "@us-epa-camd/easey-design-system";

import { SubHeader } from "../SubHeader/SubHeader";
import { LeftNavigation } from "../LeftNavigation/LeftNavigation";
import { LeftNavToSubHeader } from "../SubHeader/LeftNavToSubHeader";
import { ErrorSharp, CloseSharp, WarningSharp } from "@material-ui/icons";

import config from "../../config";

import "./Layout.scss";
import { hideAppError, hideAppWarning } from "../../additional-functions/app-error";

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
      elem.outerHTML = `<h2 class="usa-alert__heading">${elem.innerHTML}</h2>`;
    }
  }, [outageMsgContent]);

  useEffect(() => {
    var elem = document.querySelector("#navRightSide");
    if (elem) {
      let form = elem.querySelector('form.usa-search');
      let sField = elem.querySelector('[data-testid="searchField"]');
      if (form && sField) {
        form?.classList.add('usa-search--small');
        form.innerHTML = sField.innerHTML;
      }
    }
  }, []);

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
          <LeftNavToSubHeader
            user={props.user}
            logOut={props.logOut}
            currentLink={props.currentLink}
            setCurrentLink={props.setCurrentLink}
          />
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
              aria-live="polite"
              className="border-1px margin-y-2 padding-2 bg-secondary-lighter
                         text-bold text-secondary-vivid react-transition display-none"
            >
              <ErrorSharp className="margin-right-2" />
              <CloseSharp
                aria-label="close error alert message"
                className="float-right cursor-pointer"
                onClick={() => hideAppError()}
                onKeyUp={(event) => {
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
            <div
              id="appWarningMessage"
              tabIndex="-1"
              aria-live="polite"
              className="border-1px margin-y-2 padding-2 bg-accent-warm-lighter
                         text-bold text-secondary-vivid react-transition display-none"
            >
              <WarningSharp className="margin-right-2" />
              <CloseSharp
                aria-label="close warning alert message"
                className="float-right cursor-pointer"
                onClick={() => hideAppWarning()}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    hideAppWarning();
                  }
                }}
              />
              <span
                id="appWarningMessageText"
                className="position-relative top-neg-1"
              >testing 123</span>
            </div>

            <main className="mainContent" id="main-content" role="main">
              {childrenWithProps}
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
