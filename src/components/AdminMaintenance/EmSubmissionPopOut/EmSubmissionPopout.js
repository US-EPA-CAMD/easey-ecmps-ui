import React, { useState, useEffect } from "react";
import { GridContainer, Grid, Label, DatePicker, Textarea, Checkbox } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { currentDateTime, dateToEstString } from "../../../utils/functions";

const getDateString = (date) => {
  let d = new Date(dateToEstString(date)).toISOString();
  let dArr = d.split('T')

  return dArr[0]
}

export const EmSubmissionModal = ({ showModal, close, isOpenModal, isExtendModal, isCloseModal, isApproveModal, openDate }) => {

  const [title, setTitle] = useState('');

  const [selectedReasonToOpen, setSelectedReasonToOpen] = useState('');
  const [selectedOpenDate, setSelectedOpenDate] = useState('');
  const [selectedCloseDate, setSelectedCloseDate] = useState('');
  const [selectedRequireSubQtrs, setSelectedRequireSubQtrs] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const saveFunc = () => {
    close()
    /* TODO: CALL RESPECTIVE API TO UPDATE DATA */
  }

  useEffect(() => {
    if (isOpenModal) {
      setTitle("Open")

      let date = currentDateTime()
      setSelectedOpenDate(getDateString(date))
      let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      setSelectedCloseDate(getDateString(lastDayOfMonth))

    } else if (isExtendModal) {
      setTitle("Extend")

      setSelectedOpenDate(getDateString(openDate))
      let date = currentDateTime()
      let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      setSelectedCloseDate(getDateString(lastDayOfMonth))

    } else if (isCloseModal) {
      setTitle("Close")
    } else if (isApproveModal) {
      setTitle("Approve")
    }


  }, [isOpenModal, isExtendModal, isCloseModal, isApproveModal, openDate])

  const updateDates = (e) => {
    let date = new Date(e)
    setSelectedOpenDate(getDateString(e))
    date.setDate(date.getDate() + 30);
    setSelectedCloseDate(getDateString(date))
  }

  return (
    <div>
      <Modal
        showDarkBg
        show={showModal}
        save={saveFunc}
        exitBTN={"Save and Close"}
        showSave
        title={`${title} Submission Access`}
        close={close}
        width={"40%"}
      >
        {showLoader ?
          <Preloader />
          :
          <GridContainer className='margin-left-1'>
            {(isOpenModal || isExtendModal) && selectedOpenDate && selectedCloseDate ? <Grid row gap={2} className='maxw-mobile-lg'>
              <Grid col={6} mobile={{ col: 12 }} desktop={{ col: 6 }} className='margin-top-1'>
                <Label
                  htmlFor="open-date-label"
                >
                  Open Date
                </Label>
                <DatePicker
                  aria-labelledby="open-date"
                  id="open-date"
                  name="open-date"
                  epa-testid={"open-date"}
                  data-testid={"open-date"}
                  placeholder="Select Open Date"
                  defaultValue={selectedOpenDate}
                  minDate={new Date().toISOString()}
                  onChange={updateDates}
                  disabled={isExtendModal}
                />
              </Grid>
              <Grid col={6} mobile={{ col: 12 }} desktop={{ col: 6 }} className='margin-top-1'>
                <Label
                  htmlFor="close-date-label"
                >
                  Close Date
                </Label>
                <DatePicker
                  aria-labelledby="close-date"
                  id="close-date"
                  name="close-date"
                  placeholder="Select Close Date"
                  defaultValue={selectedCloseDate}
                  epa-testid={"close-date"}
                  data-testid={"close-date"}
                  onChange={(e) => setSelectedCloseDate(getDateString(e))}
                  disabled={isOpenModal}
                />
              </Grid>
            </Grid> : null}

            {isOpenModal ?
              <Grid row className='margin-top-1'>
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
              </Grid> : null}

            <Grid row className={isOpenModal || isExtendModal ? "margin-top-2" : ""}>
              <Grid col={12}>
                <Label htmlFor="reason-to-open" id="reason-to-open-label">Reason to {title}</Label>
                <Textarea
                  className="maxw-full"
                  id="reason-to-open"
                  name="reason-to-open"
                  type="text"
                  epa-testid={"reason-to-open"}
                  data-testid={"reason-to-open"}
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