import React from "react";
//import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as leaflet from "react-leaflet";
import "./Location.css";
import { Radio } from "@trussworks/react-uswds";

const LocationView = ({
  location,
  allLocations,
  activeFacility,
  radioBoxHandler,
  zoomTo,
  setActiveFacility,
  facility,
  showMPDetail,
  setShowMPDetail,
}) => {
  return (
    <div>
      <div className="grid-row">
        <div className="grid-col">
          <h4>County</h4>
          <p>{location.county}</p>
        </div>
        <div className="grid-col">
          <h4>State</h4>
          <p>{location.state}</p>
        </div>
        <div className="grid-col">
          <h4>EPA Region</h4>
          <p>{location.region}</p>
        </div>
      </div>
      <leaflet.Map
        center={[location.latitude, location.longitude]}
        zoom={zoomTo === "thisFacility" ? 12 : 5}
      >
        <leaflet.TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {zoomTo === "thisFacility" && (
          <div role="location-map-marker">
            <leaflet.Marker
              data-testid="selected-facility-marker"
              position={[location.latitude, location.longitude]}
              onClick={() => {
                setActiveFacility(location);
              }}
            />
          </div>
        )}

        {allLocations.map((loc, i) => (
          <div role="location-map-marker" key={i}>
            <leaflet.Marker
              data-testid="location-map-marker"
              key={i}
              position={[loc.latitude, loc.longitude]}
              onClick={() => {
                setActiveFacility(loc);
              }}
            />
          </div>
        ))}

        {activeFacility && (
          <leaflet.Popup
            className="tooltip-popup"
            position={[activeFacility.latitude, activeFacility.longitude]}
            onClose={() => {
              setActiveFacility(null);
            }}
          >
            <ul className="tooltipData">
              <li>
                <strong>{activeFacility.name}</strong>
              </li>
              <li>
                <strong>ORIS Code:</strong> {facility.orisCode}
              </li>
              <li>
                <strong>Latitude:</strong> {activeFacility.latitude}
              </li>
              <li>
                <strong>Longitude:</strong> {activeFacility.longitude}
              </li>
              <li>
                <strong>Active Monitoring Plans:</strong>
                <button
                  className="usa-button usa-button--accent-cool usa-button--active"
                  onClick={() => setShowMPDetail(true)}
                  style={{ display: !showMPDetail ? "block" : "none" }}
                >
                  Show
                </button>
                <ul className="mp-detail-list" style={{ display: showMPDetail ? "block" : "none" }}>
                  {activeFacility.activeMonitoringPlans.map((d, i) => (
                    <li key={i}>
                      <a href="#"> {d}</a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </leaflet.Popup>
        )}
      </leaflet.Map>
      <div id="mapOptions">
        <h4>Map Options</h4>
        <span>Zoom to:</span>
        <Radio
          id="thisFacility"
          name="zoom-to"
          label="This Facility"
          onChange={radioBoxHandler}
          checked={zoomTo === "thisFacility"}
        />
        <Radio
          id="allFacilities"
          name="zoom-to"
          label={"All facilities in " + facility.state.name}
          onChange={radioBoxHandler}
          checked={zoomTo === "allFacilities"}
        />
      </div>
    </div>
  );
};

export default LocationView;
