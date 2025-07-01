/**
 * Row Filter Configuration Schema
 * @typedef {Object} FilterConfig
 * @property {string} templateCode - The view template identifier (e.g. 'SUMVAL')
 * @property {Array<FieldRule>} rules - Array of field-based filtering rules
 */

/**
 * Field Rule Definition
 * @typedef {Object} FieldRule
 * @property {'rowName'|'periodDescription'|string} field - The row element/property to filter on
 * @property {boolean} removeEntireRow - When true, removes whole rows that match
 * @property {Array<string|RegExp>} matchPatterns - Values to match against the field
 * @property {*} [replaceValue] - Replacement value when removeEntireRow=false
 * @property {boolean} [exactMatch=false] - When true, requires exact equality
 */
const ROW_FILTER_CONFIGS = [
  {
    templateCode: 'SUMVAL',
    rules: [
      {
        field: 'rowName',
        removeEntireRow: true,
        matchPatterns: [
          'Quarterly Calculated',
          'Year to Date Calculated',
          'Ozone Season Calculated'
        ],
        exactMatch: true
      },
    ]
  }
];

/**
 * Filters data rows based on the configured rules
 * @param {Array<Object>} data - Array of row objects to filter
 * @param {string} templateCode - The template code to apply rules for
 * @returns {Array<Object>} Filtered and processed rows
 */
export const filterEmissionsRows = (data, templateCode) => {
  if (!Array.isArray(data)) return [];

  // Find matching template configuration
  const config = ROW_FILTER_CONFIGS.find(c => c.templateCode === templateCode);
  if (!config?.rules) return data;

  // Separate removal rules from modification rules
  const removalRules = config.rules.filter(rule => rule.removeEntireRow);
  const modificationRules = config.rules.filter(rule => !rule.removeEntireRow);

  return data.filter(row => {
    // First apply removal rules - if any match, exclude the row entirely
    return !removalRules.some(rule => {
      const fieldValue = row[rule.field];
      return rule.matchPatterns.some(pattern => 
        rule.exactMatch
          ? fieldValue === pattern
          : String(fieldValue || '').includes(pattern)
      );
    });
  }).map(row => {
    // Then apply modification rules to remaining rows
    const newRow = {...row};
    
    modificationRules.forEach(rule => {
      const fieldValue = row[rule.field];
      const shouldModify = rule.matchPatterns.some(pattern =>
        rule.exactMatch
          ? fieldValue === pattern
          : String(fieldValue || '').includes(pattern)
      );

      if (shouldModify) {
        newRow[rule.field] = rule.replaceValue !== undefined 
          ? rule.replaceValue 
          : '';
      }
    });

    return newRow;
  });
};