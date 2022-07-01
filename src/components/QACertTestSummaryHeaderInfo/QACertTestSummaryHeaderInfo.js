import React, { useState, useEffect } from "react";
import { Button } from "@trussworks/react-uswds";

import "./QACertTestSummaryHeaderInfo.scss";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";

import NotFound from "../NotFound/NotFound";
import { QA_CERT_TEST_SUMMARY_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import { Preloader } from "@us-epa-camd/easey-design-system";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
  returnFocusToCommentButton,
  returnFocusToLast,
} from "../../additional-functions/manage-focus";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../additional-functions/prompt-to-save-unsaved-changes";
import ImportModal from "../ImportModal/ImportModal";
import UploadModal from "../UploadModal/UploadModal";
import QAImportModalSelect from "./QAImportModalSelect/QAImportModalSelect";
import QAImportHistoricalDataPreview from "../QAImportHistoricalDataPreview/QAImportHistoricalDataPreview";
import Modal from "../Modal/Modal";

export const QACertTestSummaryHeaderInfo = ({
  facility,
  selectedConfig,
  orisCode,
  user,
  //redux sets
  setLocationSelect,
  setSectionSelect,
  // redux store
  sectionSelect,
  locationSelect,
  locations,
}) => {
  const sections = [
    { name: "AppendixE Correlation Test Summary" },
    { name: "Calibration Injection" },
    { name: "Cycle Time Summary" },
    { name: "Flow to Load Check" },
    { name: "Flow to Load Reference" },
    { name: "Fuel Flow to Load Baseline" },
    { name: "Fuel Flow to Load" },
    { name: "Fuel Flowmeter Accuracy" },
    { name: "Hg Linearity and 3-Level Summary" },
    { name: "Linearity Summary" },
    { name: "Online Offline Calibration" },
    { name: "RATA" },
    { name: "Test Qualification" },
    { name: "Transmitter Transducer Accuracy" },
    { name: "Unit Default" },
  ];

  const importTestTitle = "Import Test Data";
  const [showImportModal, setShowImportModal] = useState(false);

  const [showSelectionTypeImportModal, setShowSelectionTypeImportModal] =
    useState(false);
  const [ showImportDataPreview , setShowImportDataPreview ] = useState(false);
  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");
  const [dataLoaded, setDataLoaded] = useState(true);

  // import modal states
  const [disablePortBtn, setDisablePortBtn] = useState(true);
  const [importTypeSelection, setImportTypeSelection] = useState(true);
  const [usePortBtn, setUsePortBtn] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [hasFormatError, setHasFormatError] = useState(false);
  const [hasInvalidJsonError, setHasInvalidJsonError] = useState(false);
  const [importApiErrors, setImportApiErrors] = useState([]);
  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const [importedFile, setImportedFile] = useState([]);
  // *** Reassign handlers after pop-up modal is closed
  useEffect(() => {
    if (!returnedFocusToLast) {
      setReturnedFocusToLast(true);
    } else {
      returnFocusToLast();
      assignFocusEventListeners();
    }
  }, [returnedFocusToLast]);

  // *** Clean up focus event listeners
  useEffect(() => {
    return () => {
      cleanupFocusEventListeners();
    };
  }, []);

  // useEffect (( )=> {

  // },[]);
  useEffect(() => {
    if (importTypeSelection != "select") {
      setDisablePortBtn(false);
    } else {
      setDisablePortBtn(true);
    }

    console.log("importype", importTypeSelection);
  }, [importTypeSelection]);
  const closeImportModalHandler = () => {
    const importBtn = document.querySelector("#importSelectionQAModal");

    if (window.isDataChanged === true) {
      if (window.confirm(unsavedDataMessage) === true) {
        resetImportFlags();
        removeChangeEventListeners(".modalUserInput");
        importBtn.focus();
      }
    } else {
      resetImportFlags();
      removeChangeEventListeners(".modalUserInput");
      importBtn.focus();
    }
  };
  const openSelectionTypeImportModal = () => {
    setShowSelectionTypeImportModal(true);
  };
  const openImportModal = () => {
    setShowImportModal(true);
  };

  const resetImportFlags = () => {
    setShowSelectionTypeImportModal(false);
    setShowImportModal(false);
    setDisablePortBtn(true);
    setUsePortBtn(false);
    setFinishedLoading(false);
    setIsLoading(false);
    setFileName("");
    setHasFormatError(false);
    setHasInvalidJsonError(false);
    setImportApiErrors([]);
  };

  const openModalType = (modalType) => {
    setShowSelectionTypeImportModal(false);
    if (modalType === "file") {
      setShowImportModal(true);
    } else {
      setShowImportDataPreview(true);
      setShowSelectionTypeImportModal(false);
    }
  };
  return (
    <div className="header QACertHeader ">
      {dataLoaded ? (
        // adding display-block here allows buttons to be clickable ( has somesort of hidden overlay without it)
        <div className="grid-container width-full clearfix position-relative">
          <div className="grid-row">
            <h3 className="display-inline-block">
              <span className="font-body-lg">{facilityMainName}</span>
            </h3>{" "}
          </div>
          <div className=" grid-row text-bold font-body-xl display-block">
            {facilityAdditionalName}
          </div>

          <div className="grid-row positon-relative">
            <div className="grid-col-2">
              <DropdownSelection
                caption="Locations"
                orisCode={orisCode}
                options={locations}
                viewKey="name"
                selectKey="id"
                initialSelection={locationSelect ? locationSelect[0] : null}
                selectionHandler={setLocationSelect}
                workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
              />
            </div>
            <div className="grid-col-4">
              <DropdownSelection
                caption="Test Type"
                selectionHandler={setSectionSelect}
                options={sections}
                viewKey="name"
                selectKey="name"
                initialSelection={sectionSelect ? sectionSelect[0] : null}
                orisCode={orisCode}
                workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
              />
            </div>{" "}
            <div className="grid-col-3"></div>{" "}
            <div className="grid-col-3">
              {/* {user ? ( */}
              <div className=" float-right right-0 bottom-0 text-no-wrap position-absolute padding-bottom-1">
                <Button
                  className="padding-x-5"
                  type="button"
                  outline={false}
                  onClick={() => openSelectionTypeImportModal()}
                  id="importSelectionQAModal"
                >
                  {importTestTitle}
                </Button>
              </div>

              {/* ): (
                ""
              )} */}
            </div>
          </div>
          <div className="grid-row float-right">
            <Button
              className="float-right text-right bottom-0 text-no-wrap "
              type="button"
              id="showRevertModal"
              outline={true}
            >
              {"Test Data Report"}
            </Button>
            <Button
              className="float-right text-right bottom-0 text-no-wrap "
              type="button"
              id="showRevertModal"
              outline={true}
            >
              {"Test History Report"}
            </Button>
            {user ? (
              <Button
                className="float-right text-right bottom-0 text-no-wrap "
                type="button"
                id="showRevertModal"
                outline={false}
              >
                {"Evaluate"}
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <Preloader />
      )}

      <div
        className={`usa-overlay ${
          showImportModal || showSelectionTypeImportModal ? "is-visible" : ""
        }`}
      />
      {showSelectionTypeImportModal ? (
        <div>
          <UploadModal
            show={showSelectionTypeImportModal}
            close={closeImportModalHandler}
            showCancel={true}
            showSave={true}
            title={importTestTitle}
            mainBTN={"Continue"}
            disablePortBtn={disablePortBtn}
            port={() => {
              openModalType(importTypeSelection);
            }}
            children={
              <QAImportModalSelect
                setImportTypeSelection={setImportTypeSelection}
              />
            }
          />
        </div>
      ) : null}
      {showImportModal ? (
        <div>
          <UploadModal
            show={showImportModal}
            close={closeImportModalHandler}
            showCancel={true}
            showSave={true}
            title={importTestTitle}
            exitBTN={"Import"}
            disablePortBtn={disablePortBtn}
            port={() => {
              // importMPBtn(importedFile);
            }}
            hasFormatError={hasFormatError}
            hasInvalidJsonError={hasInvalidJsonError}
            children={
              <ImportModal
                setDisablePortBtn={setDisablePortBtn}
                disablePortBtn={disablePortBtn}
                setFileName={setFileName}
                setHasFormatError={setHasFormatError}
                setHasInvalidJsonError={setHasInvalidJsonError}
                // setImportedFile={setImportedFile}
                setImportedFile={setImportedFile}
                workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
              />
            }
          />
        </div>
      ) : null}
      {showImportDataPreview && (
        <Modal
          show={showImportDataPreview}
          close={()=>setShowImportDataPreview(false)}
          showSave={false}
          showCancel={true}
          exitBTN={"Import"}
          title="Import Historical Data"
          //port ={}
          children= {
            <QAImportHistoricalDataPreview 
              locations={locations}
              workspaceSection={{QA_CERT_TEST_SUMMARY_STORE_NAME}}
            />
          }
        />
      )}
    </div>
  );
};

export default QACertTestSummaryHeaderInfo;
