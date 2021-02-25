import React, { useState } from "react";
import {
  Button,
  MegaMenu,
  Header,
  Title,
  Search,
  NavDropDownButton,
  PrimaryNav,
  Link
} from "@trussworks/react-uswds";
import "./WideHeader.css";

const WideHeader = () => {
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded);

//   const environmentalTopicsMenu = [
//     [
//       <Link href={"https://www.epa.gov/environmental-topics/air-topics"} target="_blank" key="one">
//         Air
//       </Link>,
//       <a href="#linkTwo" key="two">
//         Chemicals and Toxics
//       </a>,
//       <a href="#linkThree" key="three">
//         Greener Living
//       </a>,
//       <a href="#linkFour" key="four">
//         Land, Waste, and Cleanup
//       </a>,
//       <a href="#linkOne" key="one">
//         Mold
//       </a>,
//       <a href="#linkTwo" key="two">
//         Radon
//       </a>,
//       <a href="#linkThree" key="three">
//         Water
//       </a>,
//       <a href="#linkFour" key="four">
//         Bed Bugs
//       </a>,
//       <a href="#linkOne" key="one">
//         Environmental Information by Location
//       </a>,
//       <a href="#linkTwo" key="two">
//         Health
//       </a>,
//       <a href="#linkThree" key="three">
//         Lead
//       </a>,
//       <a href="#linkFour" key="four">
//         Pesticides
//       </a>,
//       <a href="#linkOne" key="one">
//         Science
//       </a>,
//       <a href="#linkTwo" key="two">
//         A-Z Topic Index
//       </a>,
//     ],
//   ];

//   const lawsAndRegulationsTopicsMenu = [
//     [
//       <a href="#linkFive" key="one">
//         By Business Sector
//       </a>,
//       <a href="#linkSix" key="two">
//         By Topics
//       </a>,
//       <a href="#linkSeven" key="three">
//         Compliance
//       </a>,
//       <a href="#linkEight" key="four">
//         Enforcement
//       </a>,
//       <a href="#linkSix" key="two">
//         Laws and Executive Orders
//       </a>,
//       <a href="#linkSeven" key="three">
//         Guidance
//       </a>,
//       <a href="#linkEight" key="four">
//         Regulations
//       </a>,
//     ],
//   ];

//   const aboutEPATopicsMenu = [
//     [
//       <a href="#linkFive" key="one">
//         Organization Chart
//       </a>,
//       <a href="#linkSix" key="two">
//         Staff Directory
//       </a>,
//       <a href="#linkSeven" key="three">
//         Planning, Budget, and Results
//       </a>,
//       <a href="#linkEight" key="four">
//         Jobs and Internships
//       </a>,
//       <a href="#linkSix" key="two">
//         Headquarters Offices
//       </a>,
//       <a href="#linkSeven" key="three">
//         Regional Offices
//       </a>,
//       <a href="#linkEight" key="four">
//         Labs and Research Centers
//       </a>,
//     ],
//   ];


//   const [isOpen, setIsOpen] = useState([false, false]);

//   const [open,setOpen] = useState(false)
//   const megaSideMenu = [
//     <>
//       <NavDropDownButton
//         onToggle={(): void => {
//             setOpen((prevState) => !prevState);
//           //   onToggle(0, setIsOpen)
//         }}
//         menuId="environmentalMenuDropDown"
//         isOpen={open}
//         label="Enviromental Topics"
//         isCurrent={open}
//       />
//       <MegaMenu
//         key="one"
//         items={environmentalTopicsMenu}
//         isOpen={open}
//         id="environmentalMenuDropDown"
//       />
//     </>,
//     <>
//       <NavDropDownButton
//           onToggle={(): void => {
//             setOpen((prevState) => !prevState);
//           //   onToggle(0, setIsOpen)
//         }}
//         menuId="lawsAndRegulationsMenuDropDown"
//         isOpen={open}
//         label="Laws and Regulations"
//       />
//       <MegaMenu
//         key="one"
//         items={lawsAndRegulationsTopicsMenu}
//         isOpen={open}
//         id="lawsAndRegulationsMenuDropDown"
//       />
//     </>,
//     <>
//       <NavDropDownButton
//           onToggle={(): void => {
//             setOpen((prevState) => !prevState);
//           //   onToggle(0, setIsOpen)
//         }}
//         menuId="aboutEPAMenuDropDown"
//         isOpen={open}
//         label="About EPA"
//       />
//       <MegaMenu
//         key="one"
//         items={aboutEPATopicsMenu}
//         isOpen={open}
//         id="aboutEPAMenuDropDown"
//       />
//     </>,
//   ];
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
          data and this site is being used for <strong>testing</strong> purposes
          only.
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
            //   items={megaSideMenu}
            items = {[]}
              mobileExpanded={expanded}
              onToggleMobileNav={onClick}
            >
              <Search size="small" onSubmit={""} />
            </PrimaryNav>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default WideHeader;
