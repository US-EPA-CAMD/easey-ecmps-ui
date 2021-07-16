import * as dmApi from "../utils/api/dataManagementApi";

export const findValue = (options, val,parameter) => {
  if (val === null) {
    return "";
  }
  for (const x of options) {
    if (x.code === val) {
      return x[parameter];
    }
  }

  return options[0][parameter];
};

export const findDropDownOptions = (codeName) => {
  let options = [];
  switch (codeName) {
    case "parameterCode":
      dmApi.getAllParameterCodes().then((response) => {
        options = response.data.map((option) => {
          return {
            code: option["parameterCode"],
            name: option["parameterCodeDescription"],
          };
        });

        options.unshift({ code: "", name: "" });
      });
      break;
    case "methodCode":
      dmApi.getAllMethodCodes().then((response) => {
        options = response.data.map((option) => {
          return {
            code: option["methodCode"],
            name: option["methodCodeDescription"],
          };
        });

        options.unshift({ code: "", name: "" });
      });
      break;
    case "subDataCode":
      dmApi.getAllSubstituteDataCodes().then((response) => {
        options = response.data.map((option) => {
          return {
            code: option["subDataCode"],
            name: option["subDataCodeDescription"],
          };
        });
        options.unshift({ code: "", name: "" });
      });
      break;
    case "bypassApproachCode":
      dmApi.getAllBypassApproachCodes().then((response) => {
        options = response.data.map((option) => {
          return {
            code: option["bypassApproachCode"],
            name: option["bypassApproachCodeDescription"],
          };
        });

        options.unshift({ code: "", name: "" });
      });
      break;
    default:
      return options;
  }
  return options;
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
