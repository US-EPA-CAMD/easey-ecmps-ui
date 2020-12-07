import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <div
        id="block-pane-official-website-header"
        className="block block-pane  block-pane-official-website-header sitewide-alert sitewide-alert--official"
      >
        <div className="sitewide-alert__content">
          {" "}
          <p>An official website of the United States government.</p>
        </div>
      </div>
      <header className="masthead clearfix" role="banner">
        <img
          alt=""
          className="site-logo"
          src="https://www.epa.gov/sites/all/themes/epa/logo.png"
        />
        <div className="site-name-and-slogan">
          <h1 className="site-name">
            <Link to="./" rel="home" title="Go to the home page">
              <span>US EPA</span>
            </Link>
          </h1>
          <div className="site-slogan">
            United States Environmental Protection Agency
          </div>
        </div>
        <div id="topbanner">
          <p>
            EPA Sandbox Environment: The content on this page is not production
            data and this site is being used for <strong>testing</strong>{" "}
            purposes only.
          </p>
        </div>
      </header>

      <nav className="nav main-nav clearfix" role="navigation">
        <div className="nav__inner">
          <h2 className="element-invisible">Main menu</h2>
          <ul className="menu" role="menu">
            <li className="menu-item" role="presentation">
              <a
                className="menu-link"
                href="https://www.epa.gov/environmental-topics"
                role="menuitem"
                title="Learn about Environmental Topics that EPA covers."
              >
                Environmental Topics
              </a>
            </li>
            <li className="menu-item" role="presentation">
              <a
                className="menu-link"
                href="https://www.epa.gov/laws-regulations"
                role="menuitem"
                title="Laws written by Congress provide the authority for EPA to write regulations. Regulations explain the technical, operational, and legal details necessary to implement laws."
              >
                Laws &amp; Regulations
              </a>
            </li>
            <li className="menu-item" role="presentation">
              <a
                className="menu-link"
                href="https://www.epa.gov/aboutepa"
                role="menuitem"
                title="Learn more about our mission and what we do, how we are organized, and our history."
              >
                About EPA
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
