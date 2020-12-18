import React, { useState } from "react";
import HomeTitle from "./HomeTitle";
import HomeOverview from "./HomeOverview";
import DataTable from "../Facilities/DataTable";
import DetailTabs from "../Facilities/DetailTabs";
import "./Home.css";

const Home = () => {
  const [showOverview, setShowOverview] = useState(<HomeOverview />);
  const handleClick = (e) => {
    setShowOverview(<HomeOverview />);
  };

  const showSetOverview = (orisCode) => {
    setShowOverview(
      <div>
        <div className="overviewButton">
          <button
            onClick={handleClick}
            className="usa-button"
            id="showOverview"
          >
            ⓘ Display Overview
          </button>
        </div>
        <DetailTabs orisCode={orisCode} />
      </div>
    );
  };

  return (
    <div className="home-container">
      <HomeTitle />
      <div className="grid-row">
        <div className="grid-col">
          <h1 className="page-title">Monitoring Plans for Part 75 Sources</h1>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col-5">
          <DataTable
            selectedRowHandler={(facilityInfo) => {
              showSetOverview(facilityInfo[0].value);
            }}
          />
        </div>
        <div className="grid-col rightSection">{showOverview}</div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          <p className="web-area-footer">
            <a
              href="/airmarkets/forms/contact-us-about-clean-air-markets"
              className="contact-us"
            >
              Contact Us
            </a>{" "}
            to ask a question, provide feedback, or report a problem.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
