import { Checkbox } from "@trussworks/react-uswds";
import { uniqueId } from "lodash";
import log from "loglevel";
import React, { useEffect, useState } from "react";

import { getCredentials } from "../../utils/api/easeyAuthApi";
import { DataStatus } from "../../utils/constants/dataStatus";
import Modal from "../Modal/Modal";
import StatusContent from "../StatusContent/StatusContent";
import DOMPurify from 'dompurify';

export const SubmissionCertificationsModal = ({
  monPlanId,
  onClose = () => {},
  onSave = () => {},
}) => {
  const [checkboxId] = useState(uniqueId("certifications-checkbox-"));
  const [checked, setChecked] = useState(false);
  const [statement, setStatement] = useState("");
  const [status, setStatus] = useState(DataStatus.IDLE);

  useEffect(() => {
    if (!monPlanId) return;

    setStatus(DataStatus.PENDING);
    // TODO: The table used under the hood in `getCredentials` may be changing, and it may be preferable to use a different API endpoint to fetch the MATS certification statement by location ID.
    getCredentials([monPlanId])
      .then((res) => {
        const matsStatement = res?.data?.items?.find(
          (item) => item.prgCode === "MATS",
        );
        if (!matsStatement?.statementText) {
          const message =
            "No MATS certification statement found for this location.";
          log.warn(message);
          setStatement(message);
        } else {
          setStatement(matsStatement.statementText);
        }
        setStatus(DataStatus.SUCCESS);
      })
      .catch((err) => {
        log.error("Error fetching certification statements:", err);
        setStatus(DataStatus.ERROR);
      });
  }, [monPlanId]);

  return (
    <Modal
      title="Certification Statement"
      close={onClose}
      disableExitBtn={!checked}
      exitBtn="Sign & Submit"
      save={onSave}
      showDarkBg={true}
      showSave={status === DataStatus.SUCCESS}
    >
      <StatusContent
        status={status}
        errorMsg="Error loading certification statement."
      >
        {/* HTML will be text we need to wrap in dangerouslySetInnerHTML only when the HTML comes from a trusted backend. The text HTML should be sanitize */}
        <p className="margin-x-2"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(statement)}}></p> 
        <div className="modal-footer">
          <Checkbox
            className="display-inline-block margin-right-2"
            id={checkboxId}
            name="checkbox"
            data-testid="component-checkbox"
            onChange={(e) => setChecked(e.target.checked)}
            label="I agree to all certification statements"
          />
        </div>
      </StatusContent>
    </Modal>
  );
};

export default SubmissionCertificationsModal;
