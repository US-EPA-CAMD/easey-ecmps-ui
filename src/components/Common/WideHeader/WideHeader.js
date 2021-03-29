import React, { createContext,useRef , useState, useEffect, createRef } from "react";
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
import config from '../../../config'

const WideHeader = () => {
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded);

  const mainMenu = Menu([
    environmentalTopics,
    lawsAndRegulationsTopics,
    aboutEPATopics,
  ]);
  // useEffect(() => {
  //   function keyListener(e) {
  //     const listener = keyListenersMap.get(e.keyCode);
  //     return listener && listener(e);
  //   }
  //   window.addEventListener("keydown", keyListener);
  //   return () => window.removeEventListener("keydown", keyListener);
  // });

  const modalRef = createRef();
  // const [tabs, setTabs] = useState(0);
  // const handleTabKey = (e) => {
  //   if(modalRef.current){
  //   const focusableModalElements = modalRef.current.querySelectorAll(
  //     'button[type="submit"].menuSearchBTN,a.usa-link.menuTitleBTN,.mainMenu button, input[type="search"], select'
  //   );
  //   const currentElement = focusableModalElements[tabs];
  //   if (!e.shiftKey && document.activeElement !== currentElement) {
  //     if (tabs < focusableModalElements.length - 1) {
  //       setTabs(tabs + 1);
  //     } else {
  //       setTabs(0);
  //     }
  //     currentElement.focus();
  //     console.log('testing',focusableModalElements)
  //     return e.preventDefault();
  //   }

  //   if (e.shiftKey && document.activeElement !== currentElement) {
  //     if (tabs > 0) {
  //       setTabs(tabs - 1);
  //     } else {
  //       setTabs(focusableModalElements.length - 1);
  //     }
  //     currentElement.focus();
  //     return e.preventDefault();
  //   }}else{
  //     console.log('testing',modalRef.current)
  //   }
  // };

  // const keyListenersMap = new Map([
  //   [27, onClick],
  //   [9, handleTabKey],
  // ]);
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
          EPA {config.app.env} Environment: The content on this page is not production
          data and this site is being used for <strong>development</strong> and/or <strong>testing</strong> purposes
          only.
        </p>
      </div>
      <Header basic={true}>
        <div className="usa-nav-container" >
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
          <div ref={modalRef} className="mainMenu">
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
