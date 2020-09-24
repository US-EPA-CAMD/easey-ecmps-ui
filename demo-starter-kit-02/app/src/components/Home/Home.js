import React, { useEffect, useState } from "react";
import { getAllFacilities } from "../../utils/api/facilityApi";
import * as fs from "../../utils/selectors/facilities";
import log from "loglevel";

function Home() {
  let element = null;
  const [facilities, setFacilities] = useState([]);
  const [facility, setFacility] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllFacilities();
        if (result) {
          setFacilities(result.data.data);
          setFacility(fs.getSelectedFacility(26, result.data.data));
        }
      } catch (e) {
        log.error(e);
      }
    };
    fetchData();
  }, []);

  if (facilities.length > 0 && Object.keys(facility).length > 0)
    element = (
      <div className="container">
        <h4>Selected facility data</h4>
        <pre>
          <code>{JSON.stringify(facility)}</code>
        </pre>
        <h4>Selected facilities Table Records</h4>
        <pre>
          <code>{JSON.stringify(fs.getTableRecords(facilities))}</code>
        </pre>
        <h4>Selected facility location</h4>
        <pre>
          <code>{JSON.stringify(fs.getLocation(facility))}</code>
        </pre>
        <h4>Facility locations by State</h4>
        <pre>
          <code>
            {JSON.stringify(fs.getLocationByState("Alabama", facilities))}
          </code>
        </pre>
        <h4>Selected facility contacts</h4>
        <pre>
          <code>{JSON.stringify(fs.getContacts(facility))}</code>
        </pre>
        <h4>Selected facility contact Units for Owner</h4>
        <pre>
          <code>
            {JSON.stringify(fs.getContactsRoleUnits("Owner", facility))}
          </code>
        </pre>
        <h4>Selected facility contact Units for Operator</h4>
        <pre>
          <code>
            {JSON.stringify(fs.getContactsRoleUnits("Operator", facility))}
          </code>
        </pre>
        <h4>Selected facility Units table records</h4>
        <pre>
          <code>{JSON.stringify(fs.getUnitsTableRecords(facility))}</code>
        </pre>
        <h4>Selected unitId detail</h4>
        <pre>
          <code>{JSON.stringify(fs.getSelectedUnitDetail("4", facility))}</code>
        </pre>
        <h4>Selected facility Monitoring Plans table records</h4>
        <pre>
          <code>
            {JSON.stringify(fs.getMonitoringPlansTableRecords(facility))}
          </code>
        </pre>
      </div>
    );
  return element;
}

export default Home;
