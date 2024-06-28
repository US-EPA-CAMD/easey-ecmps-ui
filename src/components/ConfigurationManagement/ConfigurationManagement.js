import React, { useEffect, useMemo, useState } from "react";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { connect } from "react-redux";
import {
  Alert,
  GridContainer,
  Grid,
  Label,
  Dropdown,
  DatePicker,
  ButtonGroup,
  Button,
} from "@trussworks/react-uswds";

import CustomAccordion from "../CustomAccordion/CustomAccordion";
import Modal from "../Modal/Modal";
import { configurationManagementTitle } from "../../utils/constants/moduleTitles";
import {
  getAllFacilities,
  getUnitStackConfigsByFacId,
  getStackPipesByFacId,
  getUnitsByFacId,
} from "../../utils/api/facilityApi";
import { loadFacilitiesSuccess } from "../../store/actions/facilities";

const DEFAULT_DROPDOWN_TEXT = "-- Select a value --";
const fetchStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  IDLE: "IDLE",
};

export const ConfigurationManagement = ({
  checkedOutLocations,
  facilities,
  setFacilities,
  user,
}) => {
  /*
  ## STATE
  */

  const [errorMsgs, setErrorMsgs] = useState([]);
  const [facilitiesStatus, setFacilitiesStatus] = useState(fetchStatus.IDLE);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [stackPipes, setStackPipes] = useState([]);
  const [stackPipesStatus, setStackPipesStatus] = useState(fetchStatus.IDLE);
  const [units, setUnits] = useState([]);
  const [unitsStatus, setUnitsStatus] = useState(fetchStatus.IDLE);
  const [unitStackConfigs, setUnitStackConfigs] = useState([]);
  const [unitStackConfigsStatus, setUnitStackConfigsStatus] = useState(
    fetchStatus.IDLE
  );

  /*
  ## HELPERS
  */
  const resetFacilityData = () => {
    setUnits([]);
    setUnitsStatus(fetchStatus.IDLE);
    setStackPipes([]);
    setStackPipesStatus(fetchStatus.IDLE);
    setUnitStackConfigs([]);
    setUnitStackConfigsStatus(fetchStatus.IDLE);
  };

  /*
  ## SIDE EFFECTS
  */

  // Load facilities.
  useEffect(() => {
    if (facilitiesStatus === fetchStatus.IDLE) {
      if (facilities.length > 0) {
        setFacilitiesStatus(fetchStatus.SUCCESS);
      } else {
        try {
          setFacilitiesStatus(fetchStatus.PENDING);
          getAllFacilities().then((res) => {
            setFacilities(res.data);
            setFacilitiesStatus(fetchStatus.SUCCESS);
          });
        } catch (err) {
          setFacilitiesStatus(fetchStatus.ERROR);
        }
      }
    }
  }, [facilities, facilitiesStatus, setFacilities]);

  // Load units.
  useEffect(() => {
    if (!selectedFacility) return;

    if (unitsStatus === fetchStatus.IDLE) {
      try {
        setUnitsStatus(fetchStatus.PENDING);
        getUnitsById(selectedFacility).then((res) => {
          setUnits(res.data);
          setUnitsStatus(fetchStatus.SUCCESS);
        });
      } catch (err) {
        setUnitsStatus(fetchStatus.ERROR);
      }
    }
  }, [selectedFacility, unitsStatus]);

  // Load stacks & pipes.
  useEffect(() => {
    if (!selectedFacility) return;

    if (stackPipesStatus === fetchStatus.IDLE) {
      try {
        setStackPipesStatus(fetchStatus.PENDING);
        getStackPipesById(selectedFacility).then((res) => {
          setStackPipes(res.data);
          setStackPipesStatus(fetchStatus.SUCCESS);
        });
      } catch (err) {
        setStackPipesStatus(fetchStatus.ERROR);
      }
    }
  }, [selectedFacility, stackPipesStatus]);

  // Load unit stack configurations.
  useEffect(() => {
    if (!selectedFacility) return;

    if (unitStackConfigsStatus === fetchStatus.IDLE) {
      try {
        setUnitStackConfigsStatus(fetchStatus.PENDING);
        getUnitStackConfigsById(selectedFacility).then((res) => {
          setUnitStackConfigs(res.data);
          setUnitStackConfigsStatus(fetchStatus.SUCCESS);
        });
      } catch (err) {
        setUnitStackConfigsStatus(fetchStatus.ERROR);
      }
    }
  }, [selectedFacility, unitStackConfigsStatus]);

  /*
  ## EVENT HANDLERS
  */

  const handleCheckout = () => {};
  const handleCloseModal = () => setModalVisible(false);
  const handleConfirmSave = () => {};
  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value);
    resetFacilityData();
  };
  const handleInitialSave = () => {
    setModalVisible(true);
  };

  /*
  ## CALCULATED VALUES
  */

  // Format facilities for dropdown.
  const formattedFacilities = useMemo(() => {
    return facilities.map((f) => ({
      value: f.facilityId,
      label: `${f.facilityName} (${f.facilityId})`,
    }));
  }, [facilities]);

  const isCheckedOut = true;

  if (document.title !== configurationManagementTitle) {
    document.title = configurationManagementTitle;
  }

  return (
    <>
      <div className="react-transition fade-in padding-x-3">
        <h2 className="page-header margin-top-2">Configuration Management</h2>
        <hr />
        <GridContainer className="padding-left-0 margin-left-0 padding-right-0">
          <Grid row>
            <StatusContent
              headingLevel="h3"
              status={facilitiesStatus}
              label="facilities"
            >
              <p>
                <Label htmlFor="facility">Facility</Label>
                <Dropdown
                  onChange={handleFacilityChange}
                  id="facility"
                  name="facility"
                  value={selectedFacility}
                >
                  <option key="" value="">
                    {DEFAULT_DROPDOWN_TEXT}
                  </option>
                  {formattedFacilities.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </Dropdown>
                {selectedFacility && (
                  <Button
                    className="margin-top-2"
                    id="save-button"
                    onClick={handleCheckout}
                    type="button"
                  >
                    Check Out
                  </Button>
                )}
              </p>
            </StatusContent>
          </Grid>
          {selectedFacility && (
            <>
              <hr />
              <Grid row>
                <CustomAccordion
                  headingLevel="h3"
                  tables={[
                    {
                      title: "Units",
                      content: (
                        <StatusContent status={unitsStatus} label="units">
                          {null}
                        </StatusContent>
                      ),
                    },
                    {
                      title: "Stacks & Pipes",
                      content: (
                        <StatusContent
                          status={stackPipesStatus}
                          label="stacks & pipes"
                        >
                          {null}
                        </StatusContent>
                      ),
                    },
                    {
                      title: "Unit Stack Configurations",
                      content: (
                        <StatusContent
                          status={unitStackConfigsStatus}
                          label="unit stack configurations"
                        >
                          {null}
                        </StatusContent>
                      ),
                    },
                  ]}
                />
              </Grid>
              <Grid row>
                <Button
                  className="margin-top-2"
                  id="save-button"
                  onClick={handleInitialSave}
                  type="button"
                >
                  Save
                </Button>
                {modalVisible && (
                  <Modal
                    showDarkBg={true}
                    close={handleCloseModal}
                    exitBtn="Save"
                    save={handleConfirmSave}
                    showCancel={false}
                    showSave={user && isCheckedOut}
                    title="Change Summary"
                    errorMsgs={errorMsgs}
                  >
                    Show monitor plan changes
                  </Modal>
                )}
              </Grid>
            </>
          )}
        </GridContainer>
      </div>
    </>
  );
};

const SizedPreloader = () => (
  <div className="height-9 width-9">
    <Preloader showStopButton={false} />
  </div>
);

const StatusContent = ({ children, headingLevel = "h4", label, status }) => (
  <>
    {status === fetchStatus.PENDING && <SizedPreloader />}
    {status === fetchStatus.ERROR && (
      <Alert noIcon slim type="error" headingLevel={headingLevel}>
        Error loading {label}.
      </Alert>
    )}
    {status === fetchStatus.SUCCESS && children}
  </>
);

export const mapStateToProps = (state) => ({
  checkedOutLocations: state.checkedOutLocations,
  facilities: state.facilities,
});

export const mapDispatchToProps = (dispatch) => ({
  setFacilities: (facilities) => dispatch(loadFacilitiesSuccess(facilities)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationManagement);
