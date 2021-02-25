import React, { useState } from "react";
import {
  Button,
  MegaMenu,
  Header,
  Title,
  Search,
  NavDropDownButton,
  PrimaryNav,
} from "@trussworks/react-uswds";
import "./WideHeader.css";

const WideHeader = () => {
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded);

  const testItemsMegaOne = [
    [
      <a href="#linkOne" key="one">
        Simple link one
      </a>,
      <a href="#linkTwo" key="two">
        Simple link two
      </a>,
    ],
    [
      <a href="#linkThree" key="three">
        Simple link three
      </a>,
      <a href="#linkFour" key="four">
        Simple link four
      </a>,
    ],
  ];

  const testItemsMegaTwo = [
    [
      <a href="#linkFive" key="one">
        Simple link five
      </a>,
      <a href="#linkSix" key="two">
        Simple link six
      </a>,
    ],
    [
      <a href="#linkSeven" key="three">
        Simple link seven
      </a>,
      <a href="#linkEight" key="four">
        Simple link eight
      </a>,
    ],
  ];

  const [isOpen, setIsOpen] = useState([false, false]);

  const testItemsMegaMenu = [
    <>
      <NavDropDownButton
        // onToggle={(): void => {
        //   onToggle(0, setIsOpen)
        // }}
        menuId="testDropDownOne"
        isOpen={isOpen[0]}
        label="Nav Label"
        isCurrent={true}
      />
      <MegaMenu
        key="one"
        items={testItemsMegaOne}
        isOpen={isOpen[0]}
        id="testDropDownOne"
      />
    </>,
    <>
      <NavDropDownButton
        // onToggle={(): void => {
        //   onToggle(1, setIsOpen)
        // }}
        menuId="testDropDownTwo"
        isOpen={isOpen[1]}
        label="Nav Label"
      />
      <MegaMenu
        key="one"
        items={testItemsMegaTwo}
        isOpen={isOpen[1]}
        id="testDropDownTwo"
      />
    </>,
    <a href="#two" key="two" className="usa-nav__link">
      <span>Parent link</span>
    </a>,
    <a href="#three" key="three" className="usa-nav__link">
      <span>Parent link</span>
    </a>,
  ];
  return (
    <div>
      <div className={`usa-overlay ${expanded ? "is-visible" : ""}`}></div>
      <div
        id="block-pane-official-website-header"
        className="block block-pane  block-pane-official-website-header sitewide-alert sitewide-alert--official"
      >
        <div className="sitewide-alert__content">
          {" "}
          <p>An official website of the United States government.</p>
        </div>
      </div>
      <div id="topbanner">
          <p>
            EPA Sandbox Environment: The content on this page is not production
            data and this site is being used for <strong>testing</strong>{" "}
            purposes only.
          </p>
        </div>
      <Header basic={true}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              {" "}
              <img src={require("./title.png")} className="photo" />
            </Title>
            <Button className="menuBTN" onClick={onClick} label="Menu">
              Menu{" "}
            </Button>
          </div>
          <div className="test">
            <PrimaryNav
            //   items={testItemsMegaMenu}
            items ={[]}
              mobileExpanded={expanded}
              onToggleMobileNav={onClick}
            >
              <Search size="small" onSubmit={""} />
            </PrimaryNav>
          </div>
          {/* <div>test</div> */}
        </div>
      </Header>
    </div>
  );
};

export default WideHeader;
