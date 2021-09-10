import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import "./DataTableSystemsComponentsRender.scss";

import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import DataTableAnalyzerRanges from "../DataTableAnalyzerRanges/DataTableAnalyzerRanges";
export const DataTableSystemsComponents = ({
  systemID,
  viewOnly,
  setSecondLevel,
  secondLevel,
  thirdLevel,
  setThirdLevel,
  setBread,
  locationSelectValue,
  user,
  checkout,
  // setCreateBtn,
  // setCreateBtnAPI,
  // setSaveAnalyzerRange,
  setSelectedFuelFlows,
  selectedFuelFlows,
  // setSelectedFuelFlowInFirst,
  setSelectedRangeInFirst,
  backBTN,
  updateAnalyzerRangeTable,
  setUpdateFuelFlowTable,
  updateFuelFlowTable,
  setCreateAnalyzerRangesFlag,
  createAnalyzerRangesFlag,
  setCreateFuelFlowFlag,
  createFuelFlowFlag,
  setCreateNewComponentFlag,
  createNewComponentFlag,
}) => {
  const [monitoringSystemsFuelFlows, setMonitoringSystemsFuelFlows] = useState(
    ""
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataFuelLoaded, setFuelDataLoaded] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [
    selectedComponentsModalData,
    setSelectedComponentsModalData,
  ] = useState(null);
  const [selectedFuelFlowsModalData, setSelectedFuelFlowsModalData] = useState(
    null
  );
  const [selected, setSelected] = useState(1);

  const [
    monitoringSystemsComponents,
    setMonitoringSystemsComponents,
  ] = useState("");
  useEffect(() => {
    mpApi.getMonitoringSystems(locationSelectValue).then((res) => {
      for (let value of res.data) {
        if (value.monitoringSystemId === systemID) {
          setSelected(value);
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemID]);

  useEffect(() => {
    mpApi
      .getMonitoringSystemsComponents(selected.locationId, selected.id)
      .then((res) => {
        setMonitoringSystemsComponents(res.data);
        setDataLoaded(true);
      });

    mpApi
      .getMonitoringSystemsFuelFlows(selected.locationId, selected.id)
      .then((res) => {
        setMonitoringSystemsFuelFlows(res.data);
        setFuelDataLoaded(true);
        setUpdateFuelFlowTable(false);
      });
  }, [selected, updateFuelFlowTable]);

  const columnNames = ["ID", "Type", "Date and Time"];
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const fuelFlowsColumnNames = ["Fuel Code", "Type Code", "Date and Time"];

  const [selectedComponent, setSelectedComponent] = useState("");

  // object property,Label Name, value, control type,  = arr

  // *** row handler onclick event listener

  const [openComponentView, setComponentView] = React.useState(false);

  //for analyzer ranges
  const [openAnalyzer, setOpenAnalyzer] = useState(false);

  const openComponent = (row, bool, create) => {
    let selectComponents = null;
    setCreateNewComponentFlag(create);
    setOpenFuelFlowsView(false);
    setComponentView(true);
    // if (create) {
    //   setCreateBtn("Create Component");
    //   setCreateBtnAPI(createComponents);
    // }
    if (monitoringSystemsComponents.length > 0 && !create) {
      selectComponents = monitoringSystemsComponents.filter(
        (element) => element.componentId === row.col1
      )[0];
      setSelectedComponent(selectComponents);
      // setCreateBtn("Go Back");
      // if (user && checkout) {
      //   setCreateBtn("Save and Go Back");
      //   setCreateBtnAPI(saveComponents);
      // }
      // console.log(selectComponents, "selectComponents");
      setOpenAnalyzer(selectComponents);
      setSelectedRangeInFirst(selectComponents); // for saving
    }

    setSelectedComponentsModalData(
      modalViewData(
        selectComponents,
        {
          componentId: ["Component ID", "input", "required"],
          sampleAcquisitionMethodCode: [
            "Sample Acquistion Method",
            "dropdown",
            "",
          ],
          componentTypeCode: ["Component Type", "dropdown", "required"],
          basisCode: ["Basis Description", "dropdown", ""],
          manufacturer: ["Manufacturer", "input", ""],
          modelVersion: ["Modal or Version", "input", ""],
          serialNumber: ["Serial Number", "input", ""],
          hgConverterIndicator: ["Hg Converter Indicator", "radio", ""],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        false
      )
    );
    setSecondLevel(true, "Component");
  };

  const payloadComponents = {
    locationId: locationSelectValue,
    id: null,
    matsMethodCode: null,
    matsMethodParameterCode: null,
    beginDate: null,
    beginHour: 0,
    endDate: null,
    endHour: 0,
  };

  const createComponents = () => {
    const userInput = extractUserInput(payloadComponents, ".modalUserInput");
    console.log("checking results before api call", payloadComponents);
    mpApi
      .createMats(userInput)
      .then((result) => {
        console.log("checking results", result, payloadComponents);
      })
      .catch((error) => {
        console.log(error);
      });
    // setUpdateTable(true);
  };

  const saveComponents = () => {
    const userInput = extractUserInput(payloadComponents, ".modalUserInput");
    mpApi
      .saveMonitoringMats(userInput)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // setUpdateTable(true);
  };
  const [openFuelFlowsView, setOpenFuelFlowsView] = React.useState(false);
  // *** row handler onclick event listener

  const totalFuelFlowssOptions = useRetrieveDropdownApi([
    "maximumFuelFlowRateSourceCode",
    "systemFuelFlowUOMCode",
  ]);
  const openFuelFlows = (row, bool, create) => {
    let selectFuelFlows = null;
    // setCreateNewSystem(create);
    setCreateFuelFlowFlag(create);
    setComponentView(false);
    setOpenFuelFlowsView(true);
    // if (create) {
    //   setCreateBtn("Create Fuel Flow");
    //   // setCreateBtnAPI(createFuelFlows);
    // }
    if (monitoringSystemsFuelFlows.length > 0 && !create) {
      selectFuelFlows = monitoringSystemsFuelFlows.filter(
        (element) => element.fuelCode === row.col1
      )[0];
      console.log("checking fuel flows", selectFuelFlows);
      setSelectedFuelFlows(selectFuelFlows);
      // setCreateBtn("Go Back");
      // if (user && checkout) {
      //   setCreateBtn("Save and Go Back");
      //   // setCreateBtnAPI(saveFuelFlows);
      // }
    }
    setSelectedFuelFlowsModalData(
      modalViewData(
        selectFuelFlows,
        {
          maximumFuelFlowRate: ["Max Fuel Flow Rate", "input", "required"],
          systemFuelFlowUOMCode: [
            "Units of Measure Code",
            "dropdown",
            "required",
          ],
          maximumFuelFlowRateSourceCode: [
            "Max Fuel Flow Rate Source",
            "dropdown",
            "required",
          ],

          skip: ["", "skip", ""],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalFuelFlowssOptions
      )
    );

    setSecondLevel(true, "Fuel Flow",create?true:false);
  };

  // const createFuelFlows = () => {
  //   const userInput = extractUserInput(payloadFuelFlows, ".modalUserInput");
  //   console.log("checking results before api call", payloadFuelFlows);
  //   mpApi
  //     .createMats(userInput)
  //     .then((result) => {
  //       console.log("checking results", result, payloadFuelFlows);
  //       // setShow(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // setShow(false);
  //     });
  //   // setUpdateTable(true);
  // };
  const data = useMemo(() => {
    if (monitoringSystemsComponents.length > 0) {
      return fs.getMonitoringPlansSystemsComponentsTableRecords(
        monitoringSystemsComponents
      );
    } else {
      return [];
    }
  }, [monitoringSystemsComponents]);

  const fuelFlowsData = useMemo(() => {
    if (monitoringSystemsFuelFlows.length > 0) {
      return fs.getMonitoringPlansSystemsFuelFlowsComponentsTableRecords(
        monitoringSystemsFuelFlows
      );
    } else {
      return [];
    }
  }, [monitoringSystemsFuelFlows]);
  const [selectedRange, setSelectedRange] = useState("");
  return (
    <div className="methodTable react-transition fade-in">
      {(() => {
        if (!secondLevel) {
          return (
            <div>
              <DataTableRender
                columnNames={columnNames}
                data={data}
                openHandler={openComponent}
                tableTitle="System Components"
                componentStyling="systemsCompTable"
                dataLoaded={dataLoaded}
                actionsBtn={"View"}
                user={user}
                checkout={checkout}
                addBtn={openComponent}
                addBtnName={"Add Component"}
              />
              <DataTableRender
                columnNames={fuelFlowsColumnNames}
                data={fuelFlowsData}
                openHandler={openFuelFlows}
                tableTitle="Fuel Flows"
                user={user}
                checkout={checkout}
                componentStyling="systemsCompTable"
                dataLoaded={dataFuelLoaded}
                actionsBtn={"View"}
                addBtn={openFuelFlows}
                addBtnName={"Create New Fuel Flow"}
              />
            </div>
          );
        } else {
          //THIRD LEVEL
          if (openFuelFlowsView) {
            // fuel flow
            return (
              <ModalDetails
                modalData={selectedFuelFlows}
                backBtn={setSecondLevel}
                data={selectedFuelFlowsModalData}
                cols={2}
                title={
                  createFuelFlowFlag
                    ? "Create Fuel Flow"
                    : user && checkout
                    ? "Edit Fuel Flow"
                    : `Fuel Code: ${selectedFuelFlows["fuelCode"]}, System Type Code: ${selectedFuelFlows["systemTypeCode"]}`
                }
                viewOnly={!(user && checkout)}
              />
            );
          } else if (openComponentView) {
            // components
            return (
              <div>
                {!thirdLevel ? (
                  <div>
                    <ModalDetails
                      modalData={selectedComponent}
                      backBtn={setSecondLevel}
                      data={selectedComponentsModalData}
                      cols={2}
                      title={
                        createNewComponentFlag
                          ? "Create Component"
                          : user && checkout
                          ? `Edit Component: ${selectedComponent["componentId"]}`
                          : `Component: ${selectedComponent["componentId"]}`
                      }
                      viewOnly={!(user && checkout)}
                    />
                    <DataTableAnalyzerRanges
                      selectedRanges={openAnalyzer}
                      thirdLevel={thirdLevel}
                      setThirdLevel={setThirdLevel}
                      updateTable={updateAnalyzerRangeTable}
                      user={user}
                      checkout={checkout}
                      setOpenFuelFlowsView={setOpenFuelFlowsView}
                      setComponentView={setComponentView}
                      setSelectedModalData={setSelectedModalData}
                      // setSaveAnalyzerRange={setSaveAnalyzerRange}
                      setSelectedRange={setSelectedRange}
                      setCreateAnalyzerRangesFlag={setCreateAnalyzerRangesFlag}
                      // setCreateBtn={setCreateBTN}
                      // setCreateBtnAPI={setCreateBtnAPI}
                    />{" "}
                  </div>
                ) : (
                  //EDIT ANALYZER RANGES
                  <ModalDetails
                    modalData={selectedRange}
                    backBtn={setThirdLevel}
                    data={selectedModalData}
                    cols={2}
                    title={
                      createAnalyzerRangesFlag
                        ? "Create Analyzer Range"
                        : user && checkout
                        ? `Edit  Analyzer Range `
                        : ` Analyzer Range `
                    }
                    viewOnly={!(user && checkout)}
                  />
                )}
              </div>
            );
          }
        }
      })()}
    </div>
  );
};

export default DataTableSystemsComponents;
