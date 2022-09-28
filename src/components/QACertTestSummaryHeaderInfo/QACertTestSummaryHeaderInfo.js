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
import { CreateOutlined, LockOpenSharp } from "@material-ui/icons";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import { checkoutAPI } from "../../additional-functions/checkout";

export const QACertTestSummaryHeaderInfo = ({
  facility,
  selectedConfig,
  orisCode,
  user,
  configID,
  //redux sets
  setLocationSelect,
  setSectionSelect,
  setCheckout,
  // redux store
  checkoutState,
  sectionSelect,
  locationSelect,
  locations,
  setSelectedTestCode,
}) => {
  const importTestTitle = "Import Data";
  const [showImportModal, setShowImportModal] = useState(false);

  const [showSelectionTypeImportModal, setShowSelectionTypeImportModal] =
    useState(false);
  const [showImportDataPreview, setShowImportDataPreview] = useState(false);
  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");

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
  const [selectedHistoricalData, setSelectedHistoricalData] = useState([]);
  const [isCheckedOut, setIsCheckedOut] = useState(checkoutState);
  const [ checkedOutConfigs, setCheckedOutConfigs ] = useState([]);
  const [ refresherInfo, setRefresherInfo ] = useState(null);
  const [currentConfig, setCurrentConfig] = useState(false);
  const [lockedFacility, setLockedFacility] = useState(false);
  const [userHasCheckout, setUserHasCheckout] = useState(false);
  const [checkedOutByUser, setCheckedOutByUser] = useState(false);

  const [testTypeGroupOptions, setTestTypeGroupOptions] = useState([
    { name: "Loading..." },
  ]);

  const [allTestTypeCodes, setAllTestTypeCodes] = useState([]);

  useEffect(() => {
    const fetchTestTypeCodes = () => {
      getAllTestTypeCodes()
        .then((res) => {
          setAllTestTypeCodes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getAllTestTypeGroupCodes()
        .then((res) => {
          const options = res.data
            .map((e) => {
              return {
                name: e.testTypeGroupCodeDescription,
                code: e.testTypeGroupCode,
              };
            })
            .sort((a, b) => a.name.localeCompare(b.name));
          setTestTypeGroupOptions(options);
        })
        .catch((error) => {
          console.log(error);
        });
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
    const testCodeObj = {
      testTypeGroupCode: selectedTestTypeGroupOptionObj?.code,
      testTypeCodes: codesForSelectedTestTypeGroup,
    };
    setSelectedTestCode(testCodeObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testTypeGroupOptions, allTestTypeCodes, sectionSelect]);

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
    mpApi.getRefreshInfo(configID)
      .then((info) => setRefresherInfo({
        checkedOutBy: "N/A",
        lastUpdatedBy: info.data.userId,
        updateDate: info.data.updateDate,
      }))
      .catch(err=>console.log(err));
    mpApi.getCheckedOutLocations()
      .then((res)=>setCheckedOutConfigs(res.data))
      .catch(err=>console.log(err));

    return () => {
      cleanupFocusEventListeners();
    };
  }, [checkoutState]);

  const isCheckedOutByUser = (configs) => {
    return (
      configs
        .map((location) => location["monPlanId"])
        .indexOf(selectedConfig.id) > -1 &&
      configs[
        configs
          .map((location) => location["monPlanId"])
          .indexOf(selectedConfig.id)
      ]["checkedOutBy"] === user["userId"]
    );
  };

  useEffect(()=>{
    if(checkedOutConfigs){
      setUserHasCheckout(
        checkedOutConfigs.some((plan) => plan["checkedOutBy"] === user.userId)
      );
      setCheckedOutByUser(isCheckedOutByUser(checkedOutConfigs));
      const result = checkedOutConfigs[checkedOutConfigs.map((con) => con["monPlanId"]).indexOf(selectedConfig.id)];
      if(result){
        setLockedFacility(true);
        setCurrentConfig(result);
      }
    }
  }, [checkedOutConfigs])

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
    importQABtn(payload);
    setShowImportDataPreview(false);
  };

  const formatDate = (dateString, isUTC = false) => {
    const date = new Date(dateString);
    //HANDLE -1 days from DB dates which are UTC
    const day = isUTC ? date.getDate() + 1 : date.getDate();
    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (day > 9 ? day : "0" + day) +
      "/" +
      date.getFullYear()
    );
  };

  // Create audit message for header info
  const createAuditMessage = () => {
    if(checkedOutConfigs){
        // WORKSPACE view
        if (user) {
          // when config is checked out by someone
          if (isCheckedOut) {
            return `Currently checked-out by: ${
              currentConfig["checkedOutBy"]
            } ${formatDate(currentConfig["checkedOutOn"])}`;
          }
          // when config is not checked out
          return `Last updated by: ${refresherInfo?.lastUpdatedBy} ${formatDate(
            refresherInfo?.updateDate,
            true
          )}`;
        }
        // GLOBAL view
        return `Last submitted by: ${selectedConfig.userId} ${formatDate(
          selectedConfig.updateDate
            ? selectedConfig.updateDate
            : selectedConfig.addDate,
          true
        )}`;
    }
  };

    // direction -> false = check back in
  // true = check out
  const checkoutStateHandler = (direction) => {
    // trigger checkout API
    //    - POST endpoint if direction is TRUE (adding new record to checkouts table)
    //    - DELETE endpoint if direction is FALSE (removing record from checkouts table)
    checkoutAPI(direction, configID, selectedConfig.id, setCheckout).then(
      () => {
        setCheckedOutByUser(direction);
        setLockedFacility(direction);
        setIsCheckedOut(direction);
      }
    );
  };

  return (
    <div className="header QACertHeader ">
      {/* // adding display-block here allows buttons to be clickable ( has somesort of hidden overlay without it) */}
      <div className="grid-container width-full clearfix position-relative">
        <div className="display-flex flex-row flex-justify flex-align-center height-2">
          <div className="grid-row">
            <h3 className="margin-y-auto font-body-lg margin-right-2">
              {facilityMainName}
            </h3>
            <p className="text-bold font-body-xl">{facilityAdditionalName}</p>
          </div>
          {user && (
            <div>
              <Button
                // className="padding-x-5"
                type="button"
                outline={false}
                onClick={() => openSelectionTypeImportModal()}
                id="importSelectionQAModal"
              >
                {importTestTitle}
              </Button>
              <Button
                // className="float-right text-right bottom-0 text-no-wrap"
                type="button"
                id="showRevertModal"
                outline={false}
              >
                Evaluate
              </Button>
            </div>
          )}
        </div>

        <p className="text-bold font-body-2xs">{createAuditMessage()}</p>
        <div className="grid-row">
          {user && (
            <>
              {checkedOutByUser ? (
                <Button
                  type="button"
                  autoFocus
                  outline={false}
                  tabIndex="0"
                  aria-label={`Check back in the configuration `}
                  onClick={() => checkoutStateHandler(false)}
                  id="checkInBTN"
                  epa-testid="checkInBTN"
                >
                  <LockOpenSharp /> {"Check Back In"}
                </Button>
              ) : !lockedFacility &&
                !userHasCheckout &&
                selectedConfig.active &&
                checkedOutConfigs
                  .map((location) => location["monPlanId"])
                  .indexOf(selectedConfig.id) === -1 ? (
                <Button
                  type="button"
                  autoFocus
                  outline={true}
                  tabIndex="0"
                  aria-label={`Check out the configuration`}
                  onClick={() => checkoutStateHandler(true)}
                  id="checkOutBTN"
                  epa-testid="checkOutBTN"
                >
                  <CreateOutlined color="primary" /> {"Check Out"}
                </Button>
              ) : null}
              <Button autoFocus type="button" outline={true}>Revert to Official Record</Button>
            </>
          )}
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
        </div>
        <div className="grid-row float-left">
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
              {"Evaluation Report"}
            </Button>
          ) : (
            ""
          )}
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
