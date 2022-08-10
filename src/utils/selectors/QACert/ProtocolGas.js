export const mapProtocolGasDataToRows = (data = []) => {
  const records = [];
  for (const cur of data) {
    const row = {
      id: cur.id,
      col1: cur.gasLevelCode,
      col2: cur.gasTypeCode,
      col3: cur.cylinderID,
      col4: cur.vendorID,
      col5: cur.expirationDate
    }
    records.push(row)
  }
  // sort rows alphabetically by col1 (gas level code)
  records.sort((row1, row2) => row1.col1.localeCompare(row2.col1))
  return records;
}