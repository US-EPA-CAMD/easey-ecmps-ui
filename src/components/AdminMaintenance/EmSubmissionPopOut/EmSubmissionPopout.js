import React, { useState, useEffect } from "react";
import { GridContainer, Grid, Label, DatePicker, Textarea, Checkbox } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import { Preloader } from "@us-epa-camd/easey-design-system";

export const EmSubmissionModal = ({ showModal, close, isOpenModal }) => {

  const [reasonToOpen, setReasonToOpen] = useState('');
  const [selectedOpenDate, setSelectedOpenDate] = useState(new Date().toISOString());
  const [selectedCloseDate, setSelectedCloseDate] = useState(new Date(new Date().setDate(new Date().getDate() + 30)).toISOString());

  const [showLoader, setShowLoader] = useState(false);
  const [selectedRequireSubQtrs, setSelectedRequireSubQtrs] = useState(false);

  const saveFunc = () => { }

  useEffect(() => {
    let date = new Date(selectedOpenDate)
    date.setDate(date.getDate() + 30);
    setSelectedCloseDate(date.toISOString())
  }, [selectedOpenDate, selectedCloseDate])

  return (
    <div>
      <Modal
        showDarkBg
        show={showModal}
        save={saveFunc}
        exitBTN={"Save and Close"}
        showSave
        title={"Open Submission Access"}
        close={close}
        width={"40%"}
      >
        {showLoader ?
          <Preloader />
          :
          <GridContainer className='margin-left-1'>
            {isOpenModal ? <Grid row gap={2} className='maxw-mobile-lg'>
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
                  onChange={(e) => setSelectedOpenDate(new Date(e).toISOString())}
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
                  onChange={(e) => setSelectedCloseDate(new Date(e).toISOString())}
                  disabled={isOpenModal}

                />
              </Grid>
            </Grid> : null}

            {isOpenModal ?
              <Grid row className='margin-bottom-2 margin-top-1'>
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

            <Grid row>
              <Grid col={12}>
                <Label htmlFor="reason-to-open" id="reason-to-open-label">Reason to Open</Label>
                <Textarea
                  className="maxw-full"
                  id="reason-to-open"
                  name="reason-to-open"
                  type="text"
                  value={reasonToOpen}
                  onChange={(e) => { setReasonToOpen(e.target.value) }}
                />
              </Grid>
            </Grid>
          </GridContainer>
        }
      </Modal>
    </div>
  )
}