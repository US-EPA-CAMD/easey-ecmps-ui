import React, { useEffect, useMemo, useReducer, useState } from "react";
import { Preloader } from "@us-epa-camd/easey-design-system";
import DataTable from "react-data-table-component";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import {
  Alert,
  GridContainer,
  Grid,
  Label,
  Dropdown,
  DatePicker,
  Form,
  ButtonGroup,
  Button,
  TextInput,
} from "@trussworks/react-uswds";
import {
  ArrowDownwardSharp,
  CheckSharp,
  CreateSharp,
  DeleteSharp,
  UndoSharp,
} from "@material-ui/icons";

import CustomAccordion from "../CustomAccordion/CustomAccordion";
import Modal from "../Modal/Modal";
import { configurationManagementTitle } from "../../utils/constants/moduleTitles";
import {
  getAllFacilities,
  getUnitStackConfigsByFacId,
  getStackPipesByFacId,
  getUnitsByFacId,
} from "../../utils/api/facilityApi";
import { loadFacilitiesSuccess } from "../../store/actions/facilities";

/*
## CONSTANTS
*/

const DEFAULT_DROPDOWN_TEXT = "-- Select a value --";
const fetchStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  IDLE: "IDLE",
};
const initialFormState = {
  units: [],
  stackPipes: [],
  unitStackConfigs: [],
};

/*
## HELPERS
*/

function formReducer(state, action) {
  switch (action.type) {
    case "ADD_STACK_PIPE": {
      return {
        ...state,
        stackPipes: [...state.stackPipes, action.payload],
      };
    }
    case "ADD_UNIT_STACK_CONFIG": {
      return {
        ...state,
        unitStackConfigs: [...state.unitStackConfigs, action.payload],
      };
    }
    case "ADD_UNIT": {
      return {
        ...state,
        units: [...state.units, action.payload],
      };
    }
    case "REMOVE_STACK_PIPE": {
      return {
        ...state,
        stackPipes: state.stackPipes.filter((sp) => sp.id !== action.payload),
      };
    }
    case "REMOVE_UNIT_STACK_CONFIG": {
      return {
        ...state,
        unitStackConfigs: state.unitStackConfigs.filter(
          (usc) => usc.id !== action.payload
        ),
      };
    }
    case "REMOVE_UNIT": {
      return {
        ...state,
        units: state.units.filter((u) => u.id !== action),
      };
    }
    case "RESET_STATE": {
      return initialFormState;
    }
    case "REVERT_STACK_PIPE": {
      return {
        ...state,
        stackPipes: state.stackPipes.map((sp) => {
          if (sp.id === action.payload) {
            return {
              ...sp,
              ...(sp.originalRecord
                ? {
                    stackPipeId: sp.originalRecord.stackPipeId,
                    activeDate: sp.originalRecord.activeDate,
                    retireDate: sp.originalRecord.retireDate,
                  }
                : {}),
              isEditing: false,
            };
          }
          return sp;
        }),
      };
    }
    case "REVERT_UNIT_STACK_CONFIG": {
      return {
        ...state,
        unitStackConfigs: state.unitStackConfigs.map((usc) => {
          if (usc.id === action.payload) {
            return {
              ...usc,
              ...(usc.originalRecord
                ? {
                    unitId: usc.originalRecord.unitId,
                    stackPipeId: usc.originalRecord.stackPipeId,
                    beginDate: usc.originalRecord.beginDate,
                    endDate: usc.originalRecord.endDate,
                  }
                : {}),
              isEditing: false,
            };
          }
          return usc;
        }),
      };
    }
    case "SET_STACK_PIPE_ACTIVE_DATE": {
      return {
        ...state,
        stackPipes: state.stackPipes.map((sp) => {
          if (sp.id === action.payload.id) {
            return {
              ...sp,
              activeDate: action.payload.activeDate,
            };
          }
          return sp;
        }),
      };
    }
    case "SET_STACK_PIPE_RETIRE_DATE": {
      return {
        ...state,
        stackPipes: state.stackPipes.map((sp) => {
          if (sp.id === action.payload.id) {
            return {
              ...sp,
              retireDate: action.payload.retireDate,
            };
          }
          return sp;
        }),
      };
    }
    case "SET_STACK_PIPE_STACK_PIPE_ID": {
      return {
        ...state,
        stackPipes: state.stackPipes.map((sp) => {
          if (sp.id === action.payload.id) {
            return {
              ...sp,
              stackPipeId: action.payload.stackPipeId,
            };
          }
          return sp;
        }),
      };
    }
    case "SET_STACK_PIPES": {
      return {
        ...state,
        stackPipes: action.payload,
      };
    }
    case "SET_UNIT_STACK_CONFIG_BEGIN_DATE": {
      return {
        ...state,
        unitStackConfigs: state.unitStackConfigs.map((usc) => {
          if (usc.id === action.payload.id) {
            return {
              ...usc,
              beginDate: action.payload.beginDate,
            };
          }
          return usc;
        }),
      };
    }
    case "SET_UNIT_STACK_CONFIG_END_DATE": {
      return {
        ...state,
        unitStackConfigs: state.unitStackConfigs.map((usc) => {
          if (usc.id === action.payload.id) {
            return {
              ...usc,
              endDate: action.payload.endDate,
            };
          }
          return usc;
        }),
      };
    }
    case "SET_UNIT_STACK_CONFIG_STACK_PIPE_ID": {
      return {
        ...state,
        unitStackConfigs: state.unitStackConfigs.map((usc) => {
          if (usc.id === action.payload.id) {
            return {
              ...usc,
              stackPipeId: action.payload.stackPipeId,
            };
          }
          return usc;
        }),
      };
    }
    case "SET_UNIT_STACK_CONFIG_UNIT_ID": {
      return {
        ...state,
        unitStackConfigs: state.unitStackConfigs.map((usc) => {
          if (usc.id === action.payload.id) {
            return {
              ...usc,
              unitId: action.payload.unitId,
            };
          }
          return usc;
        }),
      };
    }
    case "SET_UNIT_STACK_CONFIGS": {
      return {
        ...state,
        unitStackConfigs: action.payload,
      };
    }
    case "SET_UNITS": {
      return {
        ...state,
        units: action.payload,
      };
    }
    case "TOGGLE_EDIT_STACK_PIPE": {
      return {
        ...state,
        stackPipes: state.stackPipes.map((sp) => {
          if (sp.id === action.payload) {
            return {
              ...sp,
              isEditing: !sp.isEditing,
            };
          }
          return sp;
        }),
      };
    }
    case "TOGGLE_EDIT_UNIT_STACK_CONFIG": {
      return {
        ...state,
        unitStackConfigs: state.unitStackConfigs.map((usc) => {
          if (usc.id === action.payload) {
            return {
              ...usc,
              isEditing: !usc.isEditing,
            };
          }
          return usc;
        }),
      };
    }
    case "TOGGLE_EDIT_UNIT": {
      return {
        ...state,
        units: state.units.map((u) => {
          if (u.id === action.payload) {
            return {
              ...u,
              isEditing: !u.isEditing,
            };
          }
          return u;
        }),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function parseDatePickerString(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function sortDatesNullsLast(a, b) {
  if (!a.endDate) return 1;
  if (!b.endDate) return -1;
  return new Date(a.endDate) - new Date(b.endDate);
}

/*
## COMPONENTS
*/

const actionCell = (onToggleEdit, onRemove, onRevert) => {
  return (row, index) => (
    <ButtonGroup>
      <Button
        aria-label={`${row.isEditing ? "Save" : "Edit"} row ${index + 1}`}
        onClick={() => onToggleEdit(row.id)}
        title={row.isEditing ? "Save" : "Edit"}
        type="button"
        unstyled
      >
        {row.isEditing ? <CheckSharp /> : <CreateSharp />}
      </Button>
      <Button
        aria-label={`${row.originalRecord ? "Revert" : "Delete"} row ${
          index + 1
        }`}
        onClick={() =>
          row.originalRecord ? onRevert(row.id) : onRemove(row.id)
        }
        title={row.originalRecord ? "Revert" : "Delete"}
        type="button"
        unstyled
      >
        {row.originalRecord ? <UndoSharp /> : <DeleteSharp />}
      </Button>
    </ButtonGroup>
  );
};

const dateCell = (onChange, required = false) => {
  return (row, index, column, id) =>
    row.isEditing ? (
      <DatePicker
        aria-label={`Edit ${column.name} for row ${index + 1}`}
        defaultValue={column.selector(row)}
        id={`${id}-input`}
        name={`${id}-input`}
        onChange={(e) => onChange(row.id, parseDatePickerString(e))}
        placeholder="Select a date..."
        required={required}
      />
    ) : (
      column.selector(row)
    );
};

const SizedPreloader = () => (
  <div className="height-9 width-9">
    <Preloader showStopButton={false} />
  </div>
);

const StatusContent = ({ children, headingLevel = "h4", label, status }) => (
  <>
    {status === fetchStatus.PENDING && <SizedPreloader />}
    {status === fetchStatus.ERROR && (
      <Alert noIcon slim type="error" headingLevel={headingLevel}>
        Error loading {label}.
      </Alert>
    )}
    {status === fetchStatus.SUCCESS && children}
  </>
);

const textCell = (onChange, required = false) => {
  return (row, index, column, id) =>
    row.isEditing ? (
      <TextInput
        aria-label={`Edit ${column.name} for row ${index + 1}`}
        id={`${id}-input`}
        name={`${id}-input`}
        onChange={(e) => onChange(row.id, e.target.value)}
        placeholder="Enter text..."
        required={required}
        type="text"
        value={column.selector(row)}
      />
    ) : (
      column.selector(row)
    );
};

/*
## MAIN
*/

export const ConfigurationManagement = ({
  checkedOutLocations,
  facilities,
  setFacilities,
  user,
}) => {
  /* STATE */

  const [errorMsgs, setErrorMsgs] = useState([]);
  const [facilitiesStatus, setFacilitiesStatus] = useState(fetchStatus.IDLE);
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [stackPipes, setStackPipes] = useState([]);
  const [stackPipesStatus, setStackPipesStatus] = useState(fetchStatus.IDLE);
  const [units, setUnits] = useState([]);
  const [unitsStatus, setUnitsStatus] = useState(fetchStatus.IDLE);
  const [unitStackConfigs, setUnitStackConfigs] = useState([]);
  const [unitStackConfigsStatus, setUnitStackConfigsStatus] = useState(
    fetchStatus.IDLE
  );

  /* HELPERS */

  const resetFacilityData = () => {
    formDispatch({ type: "RESET_STATE" });
    setUnits([]);
    setUnitsStatus(fetchStatus.IDLE);
    setStackPipes([]);
    setStackPipesStatus(fetchStatus.IDLE);
    setUnitStackConfigs([]);
    setUnitStackConfigsStatus(fetchStatus.IDLE);
  };

  /* HANDLERS */

  const createStackPipe = () => {
    formDispatch({
      type: "ADD_STACK_PIPE",
      payload: {
        activeDate: "",
        id: uuid(),
        isEditing: true,
        retireDate: "",
        stackPipeId: "",
      },
    });
  };
  const createUnitStackConfig = () => {
    formDispatch({
      type: "ADD_UNIT_STACK_CONFIG",
      payload: {
        beginDate: "",
        endDate: "",
        id: uuid(),
        isEditing: true,
        stackPipeId: "",
        unitId: "",
      },
    });
  };
  const handleCheckout = () => {};
  const handleCloseModal = () => setModalVisible(false);
  const handleConfirmSave = () => {};
  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value);
    resetFacilityData();
  };
  const handleInitialSave = () => {
    setModalVisible(true);
  };
  const initializeFormState = (data, type) => {
    formDispatch({
      type,
      payload: data.map((d) => ({
        ...d,
        id: uuid(),
        originalRecord: d,
        isEditing: false,
      })),
    });
  };
  const removeStackPipe = (rowId) => {
    formDispatch({ type: "REMOVE_STACK_PIPE", payload: rowId });
  };
  const removeUnitStackConfig = (rowId) => {
    formDispatch({ type: "REMOVE_UNIT_STACK_CONFIG", payload: rowId });
  };
  const revertStackPipe = (rowId) => {
    formDispatch({ type: "REVERT_STACK_PIPE", payload: rowId });
  };
  const revertUnitStackConfig = (rowId) => {
    formDispatch({ type: "REVERT_UNIT_STACK_CONFIG", payload: rowId });
  };
  const setStackPipeActiveDate = (rowId, activeDate) => {
    formDispatch({
      type: "SET_STACK_PIPE_ACTIVE_DATE",
      payload: {
        id: rowId,
        activeDate,
      },
    });
  };
  const setStackPipeRetireDate = (rowId, retireDate) => {
    formDispatch({
      type: "SET_STACK_PIPE_RETIRE_DATE",
      payload: {
        id: rowId,
        retireDate,
      },
    });
  };
  const setStackPipeStackPipeId = (rowId, stackPipeId) => {
    formDispatch({
      type: "SET_STACK_PIPE_STACK_PIPE_ID",
      payload: {
        id: rowId,
        stackPipeId,
      },
    });
  };
  const setUnitStackConfigBeginDate = (rowId, beginDate) => {
    formDispatch({
      type: "SET_UNIT_STACK_CONFIG_BEGIN_DATE",
      payload: {
        id: rowId,
        beginDate,
      },
    });
  };
  const setUnitStackConfigEndDate = (rowId, endDate) => {
    formDispatch({
      type: "SET_UNIT_STACK_CONFIG_END_DATE",
      payload: {
        id: rowId,
        endDate,
      },
    });
  };
  const setUnitStackConfigStackPipeId = (rowId, stackPipeId) => {
    formDispatch({
      type: "SET_UNIT_STACK_CONFIG_STACK_PIPE_ID",
      payload: {
        id: rowId,
        stackPipeId,
      },
    });
  };
  const setUnitStackConfigUnitId = (rowId, unitId) => {
    formDispatch({
      type: "SET_UNIT_STACK_CONFIG_UNIT_ID",
      payload: {
        id: rowId,
        unitId,
      },
    });
  };
  const toggleEditStackPipe = (rowId) => {
    formDispatch({ type: "TOGGLE_EDIT_STACK_PIPE", payload: rowId });
  };
  const toggleEditUnit = (rowId) => {
    formDispatch({ type: "TOGGLE_EDIT_UNIT", payload: rowId });
  };
  const toggleEditUnitStackConfig = (rowId) => {
    formDispatch({ type: "TOGGLE_EDIT_UNIT_STACK_CONFIG", payload: rowId });
  };

  /* EFFECTS */

  // Load facilities.
  useEffect(() => {
    if (facilitiesStatus === fetchStatus.IDLE) {
      if (facilities.length > 0) {
        setFacilitiesStatus(fetchStatus.SUCCESS);
      } else {
        try {
          setFacilitiesStatus(fetchStatus.PENDING);
          getAllFacilities().then((res) => {
            setFacilities(res.data);
            setFacilitiesStatus(fetchStatus.SUCCESS);
          });
        } catch (err) {
          setFacilitiesStatus(fetchStatus.ERROR);
        }
      }
    }
  }, [facilities, facilitiesStatus, setFacilities]);

  // Load units.
  useEffect(() => {
    if (!selectedFacility) return;

    if (unitsStatus === fetchStatus.IDLE) {
      try {
        setUnitsStatus(fetchStatus.PENDING);
        getUnitsByFacId(selectedFacility).then((res) => {
          setUnits(res.data);
          setUnitsStatus(fetchStatus.SUCCESS);
          initializeFormState(res.data, "SET_UNITS");
        });
      } catch (err) {
        setUnitsStatus(fetchStatus.ERROR);
      }
    }
  }, [selectedFacility, unitsStatus]);

  // Load stacks & pipes.
  useEffect(() => {
    if (!selectedFacility) return;

    if (stackPipesStatus === fetchStatus.IDLE) {
      try {
        setStackPipesStatus(fetchStatus.PENDING);
        getStackPipesByFacId(selectedFacility).then((res) => {
          setStackPipes(res.data);
          setStackPipesStatus(fetchStatus.SUCCESS);
          initializeFormState(res.data, "SET_STACK_PIPES");
        });
      } catch (err) {
        setStackPipesStatus(fetchStatus.ERROR);
      }
    }
  }, [selectedFacility, stackPipesStatus]);

  // Load unit stack configurations.
  useEffect(() => {
    if (!selectedFacility) return;

    if (unitStackConfigsStatus === fetchStatus.IDLE) {
      try {
        setUnitStackConfigsStatus(fetchStatus.PENDING);
        getUnitStackConfigsByFacId(selectedFacility).then((res) => {
          setUnitStackConfigs(res.data);
          setUnitStackConfigsStatus(fetchStatus.SUCCESS);
          initializeFormState(res.data, "SET_UNIT_STACK_CONFIGS");
        });
      } catch (err) {
        setUnitStackConfigsStatus(fetchStatus.ERROR);
      }
    }
  }, [selectedFacility, unitStackConfigsStatus]);

  /* CALCULATED VALUES */

  // Format facilities for dropdown.
  const formattedFacilities = useMemo(() => {
    return facilities.map((f) => ({
      value: f.facilityId,
      label: `${f.facilityName} (${f.facilityId})`,
    }));
  }, [facilities]);

  const isCheckedOut = true;

  if (document.title !== configurationManagementTitle) {
    document.title = configurationManagementTitle;
  }

  return (
    <>
      <div className="react-transition fade-in padding-x-3">
        <h2 className="page-header margin-top-2">Configuration Management</h2>
        <hr />
        <GridContainer className="padding-left-0 margin-left-0 padding-right-0">
          <Grid row>
            <StatusContent
              headingLevel="h3"
              status={facilitiesStatus}
              label="facilities"
            >
              <p>
                <Label htmlFor="facility">Facility</Label>
                <Dropdown
                  onChange={handleFacilityChange}
                  id="facility"
                  name="facility"
                  value={selectedFacility}
                >
                  <option key="" value="">
                    {DEFAULT_DROPDOWN_TEXT}
                  </option>
                  {formattedFacilities.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </Dropdown>
                {selectedFacility && (
                  <Button
                    className="margin-top-2"
                    id="save-button"
                    onClick={handleCheckout}
                    type="button"
                  >
                    Check Out
                  </Button>
                )}
              </p>
            </StatusContent>
          </Grid>
          {selectedFacility && (
            <>
              <hr />
              <Grid row>
                <CustomAccordion
                  headingLevel="h3"
                  tables={[
                    {
                      title: "Units",
                      content: (
                        <StatusContent status={unitsStatus} label="units">
                          <DataTable
                            className="data-display-table react-transition fade-in"
                            columns={[
                              {
                                name: "Unit ID",
                                selector: (row) => row.unitId,
                                sortable: true,
                              },
                            ]}
                            data={formState.units}
                            defaultSortFieldId={1}
                            sortIcon={
                              <ArrowDownwardSharp className="margin-left-2 text-primary" />
                            }
                          />
                        </StatusContent>
                      ),
                    },
                    {
                      title: "Stacks & Pipes",
                      content: (
                        <StatusContent
                          status={stackPipesStatus}
                          label="stacks & pipes"
                        >
                          <DataTable
                            className="data-display-table react-transition fade-in"
                            columns={[
                              {
                                name: "Stack/Pipe ID",
                                cell: textCell(setStackPipeStackPipeId, true),
                                selector: (row) => row.stackPipeId,
                                sortable: true,
                              },
                              {
                                name: "Active Date",
                                cell: dateCell(setStackPipeActiveDate, true),
                                selector: (row) => row.activeDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast,
                              },
                              {
                                name: "Retire Date",
                                cell: dateCell(setStackPipeRetireDate),
                                selector: (row) => row.retireDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast,
                              },
                              {
                                name: "Actions",
                                cell: actionCell(
                                  toggleEditStackPipe,
                                  removeStackPipe,
                                  revertStackPipe
                                ),
                              },
                            ]}
                            data={formState.stackPipes}
                            defaultSortFieldId={1}
                            sortIcon={
                              <ArrowDownwardSharp className="margin-left-2 text-primary" />
                            }
                          />
                          <Button type="button" onClick={createStackPipe}>
                            Add Stack/Pipe
                          </Button>
                        </StatusContent>
                      ),
                    },
                    {
                      title: "Unit Stack Configurations",
                      content: (
                        <StatusContent
                          status={unitStackConfigsStatus}
                          label="unit stack configurations"
                        >
                          <DataTable
                            className="data-display-table react-transition fade-in"
                            columns={[
                              {
                                name: "Unit ID",
                                cell: textCell(setUnitStackConfigUnitId, true),
                                selector: (row) => row.unitId,
                                sortable: true,
                              },
                              {
                                name: "Stack/Pipe ID",
                                cell: textCell(
                                  setUnitStackConfigStackPipeId,
                                  true
                                ),
                                selector: (row) => row.stackPipeId,
                                sortable: true,
                              },
                              {
                                name: "Begin Date",
                                cell: dateCell(
                                  setUnitStackConfigBeginDate,
                                  true
                                ),
                                selector: (row) => row.beginDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast,
                              },
                              {
                                name: "End Date",
                                cell: dateCell(setUnitStackConfigEndDate),
                                selector: (row) => row.endDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast,
                              },
                              {
                                name: "Actions",
                                cell: actionCell(
                                  toggleEditUnitStackConfig,
                                  removeUnitStackConfig,
                                  revertUnitStackConfig
                                ),
                              },
                            ]}
                            data={formState.unitStackConfigs}
                            defaultSortAsc={false}
                            defaultSortFieldId={4}
                            sortIcon={
                              <ArrowDownwardSharp className="margin-left-2 text-primary" />
                            }
                          />
                          <Button type="button" onClick={createUnitStackConfig}>
                            Add Unit Stack Configuration
                          </Button>
                        </StatusContent>
                      ),
                    },
                  ]}
                />
              </Grid>
              <Grid row>
                <Button
                  className="margin-top-2"
                  id="save-button"
                  onClick={handleInitialSave}
                  type="button"
                >
                  Save
                </Button>
                {modalVisible && (
                  <Modal
                    showDarkBg={true}
                    close={handleCloseModal}
                    exitBtn="Save"
                    save={handleConfirmSave}
                    showCancel={false}
                    showSave={user && isCheckedOut}
                    title="Change Summary"
                    errorMsgs={errorMsgs}
                  >
                    Show monitor plan changes
                  </Modal>
                )}
              </Grid>
            </>
          )}
        </GridContainer>
      </div>
    </>
  );
};

export const mapStateToProps = (state) => ({
  checkedOutLocations: state.checkedOutLocations,
  facilities: state.facilities,
});

export const mapDispatchToProps = (dispatch) => ({
  setFacilities: (facilities) => dispatch(loadFacilitiesSuccess(facilities)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationManagement);
