import React from "react";
import { Link } from "@trussworks/react-uswds";

import { Header } from "@us-epa-camd/easey-design-system";
import { AppVersion } from "@us-epa-camd/easey-design-system";

import { SubHeader } from "../SubHeader/SubHeader";
import { LeftNavigation } from "../LeftNavigation/LeftNavigation";
import { LeftNavToSubHeader } from "../SubHeader/LeftNavToSubHeader";

import config from "../../config";

import "./Layout.scss";

const Layout = (props) => {
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
          <div className="grid-col margin-x-2 minh-tablet-lg" id="main">
            <main id="main">{childrenWithProps} </main>
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
