import React, { useState, useRef, useEffect } from "react";
import FilterFormAdmin from "./FilterFormAdmin/FilterFormAdmin";
import { getAllFacilities } from "../../../utils/api/facilityApi";
import {
  QA_CERT_DATA_MAINTENANCE_STORE_NAME,
  SUBMISSION_ACCESS_STORE_NAME,
} from "../../../additional-functions/system-admin-section-and-store-names";


const SubmissionAccess = ({ user, section }) => {
  const [title, setTitle] = useState("Maintain EM Submission Access");
  const [dropdownFacilities, setDropdownFacilities] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [excludeErrors, setExcludeErrors] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [numFilesSelected, setNumFilesSelected] = useState(0);
  const filesSelected = useRef(0);

  useEffect(() => {
    switch (section) {
      case SUBMISSION_ACCESS_STORE_NAME:
        setTitle("Maintain EM Submission Access");
        break;
      case QA_CERT_DATA_MAINTENANCE_STORE_NAME:
        setTitle("QA/Cert Data Maintenance");
        break;
    }
  }, [section]);
  const [facilityList, setFacilityList] = useState([]);
  const applyFilter = async (orisCodes, monPlanIds, submissionPeriods) => {};
  useEffect(() => {
    getAllFacilities()
      .then(({ data }) => {
        const formattedFacilities = data.map((f) => ({
          value: f.facilityId,
          label: `${f.facilityName} (${f.facilityId})`,
        }));
        setFacilityList(formattedFacilities);

        // The following lines of code are hacks to mitigate an issue with the ComboBox USWDS component.
        // BUG: When the page is initially loaded, clicking on the combobox only brings up an empty list.
        //      The data does not populate until the second click. The below code does the initial click
        //      on the ComboBox and then focuses away again. Tab is then reset to where it was when page
        //      initially loaded.
        const previouslyFocusedEle = document.activeElement;
        document.getElementById("facility-name").click();
        document.activeElement.blur();
        previouslyFocusedEle.tabIndex = 0;
        previouslyFocusedEle.focus();
        previouslyFocusedEle.tabIndex = -1;
      })
      .catch((error) => {
        console.error("Error getting facilities", error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterClick = () => {};
  return (
    <div className="react-transition fade-in padding-x-3">
      <h2 className="grid-col-9 page-header margin-top-2">{title}</h2>

      <FilterFormAdmin filterClick={filterClick} facilities={facilityList} section ={section} />
    </div>
  );
};

export default SubmissionAccess;
