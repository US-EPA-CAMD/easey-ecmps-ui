import axios from 'axios';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowDownwardSharp } from "@material-ui/icons";
import { Button, Dropdown, Radio } from "@trussworks/react-uswds";

import config from '../../config';
import LoadingModal from '../LoadingModal/LoadingModal';

const mpOptions = [
  { key: "analyzer_range", value: "Analyzer Ranges" },
  { key: "monitor_location_attribute", value: "Attributes" },
  { key: "component", value: "Components" },
  { key: "monitor_default", value: "Defaults" },
  { key: "rect_duct_waf", value: "Rectangular Duct WAF" },
  { key: "monitor_formula", value: "Formulas" },
  { key: "monitor_load", value: "Loads" },
  { key: "mats_method_data", value: "MATS Methods" },
  { key: "monitor_method", value: "Methods" },
  { key: "monitor_qualification_lee", value: "LEE Qualifications" },
  { key: "monitor_qualification_lme", value: "LME Qualifications" },
  { key: "monitor_qualification_pct", value: "PCT Qualifications" },
  { key: "monitor_span", value: "Spans" },
  { key: "monitor_system", value: "Systems" },
  { key: "monitor_system_component", value: "System Components" },
  { key: "system_fuel_flow", value: "System Fuel Flows" },
  { key: "unit_capacity", value: "Unit Capacity" },
  { key: "unit_control", value: "Unit Controls" },
  { key: "unit_fuel", value: "Unit Fuels" },
];

const qaOptions = [
  { key: "ae_hi_gas", value: "AppE Heat Input from Gas" },
  { key: "ae_hi_oil", value: "AppE Heat Input from Oil" },
  { key: "air_emission_testing", value: "Air Emissions" },
  { key: "calibration_injection", value: "7 Day Calibration" },
  { key: "cycle_time_summary", value: "Cycle Time" },
  { key: "linearity_summary", value: "Linearity" },
  { key: "hg_test_summary", value: "Mercury Linearity" },
  { key: "rata_run", value: "Relative Accuracy" },
  { key: "flow_rata_run", value: "Relative Accuracy (Flow)" },
  { key: "", value: "Relative Accuracy (Wall Effects)" },
  { key: "flow_to_load_check", value: "Flow to Load Check" },
  { key: "flow_to_load_reference", value: "Flow to Load Reference" },
  { key: "fuel_flow_to_load_check", value: "Fuel Flow to Load Check" },
  { key: "fuel_flow_to_load_baseline", value: "Fuel Flow to Load Reference" },
  { key: "fuel_flowmeter_accuracy", value: "Fuel Flowmeter Accuracy" },
  { key: "on_off_cal", value: "Online/Offline Calibration" },
  { key: "unit_default_test", value: "Unit Default Test" },
  { key: "trans_accuracy", value: "Trans Accuracy" },
  { key: "protocol_gas", value: "Protocol Gas" },
  { key: "test_qualification", value: "Test Qualification" },
  { key: "qa_cert_event", value: "Certification Events" },
  { key: "test_extension_exemption", value: "Test Extension Exemption" },
];

const emOptions = [
  { key: "daily_calibration", value: "Daily Calibration" },
  { key: "daily_test_summary", value: "Daily Test Summary" },
  { key: "daily_fuel", value: "Daily Fuel" },
  { key: "daily_emission", value: "Daily Emission" },
  { key: "long_term_fuel_flow", value: "Long Term Fuel Flow" },
  { key: "nsps4t_summary", value: "NSPS4T Summary" },
  { key: "nsps4t_annual", value: "NSPS4T 4th Quarter" },
  { key: "nsps4t_compliance_period", value: "NSPS4T Compliance" },
  { key: "sampling_train", value: "Sampling Train" },
  { key: "sorbent_trap", value: "Sorbent Trap" },
  { key: "summary_value", value: "Summary Value" },
  { key: "weekly_system_integrity", value: "Weekly System Integrity" },
  { key: "weekly_test_summary", value: "Weekly Test Summary" },
  { key: "hrly_op_data", value: "Hourly Operating Data" },
  { key: "hrly_fuel_flow", value: "Hourly Fuel Flow" },
  { key: "hrly_param_fuel_flow", value: "Hourly Param Fuel Flow" },
  { key: "hrly_gas_flow_meter", value: "Hourly Gas Flow Meter" },
  { key: "monitor_hrly_value", value: "Monitor Hourly Value" },
  { key: "derived_hrly_value", value: "Derived Hourly Value" },
  { key: "mats_monitor_hrly_value", value: "MATS Monitor Hourly Value" },
  { key: "mats_derived_hrly_value", value: "MATS Derived Hourly Value" },
];

export const WhatHasData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataType, setDataType] = useState("MP");
  const [options, setOptions] = useState(mpOptions);
  const [isWorkspace, setIsWorkspace] = useState(false);

  const [selectedOption, setSelectedOption] = useState({
    key: 'none',
    value: 'none'
  });

  const [columnNames, setColumnNames] = useState([
    { name: "Facility Id", selector: `col1`, sortable: true, wrap: false },
    { name: "Facility Name", selector: `col2`, sortable: true, wrap: false },
    { name: "Configuration", selector: `col3`, sortable: true, wrap: false },
  ]);

  const dataTypeChangeHandler = (event) => {
    setData(null);
    const selectedOption = options.find(i => i.key === event.target.value);
    setSelectedOption(selectedOption);
  }

  const getDataHandler = async () => {
    setLoading(true);
    let serviceUrl = `/what-has-data?dataType=${selectedOption.key}&workspace=${isWorkspace}`;
    switch(dataType) {
      case 'QA':
        serviceUrl = `${config.services.qaCertification.uri}${serviceUrl}`
        break;
      case 'EM':
        serviceUrl = `${config.services.emissions.uri}${serviceUrl}`
        break;
      default:
        serviceUrl = `${config.services.monitorPlans.uri}${serviceUrl}`
        break;
    }
    const results = await axios.get(serviceUrl);
    setData(
      results.data.map((i, index) => {
        if (index === 0) {
          const columns = columnNames.slice(0, 3);
          if (i.yearQuarter) {
            columns.push({ name: "Year/Quarter", selector: `col4`, sortable: true, wrap: false });
          } else if (i.componentId) {
            columns.push({ name: "Component Id", selector: `col4`, sortable: true, wrap: false });
          } else if (i.systemId) {
            columns.push({ name: "System Id", selector: `col4`, sortable: true, wrap: false });
          }
          setColumnNames(columns);
        }

        let col4Value;
        if (i.yearQuarter) {
          col4Value = i.yearQuarter;
        } else if (i.componentId) {
          col4Value = i.componentId;
        } else if (i.systemId) {
          col4Value = i.systemId;
        }

        return {
          col1: i.orisCode,
          col2: i.facilityName,
          col3: i.configuration,
          col4: col4Value,
        };
      })
    );
    setLoading(false);
  }

  return (
    <div className="margin-2">
      <div className="display-flex">
        <Radio className="margin-1"
          id="official"
          name="schema"
          defaultChecked
          label="Official"
          onClick={() => {
            setData(null);
            setIsWorkspace(false);
          }}
        />
        <Radio className="margin-1"
          id="workspace"
          name="schema"
          label="Workspace"
          onClick={() => {
            setData(null);
            setIsWorkspace(true);
          }}
        />
      </div>
      <div className="display-flex">
        <Radio className="margin-1"
          id="mpDataType"
          name="dataType"
          defaultChecked
          label="Monitor Plan"
          onClick={() => {
            setData(null);
            setDataType("MP");
            setOptions(mpOptions);
          }}
        />
        <Radio className="margin-1"
          id="qaDataType"
          name="dataType"
          label="QA Certification"
          onClick={() => {
            setData(null);
            setDataType("QA");
            setOptions(qaOptions);
          }}
        />
        <Radio className="margin-1"
          id="emDataType"
          name="dataType"
          label="Emissions"
          onClick={() => {
            setData(null);
            setDataType("EM");
            setOptions(emOptions);
          }}
        />
      </div>
      <div>
        <div className="display-flex">
          <Dropdown onChange={(event) => dataTypeChangeHandler(event)}>
            <option key="none" value="none">
              --- select a value ---
            </option>
            {
              options.map(i =>
                <option key={i.key} value={i.key}>
                  {i.value}
                </option>
              )
            }
          </Dropdown>
          <Button className="margin-left-1"
            onClick={getDataHandler}
          >
            Refresh
          </Button>
        </div>
      </div>
      <hr className='margin-top-3' />
      {data && (
        <>
          <h3>{selectedOption.value !== 'none'
            ? `Monitor Plans with ${selectedOption.value}`
            : ""
          }</h3>
          <DataTable
            className={`margin-top-neg-8 data-display-table react-transition fade-in`}
            sortIcon={
              <ArrowDownwardSharp className="margin-left-2 text-primary" />
            }
            defaultSortField={"col1"}
            pagination={true}
            columns={columnNames}
            data={data}
            fixedHeader={true}
            responsive={true}
            paginationPerPage={config.app.paginationPerPage}
            paginationRowsPerPageOptions={config.app.paginationPerPageOptions}
            paginationComponentOptions={{
              rangeSeparatorText: config.app.paginationRangeSeparatorText,
            }}
          />
        </>
      )}
      <LoadingModal type="Loading" loading={loading} />
    </div>
  );
}

export default WhatHasData;