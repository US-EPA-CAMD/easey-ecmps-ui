import { Tune } from "@material-ui/icons";
import {
  Button,
  Checkbox,
  Fieldset,
  Label,
  Radio,
} from "@trussworks/react-uswds";
import React, { useState } from "react";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import SubmissionModal from "../../SubmissionModal/SubmissionModal";

const ReviewAndSubmitForm = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const submission = () => {
    closeModal();
  };

  const checkboxes = ["Monitoring Plan", "QA & Certification", "Emissions"];
  const radioButtons = [
    "Exclude Files with Critical Errors",
    "Include Files with Critical Errors",
  ];
  const reportingPeriods = [
      {
        id: 1,
        calendarYear: 1993,
        quarter: 1,
        beginDate: "1993-01-01",
        endDate: "1993-03-31",
        periodDescription: "1993 QTR 1",
        periodAbbreviation: "1993 Q1",
        archiveInd: 0,
        selected: false,
      },
      {
        id: 5,
        calendarYear: 1994,
        quarter: 1,
        beginDate: "1994-01-01",
        endDate: "1994-03-31",
        periodDescription: "1994 QTR 1",
        periodAbbreviation: "1994 Q1",
        archiveInd: 0,
        selected: false,
      },
      {
        id: 6,
        calendarYear: 1994,
        quarter: 2,
        beginDate: "1994-04-01",
        endDate: "1994-06-30",
        periodDescription: "1994 QTR 2",
        periodAbbreviation: "1994 Q2",
        archiveInd: 0,
        selected: false,
      },
    ],
    configurations = [
      {
        col1: "110",
        col2: "Inactive",
        col3: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
        facId: 1,
        monPlanId: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
      },
      {
        col1: "110",
        col2: "Active",
        col3: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
        facId: 2,
        monPlanId: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
      },
    ];
  const facilities = [
    {
      id: "1",
      facilityId: "3",
      facilityName: "Barry",
      stateCode: "AL",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/1",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/1/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/1/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/1/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/1/contacts",
        },
      ],
    },
    {
      id: "2",
      facilityId: "5",
      facilityName: "Chickasaw",
      stateCode: "AL",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/2",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/2/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/2/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/2/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/2/contacts",
        },
      ],
    },
    {
      id: "3",
      facilityId: "7",
      facilityName: "Gadsden",
      stateCode: "AL",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/3",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/3/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/3/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/3/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/3/contacts",
        },
      ],
    },
    {
      id: "4",
      facilityId: "8",
      facilityName: "Gorgas",
      stateCode: "AL",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/4",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/4/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/4/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/4/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/4/contacts",
        },
      ],
    },
    {
      id: "5",
      facilityId: "10",
      facilityName: "Greene County",
      stateCode: "AL",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/5",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/5/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/5/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/5/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/5/contacts",
        },
      ],
    },
    {
      id: "6",
      facilityId: "26",
      facilityName: "E C Gaston",
      stateCode: "AL",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/6",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/6/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/6/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/6/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/6/contacts",
        },
      ],
    },
    {
      id: "7",
      facilityId: "47",
      facilityName: "Colbert",
      stateCode: "AL",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/7",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/7/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/7/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/7/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/7/contacts",
        },
      ],
    },
    {
      id: "8",
      facilityId: "50",
      facilityName: "Widows Creek",
      stateCode: "AL",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/8",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/8/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/8/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/8/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/8/contacts",
        },
      ],
    },
    {
      id: "9",
      facilityId: "51",
      facilityName: "Dolet Hills Power Station",
      stateCode: "LA",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/9",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/9/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/9/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/9/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/9/contacts",
        },
      ],
    },
    {
      id: "10",
      facilityId: "54",
      facilityName: "Smith Generating Facility",
      stateCode: "KY",
      links: [
        {
          rel: "self",
          href: "/api/facility-mgmt/facilities/10",
        },
        {
          rel: "units",
          href: "/api/facility-mgmt/facilities/10/units",
        },
        {
          rel: "stacks",
          href: "/api/facility-mgmt/facilities/10/stacks",
        },
        {
          rel: "owners",
          href: "/api/facility-mgmt/facilities/10/owners",
        },
        {
          rel: "contacts",
          href: "/api/facility-mgmt/facilities/10/contacts",
        },
      ],
    },
  ];
  const dropdowns = [
    {
      name: "Facility ID(s)",
      items: facilities.map((f) => ({
        id: f.facilityId,
        label: `${f.facilityName} (${f.facilityId})`,
        selected: false,
        enabled: true,
      })),
    },
    {
      name: "Configuration(s)",
      items: configurations.map((config) => ({
        id: config.facId,
        label: `${config.monPlanId}`,
        selected: false,
        enabled: true,
      })),
    },
    {
      name: "Reporting Period(s)",
      items: reportingPeriods.map((period) => ({
        id: period.id,
        label: `${period.calendarYear} Q${period.quarter}`,
        selected: false,
        enabled: true,
      })),
    },
  ];
  const [activeComboboxes, setActiveComboboxes] = useState(
    dropdowns.reduce((acc, curr) => ({ ...acc, [curr.name]: false }), {})
  );
  const comboboxStyling = {
    combobox: "margin-bottom-2 bg-white multi-select-combobox",
    listbox:
      "list-box bg-white display-block height-15 width-full overflow-y-scroll overflow-x-hidden",
  };

  return (
    <div className="react-transition fade-in padding-x-3">
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
                  {activeComboboxes[name] && (
                    <MultiSelectCombobox
                      items={items}
                      styling={comboboxStyling}
                      hideInput={true}
                      entity={name}
                      searchBy="label"
                      onChangeUpdate={(id, action) => {
                        console.log(id);
                        console.log(action);
                        console.log(items.find((val) => val.id === id).label);
                      }}
                    />
                  )}
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
            "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
            "02183-7RSS-09C865120F7C4FD6AFB801E02773AEDB",
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
