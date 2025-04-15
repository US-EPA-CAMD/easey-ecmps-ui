import { Button } from '@trussworks/react-uswds';
import { Preloader } from '@us-epa-camd/easey-design-system';
import log from 'loglevel';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
  returnFocusToLast,
} from '../../additional-functions/manage-focus';
import {
  removeChangeEventListeners,
  unsavedDataMessage,
} from '../../additional-functions/prompt-to-save-unsaved-changes';
import { QA_CERT_TEST_SUMMARY_STORE_NAME } from '../../additional-functions/workspace-section-and-store-names';
import { successResponses } from '../../utils/api/apiUtils';
import { matsFileUpload } from '../../utils/api/camdServices';
import {
  getAllTestTypeCodes,
  getAllTestTypeGroupCodes,
} from '../../utils/api/dataManagementApi';
import { importQA } from '../../utils/api/qaCertificationsAPI';
import { formatErrorResponse } from '../../utils/functions';
import { DropdownSelection } from '../DropdownSelection/DropdownSelection';
import HeaderInfoCheckoutButton from '../HeaderInfoCheckoutButton/HeaderInfoCheckoutButton';
import HeaderInfoFacility from '../HeaderInfoFacility/HeaderInfoFacility';
import HeaderInfoLocationSelect from '../HeaderInfoLocationSelect/HeaderInfoLocationSelect';
import ImportModal from '../ImportModal/ImportModal';
import ImportModalMatsContent from '../ImportModal/ImportModalMatsContent/ImportModalMatsContent';
import Modal from '../Modal/Modal';
import QAImportHistoricalDataPreview from '../QAImportHistoricalDataPreview/QAImportHistoricalDataPreview';
import UploadModal from '../UploadModal/UploadModal';
import './QACertTestSummaryHeaderInfo.scss';
import QAImportModalSelect from './QAImportModalSelect/QAImportModalSelect';

export const QACertTestSummaryHeaderInfo = ({
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
  ///
  setUpdateRelatedTables,

  /* MAPPED PROPS */
  checkedOutConfigs,
}) => {
  const importTestTitle = 'Import QA Test Data';
  const [showImportModal, setShowImportModal] = useState(false);
  const [showMatsImport, setShowMatsImport] = useState(false);

  const [showSelectionTypeImportModal, setShowSelectionTypeImportModal] =
    useState(false);
  const [showImportDataPreview, setShowImportDataPreview] = useState(false);

  const selectedConfig = useSelector((state) =>
    state.monitoringPlans[orisCode]?.find((mp) => mp.id === selectedConfigId),
  );
  const locations = selectedConfig?.monitoringLocationData ?? [];

  // import modal states
  const [disablePortBtn, setDisablePortBtn] = useState(true);
  const [importTypeSelection, setImportTypeSelection] = useState('');
  const [usePortBtn, setUsePortBtn] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [hasFormatError, setHasFormatError] = useState(false);
  const [hasInvalidJsonError, setHasInvalidJsonError] = useState(false);
  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const [importedFile, setImportedFile] = useState([]);
  const [importedFileErrorMsgs, setImportedFileErrorMsgs] = useState();
  const [selectedHistoricalData, setSelectedHistoricalData] = useState({});
  const [disableMatsImportButton, setDisableMatsImportButton] = useState(true);
  const [jsonSchemaVersion, setJsonSchemaVersion] = useState('');

  const isCheckedOut = checkoutState;

  const selectedTestNumberRef = useRef();

  const [testTypeGroupOptions, setTestTypeGroupOptions] = useState([
    { name: 'Loading...' },
  ]);

  const [allTestTypeCodes, setAllTestTypeCodes] = useState([]);

  useEffect(() => {
    if (
      testTypeGroupOptions.length > 0 &&
      testTypeGroupOptions[0]['name'] !== 'Loading...'
    ) {
      setSectionSelect([
        sectionSelect[0],
        testTypeGroupOptions[sectionSelect[0]]['name'],
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testTypeGroupOptions]);

  useEffect(() => {
    const fetchTestTypeCodes = () => {
      getAllTestTypeCodes()
        .then((res) => {
          setAllTestTypeCodes(res?.data?.items);
        })
        .catch((error) => {
          log.log(error);
        });

      getAllTestTypeGroupCodes()
        .then((res) => {
          const options = res.data?.items
            .map((e) => {
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
    return () => {
      cleanupFocusEventListeners();
    };
  }, [checkoutState, selectedConfigId]);

  useEffect(() => {
    if (importTypeSelection !== 'select' || importedFile.length !== 0) {
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
    const importBtn = document.querySelector('#importSelectionQAModal');

    if (window.isDataChanged === true) {
      if (window.confirm(unsavedDataMessage) === true) {
        resetImportFlags();
        removeChangeEventListeners('.modalUserInput');
        importBtn.focus();
      }
    } else {
      resetImportFlags();
      removeChangeEventListeners('.modalUserInput');
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
    setFileName('');
    setHasFormatError(false);
    setHasInvalidJsonError(false);
    setShowMatsImport(false);
    setImportedFile([]);
    setDisableMatsImportButton(true);
  };

  const openModalType = (modalType) => {
    setShowSelectionTypeImportModal(false);
    setDisablePortBtn(false);

    switch (modalType) {
      case 'file':
        setShowImportModal(true);
        break;
      case 'historical':
        setShowImportDataPreview(true);
        setShowSelectionTypeImportModal(false);
        break;
      case 'mats':
        setShowMatsImport(true);
        break;
      default:
        throw Error(`modalType of ${modalType} does not exist`);
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

  const importMats = async (payload) => {
    try {
      setIsLoading(true);
      setFinishedLoading(false);
      const resp = await matsFileUpload(
        selectedConfigId,
        selectedTestNumberRef.current,
        payload,
      );
      if (successResponses.includes(resp.status)) {
        setImportedFileErrorMsgs([]);
      } else {
        const errorMsgs = formatErrorResponse(resp);
        setImportedFileErrorMsgs(errorMsgs);
      }
    } catch (error) {
      log.log('error importing MATS files', error);
    } finally {
      setIsLoading(false);
      setFinishedLoading(true);
      // set flags to show success/error modal content
      setUsePortBtn(true);
      setShowImportModal(true);
      setShowMatsImport(false); // stop showing mats content
    }
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
          </div>{' '}
          <div className="grid-col-3"></div>{' '}
        </div>
      </div>
      <div
        className={`usa-overlay ${
          showImportModal ||
          showSelectionTypeImportModal ||
          showImportDataPreview ||
          isLoading
            ? 'is-visible'
            : ''
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
            mainBTN={'Continue'}
            disablePortBtn={disablePortBtn}
            port={() => {
              openModalType(importTypeSelection);
            }}
            children={
              <QAImportModalSelect
                setImportTypeSelection={setImportTypeSelection}
                importTestTitle={importTestTitle}
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
            exitBtn={'Import'}
            disablePortBtn={disablePortBtn}
            port={() => importQABtn(importedFile)}
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
          width={'30%'}
          left={'35%'}
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
        ''
      )}
      {/* after it finishes uploading , shows either api errors or success messages */}
      {showImportModal && usePortBtn && finishedLoading ? (
        <UploadModal
          show={showImportModal}
          close={closeImportModalHandler}
          showCancel={false}
          showSave={true}
          exitBtn={'Ok'}
          complete={true}
          importedFileErrorMsgs={importedFileErrorMsgs}
          successMsg={`Test Data has been Successfully Imported.`}
          setUpdateRelatedTables={setUpdateRelatedTables}
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
        ''
      )}
      {showImportDataPreview && (
        <Modal
          show={showImportDataPreview}
          close={() => setShowImportDataPreview(false)}
          showSave={true}
          exitBtn={'Import'}
          title="Import Historical QA Test Data"
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
              setJsonSchemaVersion={setJsonSchemaVersion}
            />
          }
        />
      )}

      {/* MATS */}
      {showMatsImport && (
        <UploadModal
          show={showMatsImport}
          close={closeImportModalHandler}
          showCancel={true}
          showSave={true}
          title="Import MATS Data"
          mainBTN={'Import'}
          disablePortBtn={disableMatsImportButton}
          port={() => importMats(importedFile)}
          importedFileErrorMsgs={importedFileErrorMsgs}
        >
          <ImportModalMatsContent
            setImportedFile={setImportedFile}
            importedFile={importedFile}
            selectedTestNumberRef={selectedTestNumberRef}
            testCodeLegend={allTestTypeCodes}
            locations={locations}
            setDisablePortBtn={setDisableMatsImportButton}
          />
        </UploadModal>
      )}
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    checkedOutConfigs: state.checkedOutLocations,
  };
};

export default connect(mapStateToProps)(QACertTestSummaryHeaderInfo);
