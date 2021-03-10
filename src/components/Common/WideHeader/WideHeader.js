import React, { useState } from "react";
import { Button, Header, Title, PrimaryNav } from "@trussworks/react-uswds";
import "./WideHeader.css";
import { Link } from "react-router-dom";
import Menu from "./Menu/Menu";
import {
  environmentalTopics,
  lawsAndRegulationsTopics,
  aboutEPATopics,
} from "./Menu/menuTopics";
import MenuSearch from "./MenuSearch/MenuSearch";
const WideHeader = () => {
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded);

  const mainMenu = Menu([
    environmentalTopics,
    lawsAndRegulationsTopics,
    aboutEPATopics,
  ]);

  return (
    <div>
      <div className={`usa-overlay ${expanded ? "is-visible" : ""}`}></div>
      <div
        id="block-pane-official-website-header"
        className="block block-pane  block-pane-official-website-header sitewide-alert sitewide-alert--official"
      >
        <div className="sitewide-alert__content">
          {" "}
          An official website of the United States government.
        </div>
      </div>
      <div id="topbanner">
        <p>
          EPA Sandbox Environment: The content on this page is not production
          data and this site is being used for <strong>testing</strong> purposes
          only.
        </p>
      </div>
      <Header basic={true}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              {" "}
              <Link to="./" rel="home" title="Go to the home page">
                <img src={require("./title.png")} className="photo" />
              </Link>
            </Title>
            <Button className="menuBTN" onClick={onClick} label="Menu">
              Menu
            </Button>
          </div>
          <div className="mainMenu">
            <PrimaryNav
              items={mainMenu}
              mobileExpanded={expanded}
              onToggleMobileNav={onClick}
            >
              <MenuSearch />
            </PrimaryNav>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default WideHeader;
