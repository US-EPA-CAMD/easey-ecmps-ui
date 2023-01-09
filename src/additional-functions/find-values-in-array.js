export const findValue = (options, val, parameter) => {
  if (val === null || val === undefined) {
    return "";
  }
  for (const x of options) {
    if (x.code === val) {
      return x[parameter];
    }
  }
  // edge case where passed in value is a num but dropdown is not
  if (!isNaN(val)) {
    // converts string in dropdown to num
    for (const x of options) {
      if (parseInt(x.code) === val) {
        return x[parameter];
      }
    }
  }
  return options[0][parameter];
};

// date from api is always in yyyy-mm-dd
export const adjustDate = (format, date) => {
  if (!date) {
    return "";
  }
  const [year, month, day] = date.split("-");

  let formattedDate = "";
  switch (format) {
    case "mm/dd/yyyy":
      formattedDate = new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC' }) ?? `${month}/${day}/${year}`;
      break;
    case "dd/mm/yyyy":
      formattedDate = `${day}/${month}/${year}`;
      break;
    case "yyyy/dd/mm":
      formattedDate = `${year}/${day}/${month}`;
      break;
    case "yyyy/mm/dd":
      formattedDate = `${year}/${month}/${day}`;
      break;
    case "mm-dd-yyyy":
      formattedDate = `${month}-${day}-${year}`;
      break;
    case "dd-mm-yyyy":
      formattedDate = `${day}-${month}-${year}`;
      break;
    case "yyyy-dd-mm":
      formattedDate = `${year}-${day}-${month}`;
      break;
    case "yyyy-mm-dd":
      formattedDate = `${year}-${month}-${day}`;
      break;
    default:
      return date;
  }
  return formattedDate;
};
