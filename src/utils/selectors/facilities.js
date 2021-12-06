export function getTableRecords(facilities) {
  const records = [];
  facilities.forEach((el) => {
    records.push({
      col1: el["facilityName"],
      col2: el["facilityId"],
      col3: el["state"],
      col4: el["orisCode"],
      facId: el["facilityRecordId"],
    });
  });

  return records;
}
