import React, { useState } from "react";
import "./Menu.scss";

const Menu = () => {
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const toggleMenu = () => {
    if (!showMenuOptions) {
      setShowMenuOptions(true);
    } else {
      setShowMenuOptions(false);
    }
  }
  return (
    <>
      <button onClick={toggleMenu} id={!showMenuOptions?"collapsable": "close"} title={!showMenuOptions?"collapsable": "close"} className="menuBtn"
        aria-haspopup="true" aria-labelledby={!showMenuOptions?"collapsable": "close"}>
        {showMenuOptions ? <i className="fa fa-times fa-sm"></i> : <i className="fa fa-bars"></i>}
      </button>
      <div id="menuContent" aria-labelledby="menuContent" className={showMenuOptions ? "menuOn" : "menuOff"}>
        <a className="menuItem" id="AccessiblityLink" aria-labelledby="AccessiblityLink" target='_blank' rel="noopener noreferrer" href="https://www.epa.gov/accessibility">Accessibility</a>
        <a className="menuItem" id="PrivacyLink" aria-labelledby="PrivacyLink" target='_blank' rel="noopener noreferrer" href="https://www.epa.gov/privacy">Privacy</a>
        <a className="menuItem" id="PrivacyandSecurityNoticeLink" aria-labelledby="PrivacyandSecurityNoticeLink" rel="noopener noreferrer" target='_blank'
          href="https://www.epa.gov/privacy/privacy-and-security-notice">Privacy and Security Notice</a>
      </div>
    </>
  );
};

export default Menu;
