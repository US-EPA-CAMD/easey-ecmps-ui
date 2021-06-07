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
    <div>
      <div className="topHeader">
        <WideHeader />
      </div>
      <div className="grid-row">
        <div className="grid-col-2">
          <LeftNavigation />
        </div>
        <div className="grid-col minh-tablet-lg margin-x-2">
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
