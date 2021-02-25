import React from "react";
import { ReactComponent as Logo } from './epaSeal.svg';
import "./Footer.css";
import Menu from "./Menu/Menu";

const Footer = () => {
  return (
    <div>
      <footer className="footerBar">
          <Logo className="footerLogo"/>
          <span className="content">United States Environmental Protection Agency</span>
          <Menu/>
      </footer>
    </div>
  );
};

export default Footer;
