import React from "react";
import { Link } from "@trussworks/react-uswds";
import { WideHeader } from "../WideHeader/WideHeader";
import { SubHeader } from "../SubHeader/SubHeader";
import { LeftNavigation } from "../LeftNavigation/LeftNavigation";
import { LeftNavToSubHeader } from "../SubHeader/LeftNavToSubHeader";
import { Footer } from "../Footer/Footer";

import "./Layout.scss";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  return (
    <div>
      <Link className="skip-to-content-link" href={"#main"}>
        Skip to content
      </Link>
      <div className="topHeader">
        <WideHeader />
        <SubHeader user={props.user} />
      </div>
      <div>
        <LeftNavToSubHeader />
      </div>
      <div className="grid-row">
        <div className="grid-col-2 bg-base-lightest display-none desktop-lg:display-block widescreen:display-block">
          <LeftNavigation user={props.user} logOut={props.logOut} currentLink={props.currentLink} setCurrentLink={props.setCurrentLink}/>
        </div>
        <div className="grid-col margin-x-2 minh-tablet-lg" id="main">
          <main id="main">{childrenWithProps} </main>
        </div>
      </div>
      <div className="bottomFooter">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
