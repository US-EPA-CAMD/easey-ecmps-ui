export const findValue = (options, val, parameter,) => {
 
 console.log( "options, val, parameter",options, val, parameter)
  if (val === null) {
    return "";
  }
  for (const x of options) {
    if (x.code === val) {
      return x[parameter];
    }
  }

  console.log('options[0][parameter]',options[0][parameter])
  return options[0][parameter];
};

// date from api is always in yyyy-mm-dd
export const adjustDate = (format, date) => {
  if (date === null) {
    return "";
  }
  const [year, month, day] = date.split("-");

  let formattedDate = "";
  switch (format) {
    case "mm/dd/yyyy":
      formattedDate = `${month}/${day}/${year}`;
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
