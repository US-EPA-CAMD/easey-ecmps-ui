import { Checkbox } from "@trussworks/react-uswds";
import { uniqueId } from "lodash";
import log from "loglevel";
import React, { useEffect, useState } from "react";

import { getCredentials } from "../../utils/api/easeyAuthApi";
import { DataStatus } from "../../utils/constants/dataStatus";
import Modal from "../Modal/Modal";
import StatusContent from "../StatusContent/StatusContent";

export const SubmissionCertificationsModal = ({
  monPlanId,
  onClose = () => {},
  onSave = () => {},
}) => {
  const [checkboxId] = useState(uniqueId("certifications-checkbox-"));
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(DataStatus.IDLE);
  const [statement, setStatement] = useState([]);

  useEffect(() => {
    setStatus(DataStatus.PENDING);
    getCredentials([monPlanId])
      .then((res) => {
        if (!res?.data?.items?.length) {
          log.error(
            "No certification statements found for the monitoring plan.",
          );
          setStatus(DataStatus.ERROR);
          return;
        }
        setStatement(res.data.items[0].statementText);
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
        <p>{statement}</p>
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
