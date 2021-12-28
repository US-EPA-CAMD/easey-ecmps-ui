export const DEFAULTS_SECTION_NAME = "Defaults";
export const FORMULAS_SECTION_NAME = "Formulas";
export const LOADS_SECTION_NAME = "Loads";
export const LOCATION_ATTRIBUTES_AND_RELATIONSHIPS_SECTION_NAME =
  "Location Attributes and Relationships";
export const METHODS_SECTION_NAME = "Methods";
export const QUALIFICATIONS_SECTION_NAME = "Qualifications";
export const RECTANGULAR_DUCT_WAFS_SECTION_NAME = "Rectangular Duct WAFs";
export const SPANS_SECTION_NAME = "Spans";
export const SYSTEMS_SECTION_NAME = "Systems";
export const UNIT_INFORMATION_SECTION_NAME = "Unit Information";

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
export const UNIT_INFORMATION_STORE_NAME = "unitInformation";

export const convertSectionToStoreName = (dataTableName) => {
  let storeName;
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
    case UNIT_INFORMATION_SECTION_NAME:
      storeName = UNIT_INFORMATION_STORE_NAME;
      break;
    default:
      break;
  }
  return storeName;
};
