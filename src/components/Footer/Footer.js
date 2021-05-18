import React from "react";
import { Logo, Footer as TWFooter, SocialLinks } from "@trussworks/react-uswds";

import Menu from "../Menu/Menu";
import config from "../../config";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="main-footer">
      <TWFooter
        size="large"
        secondary={
          <div className="grid-row grid-gap desktop:width-full epa-footer-secondary">
            <Logo
              size="medium"
              image={
                <img
                  className="usa-footer__logo-img footerLogo"
                  alt="img alt text"
                  src={`${process.env.PUBLIC_URL}/images/epaSeal.svg`}
                />
              }
              heading={
                <h3 className="usa-footer__logo-heading padding-top-3 text-left">
                  <p className="content margin-0">
                    United States Environmental Protection Agency
                  </p>
                  <p className="text-normal font-alt-xs">
                    {config.app.version} published {config.app.published}
                  </p>
                </h3>
              }
            />
            <div className="usa-footer__contact-links mobile-lg:grid-col-6 padding-top-5">
              <SocialLinks
                links={[
                  <>
                    <Menu />
                  </>,
                ]}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Footer;
