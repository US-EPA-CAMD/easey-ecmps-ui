import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanQualifications";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
    getActiveData,
    getInactiveData,
} from "../../../additional-functions/filter-data";

import {
    attachChangeEventListeners,
    removeChangeEventListeners,
    unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableQualifications = ({
    locationSelectValue,
    user,
    checkout,
    inactive,
    settingInactiveCheckBox,
    revertedState,
    setRevertedState,
    selectedLocation,
}) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [qualificationData, setQualificationsData] = useState([]);
    const totalOptions = useRetrieveDropdownApi(
        ["qualificationTypeCode"],
        true
    );
    const [show, setShow] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    useEffect(() => {
        if (
            updateTable ||
            qualificationData.length <= 0 ||
            locationSelectValue ||
            revertedState
        ) {
            mpApi.getQualifications(locationSelectValue).then((res) => {
                setQualificationsData(res.data);
                setDataLoaded(true);
                setUpdateTable(false);
                setRevertedState(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationSelectValue, updateTable, revertedState]);
    const [selectedQualificationData, setSelectedQualificationData] = useState(null);
    // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
    // *** in the format expected by the modal / tabs plugins)
    const columnNames = [
        "Qualification Type Code",
        "Start Date",
        "End Date",
    ];

    const payload = {
        locationId: locationSelectValue,
        id: null,
        qualificationTypeCode: null,
        beginDate: null,
        endDate: null,
    };
    const data = useMemo(() => {
        if (qualificationData.length > 0) {
            const activeOnly = getActiveData(qualificationData);
            const inactiveOnly = getInactiveData(qualificationData);

            // only active data >  disable checkbox and unchecks it
            if (activeOnly.length === qualificationData.length) {
                // uncheck it and disable checkbox
                //function parameters ( check flag, disable flag )
                settingInactiveCheckBox(false, true);
                return fs.getMonitoringPlansQualifications(qualificationData);
            }

            // only inactive data > disables checkbox and checks it
            if (inactiveOnly.length === qualificationData.length) {
                //check it and disable checkbox
                settingInactiveCheckBox(true, true);
                return fs.getMonitoringPlansQualifications(qualificationData);
            }
            // resets checkbox
            settingInactiveCheckBox(inactive[0], false);
            return fs.getMonitoringPlansQualifications(
                !inactive[0] ? getActiveData(qualificationData) : qualificationData
            );
        }
        return [];

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qualificationData, inactive]);
    const testingSave = () => {
        openQualificationDataModal(false, false, true);
        saveQualificationData();
    };

    //   const testingCreate = () => {
    //     openQualificationDataModal(false, false, true);
    //     createQualificationData();
    //   };

    const saveQualificationData = () => {
        const userInput = extractUserInput(payload, ".modalUserInput");

        mpApi
            .saveQualificationData(userInput)
            .then((result) => {
                setShow(false);
                setDataLoaded(false);
                setUpdateTable(true);
            })
            .catch((error) => {
                setShow(false);
            });
    };

    const createQualificationData = () => {
        // var radioName = "ozoneSeasonIndicator";
        // const userInput = extractUserInput(payload, ".modalUserInput", radioName);
        // mpApi
        //   .createFuelData(userInput)
        //   .then((result) => {
        //     setShow(false);
        //     setDataLoaded(false);
        //     setUpdateTable(true);
        //   })
        //   .catch((error) => {
        //     setShow(false);
        //   });
    };

    const [createNewQualificationData, setCreateNewQualificationData] = useState(false);
    const [selectedModalData, setSelectedModalData] = useState(null);

    const openQualificationDataModal = (row, bool, create) => {
        let qualData = null;
        setCreateNewQualificationData(create);
        if (qualificationData.length > 0 && !create) {
            qualData = qualificationData.filter(
                (element) => element.id === row[`col${Object.keys(row).length - 1}`]
            )[0];
            setSelectedQualificationData(qualData);
        }
        setSelectedModalData(
            modalViewData(
                qualData,
                {
                    qualificationTypeCode: ["Qualification Type Code", "dropdown", ""],

                },
                {
                    beginDate: ["Start Date", "date", ""],
                    endDate: ["End Date", "date", ""],
                },
                create,
                totalOptions
            )
        );
        setShow(true);

        setTimeout(() => {
            attachChangeEventListeners(".modalUserInput");
        });
    };

    const [viewBtn, setViewBtn] = useState(null);
    const [addBtn, setAddBtn] = useState(null);

    const closeModalHandler = () => {
        if (window.isDataChanged === true) {
            if (window.confirm(unsavedDataMessage) === true) {
                setShow(false);
                removeChangeEventListeners(".modalUserInput");
            }
        } else {
            setShow(false);
            removeChangeEventListeners(".modalUserInput");
        }
        if (addBtn) {
            addBtn.focus();
        }
    };

    return (
        <div className="methodTable">
            <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

            <input
                tabIndex={-1}
                aria-hidden={true}
                role="button"
                type="hidden"
                id="testingBtn"
                onClick={() => testingSave()}
            />
            {/* <input
                tabIndex={-1}
                aria-hidden={true}
                role="button"
                type="hidden"
                id="testingBtn3"
                onClick={() => testingCreate()}
            /> */}

            <DataTableRender
                columnNames={columnNames}
                data={data}
                dataLoaded={dataLoaded}
                // actionsBtn={"View"}
                checkout={checkout}
                user={user}
                openHandler={openQualificationDataModal}
                actionsBtn={"View"}
                addBtn={openQualificationDataModal}
                addBtnName={"Create Qualification"}
                setViewBtn={setViewBtn}
                viewBtn={viewBtn}
                setAddBtn={setAddBtn}
            />

            {show ? (
                <Modal
                    show={show}
                    close={closeModalHandler}
                    save={createNewQualificationData ? createQualificationData : saveQualificationData}
                    showCancel={!(user && checkout)}
                    showSave={user && checkout}
                    title={createNewQualificationData ? "Create Qualification" : "Qualification"}
                    exitBTN={createNewQualificationData ? "Create Qualification" : `Save and Close`}
                    children={
                        <div>
                            <ModalDetails
                                modalData={selectedQualificationData}
                                data={selectedModalData}
                                cols={3}
                                title={"Qualification"}
                                viewOnly={!(user && checkout)}
                            />
                        </div>
                    }
                />
            ) : null}
        </div>
    );
};

export default DataTableQualifications;
