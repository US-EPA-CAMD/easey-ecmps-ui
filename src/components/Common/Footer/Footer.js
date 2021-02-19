import React from "react";
import { ReactComponent as Logo } from './epaSeal.svg';
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footerBar">
          <Logo className="footerLogo"/>
          <span className="content">United States Environmental Protection Agency</span>
      </footer>
    </div>
  );
};

export default Footer;
