import {
  AddSharp,
  ArrowDownwardSharp,
  CheckSharp,
  CreateSharp,
  DeleteSharp,
  RemoveSharp,
  UndoSharp,
} from "@material-ui/icons";
import {
  Alert,
  Button,
  ButtonGroup,
  ComboBox,
  DatePicker,
  Grid,
  GridContainer,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { setCheckedOutLocations } from "../../store/actions/checkedOutLocations";
import { loadFacilities } from "../../store/actions/facilities";
import { loadMonitoringPlans } from "../../store/actions/monitoringPlans";
import { handleError } from "../../utils/api/apiUtils";
import {
  getStackPipesByOrisCode,
  getUnitsByOrisCode,
  getUnitStackConfigsByOrisCode,
} from "../../utils/api/facilityApi";
import {
  createSingleUnitMP,
  deleteCheckInMonitoringPlanConfiguration,
  getCheckedOutLocations,
  importMP,
  postCheckoutMonitoringPlanConfiguration,
} from "../../utils/api/monitoringPlansApi";
import { dataStatus } from "../../utils/constants/dataStatus";
import { configurationManagementTitle } from "../../utils/constants/moduleTitles";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import Modal from "../Modal/Modal";
import SizedPreloader from "../SizedPreloader/SizedPreloader";
import "./ConfigurationManagement.scss";

/*
## CONSTANTS
*/

const DEFAULT_DROPDOWN_TEXT = "-- Select a value --";
const errorMessages = {
  DUPLICATE_STACKPIPE_IDS: "Stack/Pipe IDs must be unique.",
  EDITS_PENDING: "Please complete any pending edits before continuing.",
  NOT_CHECKED_OUT: "You must check out the facility before saving.",
};
const initialChangeSummaryState = () => ({
  newPlans: [],
  endedPlans: [],
});
const initialFormState = {
  units: [],
  stackPipes: [],
  unitStackConfigs: [],
};
const MONITOR_PLAN_SCHEMA_VERSION = "1.0.0";
const STACK_PIPE_ID_HINT =
  "Enter an ID that begins with CS, CP, MS, or MP and is followed by 1 to 4 alphanumeric characters or dash (-) characters";
const STACK_PIPE_ID_PATTERN = "^[MC][SP][a-zA-Z0-9\\-]{1,4}$";

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
    case "TOGGLE_ASSOCIATE_UNIT": {
      return {
        ...state,
        units: state.units.map((u) => {
          if (u.id === action.payload) {
            return {
              ...u,
              isToggled: !u.isToggled,
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

function formatDateSlashed(dateString) {
  const date = new Date(
    new Date(dateString).toLocaleString("en-us", {
      timeZone: "America/New_York",
    })
  );

  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear()
  );
}

function getOrisCodeByFacId(facilities, facId) {
  return facilities.find((f) => f.facilityRecordId === facId)?.facilityId;
}

function parseDatePickerString(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;
  return date.toISOString().substring(0, 10);
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

function unusedMonitoringLocationDataFields() {
  return {
    monitoringLocationAttribData: [],
    unitCapacityData: [],
    unitControlData: [],
    unitFuelData: [],
    monitoringMethodData: [],
    supplementalMATSMonitoringMethodData: [],
    monitoringFormulaData: [],
    monitoringDefaultData: [],
    monitoringSpanData: [],
    rectangularDuctWAFData: [],
    monitoringLoadData: [],
    componentData: [],
    monitoringSystemData: [],
    monitoringQualificationData: [],
  };
}
/*
## COMPONENTS
*/

const actionCellToggle = (onToggle) => {
  return (row) =>
    row.associatedMonitorPlanIds.length === 0 &&
    ["OPR", "FUT"].includes(row.opStatusCd) ? (
      <Button
        aria-label={
          row.isToggled
            ? "Cancel creating initial monitor plan from unit"
            : "Create initial monitor plan from unit"
        }
        onClick={() => onToggle(row.id)}
        title={row.isToggled ? "Cancel" : "Create"}
        type="button"
        unstyled
      >
        {row.isToggled ? <RemoveSharp /> : <AddSharp />}
      </Button>
    ) : null;
};

const actionCellEdit = (onToggleEdit, onRemove, onRevert) => {
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
  defaultValue = "",
  disabled = (_row) => false,
  onChange = (_id, _value) => {},
  required = false,
}) => {
  return (row, index, column, id) => {
    if (row.isEditing) {
      if (required && !column.selector(row) && defaultValue) {
        onChange(row.id, defaultValue);
      }
      return (
        <DatePicker
          aria-label={`Edit ${column.name} for row ${index + 1}`}
          defaultValue={column.selector(row) ?? ""}
          disabled={disabled(row)}
          form={`form-${row.id}`}
          id={`${id}-input`}
          name={`${id}-input`}
          onChange={(e) => onChange(row.id, parseDatePickerString(e))}
          placeholder="Select a date..."
          required={required}
          value={column.selector(row) ?? ""}
        />
      );
    } else {
      return column.selector(row);
    }
  };
};

const PlanSummary = ({ plan }) => (
  <>
    <h4>{plan.name}</h4>
    <GridContainer>
      <Grid row>
        <Grid col={4} className="text-bold">
          Begin Reporting Period:
        </Grid>
        <Grid col="auto">{plan.beginReportPeriodDescription}</Grid>
      </Grid>
      <Grid row>
        <Grid col={4} className="text-bold">
          End Reporting Period:
        </Grid>
        <Grid col="auto">{plan.endReportPeriodDescription ?? "N/A"}</Grid>
      </Grid>
    </GridContainer>
    <h5 className="display-block text-primary">Plan Reporting Frequencies</h5>
    <GridContainer>
      {plan.reportingFrequencies.map((rf) => (
        <Fragment key={rf.id}>
          <Grid row>
            <Grid col={4} className="text-bold">
              Reporting Period Range:
            </Grid>
            <Grid col="auto">
              {rf.beginReportPeriodDescription} -{" "}
              {rf.endReportPeriodDescription ?? "Current"}
            </Grid>
          </Grid>
          <Grid row>
            <Grid col={4} className="text-bold">
              Reporting Frequency:
            </Grid>
            <Grid col="auto">
              {rf.reportFrequencyCode === "Q" ? "Annual" : "Ozone Season"}
            </Grid>
          </Grid>
        </Fragment>
      ))}
    </GridContainer>
  </>
);

const SaveStatusAlert = ({ status }) => (
  <>
    {status === dataStatus.ERROR && (
      <Alert noIcon slim type="error" headingLevel="h3">
        Error saving changes.
      </Alert>
    )}
    {status === dataStatus.SUCCESS && (
      <Alert noIcon slim type="success" headingLevel="h3">
        Changes saved successfully.
      </Alert>
    )}
  </>
);

const StatusContent = ({ children, headingLevel = "h4", label, status }) => (
  <>
    {status === dataStatus.PENDING && (
      <div className="display-flex flex-justify-center">
        <SizedPreloader />
      </div>
    )}
    {status === dataStatus.ERROR && (
      <Alert noIcon slim type="error" headingLevel={headingLevel}>
        Error loading {label}.
      </Alert>
    )}
    {status === dataStatus.SUCCESS && children}
  </>
);

const SummarySectionPlan = ({ plans, title }) =>
  plans.length ? (
    <section>
      <h3 className="text-primary">{title}</h3>
      <ul className="usa-list usa-list--unstyled">
        {plans.map((plan) => (
          <li key={plan.id}>
            <PlanSummary plan={plan} />
          </li>
        ))}
      </ul>
    </section>
  ) : null;

const textCell = ({
  disabled = (_row) => false,
  onChange,
  pattern,
  placeholder,
  required = false,
  title,
}) => {
  return (row, index, column, id) =>
    row.isEditing ? (
      <TextInput
        aria-label={`Edit ${column.name} for row ${index + 1}`}
        disabled={disabled(row)}
        form={`form-${row.id}`}
        id={`${id}-input`}
        name={`${id}-input`}
        onChange={(e) => onChange(row.id, e.target.value ?? null)}
        pattern={pattern}
        placeholder={placeholder ?? "Enter text..."}
        required={required}
        title={title}
        type="text"
        value={column.selector(row) ?? ""}
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
  loadFacilities,
  loadMonitoringPlans,
  monitoringPlans,
  setCheckedOutLocations,
  user,
}) => {
  /* STATE */

  const [changeSummary, setChangeSummary] = useState(
    initialChangeSummaryState()
  );
  const [changeSummaryStatus, setChangeSummaryStatus] = useState(
    dataStatus.IDLE
  );
  const [checkInOutStatus, setCheckInOutStatus] = useState(dataStatus.IDLE);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [facilitiesStatus, setFacilitiesStatus] = useState(dataStatus.IDLE);
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [modalErrorMsgs, setModalErrorMsgs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [monitoringPlansStatus, setMonitoringPlansStatus] = useState(
    dataStatus.IDLE
  );
  const [saveStatus, setSaveStatus] = useState(dataStatus.IDLE);
  const [selectedFacility, setSelectedFacility] = useState(undefined);
  const [stackPipesStatus, setStackPipesStatus] = useState(dataStatus.IDLE);
  const [unitsStatus, setUnitsStatus] = useState(dataStatus.IDLE);
  const [unitStackConfigsStatus, setUnitStackConfigsStatus] = useState(
    dataStatus.IDLE
  );

  /* CALCULATED VALUES */

  const userFacilities = facilities.filter(
    (f) =>
      user?.facilities.some((uf) => uf.facId === f.facilityRecordId) ?? false
  );

  // Format facilities for dropdown.
  const formattedFacilities = useMemo(() => {
    return userFacilities.map((f) => ({
      value: f.facilityRecordId,
      label: `${f.facilityName} (${f.facilityId})`,
    }));
  }, [userFacilities]);

  const selectedOrisCode =
    selectedFacility &&
    facilities.find((f) => f.facilityRecordId === selectedFacility)?.facilityId;
  const facilityMonitoringPlans = selectedOrisCode
    ? monitoringPlans[selectedOrisCode] ?? []
    : [];

  // TODO: Remove this after migrating to checking out by plants.
  const canCheckOut =
    monitoringPlansStatus === dataStatus.SUCCESS &&
    facilityMonitoringPlans.length > 0;

  const checkedOutLocationsForFacility = checkedOutLocations.filter(
    (loc) => loc.facId === selectedFacility
  );
  const isCheckedOutByUser =
    user &&
    checkedOutLocationsForFacility.length &&
    checkedOutLocationsForFacility.every(
      (loc) => loc.checkedOutBy === user.userId
    );
  const isCheckedOutByOtherUser =
    !user ||
    checkedOutLocationsForFacility.some(
      (loc) => loc.checkedOutBy !== user.userId
    );

  const changedPlansCount = Object.values(changeSummary).flat().length;

  /* HANDLERS */

  const checkForDuplicateStackPipeIds = () => {
    const stackPipeIds = formState.stackPipes.map((sp) => sp.stackPipeId);
    if (new Set(stackPipeIds).size !== stackPipeIds.length) {
      return true;
    }
  };

  const checkForPendingEdits = () => {
    return Object.values(formState)
      .flat()
      .some((row) => row.isEditing);
  };

  const checkInAllPlansForUser = useCallback(async () => {
    await Promise.all(
      (await getCheckedOutLocations()).data
        .filter((loc) => user && loc.checkedOutBy === user.userId)
        .map((loc) => deleteCheckInMonitoringPlanConfiguration(loc.monPlanId))
    );
    setCheckedOutLocations((await getCheckedOutLocations()).data);
  }, [setCheckedOutLocations, user]);

  const createChangeSummary = async () => {
    setChangeSummaryStatus(dataStatus.PENDING);

    try {
      const [bulkResult, ...singleUnitResults] = await Promise.all([
        sendConfigurationsPayload(true),
        ...sendSingleUnitPayloads(true),
      ]);

      setModalErrorMsgs(
        [bulkResult, ...singleUnitResults].filter((r) => typeof r === "string")
      );

      const results =
        typeof bulkResult === "object"
          ? bulkResult.data
          : initialChangeSummaryState();
      singleUnitResults
        .filter((r) => typeof r === "object")
        .forEach((r) => {
          results.newPlans.push(r.data);
        });

      setChangeSummary(results);
      setChangeSummaryStatus(dataStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setChangeSummaryStatus(dataStatus.ERROR);
    }
  };

  const createStackPipe = (facilityId) => () => {
    formDispatch({
      type: "ADD_STACK_PIPE",
      payload: {
        activeDate: null,
        facilityId,
        id: uuid(),
        isEditing: true,
        retireDate: null,
        stackPipeId: "",
      },
    });
  };

  const createUnitStackConfig = () => {
    formDispatch({
      type: "ADD_UNIT_STACK_CONFIG",
      payload: {
        beginDate: null,
        endDate: null,
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
      .filter((loc) => user && loc.checkedOutBy === user.userId);
    try {
      setCheckInOutStatus(dataStatus.PENDING);
      await Promise.all(
        locationsCheckedOutByUserForFacility.map((loc) =>
          deleteCheckInMonitoringPlanConfiguration(loc.monPlanId)
        )
      );
    } finally {
      setCheckInOutStatus(dataStatus.IDLE);
      setCheckedOutLocations((await getCheckedOutLocations()).data);
    }
  };

  const handleCheckOut = async () => {
    if (!selectedFacility) return;

    try {
      setCheckInOutStatus(dataStatus.PENDING);
      await checkInAllPlansForUser();
      const orisCode = getOrisCodeByFacId(userFacilities, selectedFacility);
      if (!orisCode) return;

      await Promise.all(
        facilityMonitoringPlans.map((mp) =>
          postCheckoutMonitoringPlanConfiguration(mp.id, false)
        )
      );
    } catch (err) {
      await checkInAllPlansForUser();
      handleError(err);
    } finally {
      setCheckInOutStatus(dataStatus.IDLE);
      setCheckedOutLocations((await getCheckedOutLocations()).data);
    }
  };

  const handleCloseModal = () => {
    setChangeSummaryStatus(dataStatus.IDLE);
    setChangeSummary(initialChangeSummaryState());
    setModalErrorMsgs([]);
    setModalVisible(false);
    setSaveStatus(dataStatus.IDLE);
  };

  const handleConfirmSave = async () => {
    setSaveStatus(dataStatus.PENDING);
    try {
      await Promise.all([
        sendConfigurationsPayload(false),
        ...sendSingleUnitPayloads(false),
      ]);
      setSaveStatus(dataStatus.SUCCESS);
      [
        setMonitoringPlansStatus,
        setUnitsStatus,
        setStackPipesStatus,
        setUnitStackConfigsStatus,
      ].forEach((setter) => setter(dataStatus.IDLE));
      checkInAllPlansForUser(); // NOTE: This is only necessary until check-outs are done on the plant level
    } catch (err) {
      console.error(err);
      setSaveStatus(dataStatus.ERROR);
    }
  };

  const handleFacilityChange = (e) => {
    setSelectedFacility(e ? parseInt(e) : undefined);
    resetFacilityData();
  };

  const handleInitialSave = () => {
    const newErrorMsgs = [];

    if (checkForPendingEdits()) {
      newErrorMsgs.push(errorMessages.EDITS_PENDING);
    }

    if (canCheckOut && !isCheckedOutByUser) {
      newErrorMsgs.push(errorMessages.NOT_CHECKED_OUT);
    }

    if (checkForDuplicateStackPipeIds())
      newErrorMsgs.push(errorMessages.DUPLICATE_STACKPIPE_IDS);

    setErrorMsgs(newErrorMsgs);
    if (newErrorMsgs.length) return;

    setModalVisible(true);
    createChangeSummary();
  };

  const initializeToggleableFormState = (data, type) => {
    formDispatch({
      type,
      payload: data.map((d) => ({
        ...d,
        id: uuid(),
        originalRecord: d,
        isToggled: false,
      })),
    });
  };

  const initializeEditableFormState = (data, type) => {
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

  const mapFormStateToConfigurationsPayload = () => ({
    monitoringPlanCommentData: [],
    orisCode: userFacilities.find(
      (f) => f.facilityRecordId === selectedFacility
    ).facilityId,
    unitStackConfigurationData: formState.unitStackConfigs.map((usc) => ({
      beginDate: usc.beginDate,
      endDate: usc.endDate,
      stackPipeId: usc.stackPipeId,
      unitId: usc.unitId,
    })),
    monitoringLocationData: formState.stackPipes
      .map((sp) => ({
        unitId: null,
        stackPipeId: sp.stackPipeId,
        activeDate: sp.activeDate,
        retireDate: sp.retireDate,
        nonLoadBasedIndicator: null,
        ...unusedMonitoringLocationDataFields(),
      }))
      .concat(
        formState.units.map((u) => ({
          unitId: u.unitId,
          stackPipeId: null,
          activeDate: null,
          retireDate: null,
          nonLoadBasedIndicator: u.nonLoadBasedIndicator,
          ...unusedMonitoringLocationDataFields(),
        }))
      ),
    version: MONITOR_PLAN_SCHEMA_VERSION,
  });

  const mapFormStateToSingleUnitPayload = (unit) => ({
    unitId: unit.unitId,
    orisCode: selectedOrisCode,
  });

  const removeStackPipe = (rowId) => {
    formDispatch({ type: "REMOVE_STACK_PIPE", payload: rowId });
  };

  const removeUnitStackConfig = (rowId) => {
    formDispatch({ type: "REMOVE_UNIT_STACK_CONFIG", payload: rowId });
  };

  const resetFacilityData = () => {
    formDispatch({ type: "RESET_STATE" });
    setMonitoringPlansStatus(dataStatus.IDLE);
    setUnitsStatus(dataStatus.IDLE);
    setStackPipesStatus(dataStatus.IDLE);
    setUnitStackConfigsStatus(dataStatus.IDLE);
  };

  const revertStackPipe = (rowId) => {
    formDispatch({ type: "REVERT_STACK_PIPE", payload: rowId });
  };

  const revertUnitStackConfig = (rowId) => {
    formDispatch({ type: "REVERT_UNIT_STACK_CONFIG", payload: rowId });
  };

  const sendConfigurationsPayload = (draft) => {
    return importMP(mapFormStateToConfigurationsPayload(), {
      draft,
      shouldHandleError: false,
    });
  };

  const sendSingleUnitPayloads = (draft) => {
    return formState.units
      .filter((u) => u.isToggled)
      .map(mapFormStateToSingleUnitPayload)
      .map((payload) =>
        createSingleUnitMP(payload, { draft, shouldHandleError: false })
      );
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

  const toggleAssociateUnit = (rowId) => {
    formDispatch({ type: "TOGGLE_ASSOCIATE_UNIT", payload: rowId });
  };

  const toggleEditUnitStackConfig = (rowId) => {
    formDispatch({ type: "TOGGLE_EDIT_UNIT_STACK_CONFIG", payload: rowId });
  };

  /* EFFECTS */

  // Load monitoring plans for the selected facility.
  useEffect(() => {
    if (!selectedFacility) return;

    if (monitoringPlansStatus === dataStatus.IDLE) {
      const orisCode = getOrisCodeByFacId(facilities, selectedFacility);
      try {
        setMonitoringPlansStatus(dataStatus.PENDING);
        loadMonitoringPlans(orisCode).then(() =>
          setMonitoringPlansStatus(dataStatus.SUCCESS)
        );
      } catch (err) {
        setMonitoringPlansStatus(dataStatus.ERROR);
      }
    }
  }, [
    facilities,
    loadMonitoringPlans,
    monitoringPlansStatus,
    selectedFacility,
  ]);

  // Load facilities.
  useEffect(() => {
    if (facilitiesStatus === dataStatus.IDLE) {
      if (facilities.length > 0) {
        setFacilitiesStatus(dataStatus.SUCCESS);
      } else {
        try {
          setFacilitiesStatus(dataStatus.PENDING);
          loadFacilities().then(() => setFacilitiesStatus(dataStatus.SUCCESS));
        } catch (err) {
          setFacilitiesStatus(dataStatus.ERROR);
        }
      }
    }
  }, [facilities, facilitiesStatus, loadFacilities]);

  // Load units.
  useEffect(() => {
    if (!selectedOrisCode) return;

    if (unitsStatus === dataStatus.IDLE) {
      try {
        setUnitsStatus(dataStatus.PENDING);
        getUnitsByOrisCode(selectedOrisCode).then((res) => {
          setUnitsStatus(dataStatus.SUCCESS);
          initializeToggleableFormState(
            res.data
              .filter((d) => d.opStatusCd !== "CAN") // Filter out canceled units
              .map((d) => ({
                ...d,
                beginDate: d.beginDate ? d.beginDate.split("T")[0] : null,
                endDate: d.endDate ? d.endDate.split("T")[0] : null,
              })),
            "SET_UNITS"
          );
        });
      } catch (err) {
        setUnitsStatus(dataStatus.ERROR);
      }
    }
  }, [selectedOrisCode, unitsStatus]);

  // Load stacks & pipes.
  useEffect(() => {
    if (!selectedOrisCode) return;

    if (stackPipesStatus === dataStatus.IDLE) {
      try {
        setStackPipesStatus(dataStatus.PENDING);
        getStackPipesByOrisCode(selectedOrisCode).then((res) => {
          setStackPipesStatus(dataStatus.SUCCESS);
          initializeEditableFormState(res.data, "SET_STACK_PIPES");
        });
      } catch (err) {
        setStackPipesStatus(dataStatus.ERROR);
      }
    }
  }, [selectedOrisCode, stackPipesStatus]);

  // Load unit stack configurations.
  useEffect(() => {
    if (!selectedOrisCode) return;

    if (unitStackConfigsStatus === dataStatus.IDLE) {
      try {
        setUnitStackConfigsStatus(dataStatus.PENDING);
        getUnitStackConfigsByOrisCode(selectedOrisCode).then((res) => {
          setUnitStackConfigsStatus(dataStatus.SUCCESS);
          initializeEditableFormState(res.data, "SET_UNIT_STACK_CONFIGS");
        });
      } catch (err) {
        setUnitStackConfigsStatus(dataStatus.ERROR);
      }
    }
  }, [selectedOrisCode, unitStackConfigsStatus]);

  // Check in all monitoring plan configurations checked out by the user when the user changes or the component unloads.
  // TODO: This can be removed when we move to checking out by facility rather than monitoring plan.
  useEffect(() => {
    return () => {
      checkInAllPlansForUser();
    };
  }, [checkInAllPlansForUser]);

  if (document.title !== configurationManagementTitle) {
    document.title = configurationManagementTitle;
  }

  // Update visible errors when interactions occur.
  const newErrorMsgs = errorMsgs.filter((msg) => {
    switch (msg) {
      case errorMessages.NOT_CHECKED_OUT:
        return canCheckOut && !isCheckedOutByUser;
      case errorMessages.DUPLICATE_STACKPIPE_IDS:
        return checkForDuplicateStackPipeIds();
      case errorMessages.EDITS_PENDING:
        return checkForPendingEdits();
      default:
        return true;
    }
  });
  if (newErrorMsgs.length !== errorMsgs.length) {
    setErrorMsgs(newErrorMsgs);
  }

  return !user ? (
    <Alert
      noIcon
      slim
      type="error"
      headingLevel="h2"
      className="margin-bottom-1 width-full"
    >
      You must be logged in to access this page.
    </Alert>
  ) : (
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
                <Label htmlFor="facility">Facility Name/ID</Label>
                <div
                  className="display-flex flex-align-center margin-top-1"
                  id="facilities-container"
                >
                  <div>
                    <ComboBox
                      defaultValue={DEFAULT_DROPDOWN_TEXT}
                      id="facility"
                      name="facility"
                      noResults="No authorized facilities found"
                      options={formattedFacilities}
                      onChange={handleFacilityChange}
                    />
                  </div>
                  {selectedFacility && (
                    <>
                      {checkInOutStatus === dataStatus.PENDING ||
                      monitoringPlansStatus === dataStatus.PENDING ? (
                        <SizedPreloader size={5} />
                      ) : (
                        <>
                          {canCheckOut && (
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
                    </>
                  )}
                </div>
                {checkedOutLocationsForFacility.length > 0 && (
                  <p className="text-bold">
                    Currently checked-out by:{" "}
                    {checkedOutLocationsForFacility[0].checkedOutBy}{" "}
                    {formatDateSlashed(
                      checkedOutLocationsForFacility[0].checkedOutOn
                    )}
                  </p>
                )}
              </div>
            </StatusContent>
          </Grid>
          {selectedFacility && (
            <>
              <hr />
              <Grid row>
                <CustomAccordion
                  className="width-full"
                  headingLevel="h3"
                  id="accordion-configuration-management"
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
                              {
                                name: "Begin Date",
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
                                cell: actionCellToggle(toggleAssociateUnit),
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
                                  pattern: STACK_PIPE_ID_PATTERN,
                                  required: true,
                                  title: STACK_PIPE_ID_HINT,
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
                                cell: actionCellEdit(
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
                            onClick={createStackPipe(selectedFacility)}
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
                                  pattern: STACK_PIPE_ID_PATTERN,
                                  required: true,
                                  title: STACK_PIPE_ID_HINT,
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
                                cell: actionCellEdit(
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
              {errorMsgs.length > 0 &&
                errorMsgs.map((msg) => (
                  <Grid row key={msg}>
                    <Alert
                      noIcon
                      slim
                      type="error"
                      headingLevel="h4"
                      className="margin-bottom-1 width-full"
                    >
                      {msg}
                    </Alert>
                  </Grid>
                ))}
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
                    errorMsgs={modalErrorMsgs}
                    exitBtn="Save"
                    save={handleConfirmSave}
                    saveStatus={saveStatus}
                    showCancel={false}
                    showSave={
                      user &&
                      changeSummaryStatus === dataStatus.SUCCESS &&
                      [dataStatus.IDLE, dataStatus.PENDING].includes(
                        saveStatus
                      ) &&
                      (!canCheckOut || isCheckedOutByUser) &&
                      !modalErrorMsgs.length &&
                      changedPlansCount > 0
                    }
                    title="Change Summary"
                  >
                    <StatusContent
                      headingLevel="h3"
                      label="summary of configuration changes"
                      status={changeSummaryStatus}
                    >
                      {changedPlansCount === 0 ? (
                        <Alert noIcon slim type="info" headingLevel="h3">
                          There are no configuration changes to apply.
                        </Alert>
                      ) : (
                        <>
                          <SummarySectionPlan
                            plans={changeSummary.newPlans}
                            title="New Plans"
                          />
                          <SummarySectionPlan
                            plans={changeSummary.endedPlans}
                            title="Ended Plans"
                          />
                        </>
                      )}
                    </StatusContent>
                    <SaveStatusAlert status={saveStatus} />
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
  monitoringPlans: state.monitoringPlans,
});

export const mapDispatchToProps = (dispatch) => ({
  setCheckedOutLocations: (locations) =>
    dispatch(setCheckedOutLocations(locations)),
  loadFacilities: () => loadFacilities(dispatch),
  loadMonitoringPlans: (orisCode) => loadMonitoringPlans(orisCode)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationManagement);
