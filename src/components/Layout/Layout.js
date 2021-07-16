import React from "react";
import { Footer } from "../Footer/Footer";
import { WideHeader } from "../WideHeader/WideHeader";
import "./Layout.scss";
import { Link } from "@trussworks/react-uswds";
import { LeftNavigation } from "../LeftNavigation/LeftNavigation";
import { SubHeader } from "../SubHeader/SubHeader";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  return (
    <div>
      <Link className="skip-to-content-link" href="#main">
        Skip to content
      </Link>
      <div className="topHeader">
        <WideHeader />
        <SubHeader />
      </div>
      <div className="grid-row">
        <div className="grid-col-2 bg-base-lightest">
          <LeftNavigation user={props.user} logOut={props.logOut} />
        </div>
        <div className="grid-col margin-x-2 minh-tablet-lg" id="main">
          <main>{childrenWithProps} </main>
        </div>
      </div>
      <div className="bottomFooter">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
