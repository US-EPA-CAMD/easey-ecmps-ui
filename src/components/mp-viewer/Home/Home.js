import React, { useState } from "react";
import HomeTitle from "../HomeTitle/HomeTitle";
import HomeOverview from "../HomeOverview/HomeOverview";
import DataTable from "../DataTable/DataTable";
import DetailTabs from "../DetailTabs/DetailTabs";
import "./Home.scss";

const Home = () => {
  const [showOverview, setShowOverview] = useState(<HomeOverview />);
  const handleClick = (e) => {
    setShowOverview(<HomeOverview />);
  };

  const showSetOverview = (orisCode) => {
    setShowOverview(
      <div>
        <div className="text-center overviewButton">
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
          <h1>Monitoring Plans for Part 75 Sources</h1>
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
          <a
            href="/airmarkets/forms/contact-us-about-clean-air-markets"
            className="contact-us"
          >
            Contact Us
          </a>
          to ask a question, provide feedback, or report a problem.
        </div>
      </div>
    </div>
  );
};
export default Home;
