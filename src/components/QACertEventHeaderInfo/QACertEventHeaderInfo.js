import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Button } from "@trussworks/react-uswds";
import log from "loglevel";
import { Preloader } from "@us-epa-camd/easey-design-system";

import HeaderInfoCheckoutButton from "../HeaderInfoCheckoutButton/HeaderInfoCheckoutButton";
import HeaderInfoFacility from "../HeaderInfoFacility/HeaderInfoFacility";
import HeaderInfoLocationSelect from "../HeaderInfoLocationSelect/HeaderInfoLocationSelect";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import { cleanupFocusEventListeners } from "../../additional-functions/manage-focus";
import {
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../additional-functions/prompt-to-save-unsaved-changes";
import ImportModal from "../ImportModal/ImportModal";
import UploadModal from "../UploadModal/UploadModal";
import QAImportHistoricalDataPreview from "../QAImportHistoricalDataPreview/QAImportHistoricalDataPreview";
import Modal from "../Modal/Modal";
import { importQA } from "../../utils/api/qaCertificationsAPI";
import {
  getAllTestTypeCodes,
  getAllTestTypeGroupCodes,
} from "../../utils/api/dataManagementApi";
import { QA_CERT_EVENT_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import QAImportModalSelect from "../QACertTestSummaryHeaderInfo/QAImportModalSelect/QAImportModalSelect";
import { successResponses } from "../../utils/api/apiUtils";
import { formatErrorResponse } from "../../utils/functions";

export const QACertEventHeaderInfo = ({
  facility,
  selectedConfigId,
  orisCode,
  user,
  //redux sets
  setSectionSelect,
  // redux store
  checkoutState,
  sectionSelect,
  setSelectedTestCode,
  setUpdateRelatedTables,
  // mapped props
  checkedOutConfigs,
}) => {
  const importTestTitle = "Import QA Cert Events, Extension & Exemption Data";
  const [showImportModal, setShowImportModal] = useState(false);

  const [showSelectionTypeImportModal, setShowSelectionTypeImportModal] =
    useState(false);
  const [showImportDataPreview, setShowImportDataPreview] = useState(false);

  const selectedConfig = useSelector((state) =>
    state.monitoringPlans[orisCode]?.find((mp) => mp.id === selectedConfigId),
  );
  const locations = selectedConfig?.monitoringLocationData ?? [];

  // import modal states
  const [disablePortBtn, setDisablePortBtn] = useState(true);
  const [importTypeSelection, setImportTypeSelection] = useState("");
  const [usePortBtn, setUsePortBtn] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [hasFormatError, setHasFormatError] = useState(false);
  const [hasInvalidJsonError, setHasInvalidJsonError] = useState(false);
  const [importedFile, setImportedFile] = useState([]);
  const [importedFileErrorMsgs, setImportedFileErrorMsgs] = useState();
  const [selectedHistoricalData, setSelectedHistoricalData] = useState({});
  const [jsonSchemaVersion, setJsonSchemaVersion] = useState("");

  const isCheckedOut = checkoutState;

  const qaCertEventOptions = [
    { name: "QA Certification Event" },
    { name: "Test Extension Exemption" },
  ];

  const [testTypeGroupOptions, setTestTypeGroupOptions] = useState([]);

  const [allTestTypeCodes, setAllTestTypeCodes] = useState([]);

  useEffect(() => {
    const fetchTestTypeCodes = () => {
      getAllTestTypeCodes()
        .then((res) => {
          setAllTestTypeCodes(res.data?.items);
        })
        .catch((error) => {
          log.log(error);
        });

      getAllTestTypeGroupCodes()
        .then((res) => {
          const options = res.data?.items
            ?.map((e) => {
              return {
                name: e.testTypeGroupDescription,
                code: e.testTypeGroupCode,
              };
            })
            .sort((a, b) => a.name.localeCompare(b.name));
          setTestTypeGroupOptions(options);
        })
        .catch((error) => {
          log.log(error);
        });
    };
    fetchTestTypeCodes();
  }, [selectedConfigId]);

  useEffect(() => {
    const selectedIndex = sectionSelect[0];
    const selectedTestTypeGroupOptionObj = testTypeGroupOptions[selectedIndex];

    const codesForSelectedTestTypeGroup = allTestTypeCodes
      ?.filter((data) => {
        return data.testTypeGroupCode === selectedTestTypeGroupOptionObj?.code;
      })
      .map((obj) => {
        return obj.testTypeCode;
      });
    const testCodeObj = {
      testTypeGroupCode: selectedTestTypeGroupOptionObj?.code,
      testTypeCodes: codesForSelectedTestTypeGroup,
    };
    setSelectedTestCode(testCodeObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testTypeGroupOptions, allTestTypeCodes, sectionSelect]);

  // *** Reassign handlers after pop-up modal is closed

  // *** Clean up focus event listeners
  useEffect(() => {
    return () => {
      cleanupFocusEventListeners();
    };
  }, [checkoutState, selectedConfigId]);

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
    setIsLoading(true);
    setFinishedLoading(false);
    importQA(payload)
      .then((response) => {
        setShowImportModal(true);
        setUsePortBtn(true);
        if (!successResponses.includes(response.status)) {
          const errorMsgs = formatErrorResponse(response);
          setImportedFileErrorMsgs(errorMsgs);
        } else {
          setImportedFileErrorMsgs([]);
        }
      })
      .catch((err) => {
        log.log(err);
        setImportedFileErrorMsgs(["There was an error importing the file."]);
      })
      .finally(() => {
        setIsLoading(false);
        setFinishedLoading(true);
      });
  };

  const importHistoricalData = () => {
    const payload = {
      orisCode: orisCode,
      version: jsonSchemaVersion,
      ...selectedHistoricalData,
    };
    importQABtn(payload);
    setShowImportDataPreview(false);
  };

  return (
    <div className="header QACertHeader ">
      <div className="grid-container width-full clearfix position-relative">
        <div className="grid-row">
          <div className="grid-col-9">
            <HeaderInfoFacility
              checkedOutConfigs={checkedOutConfigs}
              facility={facility}
              selectedConfig={selectedConfig}
              user={user}
            />
          </div>

          <div className="display-flex grid-col-3 flex-align-start flex-justify-end">
            {user && isCheckedOut && (
              <Button
                type="button"
                outline={false}
                onClick={() => openSelectionTypeImportModal()}
                id="importSelectionQAModal"
              >
                Import Data
              </Button>
            )}
          </div>
        </div>

        <div className="grid-row">
          <HeaderInfoCheckoutButton
            checkedOutConfigs={checkedOutConfigs}
            selectedConfig={selectedConfig}
            user={user}
          />
        </div>
        <div className="grid-row positon-relative">
          <div className="grid-col-2">
            <HeaderInfoLocationSelect
              className="margin-right-2 margin-bottom-1 margin-top-3"
              selectedConfig={selectedConfig}
              workspaceSection={QA_CERT_EVENT_STORE_NAME}
            />
          </div>
          <div className="grid-col-4">
            <DropdownSelection
              caption="Test Data"
              selectionHandler={setSectionSelect}
              // options={sections}
              options={qaCertEventOptions}
              viewKey="name"
              selectKey="name"
              initialSelection={sectionSelect ? sectionSelect[0] : null}
              workspaceSection={QA_CERT_EVENT_STORE_NAME}
            />
          </div>{" "}
          <div className="grid-col-3"></div>{" "}
        </div>
      </div>
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
        <div data-testid="selection-type-import-modal">
          <UploadModal
            show={showSelectionTypeImportModal}
            close={closeImportModalHandler}
            showCancel={true}
            title={importTestTitle}
            mainBTN={"Continue"}
            disablePortBtn={disablePortBtn}
            port={() => {
              openModalType(importTypeSelection);
            }}
          >
            <QAImportModalSelect
              setImportTypeSelection={setImportTypeSelection}
              entityType="QCE"
            />
          </UploadModal>
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
            exitBtn={"Import"}
            disablePortBtn={disablePortBtn}
            port={() => {
              importQABtn(importedFile);
            }}
            hasFormatError={hasFormatError}
            hasInvalidJsonError={hasInvalidJsonError}
            label={"Upload QA JSON File"}
          >
            <ImportModal
              setDisablePortBtn={setDisablePortBtn}
              setFileName={setFileName}
              setHasFormatError={setHasFormatError}
              setHasInvalidJsonError={setHasInvalidJsonError}
              setImportedFile={setImportedFile}
              workspaceSection={QA_CERT_EVENT_STORE_NAME}
            />
          </UploadModal>
        </div>
      ) : null}
      {/* while uploading, just shows preloader spinner  */}
      {isLoading && !finishedLoading ? (
        <UploadModal
          width={"30%"}
          left={"35%"}
          preloader
          importedFileErrorMsgs={importedFileErrorMsgs}
        >
          <Preloader />
        </UploadModal>
      ) : (
        ""
      )}
      {/* after it finishes uploading , shows either api errors or success messages */}
      {showImportModal && usePortBtn && finishedLoading ? (
        <UploadModal
          show={showImportModal}
          close={closeImportModalHandler}
          showCancel={false}
          complete={true}
          importedFileErrorMsgs={importedFileErrorMsgs}
          successMsg={
            "QA Certification Events, Test Extension & Exemption data has been Successfully Imported."
          }
          setUpdateRelatedTables={setUpdateRelatedTables}
        >
          <ImportModal
            setDisablePortBtn={setDisablePortBtn}
            complete={true}
            fileName={fileName}
            importedFileErrorMsgs={importedFileErrorMsgs}
          />
        </UploadModal>
      ) : (
        ""
      )}
      {showImportDataPreview && (
        <Modal
          show={showImportDataPreview}
          close={() => setShowImportDataPreview(false)}
          showSave={true}
          exitBtn={"Import"}
          title="Import Historical QA Cert Event, Extension & Exemption Data"
          disableExitBtn={disablePortBtn}
          save={() => importHistoricalData()}
          firstFocusElementById={"preview-button"}
        >
          <QAImportHistoricalDataPreview
            locations={locations}
            setSelectedHistoricalData={setSelectedHistoricalData}
            setFileName={setFileName}
            setDisablePortBtn={setDisablePortBtn}
            orisCode={orisCode}
            showTestSummaryTable={false}
            setJsonSchemaVersion={setJsonSchemaVersion}
          />
        </Modal>
      )}
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    checkedOutConfigs: state.checkedOutLocations,
  };
};

export default connect(mapStateToProps)(QACertEventHeaderInfo);
