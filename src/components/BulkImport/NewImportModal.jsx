import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@trussworks/react-uswds";

import Modal from "../Modal/Modal";
import { DataStatus } from "../../utils/constants/dataStatus";
import { parseErrorMessage } from "../../utils/api/apiUtils";
import { checkoutPlansForImport } from "./importCheckout";
import {
  createImportSet,
  stageImportFiles,
  deleteImportFiles,
  submitImport,
} from "../../utils/api/camdServices";

const TYPE_ORDER = { MP: 1, QA: 2, EM: 3 };

// ORIS -> file type (MP, QA, EM) -> emissions quarter.
const sortFiles = (files) =>
  [...files].sort(
    (a, b) =>
      a.orisCode - b.orisCode ||
      (TYPE_ORDER[a.fileType] ?? 9) - (TYPE_ORDER[b.fileType] ?? 9) ||
      (a.reportingPeriod ?? "").localeCompare(b.reportingPeriod ?? "")
  );

const formatBytes = (bytes) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
};

const NewImportModal = ({ user, onClose, onSubmitted }) => {
  const [importSetId, setImportSetId] = useState(null);
  const [files, setFiles] = useState([]);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [busy, setBusy] = useState(false);
  const [saveStatus, setSaveStatus] = useState(DataStatus.IDLE);
  const fileInputRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await createImportSet(user.email, false);
        setImportSetId(res.data.importSetId);
      } catch (error) {
        setErrorMsgs([parseErrorMessage(error)]);
      }
    })();
  }, [user.email]);

  const addFiles = useCallback(
    async (fileList) => {
      if (!importSetId || fileList.length === 0) return;
      setBusy(true);
      setErrorMsgs([]);
      try {
        const staged = (await stageImportFiles(importSetId, fileList, false))
          .data;

        const blocked = await checkoutPlansForImport(
          staged.map((f) => f.monPlanId),
          user.userId
        );

        const accepted = staged.filter((f) => !blocked.has(f.monPlanId));
        const dropped = staged.filter((f) => blocked.has(f.monPlanId));

        if (dropped.length > 0) {
          await deleteImportFiles(
            importSetId,
            dropped.map((f) => f.s3Path)
          );
          setErrorMsgs([
            `These files were skipped because their monitoring plan is checked out by another user: ${dropped
              .map((f) => f.fileName)
              .join(", ")}.`,
          ]);
        }

        setFiles((prev) => sortFiles([...prev, ...accepted]));
      } catch (error) {
        setErrorMsgs([parseErrorMessage(error)]);
      } finally {
        setBusy(false);
      }
    },
    [importSetId, user.userId]
  );

  const handleFileChange = (e) => {
    addFiles(Array.from(e.target.files));
    e.target.value = ""; // allow re-adding the same file
  };

  const removeFile = async (file) => {
    await deleteImportFiles(importSetId, [file.s3Path]);
    setFiles((prev) => prev.filter((f) => f.s3Path !== file.s3Path));
  };

  // Cancel / close: clear the staged S3 files; the NEW set is left as a record.
  const cancel = async () => {
    if (importSetId) await deleteImportFiles(importSetId);
    onClose();
  };

  const submit = async () => {
    setSaveStatus(DataStatus.PENDING);
    setErrorMsgs([]);
    try {
      const items = files.map((f) => ({
        monPlanId: f.monPlanId,
        s3Path: f.s3Path,
        fileName: f.fileName,
        fileType: f.fileType,
        orisCode: f.orisCode,
        rptPeriodId: f.rptPeriodId,
      }));
      await submitImport(importSetId, items, false);
      onSubmitted();
    } catch (error) {
      // On failure clear the staged files and reset the table; set stays NEW.
      await deleteImportFiles(importSetId);
      setFiles([]);
      setErrorMsgs([parseErrorMessage(error)]);
      setSaveStatus(DataStatus.IDLE);
    }
  };

  return (
    <Modal
      show
      showSave
      title="New Import"
      exitBtn="Submit"
      close={cancel}
      save={submit}
      saveStatus={saveStatus}
      errorMsgs={errorMsgs}
      disableExitBtn={busy || files.length === 0}
      width="75%"
    >
      <div className="padding-top-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".json"
          className="usa-file-input"
          disabled={!importSetId || busy}
          onChange={handleFileChange}
        />

        {files.length > 0 && (
          <table className="usa-table usa-table--borderless width-full margin-top-2">
            <thead>
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">File Type</th>
                <th scope="col">Reporting Period</th>
                <th scope="col">ORIS</th>
                <th scope="col">Unit/Stack/Pipe</th>
                <th scope="col">File Size</th>
                <th scope="col">
                  <span className="usa-sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => (
                <tr key={f.s3Path}>
                  <td>{f.fileName}</td>
                  <td>{f.fileType}</td>
                  <td>{f.reportingPeriod ?? ""}</td>
                  <td>{f.orisCode}</td>
                  <td>{f.unitStackPipe}</td>
                  <td>{formatBytes(f.fileSize)}</td>
                  <td>
                    <Button
                      type="button"
                      unstyled="true"
                      onClick={() => removeFile(f)}
                      disabled={busy}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Modal>
  );
};

export default NewImportModal;
