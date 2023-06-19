import React, { useState, useRef, useEffect } from "react";
import { getMonitoringPlans } from "../../../../utils/api/monitoringPlansApi";
import { getReportingPeriods } from "../../../../utils/api/mdmApi";
import {
  QA_CERT_DATA_MAINTENANCE_STORE_NAME,
  SUBMISSION_ACCESS_STORE_NAME,
} from "../../../../additional-functions/system-admin-section-and-store-names";
import { DropdownSelection } from "../../../DropdownSelection/DropdownSelection";
import {
  getAllTestTypeCodes,
  getAllTestTypeGroupCodes,
} from "../../../../utils/api/dataManagementApi";
import { getAllFacilities } from "../../../../utils/api/facilityApi";
import {
  GridContainer,
  Grid,
  Label,
  Dropdown,
  Checkbox,
  DatePicker,
  ButtonGroup,
  ComboBox,
  Button,
  FormGroup,
} from "@trussworks/react-uswds";
const FilterFormAdmin = ({
  facilities,
  queryCallback,
  showModal,
  setExcludeErrors,
  filesSelected,
  buttonText,
  filterClick,
  section,
}) => {
  const defaultDropdownText = "Select";
  const initialSelectOption = { code: "", name: defaultDropdownText };
  const [availableReportingPeriods, setAvailableReportingPeriods] = useState(
    []
  );
  const [availableFacilities, setAvailableFacilities] = useState([]);
  const [availableConfigState, setAvailableConfigState] = useState([]);

  const [availableConfigurations, setAvailableConfigurations] = useState([
    initialSelectOption,
  ]);
  const selectedOrisCodes = useRef([]);
  const selectedReportingPeriods = useRef([]);

  const [availStatus, setAvailStatus] = useState([
    initialSelectOption,
    { code: "Open", name: "Open" },
    { code: "Closed", name: "Closed" },
    { code: "Pending", name: "Pending Approval" },
    { code: "all", name: "Show All" },
  ]);

  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({
    code: "",
    name: defaultDropdownText,
  });
  const [facility, setFacility] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [locations, setLocations] = useState([]);
  // Make all api calls that only need to happen once on page load here

  const [reset, setReset] = useState(false);

  const [typeSelection, setTypeSelection] = useState([]);
  const [testTypeGroupOptions, setTestTypeGroupOptions] = useState([
    { name: "Loading..." },
  ]);

  const [allTestTypeCodes, setAllTestTypeCodes] = useState([]);

  useEffect(() => {
    const fetchTestTypeCodes = () => {
      getAllTestTypeCodes()
        .then((res) => {
          setAllTestTypeCodes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getAllTestTypeGroupCodes()
        .then((res) => {
          const options = res.data
            .map((e) => {
              return {
                name: e.testTypeGroupDescription,
                code: e.testTypeGroupCode,
              };
            })
            .sort((a, b) => a.name.localeCompare(b.name));

          options.unshift({
            code: defaultDropdownText,
            name: defaultDropdownText,
          });
          setTestTypeGroupOptions(options);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchTestTypeCodes();
  }, []);

  async function fetchReportingPeriods() {
    const reportingPeriodList = (await getReportingPeriods()).data;

    const availReportingPeriods = [];

    for (let i = reportingPeriodList.length - 1; i >= 0; i--) {
      const period = reportingPeriodList[i];
      const objectMapping = {
        id: period.periodAbbreviation,
        label: period.periodAbbreviation,
        selected: false,
        enabled: true,
      };

      if (i === reportingPeriodList.length - 1) {
        objectMapping.selected = true;
        selectedReportingPeriods.current = [period.periodAbbreviation]; //Default selected reporting period
      }

      availReportingPeriods.push(objectMapping);
    }

    setAvailableReportingPeriods(availReportingPeriods);
  }

  useEffect(() => {
    fetchReportingPeriods();
  }, [facilities]);

  const applyFilters = () => {
    const selectedEntries = availableConfigurations.filter((item) => {
      return item.selected;
    });

    let monPlanIds = [];
    if (selectedEntries) {
      monPlanIds = selectedEntries.map((entry) => entry.monPlanId);
    }

    queryCallback(
      selectedOrisCodes.current,
      monPlanIds,
      selectedReportingPeriods.current
    );
  };

  async function reportingPeriodFilterChange(id, action) {
    let newState;
    if (action === "add") {
      newState = [...selectedReportingPeriods.current, id];
    } else {
      newState = [];
      selectedReportingPeriods.current.forEach((item) => {
        if (item !== id) {
          newState.push(item);
        }
      });
    }
    selectedReportingPeriods.current = newState;
  }

  const configurationFilterChange = (id) => {
    setSelectedLocation(id);
  };

  const facilityFilterChange = async (id) => {
    let newState = [id];
    const configurationData = newState.length
      ? (await getMonitoringPlans(newState)).data
      : [];

    const configNamesToMonPlan = [];
    for (const cd of configurationData) {
      if (cd.active) {
        const key = `${cd.facilityName} - ${cd.name}`;
        if (!configNamesToMonPlan[key]) {
          configNamesToMonPlan[key] = cd.id;
        }
      }
    }
    const availConfigs = [];
    for (const [name, monPlanId] of Object.entries(configNamesToMonPlan)) {
      const existingEntry = availableConfigurations.filter((item) => {
        return item.selected && item.label === name;
      });

      availConfigs.push({
        code: name,
        name: name,
      });
    }
    availConfigs.unshift(initialSelectOption);
    setAvailableConfigurations(availConfigs);
    setAvailableConfigState(availableConfigurations);
  };

  const onFacilityChange = (value) => {
    setSelectedFacility(value);
    facilityFilterChange(value);

    if (!value || value === defaultDropdownText) {
      setSelectedFacility(null);
      setSelectedLocation(null);
      return;
    }
  };

  const clearFilters = () => {
    const elements = document.querySelectorAll(
      '[data-testid="combo-box-clear-button"]'
    );
    elements.forEach((element) => {
      element.click();
    });
    setSelectedFacility(null);
    setTypeSelection(null);
    setSelectedLocation(null);
    setSelectedStatus(null);
  };
  return (
    <div className="container border-y-1px border-base-lighter padding-y-1 ">
      <GridContainer className="padding-left-0 margin-left-0 padding-right-0">
        <Grid row>
          <Grid col={6}>
            <Label test-id={"facility-name-label"} htmlFor={"facility-name"}>
              Facility Name/ID
            </Label>
            <ComboBox
              id="facility-name"
              name="facility-name"
              epa-testid={"facility-name"}
              data-testid={"facility-name"}
              options={facilities}
              onChange={onFacilityChange}
              disableFiltering={true}
            />
          </Grid>

          <Grid col={3}>
            <div className="margin-left-2 ">
              <DropdownSelection
                caption={
                  section !== SUBMISSION_ACCESS_STORE_NAME
                    ? " Configurations"
                    : "Locations"
                }
                selectionHandler={configurationFilterChange}
                // options={sections}
                options={availableConfigurations}
                viewKey="name"
                selectKey="name"
                initialSelection={selectedLocation ? selectedLocation[0] : 0}
                // orisCode={orisCode}
                workspaceSection={section}
                extraSpace
              />
            </div>
          </Grid>
          {section === QA_CERT_DATA_MAINTENANCE_STORE_NAME ? (
            <Grid col={3}>
              <div className="margin-left-3 ">
                <DropdownSelection
                  caption="Type"
                  selectionHandler={setTypeSelection}
                  // options={sections}
                  options={testTypeGroupOptions}
                  viewKey="name"
                  selectKey="name"
                  initialSelection={typeSelection ? typeSelection[0] : null}
                  // orisCode={orisCode}
                  workspaceSection={section}
                  extraSpace
                />
              </div>
            </Grid>
          ) : (
            ""
          )}
        </Grid>

        <Grid row className="margin-top-2">
          {section === SUBMISSION_ACCESS_STORE_NAME ? (
            <>
              <Grid col={2}>
                <Label
                  test-id={"reporting-period-name-label"}
                  htmlFor={"reporting-period-name"}
                >
                  Reporting Period
                </Label>
                <ComboBox
                  id="reporting-period-name"
                  name="reporting-period-name"
                  epa-testid={"reporting-period-name"}
                  data-testid={"reporting-period-name"}
                  options={availableReportingPeriods}
                  onChange={reportingPeriodFilterChange}
                  disableFiltering={true}
                />
              </Grid>
              <Grid col={3}>
                <div className="margin-left-2">
                  <DropdownSelection
                    caption="Status"
                    selectionHandler={(option) => setSelectedStatus(option)}
                    options={availStatus}
                    viewKey="name"
                    selectKey="name"
                    initialSelection={selectedStatus ? selectedStatus[0] : null}
                    workspaceSection={section}
                    extraSpace
                  />
                </div>
              </Grid>
            </>
          ) : (
            ""
          )}
          <Grid col={4} className=" position-relative margin-top-3">
            <div
              className={
                section === SUBMISSION_ACCESS_STORE_NAME
                  ? "position-absolute right-0 bottom-0"
                  : " "
              }
            >
<<<<<<< HEAD
              <Button onClick={clearFilters} outline={true}>
=======
              <Button
                onClick={clearFilters}
                outline={true}
              >
>>>>>>> 7df9491faa092e703bab8c2a8bd2b853e46b598e
                Clear
              </Button>

              <Button
                disabled={
                  !(
                    selectedFacility &&
                    selectedFacility[0] !== "" &&
                    selectedLocation &&
                    selectedLocation[0] !== "" &&
                    (section === SUBMISSION_ACCESS_STORE_NAME
                      ? selectedStatus && selectedStatus[0] !== ""
                      : true) &&
                    (section === QA_CERT_DATA_MAINTENANCE_STORE_NAME
                      ? typeSelection && typeSelection[0] !== ""
                      : true)
                  )
                }
                //   onClick={applyFilters}
                outline={false}
              >
                Apply Filter(s)
              </Button>
            </div>
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  );
};

export default FilterFormAdmin;
