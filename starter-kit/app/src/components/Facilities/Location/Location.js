import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as fs from "../../../utils/selectors/facilities";
import LocationView from "./LocationView";

export const Location = ({ facility, facilities }) => {
  const [location, setLocation] = useState(fs.getLocation(facility));
  const [allLocations, setAllLocations] = useState([]);
  const [activeFacility, setActiveFacility] = useState(null);
  const [zoomTo, setZoomTo] = useState("thisFacility");
  const [showMPDetail, setShowMPDetail] = useState(false);

  useEffect(() => {
    if (zoomTo === "allFacilities") {
      setAllLocations(fs.getLocationByState(facility.state.name, facilities));
    } else {
      setLocation(fs.getLocation(facility));
      setAllLocations([]);
    }
    setActiveFacility(null);
    setShowMPDetail(false);
  }, [facility, zoomTo, facilities]);

  const radioBoxHandler = (e) => {
    setZoomTo(e.target.id);
  };

  useEffect(() => {
    setShowMPDetail(false);
  }, [activeFacility]);

  return (
    <LocationView
      location={location}
      allLocations={allLocations}
      activeFacility={activeFacility}
      radioBoxHandler={radioBoxHandler}
      zoomTo={zoomTo}
      setActiveFacility={setActiveFacility}
      facility={facility}
      showMPDetail={showMPDetail}
      setShowMPDetail={setShowMPDetail}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
  };
};

export default connect(mapStateToProps)(Location);
