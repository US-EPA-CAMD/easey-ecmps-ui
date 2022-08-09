import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteQALinearitySummary,
  getQALinearitySummary,
  updateQALinearitySummaryTestSecondLevel,
  createQALinearitySummaryTestSecondLevel
} from "../../../utils/api/qaCertificationsAPI.js";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";
import { getLinearitySummaryRecords } from "../../../utils/selectors/QACert/TestSummary.js";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
  returnFocusToLast,
} from "../../../additional-functions/manage-focus";
import { Button } from "@trussworks/react-uswds";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";
import { addAriaLabelToDatatable } from "../../../additional-functions/ensure-508";
/*********** COMPONENTS ***********/

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Preloader } from "@us-epa-camd/easey-design-system";

import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import QALinearitySummaryDataRows from "./LinearitySummaryDataRows.js";
// contains test summary data table

const QALinearitySummaryExpandableRows = ({
  user,
  nonEditable,
  locationSelectValue,
  data,
}) => {

  return (
    <>
      <h1>qa lineary summary data rows</h1>
      <QALinearitySummaryDataRows
        user={user}
        nonEditable={nonEditable}
        locationSelectValue={locationSelectValue}
        data={data}
      />
    </>
  )
}

export default QALinearitySummaryExpandableRows
