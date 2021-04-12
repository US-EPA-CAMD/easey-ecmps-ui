import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import WideHeader from "./WideHeader/WideHeader";
import LeftNavigation from "./LeftNavigation/LeftNavigation";
import "./Layout.css";
const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  return (
    <div>
      <div className="topHeader">
        <WideHeader />
      </div>
      <div className="contentrow">
        <div className="sideNav">
          <LeftNavigation />
        </div>

        <div className="mainContent">{childrenWithProps}</div>
      </div>
      <div className="bottomFooter">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
