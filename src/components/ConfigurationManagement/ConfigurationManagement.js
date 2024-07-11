import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
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
import { setCheckedOutLocations } from "../../store/actions/checkedOutLocations";
import {
  deleteCheckInMonitoringPlanConfiguration,
  getCheckedOutLocations,
  getMonitoringPlans,
  postCheckoutMonitoringPlanConfiguration,
} from "../../utils/api/monitoringPlansApi";
import "./ConfigurationManagement.scss";

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

function checkLocationsIntersect(a, b) {
  for (const unitId of a.unitIds) {
    if (b.unitIds.has(unitId)) return true;
  }

  for (const stackPipeId of a.stackPipeIds) {
    if (b.stackPipeIds.has(stackPipeId)) return true;
  }

  return false;
}

function checkPeriodsIntersect(a, b) {
  if (a.beginYear > b.endYear || a.endYear < b.beginYear) return false;
  if (a.beginYear === b.endYear && a.beginQuarter > b.endQuarter) return false;
  if (a.endYear === b.beginYear && a.endQuarter < b.beginQuarter) return false;
  return true;
}

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
    case "SET_UNIT_BEGIN_DATE": {
      return {
        ...state,
        units: state.units.map((u) => {
          if (u.id === action.payload.id) {
            return {
              ...u,
              beginDate: action.payload.beginDate,
            };
          }
          return u;
        }),
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

function getMergedConfiguration(a, b) {
  const combinedLocations = {
    unitIds: new Set([...a.unitIds, ...b.unitIds]),
    stackPipeIds: new Set([...a.stackPipeIds, ...b.stackPipeIds]),
  };
}

function getYearAndQuarterFromDate(dateString) {
  if (!dateString) return [null, null];

  const date = new Date(dateString);
  return [date.getFullYear(), Math.floor(date.getMonth() / 3) + 1];
}

function groupUnitsAndUnitStackConfigsByPeriodAndUnit(units, unitStackConfigs) {
  return [...units, ...unitStackConfigs].reduce((acc, item) => {
    const [beginYear, beginQuarter] = getYearAndQuarterFromDate(item.beginDate);
    const [endYear, endQuarter] = getYearAndQuarterFromDate(item.endDate);
    for (const grouping of acc) {
      if (
        grouping.unitIds.has(item.unitId) &&
        grouping.beginYear === beginYear &&
        grouping.beginQuarter === beginQuarter &&
        grouping.endYear === endYear &&
        grouping.endQuarter === endQuarter
      ) {
        if (item.stackPipeId) grouping.stackPipeIds.add(item.stackPipeId);
        return acc;
      }
    }
    return acc.concat({
      id: uuid(),
      beginYear,
      beginQuarter,
      endYear,
      endQuarter,
      unitIds: new Set([item.unitId]),
      stackPipeIds: item.stackPipeId ? new Set([item.stackPipeId]) : new Set(),
    });
  }, []);
}

function mergePartialConfigurations(partialConfigurations) {
  if (partialConfigurations.length < 2) return partialConfigurations;

  const currentConfig = partialConfigurations[0];
  for (const compareConfig of partialConfigurations.slice(1)) {
    if (
      !checkLocationsIntersect(currentConfig, compareConfig) ||
      !checkPeriodsIntersect(currentConfig, compareConfig)
    ) {
      continue;
    }

    const mergedConfig = getMergedConfiguration(currentConfig, compareConfig);
    if (mergedConfig) {
      return mergePartialConfigurations(
        partialConfigurations
          .filter(
            (pc) => pc.id !== compareConfig.id && pc.id !== currentConfig.id
          )
          .concat(mergedConfig)
      );
    } else {
      return [
        currentConfig,
        ...mergePartialConfigurations(partialConfigurations.slice(1)),
      ];
    }
  }
}

function parseDatePickerString(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function sortTextNullsLast(key) {
  return (a, b) => {
    if (!a[key]) return 1;
    if (!b[key]) return -1;
    return a[key].localeCompare(b[key]);
  };
}

function sortDatesNullsLast(key) {
  return (a, b) => {
    if (!a[key]) return 1;
    if (!b[key]) return -1;
    return new Date(a[key]) - new Date(b[key]);
  };
}

/*
## COMPONENTS
*/

const actionCell = (onToggleEdit, onRemove, onRevert) => {
  return (row, index) => (
    <ButtonGroup>
      {row.isEditing ? (
        <>
          {/* A regular button is used here instead of a Button component to prevent premature form submission. */}
          <button
            aria-label={`Save row ${index + 1}`}
            form={`form-${row.id}`}
            title="Save"
            type="submit"
            className="usa-button usa-button--unstyled"
          >
            <CheckSharp />
          </button>
        </>
      ) : (
        <Button
          aria-label={`Edit row ${index + 1}`}
          onClick={() => onToggleEdit(row.id)}
          title="Edit"
          type="button"
          unstyled
        >
          <CreateSharp />
        </Button>
      )}
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

const dateCell = ({
  disabled = (_row) => false,
  onChange,
  required = false,
}) => {
  return (row, index, column, id) =>
    row.isEditing ? (
      <input
        aria-label={`Edit ${column.name} for row ${index + 1}`}
        className="usa-input"
        defaultValue={column.selector(row)}
        disabled={disabled(row)}
        form={`form-${row.id}`}
        id={`${id}-input`}
        name={`${id}-input`}
        onChange={(e) => onChange(row.id, parseDatePickerString(e))}
        placeholder="Select a date..."
        required={required}
        type="date"
      />
    ) : (
      column.selector(row)
    );
};

const SizedPreloader = ({ size = 9 }) => {
  return (
    <div className={`height-${size} preloader-container width-${size}`}>
      <Preloader showStopButton={false} />
    </div>
  );
};

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

const textCell = ({
  disabled = (_row) => false,
  onChange,
  required = false,
}) => {
  return (row, index, column, id) =>
    row.isEditing ? (
      <TextInput
        aria-label={`Edit ${column.name} for row ${index + 1}`}
        disabled={disabled(row)}
        form={`form-${row.id}`}
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
  setCheckedOutLocations,
  setFacilities,
  user,
}) => {
  /* STATE */

  const [checkInOutStatus, setCheckInOutStatus] = useState(fetchStatus.IDLE);
  const checkedOutLocationsRef = useRef(checkedOutLocations);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [facilitiesStatus, setFacilitiesStatus] = useState(fetchStatus.IDLE);
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [modalErrorMsgs, setModalErrorMsgs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [stackPipesStatus, setStackPipesStatus] = useState(fetchStatus.IDLE);
  const [summaryStatus, setSummaryStatus] = useState(fetchStatus.IDLE);
  const [unitsStatus, setUnitsStatus] = useState(fetchStatus.IDLE);
  const [unitStackConfigsStatus, setUnitStackConfigsStatus] = useState(
    fetchStatus.IDLE
  );

  /* CALCULATED VALUES */

  // Format facilities for dropdown.
  const formattedFacilities = useMemo(() => {
    return facilities.map((f) => ({
      value: f.facilityRecordId,
      label: `${f.facilityName} (${f.facilityId})`,
    }));
  }, [facilities]);

  const checkedOutLocationsForFacility = checkedOutLocations.filter(
    (loc) => loc.facId === selectedFacility
  );
  const isCheckedOutByUser =
    checkedOutLocationsForFacility.length &&
    checkedOutLocationsForFacility.every(
      (loc) => loc.checkedOutBy === user.userId
    );
  const isCheckedOutByOtherUser = checkedOutLocationsForFacility.some(
    (loc) => loc.checkedOutBy !== user
  );

  if (document.title !== configurationManagementTitle) {
    document.title = configurationManagementTitle;
  }

  if (checkedOutLocationsRef.current !== checkedOutLocations) {
    checkedOutLocationsRef.current = checkedOutLocations;
  }

  /* HANDLERS */

  const checkInAllPlansForUser = useCallback(async () => {
    await Promise.all(
      checkedOutLocationsRef.current
        .filter((loc) => loc.checkedOutBy === user.userId)
        .map((loc) => {
          deleteCheckInMonitoringPlanConfiguration(loc.monPlanId);
        })
    );
    setCheckedOutLocations(
      checkedOutLocationsRef.current.filter(
        (loc) => loc.checkedOutBy !== user.userId
      )
    );
  }, [setCheckedOutLocations, user]);

  const createChangeSummary = async () => {
    setSummaryStatus(fetchStatus.PENDING);

    const partialConfigurations = groupUnitsAndUnitStackConfigsByPeriodAndUnit(
      formState.units,
      formState.unitStackConfigs
    );

    // TODO: Merge partial configurations into full configurations.
    const fullConfigurations = mergePartialConfigurations(
      partialConfigurations
    );

    // TODO: Filter out any plans where items have not been changed.

    // TODO: Fetch the change summary for each plan.

    setSummaryStatus(fetchStatus.SUCCESS);
  };

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

  const handleCheckIn = async () => {
    if (!selectedFacility) return;

    const locationsCheckedOutByUserForFacility = checkedOutLocations
      .filter((loc) => loc.facId === selectedFacility)
      .filter((loc) => loc.checkedOutBy === user.userId);
    try {
      setCheckInOutStatus(fetchStatus.PENDING);
      await Promise.all(
        locationsCheckedOutByUserForFacility.map((loc) =>
          deleteCheckInMonitoringPlanConfiguration(loc.monPlanId)
        )
      );
      setCheckedOutLocations(
        checkedOutLocations.filter(
          (loc) =>
            loc.facId !== selectedFacility || loc.checkedOutBy !== user.userId
        )
      );
    } finally {
      setCheckInOutStatus(fetchStatus.IDLE);
    }
  };

  const handleCheckOut = async () => {
    if (!selectedFacility) return;

    try {
      setCheckInOutStatus(fetchStatus.PENDING);
      await checkInAllPlansForUser();
      const orisCode = facilities.find(
        (f) => f.facilityRecordId === parseInt(selectedFacility)
      )?.facilityId;
      if (!orisCode) return;

      const monitoringPlans = await getMonitoringPlans(orisCode);
      await Promise.all(
        monitoringPlans.data.map((mp) =>
          postCheckoutMonitoringPlanConfiguration(mp.id)
        )
      );
      setCheckedOutLocations((await getCheckedOutLocations()).data);
    } finally {
      setCheckInOutStatus(fetchStatus.IDLE);
    }
  };

  const handleCloseModal = () => setModalVisible(false);

  const handleConfirmSave = () => {};

  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value ? parseInt(e.target.value) : "");
    resetFacilityData();
  };

  const handleInitialSave = () => {
    const newErrorMsgs = [];
    if (
      Object.values(formState)
        .flat()
        .some((row) => row.isEditing)
    ) {
      newErrorMsgs.push("Please complete any pending edits before continuing.");
    }
    if (!isCheckedOutByUser) {
      newErrorMsgs.push("You must check out the facility before saving.");
    }
    if (newErrorMsgs.length) {
      setErrorMsgs(newErrorMsgs);
      return;
    }
    setModalVisible(true);
    createChangeSummary();
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

  const resetFacilityData = () => {
    formDispatch({ type: "RESET_STATE" });
    setUnitsStatus(fetchStatus.IDLE);
    setStackPipesStatus(fetchStatus.IDLE);
    setUnitStackConfigsStatus(fetchStatus.IDLE);
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

  const setUnitBeginDate = (rowId, beginDate) => {
    formDispatch({
      type: "SET_UNIT_BEGIN_DATE",
      payload: {
        id: rowId,
        beginDate,
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
          setUnitsStatus(fetchStatus.SUCCESS);
          initializeFormState(
            res.data.map((d) => ({
              ...d,
              beginDate: d.beginDate ? d.beginDate.split("T")[0] : null,
              endDate: d.endDate ? d.endDate.split("T")[0] : null,
            })),
            "SET_UNITS"
          );
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
          setUnitStackConfigsStatus(fetchStatus.SUCCESS);
          initializeFormState(res.data, "SET_UNIT_STACK_CONFIGS");
        });
      } catch (err) {
        setUnitStackConfigsStatus(fetchStatus.ERROR);
      }
    }
  }, [selectedFacility, unitStackConfigsStatus]);

  // Check in all monitoring plan configurations checked out by the user when the user changes or the component unloads.
  // TODO: This can be removed when we move to checking out by facility rather than monitoring plan.
  useEffect(() => {
    return () => {
      checkInAllPlansForUser();
    };
  }, [checkInAllPlansForUser]);

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
              <div>
                <Label htmlFor="facility">Facility</Label>
                <div className="display-flex" id="facilities-container">
                  <Dropdown
                    className="margin-0"
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
                    <>
                      {checkInOutStatus === fetchStatus.PENDING ? (
                        <SizedPreloader size={5} />
                      ) : (
                        <>
                          {isCheckedOutByUser ? (
                            <Button
                              className="display-inline-flex height-5 margin-0"
                              id="check-in-button"
                              onClick={handleCheckIn}
                              type="button"
                            >
                              Check Back In
                            </Button>
                          ) : (
                            <Button
                              className="display-inline-flex height-5 margin-0"
                              disabled={isCheckedOutByOtherUser}
                              id="check-out-button"
                              onClick={handleCheckOut}
                              type="button"
                            >
                              Check Out
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
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
                          {formState.units.map((u) => (
                            <form
                              key={u.id}
                              id={`form-${u.id}`}
                              onSubmit={(e) => {
                                e.preventDefault();
                                toggleEditUnit(u.id);
                              }}
                            ></form>
                          ))}
                          <DataTable
                            className="data-display-table react-transition fade-in"
                            columns={[
                              {
                                name: "Unit ID",
                                selector: (row) => row.unitId,
                                sortable: true,
                              },
                              {
                                name: "Begin Date",
                                cell: dateCell({
                                  disabled: (row) => row.originalRecord,
                                  onChange: setUnitBeginDate,
                                }),
                                selector: (row) => row.beginDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast("beginDate"),
                              },
                              {
                                name: "End Date",
                                selector: (row) => row.endDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast("endDate"),
                              },
                              {
                                name: "Actions",
                                cell: actionCell(
                                  toggleEditUnit,
                                  removeStackPipe,
                                  revertStackPipe
                                ),
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
                          {formState.stackPipes.map((sp) => (
                            <form
                              key={sp.id}
                              id={`form-${sp.id}`}
                              onSubmit={(e) => {
                                e.preventDefault();
                                toggleEditStackPipe(sp.id);
                              }}
                            ></form>
                          ))}
                          <DataTable
                            className="data-display-table react-transition fade-in"
                            columns={[
                              {
                                name: "Stack/Pipe ID",
                                cell: textCell({
                                  disabled: (row) => row.originalRecord,
                                  onChange: setStackPipeStackPipeId,
                                  required: true,
                                }),
                                selector: (row) => row.stackPipeId,
                                sortable: true,
                                sortFunction: sortTextNullsLast("stackPipeId"),
                              },
                              {
                                name: "Active Date",
                                cell: dateCell({
                                  disabled: (row) => row.originalRecord,
                                  onChange: setStackPipeActiveDate,
                                  required: true,
                                }),
                                selector: (row) => row.activeDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast("activeDate"),
                              },
                              {
                                name: "Retire Date",
                                cell: dateCell({
                                  disabled: (row) =>
                                    row.originalRecord?.retireDate,
                                  onChange: setStackPipeRetireDate,
                                }),
                                selector: (row) => row.retireDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast("retireDate"),
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
                          <Button
                            className="margin-y-1"
                            type="button"
                            onClick={createStackPipe}
                          >
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
                          {formState.unitStackConfigs.map((usc) => (
                            <form
                              key={usc.id}
                              id={`form-${usc.id}`}
                              onSubmit={(e) => {
                                e.preventDefault();
                                toggleEditUnitStackConfig(usc.id);
                              }}
                            ></form>
                          ))}
                          <DataTable
                            className="data-display-table react-transition fade-in"
                            columns={[
                              {
                                name: "Unit ID",
                                cell: textCell({
                                  disabled: (row) => row.originalRecord,
                                  onChange: setUnitStackConfigUnitId,
                                  required: true,
                                }),
                                selector: (row) => row.unitId,
                                sortable: true,
                                sortFunction: sortTextNullsLast("unitId"),
                              },
                              {
                                name: "Stack/Pipe ID",
                                cell: textCell({
                                  disabled: (row) => row.originalRecord,
                                  onChange: setUnitStackConfigStackPipeId,
                                  required: true,
                                }),
                                selector: (row) => row.stackPipeId,
                                sortable: true,
                                sortFunction: sortTextNullsLast("stackPipeId"),
                              },
                              {
                                name: "Begin Date",
                                cell: dateCell({
                                  disabled: (row) => row.originalRecord,
                                  onChange: setUnitStackConfigBeginDate,
                                  required: true,
                                }),
                                selector: (row) => row.beginDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast("beginDate"),
                              },
                              {
                                name: "End Date",
                                cell: dateCell({
                                  disabled: (row) =>
                                    row.originalRecord?.endDate,
                                  onChange: setUnitStackConfigEndDate,
                                }),
                                selector: (row) => row.endDate,
                                sortable: true,
                                sortFunction: sortDatesNullsLast("endDate"),
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
                          <Button
                            className="margin-y-1"
                            type="button"
                            onClick={createUnitStackConfig}
                          >
                            Add Unit Stack Configuration
                          </Button>
                        </StatusContent>
                      ),
                    },
                  ]}
                />
              </Grid>
              {errorMsgs.length > 0 && (
                <Grid row>
                  {errorMsgs.map((msg, i) => (
                    <Alert key={i} noIcon slim type="error" headingLevel="h4">
                      {msg}
                    </Alert>
                  ))}
                </Grid>
              )}
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
                    showSave={user && isCheckedOutByUser}
                    title="Change Summary"
                  >
                    {summaryStatus === fetchStatus.PENDING && (
                      <SizedPreloader />
                    )}
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
  setCheckedOutLocations: (locations) =>
    dispatch(setCheckedOutLocations(locations)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationManagement);
