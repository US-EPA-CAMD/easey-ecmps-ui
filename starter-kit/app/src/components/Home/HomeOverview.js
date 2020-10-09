import React from "react";
import "./HomeOverview.css";
const HomeOverview = () => {
  return (
    <div id="overviewHome">
      <h3>Overview</h3>

      <div>
        <p>
          This tool provides access to information for sources affected by{" "}
          <a href="https://www.ecfr.gov/cgi-bin/text-idx?tpl=/ecfrbrowse/Title40/40cfr75_main_02.tpl">
            40 CFR Part 75
          </a>
          . Location, ownership and contact information, unit attributes, and
          monitoring plan data is presented for each facility.
        </p>

        <h4>What is in a monitoring plan?</h4>

        <p>
          The monitoring plan describes how a facility monitors its emissions.
          Monitoring plan data define relationships between stacks, pipes, and
          units; specify locations at a facility from which emissions are
          monitored; and identify monitoring equipment including the individual
          system components. Monitoring plan data also provide characteristics
          of operations and physical and unit characteristics such as stack
          height, cross sectional area, fuel type, air pollution control
          devices, and size of the unit(s).
        </p>

        <h4>How to Access</h4>

        <p>
          To view more information, select a facility from the list on the left.
          A series of tabs will be displayed. To view the monitoring plan, open
          the "Monitoring Plans" tab and select a unit and/or stack from the
          list.
        </p>

        <h4>Sorting and Filtering</h4>

        <p>
          The facility list can be sorted in ascending or descending order by
          selecting a column heading. Additionally, the facility list can be
          dynamically filtered according to the search box content. Sorting and
          filtering applies to ORIS Code, Facility Name, and State.
        </p>

        <div className="grid-row">
          <div className="grid-col">
            <h4>Support</h4>

            <p>
              For technical support with the monitoring plans, please contact
              your{" "}
              <a href="https://www.epa.gov/airmarkets/business-center-and-emissions-monitoring-contacts">
                regional analyst
              </a>
              . For any issues you encounter with this application, please email{" "}
              <a href="mailto:monitoringplans@epa.gov">
                monitoringplans@epa.gov
              </a>
              .
            </p>
          </div>

          <div className="grid-col box multi related-info col">
            <h3 className="pane-title">More Resources</h3>

            <div className="pane-content">
              <ul>
                <li>
                  <a href="https://www.epa.gov/airmarkets/field-audit-checklist-tool-fact">
                    Field Audit Checklist Tool (FACT)
                  </a>
                </li>
                <li>
                  <a href="https://www.epa.gov/airmarkets/emissions-monitoring-and-reporting">
                    Emissions Monitoring and Reporting
                  </a>
                </li>
                <li>
                  <a href="https://www.epa.gov/airmarkets">Clean Air Markets</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOverview;
