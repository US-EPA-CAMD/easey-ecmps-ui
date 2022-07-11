export const DEFAULTS_SECTION_NAME = "Default";
export const FORMULAS_SECTION_NAME = "Formula";
export const LOADS_SECTION_NAME = "Load";
export const LOCATION_ATTRIBUTES_AND_RELATIONSHIPS_SECTION_NAME =
  "Location Attribute";
export const METHODS_SECTION_NAME = "Methods";
export const QUALIFICATIONS_SECTION_NAME = "Qualifications";
export const RECTANGULAR_DUCT_WAFS_SECTION_NAME = "Rectangular Duct WAF";
export const SPANS_SECTION_NAME = "Span";
export const SYSTEMS_SECTION_NAME = "Systems";
export const UNIT_FUELS_SECTION_NAME = "Unit Fuel";
export const UNIT_CONTROLS_SECTION_NAME = "Unit Control";
export const UNIT_CAPACITIES_SECTION_NAME = "Unit Capacity";
export const FUEL_FLOWS_SECTION_NAME = "Fuel Flows";
export const SYSTEM_COMPONENTS_SECTION_NAME = "System Components";
export const ANALYZER_RANGES_SECTION_NAME = "Analyzer Ranges";
export const PCT_QUALIFICATIONS_SECTION_NAME = "Qualification Percent";
export const LME_QUALIFICATIONS_SECTION_NAME = "Qualification LME";
export const LEE_QUALIFICATIONS_SECTION_NAME = "Qualification LEE";
export const MATS_METHODS_SECTION_NAME = "Supplemental Methods";

// qa & cert

export const LINE_TEST_SUMMARY_SECTION_NAME = "Test Summary Data";

export const DEFAULTS_STORE_NAME = "defaults";
export const FORMULAS_STORE_NAME = "formulas";
export const LOADS_STORE_NAME = "loads";
export const LOCATION_ATTRIBUTES_AND_RELATIONSHIPS_STORE_NAME =
  "locationAttributesAndRelationships";
export const METHODS_STORE_NAME = "methods";
export const QUALIFICATIONS_STORE_NAME = "qualifications";
export const RECTANGULAR_DUCT_WAFS_STORE_NAME = "rectangularDuctWafs";
export const SPANS_STORE_NAME = "spans";
export const SYSTEMS_STORE_NAME = "systems";
export const UNIT_FUELS_STORE_NAME = "unitFuels";
export const UNIT_CONTROLS_STORE_NAME = "unitControls";
export const UNIT_CAPACITIES_STORE_NAME = "unitCapacities";
export const FUEL_FLOWS_STORE_NAME = "fuelFlows";
export const SYSTEM_COMPONENTS_STORE_NAME = "systemComponents";
export const ANALYZER_RANGES_STORE_NAME = "analyzerRanges";
export const PCT_QUALIFICATIONS_STORE_NAME = "pctQualifications";
export const LME_QUALIFICATIONS_STORE_NAME = "lmeQualifications";
export const LEE_QUALIFICATIONS_STORE_NAME = "leeQualifications";
export const MATS_METHODS_STORE_NAME = "matsMethods";

// qa & cert

export const LINE_TEST_SUMMARY_STORE_NAME = "lineTestSummary";

export const convertSectionToStoreName = (dataTableName) => {
  let storeName = "";
  switch (dataTableName) {
    case DEFAULTS_SECTION_NAME:
      storeName = DEFAULTS_STORE_NAME;
      break;
    case FORMULAS_SECTION_NAME:
      storeName = FORMULAS_STORE_NAME;
      break;
    case LOADS_SECTION_NAME:
      storeName = LOADS_STORE_NAME;
      break;
    case LOCATION_ATTRIBUTES_AND_RELATIONSHIPS_SECTION_NAME:
      storeName = LOCATION_ATTRIBUTES_AND_RELATIONSHIPS_STORE_NAME;
      break;
    case METHODS_SECTION_NAME:
      storeName = METHODS_STORE_NAME;
      break;
    case QUALIFICATIONS_SECTION_NAME:
      storeName = QUALIFICATIONS_STORE_NAME;
      break;
    case RECTANGULAR_DUCT_WAFS_SECTION_NAME:
      storeName = RECTANGULAR_DUCT_WAFS_STORE_NAME;
      break;
    case SPANS_SECTION_NAME:
      storeName = SPANS_STORE_NAME;
      break;
    case SYSTEMS_SECTION_NAME:
      storeName = SYSTEMS_STORE_NAME;
      break;
    case SYSTEM_COMPONENTS_SECTION_NAME:
      storeName = SYSTEM_COMPONENTS_STORE_NAME;
      break;
    case FUEL_FLOWS_SECTION_NAME:
      storeName = FUEL_FLOWS_STORE_NAME;
      break;
    case ANALYZER_RANGES_SECTION_NAME:
      storeName = ANALYZER_RANGES_STORE_NAME;
      break;
    case PCT_QUALIFICATIONS_SECTION_NAME:
      storeName = PCT_QUALIFICATIONS_STORE_NAME;
      break;
    case LME_QUALIFICATIONS_SECTION_NAME:
      storeName = LME_QUALIFICATIONS_STORE_NAME;
      break;
    case LEE_QUALIFICATIONS_SECTION_NAME:
      storeName = LEE_QUALIFICATIONS_STORE_NAME;
      break;
    case MATS_METHODS_SECTION_NAME:
      storeName = MATS_METHODS_STORE_NAME;
      break;
    case UNIT_FUELS_SECTION_NAME:
      storeName = UNIT_FUELS_STORE_NAME;
      break;
    case UNIT_CONTROLS_SECTION_NAME:
      storeName = UNIT_CONTROLS_STORE_NAME;
      break;
    case UNIT_CAPACITIES_SECTION_NAME:
      storeName = UNIT_CAPACITIES_STORE_NAME;
      break;

    // qa & cert

    case LINE_TEST_SUMMARY_SECTION_NAME:
      storeName = LINE_TEST_SUMMARY_STORE_NAME;
      break;
    default:
      break;
  }
  return storeName;
};
