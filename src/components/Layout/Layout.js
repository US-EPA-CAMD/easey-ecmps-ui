import React from "react";
import Footer from "../Footer/Footer";
import WideHeader from "../WideHeader/WideHeader";
import "./Layout.scss";
import LeftNavigation from "../LeftNavigation/LeftNavigation";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  return (
    <div className="react-transition fade-in">
      <div className="topHeader">
        <WideHeader />
      </div>
      <div className="mainContent">
        <div className="sideNav">
          <LeftNavigation />
        </div>
        {childrenWithProps}
      </div>
      <div className="bottomFooter">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
