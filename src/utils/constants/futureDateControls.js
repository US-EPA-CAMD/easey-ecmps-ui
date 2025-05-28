export const FUTURE_DATE_ALLOWED_COMPONENTS = [
  'Protocol Gas',
  'Qualification',
  'Component',
  'Fuel Flows',
  'System',
  'Supplemental Methods',
  'System Components',
  'Method',
  'Default',
  'Location Attribute',
  'Rectangular Ducts',
  'Span',
  'Stack',
  'Max Load Control',
  'Test Capacity'
];

export const getMaxFutureDate = () => {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  return maxDate;
};

export const formatDateToInput = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, "0");
  const day = `${dateObj.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};