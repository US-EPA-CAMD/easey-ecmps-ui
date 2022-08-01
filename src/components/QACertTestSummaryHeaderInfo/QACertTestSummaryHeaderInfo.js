import React, { useState, useEffect } from "react";
import { Button } from "@trussworks/react-uswds";

import "./QACertTestSummaryHeaderInfo.scss";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";

import { QA_CERT_TEST_SUMMARY_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import { Preloader } from "@us-epa-camd/easey-design-system";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
  returnFocusToLast,
} from "../../additional-functions/manage-focus";
import {
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../additional-functions/prompt-to-save-unsaved-changes";
import ImportModal from "../ImportModal/ImportModal";
import UploadModal from "../UploadModal/UploadModal";
import QAImportModalSelect from "./QAImportModalSelect/QAImportModalSelect";
import QAImportHistoricalDataPreview from "../QAImportHistoricalDataPreview/QAImportHistoricalDataPreview";
import Modal from "../Modal/Modal";
import { importQA } from "../../utils/api/qaCertificationsAPI";

import {
  getAllTestTypeCodes,
  getAllTestTypeGroupCodes,
} from "../../utils/api/dataManagementApi";

export const QACertTestSummaryHeaderInfo = ({
  facility,
  selectedConfig,
  orisCode,
  user,
  configID,
  //redux sets
  setLocationSelect,
  setSectionSelect,
  // redux store
  sectionSelect,
  locationSelect,
  locations,
  setSelectedTestCode,
}) => {
  const importTestTitle = "Import Test Data";
  const [showImportModal, setShowImportModal] = useState(false);

  const [showSelectionTypeImportModal, setShowSelectionTypeImportModal] =
    useState(false);
  const [showImportDataPreview, setShowImportDataPreview] = useState(false);
  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");
  // eslint-disable-next-line no-unused-vars
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
  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const [importedFile, setImportedFile] = useState([]);
  const [importedFileErrorMsgs, setImportedFileErrorMsgs] = useState();

  // eslint-disable-next-line no-unused-vars
  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);
  const [selectedHistoricalData, setSelectedHistoricalData] = useState([]);

  const [testTypeGroupOptions, setTestTypeGroupOptions] = useState([
    { name: "Loading..." },
  ]);

  const [allTestTypeCodes, setAllTestTypeCodes] = useState([]);

  useEffect(() => {
    const fetchTestTypeCodes = async () => {
      let resp = await getAllTestTypeCodes();
      const allTtc = resp.data;
      setAllTestTypeCodes(allTtc);

      resp = await getAllTestTypeGroupCodes();
      const options = resp.data
        .map((e) => {
          return {
            name: e.testTypeGroupCodeDescription,
            code: e.testTypeGroupCode,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      setTestTypeGroupOptions(options);
    };
    fetchTestTypeCodes();
  }, [configID]);

  useEffect(() => {
    const selectedIndex = sectionSelect[0];
    const selectedTestTypeGroupOptionObj = testTypeGroupOptions[selectedIndex];

    const codesForSelectedTestTypeGroup = allTestTypeCodes
      .filter((data) => {
        return data.testTypeGroupCode === selectedTestTypeGroupOptionObj?.code;
      })
      .map((obj) => {
        return obj.testTypeCode;
      });
    setSelectedTestCode(codesForSelectedTestTypeGroup);

  }, [testTypeGroupOptions, sectionSelect, allTestTypeCodes, setSelectedTestCode]);

  // let testSummaryTable = <TestSummaryDataTable
  //   locationSelectValue={locationSelect ? locationSelect[1] : 0}
  //   testTypeCodes={codesForSelectedTestTypeGroup}
  //   mapDataToRows={getTestSummary}
  // />

  // if (selectedTestTypeGroupOptionObj?.code === 'LINSUM') {
  //   testSummaryTable = <QALinearitySummaryDataTable
  //     locationSelectValue={locationSelect ? locationSelect[1] : 0}
  //     user={user}
  //   />
  // }

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

  useEffect(() => {
    if (importTypeSelection !== "select" || importedFile.length !== 0) {
      setDisablePortBtn(false);
    } else {
      setDisablePortBtn(true);
    }
  }, [importTypeSelection, importedFile]);

  useEffect(() => {
    if (importedFile.length !== 0) {
      setDisablePortBtn(false);
    } else {
      setDisablePortBtn(true);
    }
  }, [importedFile.length, showImportModal]);

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
  };

  const openModalType = (modalType) => {
    setShowSelectionTypeImportModal(false);
    setDisablePortBtn(false);
    if (modalType === "file") {
      setShowImportModal(true);
    } else {
      setShowImportDataPreview(true);
      setShowSelectionTypeImportModal(false);
    }
  };

  const importQABtn = (payload) => {
    importQA(payload).then((response) => {
      setUsePortBtn(true);
      setIsLoading(true);
      if (response) {
        setImportedFileErrorMsgs(response);
      }
    });
  };

  const importHistoricalData = () => {
    const payload = {
      orisCode: orisCode,
      testSummaryData: selectedHistoricalData,
    };
    console.log(payload);
    importQABtn(payload);
    setShowImportDataPreview(false);
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
                caption="Test Type Group"
                selectionHandler={setSectionSelect}
                // options={sections}
                options={testTypeGroupOptions}
                viewKey="name"
                selectKey="name"
                initialSelection={sectionSelect ? sectionSelect[0] : null}
                orisCode={orisCode}
                workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
              />
            </div>{" "}
            <div className="grid-col-3"></div>{" "}
            <div className="grid-col-3">
              {user ? (
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
              ) : (
                ""
              )}
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
                {"Evaluate All"}
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
          showImportModal ||
          showSelectionTypeImportModal ||
          showImportDataPreview ||
          isLoading
            ? "is-visible"
            : ""
        }`}
      />

      {/* // selects either historical data or file data */}
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

      {/* // file data */}
      {showImportModal && !finishedLoading && !isLoading ? (
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
              importQABtn(importedFile);
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
                setImportedFile={setImportedFile}
                workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
              />
            }
          />
        </div>
      ) : null}

      {/* while uploading, just shows preloader spinner  */}

      {isLoading && !finishedLoading ? (
        <UploadModal
          width={"30%"}
          left={"35%"}
          setFinishedLoading={setFinishedLoading}
          setShowImportModal={setShowImportModal}
          setIsLoading={setIsLoading}
          timer={true}
          children={<Preloader />}
          preloader
          importedFileErrorMsgs={importedFileErrorMsgs}
          setImportedFileErrorMsgs={setImportedFileErrorMsgs}
          fileName={fileName}
        />
      ) : (
        ""
      )}

      {/* after it finishes uploading , shows either api errors or success messages */}
      {showImportModal && usePortBtn && finishedLoading ? (
        <UploadModal
          show={showImportModal}
          close={closeImportModalHandler}
          showCancel={false}
          showSave={true}
          exitBtn={"Ok"}
          complete={true}
          importedFileErrorMsgs={importedFileErrorMsgs}
          setUpdateRelatedTables={setUpdateRelatedTables}
          successMsg={"QA Certification has been Successfully Imported."}
          children={
            <ImportModal
              setDisablePortBtn={setDisablePortBtn}
              disablePortBtn={disablePortBtn}
              complete={true}
              fileName={fileName}
              importedFileErrorMsgs={importedFileErrorMsgs}
            />
          }
        />
      ) : (
        ""
      )}
      {showImportDataPreview && (
        <Modal
          show={showImportDataPreview}
          close={() => setShowImportDataPreview(false)}
          showSave={true}
          exitBTN={"Import"}
          title="Import Historical Data"
          disableExitBtn={disablePortBtn}
          save={() => {
            importHistoricalData();
          }}
          children={
            <QAImportHistoricalDataPreview
              locations={locations}
              workspaceSection={{ QA_CERT_TEST_SUMMARY_STORE_NAME }}
              setSelectedHistoricalData={setSelectedHistoricalData}
              setFileName={setFileName}
              setDisablePortBtn={setDisablePortBtn}
              orisCode={orisCode}
            />
          }
        />
      )}
    </div>
  );
};

export default QACertTestSummaryHeaderInfo;
