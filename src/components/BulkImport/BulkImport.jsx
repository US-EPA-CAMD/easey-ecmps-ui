import React, { useState, useEffect, useCallback } from "react";
import { Button, Alert } from "@trussworks/react-uswds";

import LatestImport from "./LatestImport";
import NewImportModal from "./NewImportModal";
import { getLatestImport } from "../../utils/api/camdServices";

const POLL_MS = 10000;

function BulkImport({ user }) {
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadLatest = useCallback(async () => {
    const res = await getLatestImport();
    setLatest(res?.data ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadLatest();
    const id = setInterval(loadLatest, POLL_MS);
    return () => clearInterval(id);
  }, [loadLatest]);

  if (!user) {
    return (
      <Alert
        noIcon
        slim
        type="error"
        headingLevel="h2"
        className="margin-bottom-1 width-full"
      >
        You must be logged in to access this page.
      </Alert>
    );
  }

  // Only one import at a time: block a new one while the latest is still running.
  const importInProgress =
    latest && !["COMPLETE", "ERROR"].includes(latest.statusCode);

  return (
    <div className="react-transition fade-in padding-x-3" id="bulk-import">
      <h2 className="page-header margin-top-2">Bulk Import</h2>
      <hr />
      <Button
        type="button"
        onClick={() => setShowModal(true)}
        disabled={importInProgress}
      >
        Start New Import
      </Button>
      <LatestImport latest={latest} loading={loading} />
      {showModal && (
        <NewImportModal
          user={user}
          onClose={() => setShowModal(false)}
          onSubmitted={() => {
            setShowModal(false);
            loadLatest();
          }}
        />
      )}
    </div>
  );
}

export default BulkImport;
