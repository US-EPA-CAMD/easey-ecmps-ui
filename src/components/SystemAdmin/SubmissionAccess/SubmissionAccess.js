import React, { useState, useRef, useEffect } from "react";
import FilterFormAdmin from "./FilterFormAdmin/FilterFormAdmin";
import { getAllFacilities } from "../../../utils/api/facilityApi";
const SubmissionAccess = ({ user }) => {
  const [title, setTitle] = useState("Maintain EM Submission Access");
  const [dropdownFacilities, setDropdownFacilities] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [excludeErrors, setExcludeErrors] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [numFilesSelected, setNumFilesSelected] = useState(0);
  const filesSelected = useRef(0);

  useEffect(() => {
    setTitle("Maintain EM Submission Access");
  }, []);
  const [facilityList, setFacilityList] = useState([]);
  const applyFilter = async (orisCodes, monPlanIds, submissionPeriods) => {};
  useEffect(() => {
    getAllFacilities()
      .then(({ data }) => {
        const formattedFacilities = data.map((f) => ({
          value: f.orisCode ,
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

      <FilterFormAdmin filterClick={filterClick} facilities={facilityList} />
    </div>
  );
};

export default SubmissionAccess;
