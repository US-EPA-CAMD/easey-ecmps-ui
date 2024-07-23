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
  DatePicker,
  Grid,
  GridContainer,
  Label,
  Select,
  TextInput,
} from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import React, {
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
import {
  getStackPipesByFacId,
  getUnitsByFacId,
  getUnitStackConfigsByFacId,
} from "../../utils/api/facilityApi";
import {
  deleteCheckInMonitoringPlanConfiguration,
  getCheckedOutLocations,
  getMonitoringPlans,
  importMP,
  postCheckoutMonitoringPlanConfiguration,
} from "../../utils/api/monitoringPlansApi";
import { configurationManagementTitle } from "../../utils/constants/moduleTitles";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import Modal from "../Modal/Modal";
import "./ConfigurationManagement.scss";

/*
## CONSTANTS
*/

const DEFAULT_DROPDOWN_TEXT = "-- Select a value --";
const dataStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  IDLE: "IDLE",
};
const errorMessages = {
  DUPLICATE_STACKPIPE_IDS: "Stack/Pipe IDs must be unique.",
  EDITS_PENDING: "Please complete any pending edits before continuing.",
  NOT_CHECKED_OUT: "You must check out the facility before saving.",
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
  const { unitIds: unitIdsA, stackPipeIds: stackPipeIdsA } = getItemLocations(
    a.items
  );
  const { unitIds: unitIdsB, stackPipeIds: stackPipeIdsB } = getItemLocations(
    b.items
  );

  for (const unitId of unitIdsA) {
    if (unitIdsB.has(unitId)) return true;
  }

  for (const stackPipeId of stackPipeIdsA) {
    if (stackPipeIdsB.has(stackPipeId)) return true;
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

function getItemLocations(items) {
  const unitIds = new Set(items.map((item) => item.unitId));
  unitIds.delete(undefined);
  unitIds.delete(null);
  const stackPipeIds = new Set(items.map((item) => item.stackPipeId));
  stackPipeIds.delete(undefined);
  stackPipeIds.delete(null);

  return { unitIds, stackPipeIds };
}

function getMergedConfiguration(a, b) {
  const combinedItems = [...a.items, ...b.items];

  if (a.beginYear === b.beginYear && a.beginQuarter === b.beginQuarter) {
    if (a.endYear === b.endYear && a.endQuarter === b.endQuarter) {
      return {
        id: uuid(),
        items: combinedItems,
        beginYear: a.beginYear,
        beginQuarter: a.beginQuarter,
        endYear: a.endYear,
        endQuarter: a.endQuarter,
      };
    }

    if (
      a.endYear < b.endYear ||
      (a.endYear === b.endYear && a.endQuarter < b.endQuarter)
    ) {
      if (locationsMatch(a.items, b.items)) {
        return {
          id: uuid(),
          items: combinedItems,
          beginYear: a.beginYear,
          beginQuarter: a.beginQuarter,
          endYear: b.endYear,
          endQuarter: b.endQuarter,
        };
      } else {
        return [
          {
            id: uuid(),
            items: combinedItems,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
          },
          {
            id: uuid(),
            items: b.items,
            beginYear: a.endQuarter === 4 ? a.endYear + 1 : a.endYear,
            beginQuarter: a.endQuarter === 4 ? 1 : a.endQuarter + 1,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
            unitIds: b.unitIds,
            stackPipeIds: b.stackPipeIds,
          },
        ];
      }
    }

    if (
      a.endYear > b.endYear ||
      (a.endYear === b.endYear && a.endQuarter > b.endQuarter)
    ) {
      if (locationsMatch(a.items, b.items)) {
        return {
          id: uuid(),
          items: combinedItems,
          beginYear: a.beginYear,
          beginQuarter: a.beginQuarter,
          endYear: a.endYear,
          endQuarter: a.endQuarter,
        };
      } else {
        return [
          {
            id: uuid(),
            items: combinedItems,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
          },
          {
            id: uuid(),
            items: a.items,
            beginYear: b.endQuarter === 4 ? b.endYear + 1 : b.endYear,
            beginQuarter: b.endQuarter === 4 ? 1 : b.endQuarter + 1,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
            unitIds: a.unitIds,
            stackPipeIds: a.stackPipeIds,
          },
        ];
      }
    }
  }

  if (
    a.beginYear < b.beginYear ||
    (a.beginYear === b.beginYear && a.beginQuarter < b.beginQuarter)
  ) {
    if (a.endYear === b.endYear && a.endQuarter === b.endQuarter) {
      if (locationsMatch(a.items, b.items)) {
        return {
          id: uuid(),
          items: combinedItems,
          beginYear: a.beginYear,
          beginQuarter: a.beginQuarter,
          endYear: a.endYear,
          endQuarter: a.endQuarter,
        };
      } else {
        return [
          {
            id: uuid(),
            items: a.items,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: b.beginQuarter === 1 ? b.beginYear - 1 : b.beginYear,
            endQuarter: b.beginQuarter === 1 ? 4 : b.beginQuarter - 1,
            unitIds: a.unitIds,
            stackPipeIds: a.stackPipeIds,
          },
          {
            id: uuid(),
            items: combinedItems,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
          },
        ];
      }
    }

    if (
      a.endYear < b.endYear ||
      (a.endYear === b.endYear && a.endQuarter < b.endQuarter)
    ) {
      if (locationsMatch(a.items, b.items)) {
        return {
          id: uuid(),
          items: combinedItems,
          beginYear: a.beginYear,
          beginQuarter: a.beginQuarter,
          endYear: b.endYear,
          endQuarter: b.endQuarter,
        };
      } else if (locationsMatch(a.items, combinedItems)) {
        return [
          {
            id: uuid(),
            items: a.items,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
            unitIds: a.unitIds,
            stackPipeIds: a.stackPipeIds,
          },
          {
            id: uuid(),
            items: b.items,
            beginYear: a.endQuarter === 4 ? a.endYear + 1 : a.endYear,
            beginQuarter: a.endQuarter === 4 ? 1 : a.endQuarter + 1,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
            unitIds: b.unitIds,
            stackPipeIds: b.stackPipe,
          },
        ];
      } else if (locationsMatch(b.items, combinedItems)) {
        return [
          {
            id: uuid(),
            items: a.items,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: b.beginQuarter === 1 ? b.beginYear - 1 : b.beginYear,
            endQuarter: b.beginQuarter === 1 ? 4 : b.beginQuarter - 1,
            unitIds: a.unitIds,
            stackPipeIds: a.stackPipeIds,
          },
          {
            id: uuid(),
            items: b.items,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
            unitIds: b.unitIds,
            stackPipeIds: b.stackPipeIds,
          },
        ];
      } else {
        return [
          {
            id: uuid(),
            items: a.items,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: b.beginQuarter === 1 ? b.beginYear - 1 : b.beginYear,
            endQuarter: b.beginQuarter === 1 ? 4 : b.beginQuarter - 1,
            unitIds: a.unitIds,
            stackPipeIds: a.stackPipeIds,
          },
          {
            id: uuid(),
            items: combinedItems,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
          },
          {
            id: uuid(),
            items: b.items,
            beginYear: a.endQuarter === 4 ? a.endYear + 1 : a.endYear,
            beginQuarter: a.endQuarter === 4 ? 1 : a.endQuarter + 1,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
            unitIds: b.unitIds,
            stackPipeIds: b.stackPipeIds,
          },
        ];
      }
    }

    if (
      a.endYear > b.endYear ||
      (a.endYear === b.endYear && a.endQuarter > b.endQuarter)
    ) {
      if (locationsMatch(a.items, combinedItems)) {
        return {
          id: uuid(),
          items: combinedItems,
          beginYear: a.beginYear,
          beginQuarter: a.beginQuarter,
          endYear: b.endYear,
          endQuarter: b.endQuarter,
        };
      } else {
        return [
          {
            id: uuid(),
            items: a.items,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: b.beginQuarter === 1 ? b.beginYear - 1 : b.beginYear,
            endQuarter: b.beginQuarter === 1 ? 4 : b.beginQuarter - 1,
            unitIds: a.unitIds,
            stackPipeIds: a.stackPipeIds,
          },
          {
            id: uuid(),
            items: combinedItems,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
          },
          {
            id: uuid(),
            items: a.items,
            beginYear: b.endQuarter === 4 ? b.endYear + 1 : b.endYear,
            beginQuarter: b.endQuarter === 4 ? 1 : b.endQuarter + 1,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
            unitIds: a.unitIds,
            stackPipeIds: a.stackPipeIds,
          },
        ];
      }
    }
  }

  if (
    a.beginYear > b.beginYear ||
    (a.beginYear === b.beginYear && a.beginQuarter > b.beginQuarter)
  ) {
    if (a.endYear === b.endYear && a.endQuarter === b.endQuarter) {
      if (locationsMatch(a.items, b.items)) {
        return {
          id: uuid(),
          items: combinedItems,
          beginYear: b.beginYear,
          beginQuarter: b.beginQuarter,
          endYear: b.endYear,
          endQuarter: b.endQuarter,
        };
      } else {
        return [
          {
            id: uuid(),
            items: b.items,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: a.beginQuarter === 1 ? a.beginYear - 1 : a.beginYear,
            endQuarter: a.beginQuarter === 1 ? 4 : a.beginQuarter - 1,
            unitIds: b.unitIds,
            stackPipeIds: b.stackPipeIds,
          },
          {
            id: uuid(),
            items: combinedItems,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
          },
        ];
      }
    }

    if (
      a.endYear < b.endYear ||
      (a.endYear === b.endYear && a.endQuarter < b.endQuarter)
    ) {
      if (locationsMatch(b.items, combinedItems)) {
        return {
          id: uuid(),
          items: combinedItems,
          beginYear: b.beginYear,
          beginQuarter: b.beginQuarter,
          endYear: b.endYear,
          endQuarter: b.endQuarter,
        };
      } else {
        return [
          {
            id: uuid(),
            items: b.items,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: a.beginQuarter === 1 ? a.beginYear - 1 : a.beginYear,
            endQuarter: a.beginQuarter === 1 ? 4 : a.beginQuarter - 1,
            unitIds: b.unitIds,
            stackPipeIds: b.stackPipeIds,
          },
          {
            id: uuid(),
            items: combinedItems,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
          },
          {
            id: uuid(),
            items: b.items,
            beginYear: a.endQuarter === 4 ? a.endYear + 1 : a.endYear,
            beginQuarter: a.endQuarter === 4 ? 1 : a.endQuarter + 1,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
            unitIds: b.unitIds,
            stackPipeIds: b.stackPipeIds,
          },
        ];
      }
    }

    if (
      a.endYear > b.endYear ||
      (a.endYear === b.endYear && a.endQuarter > b.endQuarter)
    ) {
      if (locationsMatch(a.items, b.items)) {
        return {
          id: uuid(),
          items: combinedItems,
          beginYear: b.beginYear,
          beginQuarter: b.beginQuarter,
          endYear: a.endYear,
          endQuarter: a.endQuarter,
        };
      } else if (locationsMatch(b.items, combinedItems)) {
        return [
          {
            id: uuid(),
            items: combinedItems,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
          },
          {
            id: uuid(),
            items: a.items,
            beginYear: b.endQuarter === 4 ? b.endYear + 1 : b.endYear,
            beginQuarter: b.endQuarter === 4 ? 1 : b.endQuarter + 1,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
            unitIds: a.unitIds,
            stackPipeIds: a.stackPipeIds,
          },
        ];
      } else if (locationsMatch(a.items, combinedItems)) {
        return [
          {
            id: uuid(),
            items: b.items,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: a.beginQuarter === 1 ? a.beginYear - 1 : a.beginYear,
            endQuarter: a.beginQuarter === 1 ? 4 : a.beginQuarter - 1,
            unitIds: b.unitIds,
            stackPipeIds: b.stackPipeIds,
          },
          {
            id: uuid(),
            items: combinedItems,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
          },
        ];
      } else {
        return [
          {
            id: uuid(),
            items: b.items,
            beginYear: b.beginYear,
            beginQuarter: b.beginQuarter,
            endYear: a.beginQuarter === 1 ? a.beginYear - 1 : a.beginYear,
            endQuarter: a.beginQuarter === 1 ? 4 : a.beginQuarter - 1,
            unitIds: b.unitIds,
            stackPipeIds: b.stackPipeIds,
          },
          {
            id: uuid(),
            items: combinedItems,
            beginYear: a.beginYear,
            beginQuarter: a.beginQuarter,
            endYear: b.endYear,
            endQuarter: b.endQuarter,
          },
          {
            id: uuid(),
            items: a.items,
            beginYear: b.endQuarter === 4 ? b.endYear + 1 : b.endYear,
            beginQuarter: b.endQuarter === 4 ? 1 : b.endQuarter + 1,
            endYear: a.endYear,
            endQuarter: a.endQuarter,
            unitIds: a.unitIds,
            stackPipeIds: a.stackPipeIds,
          },
        ];
      }
    }
  }
}

function getOrisCodeByFacId(facilities, facId) {
  return facilities.find((f) => f.facilityRecordId === facId)?.facilityId;
}

function getYearAndQuarterFromDate(dateString) {
  if (!dateString) return [Infinity, Infinity];

  const date = new Date(dateString);
  return [date.getUTCFullYear(), Math.floor(date.getUTCMonth() / 3) + 1];
}

function groupUnitsAndUnitStackConfigsByPeriodAndUnit(units, unitStackConfigs) {
  return [...units, ...unitStackConfigs].reduce((acc, item) => {
    const [beginYear, beginQuarter] = getYearAndQuarterFromDate(item.beginDate);
    const [endYear, endQuarter] = getYearAndQuarterFromDate(item.endDate);
    for (const grouping of acc) {
      if (
        grouping.items.find((i) => i.unitId === item.unitId) &&
        grouping.beginYear === beginYear &&
        grouping.beginQuarter === beginQuarter &&
        grouping.endYear === endYear &&
        grouping.endQuarter === endQuarter
      ) {
        grouping.items.push(item);
        return acc;
      }
    }
    return acc.concat({
      id: uuid(),
      beginYear,
      beginQuarter,
      endYear,
      endQuarter,
      items: [item],
    });
  }, []);
}

function locationsMatch(a, b) {
  const { unitIds: unitIdsA, stackPipeIds: stackPipeIdsA } =
    getItemLocations(a);
  const { unitIds: unitIdsB, stackPipeIds: stackPipeIdsB } =
    getItemLocations(b);

  return (
    unitIdsA.size === unitIdsB.size &&
    [...unitIdsA].every((id) => unitIdsB.has(id)) &&
    stackPipeIdsA.size === stackPipeIdsB.size &&
    [...stackPipeIdsA].every((id) => stackPipeIdsB.has(id))
  );
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
    }
  }
  return [
    normalizeConfigurationPeriods(currentConfig),
    ...mergePartialConfigurations(partialConfigurations.slice(1)),
  ];
}

function normalizeConfigurationPeriods(configuration) {
  const numberOrNull = (num) => (Number.isFinite(num) ? num : null);
  return {
    ...configuration,
    beginQuarter: numberOrNull(configuration.beginQuarter),
    beginYear: numberOrNull(configuration.beginYear),
    endQuarter: numberOrNull(configuration.endQuarter),
    endYear: numberOrNull(configuration.endYear),
  };
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
    row.associatedMonitorPlanIds.length === 0 ? (
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

const PlanSummary = ({ plan }) => {
  return (
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
          <>
            <Grid row key={rf.id}>
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
                {rf.reportingFrequencyCode === "Q" ? "Annual" : "Ozone Season"}
              </Grid>
            </Grid>
          </>
        ))}
      </GridContainer>
    </>
  );
};

const SizedPreloader = ({ size = 9 }) => {
  return (
    <div
      className={`display-flex flex-align-center height-${size} preloader-container width-${size}`}
    >
      <Preloader showStopButton={false} />
    </div>
  );
};

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

const SummarySectionStackPipes = ({ stackPipes, title }) =>
  stackPipes.length ? (
    <section>
      <h3 className="text-primary">{title}</h3>
      <ul className="usa-list usa-list--unstyled">
        {stackPipes.map((sp) => (
          <></>
        ))}
      </ul>
    </section>
  ) : null;

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
        onChange={(e) => onChange(row.id, e.target.value ?? null)}
        placeholder="Enter text..."
        required={required}
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

  const [changeSummary, setChangeSummary] = useState({
    plans: { newPlans: [], endedPlans: [], unchangedPlans: [] },
    stackPipes: [],
  });
  const [changeSummaryStatus, setChangeSummaryStatus] = useState(
    dataStatus.IDLE
  );
  const [checkInOutStatus, setCheckInOutStatus] = useState(dataStatus.IDLE);
  const checkedOutLocationsRef = useRef(checkedOutLocations);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [facilitiesStatus, setFacilitiesStatus] = useState(dataStatus.IDLE);
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [modalErrorMsgs, setModalErrorMsgs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [monitorPlanPayloads, setMonitorPlanPayloads] = useState([]);
  const [monitoringPlansStatus, setMonitoringPlansStatus] = useState(
    dataStatus.IDLE
  );
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

  // TODO: Remove this after migrating to checking out by plants.
  const canCheckOut = monitoringPlans.length > 0;

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
        .filter((loc) => user && loc.checkedOutBy === user.userId)
        .map((loc) => deleteCheckInMonitoringPlanConfiguration(loc.monPlanId))
    );
    setCheckedOutLocations((await getCheckedOutLocations()).data);
  }, [setCheckedOutLocations, user]);

  const createChangeSummary = async () => {
    setChangeSummaryStatus(dataStatus.PENDING);

    try {
      const partialConfigurations =
        groupUnitsAndUnitStackConfigsByPeriodAndUnit(
          formState.units,
          formState.unitStackConfigs
        );

      // Merge partial configurations into full configurations.
      const fullConfigurations = mergePartialConfigurations(
        partialConfigurations
      );

      // Filter out any plans where items have not been changed or it is matched to an existing inactive plan.
      const changedConfigurations = fullConfigurations
        .filter((c) =>
          c.items.some(
            (item) =>
              !item.originalRecord ||
              item.beginDate !== item.originalRecord.beginDate ||
              item.endDate !== item.originalRecord.endDate
          )
        )
        .filter((c) => {
          const matchedPlan = monitoringPlans.find((mp) => {
            const configBeginPeriod = `${c.beginYear} Q${c.beginQuarter}`;
            return (
              configBeginPeriod === mp.beginReportingPeriodDescription &&
              locationsMatch(mp.monitoringLocationData, c.items)
            );
          });
          return !matchedPlan || matchedPlan.active;
        });

      const newlyAssociatedUnits = formState.units.filter((u) => u.isToggled);

      const newMonitorPlanPayloads = changedConfigurations
        .map(mapConfigurationToPayload)
        .concat(newlyAssociatedUnits.map(mapUnitToPayload));

      // Generate a list of any stack/pipes that have been changed but are not part of a changed plan.
      const affectedStackPipeIds = new Set(
        newMonitorPlanPayloads
          .flatMap((p) =>
            p.unitStackConfigurationData
              .map((usc) => usc.stackPipeId)
              .concat(p.monitoringLocationData.map((ml) => ml.stackPipeId))
          )
          .filter((id) => id)
      );
      const unchangedStackPipes = formState.stackPipes.filter(
        (sp) => !affectedStackPipeIds.has(sp.stackPipeId)
      );

      // TODO: Fetch the change summary for each stack/pipe.

      // Fetch the change summary for each plan.
      const planResults = await Promise.all(
        newMonitorPlanPayloads.map((payload) => importMP(payload, true))
      );
      setModalErrorMsgs(planResults.filter((r) => typeof r === "string"));

      const planSummaries = planResults
        .filter((r) => typeof r === "object")
        .map((r) => r.data)
        .reduce(
          (acc, { newPlan, endedPlans, unchangedPlans }) => ({
            newPlans: newPlan ? acc.newPlans.concat(newPlan) : acc.newPlans,
            unchangedPlans: acc.unchangedPlans.concat(unchangedPlans),
            endedPlans: acc.endedPlans.concat(endedPlans),
          }),
          { newPlans: [], endedPlans: [], unchangedPlans: [] }
        );
      const uniquePlanSummaries = Object.entries(planSummaries).reduce(
        (acc, [key, plans]) => ({
          ...acc,
          [key]: plans.filter(
            (plan, index, self) =>
              self.findIndex(
                (p) =>
                  p.name === plan.name &&
                  p.beginReportPeriodId === plan.beginReportPeriodId &&
                  p.endReportPeriodId === plan.endReportPeriodId
              ) === index
          ),
        }),
        { newPlans: [], endedPlans: [], unchangedPlans: [] }
      );

      setChangeSummary({
        plans: uniquePlanSummaries,
        stackPipes: [],
      });
      setChangeSummaryStatus(dataStatus.SUCCESS);
      setMonitorPlanPayloads(newMonitorPlanPayloads);
    } catch (err) {
      console.error(err);
      setChangeSummaryStatus(dataStatus.ERROR);
    }
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
      .filter((loc) => user && loc.checkedOutBy === user.userId);
    try {
      setCheckInOutStatus(dataStatus.PENDING);
      await Promise.all(
        locationsCheckedOutByUserForFacility.map((loc) =>
          deleteCheckInMonitoringPlanConfiguration(loc.monPlanId)
        )
      );
      setCheckedOutLocations((await getCheckedOutLocations()).data);
    } finally {
      setCheckInOutStatus(dataStatus.IDLE);
    }
  };

  const handleCheckOut = async () => {
    if (!selectedFacility) return;

    try {
      setCheckInOutStatus(dataStatus.PENDING);
      await checkInAllPlansForUser();
      const orisCode = getOrisCodeByFacId(userFacilities, selectedFacility);
      if (!orisCode) return;

      const monitoringPlans = await getMonitoringPlans(orisCode);
      await Promise.all(
        monitoringPlans.data.map((mp) =>
          postCheckoutMonitoringPlanConfiguration(mp.id)
        )
      );
      setCheckedOutLocations((await getCheckedOutLocations()).data);
    } finally {
      setCheckInOutStatus(dataStatus.IDLE);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setChangeSummaryStatus(dataStatus.IDLE);
  };

  const handleConfirmSave = () => {};

  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value ? parseInt(e.target.value) : undefined);
    resetFacilityData();
  };

  const handleInitialSave = () => {
    const newErrorMsgs = [];

    if (
      Object.values(formState)
        .flat()
        .some((row) => row.isEditing)
    ) {
      newErrorMsgs.push(errorMessages.UNSAVED_CHANGES);
    }

    if (canCheckOut && !isCheckedOutByUser) {
      newErrorMsgs.push(errorMessages.NOT_CHECKED_OUT);
    }

    const stackPipeIds = formState.stackPipes.map((sp) => sp.stackPipeId);
    if (new Set(stackPipeIds).size !== stackPipeIds.length) {
      newErrorMsgs.push(errorMessages.DUPLICATE_STACK_PIPE);
    }

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

  const mapConfigurationToPayload = (configuration) => {
    const { unitIds, stackPipeIds } = getItemLocations(configuration.items);
    return {
      monitoringPlanCommentData: [],
      orisCode: userFacilities.find(
        (f) => f.facilityRecordId === selectedFacility
      ).facilityId,
      unitStackConfigurationData: configuration.items
        .filter((item) => item.hasOwnProperty("stackPipeId"))
        .map((item) => ({
          beginDate: item.beginDate,
          endDate: item.endDate,
          stackPipeId: item.stackPipeId,
          unitId: item.unitId,
        })),
      monitoringLocationData: Array.from(unitIds)
        .map((unitId) => formState.units.find((u) => u.unitId === unitId))
        .map((unit) => ({
          unitId: unit.unitId,
          stackPipeId: null,
          activeDate: null,
          retireDate: null,
          nonLoadBasedIndicator: unit.nonLoadBasedIndicator,
          ...unusedMonitoringLocationDataFields(),
        }))
        .concat(
          Array.from(stackPipeIds)
            .map((stackPipeId) =>
              formState.stackPipes.find((sp) => sp.stackPipeId === stackPipeId)
            )
            .map((stackPipe) => ({
              unitId: null,
              stackPipeId: stackPipe.stackPipeId,
              activeDate: stackPipe.activeDate,
              retireDate: stackPipe.retireDate,
              nonLoadBasedIndicator: null,
              ...unusedMonitoringLocationDataFields(),
            }))
        ),
    };
  };

  const mapUnitToPayload = (unit) => {
    return {
      monitoringPlanCommentData: [],
      orisCode: userFacilities.find(
        (f) => f.facilityRecordId === selectedFacility
      ).facilityId,
      unitStackConfigurationData: [],
      monitoringLocationData: [
        {
          unitId: unit.unitId,
          stackPipeId: null,
          activeDate: null,
          retireDate: null,
          nonLoadBasedIndicator: unit.nonLoadBasedIndicator,
          ...unusedMonitoringLocationDataFields(),
        },
      ],
    };
  };

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
    if (!selectedFacility) return;

    if (unitsStatus === dataStatus.IDLE) {
      try {
        setUnitsStatus(dataStatus.PENDING);
        getUnitsByFacId(selectedFacility).then((res) => {
          setUnitsStatus(dataStatus.SUCCESS);
          initializeToggleableFormState(
            res.data.map((d) => ({
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
  }, [selectedFacility, unitsStatus]);

  // Load stacks & pipes.
  useEffect(() => {
    if (!selectedFacility) return;

    if (stackPipesStatus === dataStatus.IDLE) {
      try {
        setStackPipesStatus(dataStatus.PENDING);
        getStackPipesByFacId(selectedFacility).then((res) => {
          setStackPipesStatus(dataStatus.SUCCESS);
          initializeEditableFormState(res.data, "SET_STACK_PIPES");
        });
      } catch (err) {
        setStackPipesStatus(dataStatus.ERROR);
      }
    }
  }, [selectedFacility, stackPipesStatus]);

  // Load unit stack configurations.
  useEffect(() => {
    if (!selectedFacility) return;

    if (unitStackConfigsStatus === dataStatus.IDLE) {
      try {
        setUnitStackConfigsStatus(dataStatus.PENDING);
        getUnitStackConfigsByFacId(selectedFacility).then((res) => {
          setUnitStackConfigsStatus(dataStatus.SUCCESS);
          initializeEditableFormState(res.data, "SET_UNIT_STACK_CONFIGS");
        });
      } catch (err) {
        setUnitStackConfigsStatus(dataStatus.ERROR);
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

  return !user ? (
    <Preloader />
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
                <Label htmlFor="facility">Facility</Label>
                <div className="display-flex" id="facilities-container">
                  <Select
                    className="margin-0"
                    onChange={handleFacilityChange}
                    id="facility"
                    name="facility"
                    value={selectedFacility}
                  >
                    <option key={undefined} value="">
                      {DEFAULT_DROPDOWN_TEXT}
                    </option>
                    {formattedFacilities.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </Select>
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
                    showSave={
                      user &&
                      (!canCheckOut || isCheckedOutByUser) &&
                      !modalErrorMsgs.length
                    }
                    title="Change Summary"
                  >
                    <StatusContent
                      headingLevel="h3"
                      label="summary of configuration changes"
                      status={changeSummaryStatus}
                    >
                      {modalErrorMsgs.map((msg, i) => (
                        <Alert
                          key={i}
                          noIcon
                          slim
                          type="error"
                          headingLevel="h3"
                        >
                          {msg}
                        </Alert>
                      ))}
                      <SummarySectionPlan
                        plans={changeSummary.plans.newPlans}
                        title="New Plans"
                      />
                      <SummarySectionPlan
                        plans={changeSummary.plans.endedPlans}
                        title="Ended Plans"
                      />
                      <SummarySectionPlan
                        plans={changeSummary.plans.unchangedPlans}
                        title="Unchanged Plans"
                      />
                      <SummarySectionStackPipes
                        stackPipes={changeSummary.stackPipes}
                        title="Other Stack/Pipe Changes"
                      />
                    </StatusContent>
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
