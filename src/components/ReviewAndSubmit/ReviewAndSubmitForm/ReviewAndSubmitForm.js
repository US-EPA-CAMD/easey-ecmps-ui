import { Tune } from '@material-ui/icons';
import {
  Button,
  Checkbox,
  Fieldset,
  Label,
  Radio,
} from '@trussworks/react-uswds';
import React, { useState } from 'react';
import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import SubmissionModal from '../../SubmissionModal/SubmissionModal';
import { checkboxes, dropdowns, radioButtons } from '../mockData';

const ReviewAndSubmitForm = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const submission = () => {
    closeModal();
  };

  const [activeComboboxes, setActiveComboboxes] = useState(
    dropdowns.reduce((acc, curr) => ({ ...acc, [curr.name]: false }), {})
  );
  const comboboxStyling = {
    combobox: 'margin-bottom-2 bg-white multi-select-combobox',
    listbox:
      'list-box bg-white display-block height-15 width-full overflow-y-scroll overflow-x-hidden',
  };

  return (
    <div className="">
      <div className="text-black margin-top-1 display-none tablet:display-block">
        <h2 className="display-inline-block page-header margin-top-2">
          Review And Submit
        </h2>
      </div>
      <div className="container border-y-1px border-base-lighter padding-y-2">
        <div className="checkboxes-radio grid-row">
          <div className="checkboxes grid-col-5">
            <Fieldset>
              {checkboxes.map((checkbox, i) => (
                <Checkbox
                  id={`${checkbox}-checkbox`}
                  name={checkbox}
                  label={checkbox}
                  key={i}
                />
              ))}
            </Fieldset>
          </div>
          <div className="radio grid-col-5 margin-top-3">
            <Fieldset>
              {radioButtons.map((radio, i) => (
                <Radio
                  id={`${radio}-radio-button`}
                  name="critical-errors-radio"
                  label={radio}
                  key={i}
                />
              ))}
            </Fieldset>
          </div>
        </div>
        <div className="dropdowns grid-row">
          {dropdowns.map((dropdown, i) => {
            const { name, items } = dropdown;
            return (
              <div className="grid-col-5 margin-top-2" key={i}>
                <div className="margin-right-2">
                  <ComboboxButton
                    label={name}
                    onClickHandler={() =>
                      setActiveComboboxes({
                        ...activeComboboxes,
                        [name]: !activeComboboxes[name],
                      })
                    }
                  />
                  <MultiSelectCombobox
                    items={items}
                    styling={comboboxStyling}
                    hideInput={true}
                    entity={name}
                    hideListBox={!activeComboboxes[name]}
                    searchBy="label"
                    onChangeUpdate={(args) => console.log(args)}
                  />
                </div>
              </div>
            );
          })}
          <div className="buttons grid-col-6">
            <div className="display-flex flex-row flex-justify-end margin-top-5">
              <Button outline={true}>Apply Filter(s)</Button>
              <Button
                onClick={() => {
                  setShowModal(true);
                }}
                disabled={false}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <SubmissionModal
          show={showModal}
          close={closeModal}
          submissionCallback={submission}
          monitorPlanIds={[
            'TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A',
            '02183-7RSS-09C865120F7C4FD6AFB801E02773AEDB',
          ]}
        />
      )}
    </div>
  );
};

const ComboboxButton = ({ label, onClickHandler }) => (
  <>
    <Label id={`${label}-label`} htmlFor={`${label}-button`}>
      {label}
    </Label>
    <button
      name={label}
      id={`${label}-button`}
      className="margin-top-1 margin-bottom-0 border-1px bg-white multi-select-combobox width-full height-5 padding-x-1"
      onClick={onClickHandler}
    >
      <span className="search position-static border-0 float-left">select</span>
      <Tune
        fontSize="small"
        className="pin-right margin-right-3 padding-top-05"
        tabIndex={-1}
      />
    </button>
  </>
);

export default ReviewAndSubmitForm;
