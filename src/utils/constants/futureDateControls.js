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
