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

import Modal from "../Modal/Modal";
import { configurationManagementTitle } from "../../utils/constants/moduleTitles";
import { getAllFacilities } from "../../utils/api/facilityApi";
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

  /*
  ## SIDE EFFECTS
  */

  useEffect(() => {
    document.title = configurationManagementTitle;
  }, []);

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

  /*
  ## EVENT HANDLERS
  */

  const handleCheckout = () => {};
  const handleCloseModal = () => setModalVisible(false);
  const handleConfirmSave = () => {};
  const handleFacilityChange = (e) => setSelectedFacility(e.target.value);
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

  return (
    <>
      <div className="react-transition fade-in padding-x-3">
        <h2 className="page-header margin-top-2">Configuration Management</h2>
        <hr />
        <GridContainer className="padding-left-0 margin-left-0 padding-right-0">
          <Grid row>
            {facilitiesStatus === fetchStatus.PENDING && <p>Loading...</p>}
            {facilitiesStatus === fetchStatus.ERROR && (
              <Alert noIcon slim type="error" headingLevel="h4">
                Error loading facilities
              </Alert>
            )}
            {facilitiesStatus === fetchStatus.SUCCESS && (
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
            )}
          </Grid>
          <Grid row>
            <h3>Units</h3>
          </Grid>
          <Grid row>
            <div className="margin-bottom-2">
              <SizedPreloader />
            </div>
          </Grid>
          <Grid row>
            <h3>Stacks & Pipes</h3>
          </Grid>
          <Grid row>
            <div className="margin-bottom-2">
              <SizedPreloader />
            </div>
          </Grid>
          <Grid row>
            <h3>Unit Stack Configurations</h3>
          </Grid>
          <Grid row>
            <div className="margin-bottom-2">
              <SizedPreloader />
            </div>
          </Grid>
          <Grid>
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
