import React, { useState, useEffect } from "react";
import {
  GridContainer,
  Grid,
  Label,
  DatePicker,
  Textarea,
  Checkbox,
} from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { currentDateTime, dateToEstString } from "../../../utils/functions";
import * as emSubmissionApi from "../../../utils/api/adminManagementApi";

const getDateString = (date) => {
  let d = new Date(dateToEstString(date)).toISOString();
  let dArr = d.split("T");

  return dArr[0];
};

export const EmSubmissionModal = ({
  showModal,
  close,
  isOpenModal,
  isExtendModal,
  isCloseModal,
  isApproveModal,
  selectedRows,
  setReloadTableData,
  reportingPeriods,
}) => {
  const [title, setTitle] = useState("");

  const [selectedReasonForAction, setSelectedReasonForAction] = useState("");
  const [selectedOpenDate, setSelectedOpenDate] = useState("");
  const [selectedCloseDate, setSelectedCloseDate] = useState("");
  const [selectedRequireSubQtrs, setSelectedRequireSubQtrs] = useState(false);

  const [showLoader, setShowLoader] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);
  const selectedRow = selectedRows[0];

  const resubExplanationUpdate = (row) => {
    let resubExplanation;

    const isCurrentResubExplEmpty =
      row.resubExplanation === null || row.resubExplanation === "";
    if (isCurrentResubExplEmpty) resubExplanation = "";

    if (isCurrentResubExplEmpty && selectedReasonForAction.length > 0)
      resubExplanation = selectedReasonForAction;

    if (!isCurrentResubExplEmpty && selectedReasonForAction.length === 0)
      resubExplanation = row.resubExplanation;

    if (!isCurrentResubExplEmpty && selectedReasonForAction.length > 0)
      resubExplanation = `${row.resubExplanation}, ${selectedReasonForAction}`;

    return resubExplanation;
  };

  const openEmSubmissionRecord = async () => {
    const selectedRp = reportingPeriods.find(
      (rp) => rp.id === selectedRow.reportingPeriodId
    );

    if (!selectedRow) return;

    const postPayload = {
      emissionStatusCode: selectedRow.emissionStatusCode,
      submissionAvailabilityCode: selectedRow.submissionAvailabilityCode,
      resubExplanation: selectedReasonForAction,
      closeDate: selectedCloseDate,
      openDate: selectedOpenDate,
      monitorPlanId: selectedRow.monitorPlanId,
      reportingPeriodId: selectedRow.reportingPeriodId,
    };

    postPayload.reportingPeriodId = selectedRp.id;
    await emSubmissionApi.openEmSubmissionRecord(postPayload);

    if (selectedRequireSubQtrs) {
      for (let i = selectedRp.quarter + 1; i <= 4; i++) {
        const filteredRp = reportingPeriods.find(
          (rp) =>
            rp.calendarYear === selectedRp.calendarYear && rp.quarter === i
        );
        postPayload.reportingPeriodId = filteredRp.id;

        await emSubmissionApi.openEmSubmissionRecord(postPayload);
      }
    }
  };

  const extendSubmissionRecord = async () => {
    const putPayloads = selectedRows.map((row) => {
      // append reason if it exists
      let resubExplanation = resubExplanationUpdate(row);
      const payload = {
        id: row.id,
        emissionStatusCode: row.emissionStatusCode,
        submissionAvailabilityCode: row.submissionAvailabilityCode,
        resubExplanation,
        closeDate: selectedCloseDate,
      };
      return payload;
    });
    const promises = putPayloads.map((payload) => {
      const id = payload.id;
      return emSubmissionApi.updateEmSubmissionRecord(payload, id);
    });
    await Promise.all(promises);
  };

  const closeEmSubmissionRecord = async () => {
    const putPayloads = selectedRows.map((row) => ({
      id: row.id,
      emissionStatusCode: row.emissionStatusCode,
      submissionAvailabilityCode: "DELETE",
      resubExplanation: selectedReasonForAction,
      closeDate: row.closeDate,
    }));

    const promises = putPayloads.map((payload) =>
      emSubmissionApi.updateEmSubmissionRecord(payload, payload.id)
    );

    await Promise.all(promises);
  };

  const approveEmSubmissionRecord = async () => {
    const putPayloads = selectedRows.map((row) => {
      let resubExplanation = resubExplanationUpdate(row);

      const payload = {
        id: row.id,
        emissionStatusCode: "APPRVD",
        submissionAvailabilityCode: row.submissionAvailabilityCode,
        resubExplanation,
        closeDate: row.closeDate,
      };
      return payload;
    });
    const promises = putPayloads.map((payload) => {
      const id = payload.id;
      return emSubmissionApi.updateEmSubmissionRecord(payload, id);
    });
    await Promise.all(promises);
  };

  const saveFunc = async () => {
    setShowLoader(true);
    setDisableSaveBtn(true);

    try {
      if (isOpenModal) {
        await openEmSubmissionRecord();
      }

      if (isCloseModal) {
        await closeEmSubmissionRecord();
      }

      if (isExtendModal) {
        await extendSubmissionRecord();
      }

      if (isApproveModal) {
        await approveEmSubmissionRecord();
      }
      setReloadTableData(true);
    } catch (e) {
      console.error(e);
    } finally {
      close();
    }
  };

  useEffect(() => {
    if (isOpenModal) {
      setTitle("Open");

      let date = currentDateTime();
      setSelectedOpenDate(getDateString(date));
      let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      setSelectedCloseDate(getDateString(lastDayOfMonth));
    } else if (isExtendModal) {
      setTitle("Extend");

      setSelectedOpenDate(getDateString(selectedRow?.openDate));
      setSelectedCloseDate(getDateString(selectedRow?.closeDate));
    } else if (isCloseModal) {
      setTitle("Close");
    } else if (isApproveModal) {
      setTitle("Approve");
    }
  }, [
    isOpenModal,
    isExtendModal,
    isCloseModal,
    isApproveModal,
    selectedRow.openDate,
    selectedRow.closeDate,
  ]);

  useEffect(() => {
    if (isOpenModal || isExtendModal) {
      setTimeout(() => {
        let openDateTglBtn = document
          .querySelector("#open-date")
          ?.parentElement?.querySelector("button");
        let closeDateTglBtn = document
          .querySelector("#close-date")
          ?.parentElement?.querySelector("button");

        openDateTglBtn.setAttribute(
          "aria-label",
          "Toggle calendar for Open Date"
        );
        closeDateTglBtn.setAttribute(
          "aria-label",
          "Toggle calendar for Close Date"
        );
      }, 500);
    }
  }, [isOpenModal, isExtendModal, showModal]);

  const updateDates = (e) => {
    let date = new Date(e);
    setSelectedOpenDate(getDateString(e));
    date.setDate(date.getDate() + 30);
    setSelectedCloseDate(getDateString(date));
  };

  return (
    <div>
      <Modal
        showDarkBg
        show={showModal}
        save={saveFunc}
        exitBtn={"Save and Close"}
        showSave
        disableExitBtn={disableSaveBtn}
        title={`${title} Submission Access`}
        close={close}
        width={"45%"}
      >
        {showLoader ? (
          <Preloader />
        ) : (
          <GridContainer className="margin-left-1">
            {(isOpenModal || isExtendModal) &&
            selectedOpenDate &&
            selectedCloseDate ? (
              <Grid row gap={2} className="maxw-mobile-lg">
                <Grid
                  col={6}
                  mobile={{ col: 12 }}
                  desktop={{ col: 6 }}
                  className="margin-top-1"
                >
                  <Label htmlFor="open-date">Open Date</Label>
                  <DatePicker
                    aria-label="open-date"
                    id="open-date"
                    name="open-date"
                    epa-testid={"open-date"}
                    data-testid={"open-date"}
                    placeholder="Select Open Date"
                    defaultValue={selectedOpenDate}
                    minDate={selectedOpenDate}
                    onChange={updateDates}
                    disabled={isExtendModal}
                  />
                </Grid>
                <Grid
                  col={6}
                  mobile={{ col: 12 }}
                  desktop={{ col: 6 }}
                  className="margin-top-1"
                >
                  <Label htmlFor="close-date">Close Date</Label>
                  <DatePicker
                    aria-label="close-date"
                    id="close-date"
                    name="close-date"
                    placeholder="Select Close Date"
                    defaultValue={selectedCloseDate}
                    epa-testid={"close-date"}
                    data-testid={"close-date"}
                    minDate={selectedCloseDate}
                    onChange={(e) => setSelectedCloseDate(getDateString(e))}
                  />
                </Grid>
              </Grid>
            ) : null}

            {isOpenModal ? (
              <Grid row className="margin-top-1">
                <Grid col={12}>
                  <Checkbox
                    id="require-sub-qtrs"
                    name="require-sub-qtrs"
                    label="Require Subsequent Quarters"
                    epa-testid={"require-sub-qtrs"}
                    data-testid={"require-sub-qtrs"}
                    checked={selectedRequireSubQtrs}
                    value={selectedRequireSubQtrs}
                    onChange={() =>
                      setSelectedRequireSubQtrs((previousVal) => !previousVal)
                    }
                  />
                </Grid>
              </Grid>
            ) : null}

            <Grid
              row
              className={isOpenModal || isExtendModal ? "margin-top-2" : ""}
            >
              <Grid col={12}>
                <Label htmlFor="reason-to-open" id="reason-to-open-label">
                  Reason to {title}
                </Label>
                <Textarea
                  className="maxw-full"
                  id="reason-to-open"
                  name="reason-to-open"
                  type="text"
                  epa-testid={"reason-to-open"}
                  data-testid={"reason-to-open"}
                  value={selectedReasonForAction}
                  onChange={(e) => {
                    setSelectedReasonForAction(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </GridContainer>
        )}
      </Modal>
    </div>
  );
};

