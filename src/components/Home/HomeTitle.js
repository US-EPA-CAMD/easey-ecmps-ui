import React from "react";
import "./HomeTitle.css";

const HomeTitle = () => {
  return (
    <div className="grid-row">
      <div className="grid-col">
        <h2 className="microsite-name .float-left">
          <a href="https://www.epa.gov/airmarkets">Clean Air Markets</a>
        </h2>
      </div>
      <div className="grid-col">
        <div className="region-preface clearfix">
          {" "}
          <div
            id="block-pane-epa-web-area-connect"
            className="block block-pane  block-pane-epa-web-area-connect"
          >
            <span className="connect-title">
              <a
                href="https://www.epa.gov/airmarkets/forms/contact-us-about-clean-air-markets"
                className="connect-title__link"
              >
                Contact Us
              </a>
            </span>
          </div>
          <div
            id="block-pane-social-sharing"
            className="block block-pane  block-pane-social-sharing"
          >
            <span className="connect-title">Share</span>
            <ul className="share-links">
              <li className="share-links__item facebook">
                <a
                  className="share-links__link"
                  href="https://www.facebook.com/sharer.php?u=https://www.epa.gov/airmarkets/monitoring-plans-part-75-sources&amp;t=Monitoring%20Plans%20for%20Part%2075%20Sources"
                  aria-label="Share this page on Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share this page on Facebook"
                >
                  <svg
                    className="icon icon--social-link"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.473"
                    height="30.757"
                    viewBox="0 0 16.473 30.757"
                  >
                    <path
                      d="M17,17.3l.854-5.566H12.516V8.122c0-1.523.746-3.007,3.138-3.007h2.428V.376A29.61,
                      29.61,0,0,0,13.772,0C9.374,0,6.5,2.666,6.5,7.492v4.242H1.609V17.3H6.5V30.757h6.017V17.3Z"
                      transform="translate(-1.609)"
                      fill="#0170bc"
                    />
                  </svg>
                </a>
              </li>
              <li className="share-links__item twitter">
                <a
                  className="share-links__link"
                  href="https://twitter.com/intent/tweet?original_referer=https://www.epa.gov/airmarkets/monitoring-plans-part-75-sources&amp;text=Monitoring%20Plans%20for%20Part%2075%20Sources&amp;url=https://www.epa.gov/airmarkets/monitoring-plans-part-75-sources&amp;via=EPA&amp;count=none&amp;lang=en"
                  aria-label="Tweet this page on Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Tweet this page on Twitter"
                >
                  <svg
                    className="icon icon--social-link"
                    xmlns="http://www.w3.org/2000/svg"
                    width="29.971"
                    height="24.342"
                    viewBox="0 0 29.971 24.342"
                  >
                    <path
                      d="M26.89,9.447c.019.266.019.533.019.8,0,8.12-6.18,17.477-17.477,17.477A17.358,
                      17.358,0,0,1,0,24.965a12.707,12.707,0,0,0,1.483.076,12.3,12.3,0,0,0,7.626-2.624,6.153,6.153,
                      0,0,1-5.743-4.26,7.746,7.746,0,0,0,1.16.1,6.5,6.5,0,0,0,1.616-.209,6.143,6.143,0,0,1-4.925-6.028v-.076a6.186,
                      6.186,0,0,0,2.776.78A6.152,6.152,0,0,1,2.092,4.5,17.46,17.46,0,0,0,14.757,10.93,6.934,6.934,0,0,1,14.6,9.523a6.148,
                      6.148,0,0,1,10.631-4.2,12.093,12.093,0,0,0,3.9-1.483,6.126,6.126,0,0,1-2.7,3.385,12.314,12.314,0,0,0,
                      3.537-.951A13.2,13.2,0,0,1,26.89,9.447Z"
                      transform="translate(0 -3.381)"
                      fill="#0170bc"
                    />
                  </svg>
                </a>
              </li>
              <li className="share-links__item email">
                <a
                  className="share-links__link"
                  href="mailto:%20?subject=Shared%20from%20the%20US%20EPA:%20Monitoring%20Plans%20for%20Part%2075%20Sources&amp;body=Monitoring%20Plans%20for%20Part%2075%20Sources%20-%20https://www.epa.gov/airmarkets/monitoring-plans-part-75-sources"
                  aria-label="Email this page"
                  title="Email this page"
                >
                  <svg
                    className="icon icon--social-link"
                    xmlns="http://www.w3.org/2000/svg"
                    width="39"
                    height="28.001"
                    viewBox="0 0 39 28.001"
                  >
                    <path
                      d="M153.464,46.738v-28h-39v28h39Zm-2-26V43.866L141.6,29.695l9.7-8.956Zm-33.17,24,9.523-13.674,6.147,
                      5.674,6.147-5.674,9.523,13.674Zm30.055-24-7.908,7.3-1.484,1.369-4.993,4.609-4.993-4.609-1.484-1.369-7.907-7.3Zm-31.885,0h.167l9.7,
                      8.956-9.87,14.171Z"
                      transform="translate(-114.464 -18.738)"
                      fill="#0170bc"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTitle;
