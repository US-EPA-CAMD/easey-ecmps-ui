/*** global dependencies (i.e., main driver stuff we need to make things work) ***/
import React, { useState } from "react";

import config from "../../config";

/*** additional 3rd party components ***/
import {
  Header,
  PrimaryNav,
  NavMenuButton,
  GovBanner,
  Search,
} from "@trussworks/react-uswds";

/*** additional 'local' (i.e., our app) components ***/
import Menu from "../WideHeaderMenu/Menu";

/*** data objects (for injection into props, etc.) ***/
import {
  environmentalTopics,
  lawsAndRegulationsTopics,
  aboutEPATopics,
} from "../WideHeaderMenu/menuTopics";

import { epaLogo } from "../WideHeaderMenu/svgs";

/*** additional scss to add / override global scss scope classes for this component only ***/
import "./WideHeader.scss";

const WideHeader = () => {
  /***** HOOKS *****/
  const [expanded, setExpanded] = useState(false);

  /***** EVENT HANDLERS *****/
  const onClick = () => setExpanded((prvExpanded) => !prvExpanded);

  const onSearch = (event) => {
    // *** URI encode the component after trimming to get rid of leading/trailing spaces
    // *** and mitigate any character collision issues during http request with window.open
    const searchTerm = encodeURI(event.target[0].value.trim());
    window.open(
      `https://search.epa.gov/epasearch/?querytext=${searchTerm}`,
      "_blank"
    );
    return false;
  };

  const mainMenu = Menu([
    environmentalTopics,
    lawsAndRegulationsTopics,
    aboutEPATopics,
  ]);

  /****** COMPONENT JSX *****/
  return (
    <div className="header-container usa-header">
      <GovBanner className="padding-y-2px bg-base-lighter" />
      <div className={`usa-overlay ${expanded ? "is-visible" : ""}`} />
      <Header basic={true}>
        <div className="bg-secondary-darker text-center text-gold padding-top-2px padding-bottom-3">
          EPA {config.app.env} Environment: The content on this page is not
          production data and this site is being used for <b>development</b>{" "}
          and/or <b>testing</b> purposes only.
        </div>
        <a
          href="https://www.epa.gov/"
          target="_blank"
          rel="noopener noreferrer"
          title="Go to the EPA home page"
        >
          <img
            src={epaLogo}
            className="margin-3 padding-bottom-2 height-705 width-15"
            alt="Official EPA Logo"
          />
        </a>
        <div className="usa-nav-container ">
          <div className="usa-navbar">
            <NavMenuButton
              onClick={() => onClick()}
              label="Menu"
              className="display-block usa-button radius-md bg-white text-primary
              "
            />
          </div>
          <PrimaryNav
            className=""
            items={mainMenu}
            mobileExpanded={expanded}
            onToggleMobileNav={() => onClick()}
            key="primaryNav"
          >
            <Search
              className="search-field"
              placeholder="Search EPA.gov"
              size="small"
              onSubmit={(event) => onSearch(event)}
            />
          </PrimaryNav>
        </div>
      </Header>
    </div>
  );
};

export default WideHeader;
