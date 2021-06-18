// change later once active/inactive is worked on
export function getConfigurationNames(data) {
  const records = [];
  data
    // .filter((c) => c.active === true)
    .forEach((el) => {
      records.push({
        col1: el.name,
        col2: el.active ? "Active" : "Inactive",
        col3:el.id
      });
    });
  // if (records.length === 0) {
  //   data
  //     .filter((c) => c.active === false)
  //     .forEach((el) => {
  //       records.push({
  //         col1: el.name,
  //         col2: el.active ? "Active" : "Inactive",
  //       });
  //     });
  // }
  return records;
}
