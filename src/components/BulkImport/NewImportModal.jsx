import React, { useState, useCallback } from "react";
import { Button } from "@trussworks/react-uswds";
import { v4 as uuidv4 } from "uuid";
import DataTable from "react-data-table-component";
import { Preloader } from "@us-epa-camd/easey-design-system";

import Modal from "../Modal/Modal";
import { DataStatus } from "../../utils/constants/dataStatus";
import { parseErrorMessage } from "../../utils/api/apiUtils";
import { checkoutPlansForImport } from "./importCheckout";
import {
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

// Remove-file cell.
const RemoveButton = ({ row, onRemove, disabled }) => (
  <Button type="button" unstyled onClick={() => onRemove(row)} disabled={disabled}>
    Remove
  </Button>
);

const NewImportModal = ({ user, onClose, onSubmitted }) => {
  // Staging ID: the S3 folder key, and the import_set_id once submitted. No DB
  // row exists until submit.
  const [importSetId] = useState(uuidv4);
  const [files, setFiles] = useState([]);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [busy, setBusy] = useState(false); // staging ops: add / remove / cancel
  const [submitting, setSubmitting] = useState(false);

  const addFiles = useCallback(
    async (fileList) => {
      if (fileList.length === 0) return;
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

        // Dedupe by s3Path: re-adding a file overwrites its S3 object, so the
        // freshly staged version replaces any existing row.
        setFiles((prev) => {
          const acceptedPaths = new Set(accepted.map((f) => f.s3Path));
          const kept = prev.filter((f) => !acceptedPaths.has(f.s3Path));
          return sortFiles([...kept, ...accepted]);
        });
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
    setBusy(true);
    try {
      await deleteImportFiles(importSetId, [file.s3Path]);
      setFiles((prev) => prev.filter((f) => f.s3Path !== file.s3Path));
    } finally {
      setBusy(false);
    }
  };

  // Cancel / close: clear any staged S3 files. Nothing was persisted.
  const cancel = async () => {
    if (files.length > 0) {
      setBusy(true);
      await deleteImportFiles(importSetId);
    }
    onClose();
  };

  const submit = async () => {
    setSubmitting(true);
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
      await submitImport(importSetId, items, user.email, false);
      onSubmitted();
    } catch (error) {
      // On failure clear the staged files and reset the table; nothing persisted.
      await deleteImportFiles(importSetId);
      setFiles([]);
      setErrorMsgs([parseErrorMessage(error)]);
      setSubmitting(false);
    }
  };

  const processing = busy || submitting;

  const columns = [
    { name: "File Name", selector: (row) => row.fileName, sortable: true, grow: 2 },
    { name: "File Type", selector: (row) => row.fileType, sortable: true, width: "110px" },
    {
      name: "Reporting Period",
      selector: (row) => row.reportingPeriod ?? "",
      sortable: true,
      width: "160px",
    },
    { name: "ORIS", selector: (row) => row.orisCode, sortable: true, width: "100px" },
    { name: "Unit/Stack/Pipe", selector: (row) => row.unitStackPipe, sortable: true },
    {
      name: "File Size",
      selector: (row) => row.fileSize,
      format: (row) => formatBytes(row.fileSize),
      width: "110px",
    },
    {
      name: "",
      width: "110px",
      cell: (row) => (
        <RemoveButton row={row} onRemove={removeFile} disabled={processing} />
      ),
    },
  ];

  return (
    <Modal
      show
      showSave
      title="New Import"
      exitBtn="Submit"
      close={cancel}
      save={submit}
      saveStatus={submitting ? DataStatus.PENDING : DataStatus.IDLE}
      errorMsgs={errorMsgs}
      disableExitBtn={processing || files.length === 0}
      width="75%"
    >
      <div className="padding-top-2">
        <input
          type="file"
          multiple
          accept=".json"
          className="usa-file-input"
          disabled={processing}
          onChange={handleFileChange}
        />

        {(busy || files.length > 0) && (
          <DataTable
            keyField="s3Path"
            noHeader
            columns={columns}
            data={files}
            progressPending={busy}
            progressComponent={<Preloader />}
            className="data-display-table react-transition fade-in margin-top-2"
          />
        )}
      </div>
    </Modal>
  );
};

export default NewImportModal;
