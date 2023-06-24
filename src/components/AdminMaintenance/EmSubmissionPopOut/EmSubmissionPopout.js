import React, { useState, useEffect } from "react";
import { GridContainer, Grid, Label, DatePicker, Textarea, Checkbox } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { currentDateTime, dateToEstString } from "../../../utils/functions";

export const EmSubmissionModal = ({ showModal, close, isOpenModal, isExtendModal, isCloseModal, isApproveModal, openDate, closeDate, reasonToOpen }) => {

  const [title, setTitle] = useState('');
  const [txtBoxLabel, setTxtBoxLabel] = useState('');

  const [selectedReasonToOpen, setSelectedReasonToOpen] = useState('');
  const [selectedOpenDate, setSelectedOpenDate] = useState('');
  const [selectedCloseDate, setSelectedCloseDate] = useState('');
  const [selectedRequireSubQtrs, setSelectedRequireSubQtrs] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const saveFunc = () => {/* 
  TODO: CALL RESPECTIVE API TO UPDATE DATA
  */}

  useEffect(() => {
    if (isOpenModal) {
      setTitle("Open Submission Access")
      setTxtBoxLabel("Reason to Open")
      let date = currentDateTime()
      setSelectedOpenDate(date.toISOString())
      date.setDate(date.getDate() + 30)
      setSelectedCloseDate(date.toISOString())
    } else if (isExtendModal) {
      setTitle("Extend Submission Access")
      setTxtBoxLabel("Reason to Extend")
      setSelectedOpenDate(new Date(dateToEstString(openDate)).toISOString())
      setSelectedCloseDate(new Date(dateToEstString(closeDate)).toISOString())
    } else if (isCloseModal) {
      setTitle("Close Submission Access")
      setTxtBoxLabel("Reason to Close")
    } else if (isApproveModal) {
      setTitle("Approve Submission Access")
      setTxtBoxLabel("Reason to Approve")
    }


  }, [isOpenModal, isExtendModal, isCloseModal, isApproveModal, openDate, closeDate])

  useEffect(() => {
    let date = currentDateTime(selectedOpenDate)
    date.setDate(date.getDate() + 30);
    setSelectedCloseDate(date.toISOString())
  }, [selectedOpenDate])

  return (
    <div>
      <Modal
        showDarkBg
        show={showModal}
        save={saveFunc}
        exitBTN={"Save and Close"}
        showSave
        title={title}
        close={close}
        width={"40%"}
      >
        {showLoader ?
          <Preloader />
          :
          <GridContainer className='margin-left-1'>
            {isOpenModal || isExtendModal ? <Grid row gap={2} className='maxw-mobile-lg'>
              <Grid col={6} mobile={{ col: 12 }} desktop={{ col: 6 }} className='margin-top-1'>
                <Label
                  htmlFor="add-begin-date-2"
                  id="add-begin-date-2"
                >
                  Open Date
                </Label>
                <DatePicker
                  aria-labelledby="add-begin-date-2"
                  id="add-begin-date-2"
                  name="add-begin-date-2"
                  placeholder="Select Open Date"
                  defaultValue={selectedOpenDate}
                  value={selectedOpenDate}
                  minDate={new Date().toISOString()}
                  onChange={(e) => setSelectedOpenDate(new Date(dateToEstString(e)).toISOString())}
                  disabled={isExtendModal}
                />
              </Grid>
              <Grid col={6} mobile={{ col: 12 }} desktop={{ col: 6 }} className='margin-top-1'>
                <Label
                  htmlFor="add-end-date-2"
                  id="add-end-date-2"
                >
                  Close Date
                </Label>
                <DatePicker
                  aria-labelledby="add-end-date-2"
                  id="add-end-date-2"
                  name="add-end-date-2"
                  placeholder="Select Close Date"
                  defaultValue={selectedCloseDate}
                  value={selectedCloseDate}
                  onChange={(e) => setSelectedCloseDate(new Date(dateToEstString(e)).toISOString())}
                  disabled={isOpenModal}
                />
              </Grid>
            </Grid> : null}

            {isOpenModal ?
              <Grid row className='margin-top-1'>
                <Grid col={12}>
                  <Checkbox
                    id="add-require-sub-qtrs"
                    name="require-sub-qtrs"
                    label="Require Subsequent Quarters"
                    checked={selectedRequireSubQtrs}
                    value={selectedRequireSubQtrs}
                    onChange={() =>
                      setSelectedRequireSubQtrs((previousVal) => !previousVal)
                    }
                  />
                </Grid>
              </Grid> : null}

            <Grid row className={isOpenModal || isExtendModal ? "margin-top-2" : ""}>
              <Grid col={12}>
                <Label htmlFor="reason-to-open" id="reason-to-open-label">{txtBoxLabel}</Label>
                <Textarea
                  className="maxw-full"
                  id="reason-to-open"
                  name="reason-to-open"
                  type="text"
                  value={selectedReasonToOpen}
                  onChange={(e) => { setSelectedReasonToOpen(e.target.value) }}
                />
              </Grid>
            </Grid>
          </GridContainer>
        }
      </Modal>
    </div>
  )
}