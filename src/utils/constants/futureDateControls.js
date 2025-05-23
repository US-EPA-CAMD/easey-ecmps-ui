export const FUTURE_DATE_ALLOWED_COMPONENTS = [
  'Defaults',
  'Formulas',
  'Loads',
  'Location Attributes',
  'Location Relationships',
  'Methods',
  'Qualifications',
  'Rectangular Duct WAFs',
  'Spans',
  'Systems',
  'Unit Fuel',
  'Unit Control',
  'Unit Capacity',
];

export const getMaxFutureDate = () => {
  const now = new Date();
  return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
};

export const formatDateToInput = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
