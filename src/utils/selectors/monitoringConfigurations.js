// change later once active/inactive is worked on
export function getConfigurationNames(data) {
  const records = [];
  data
    // .filter((c) => c.active === true)
    .forEach((el) => {
      records.push({
        col1: el.name,
        col2: el.active ? "Active" : "Inactive",
        col3: el.id,
        monPlanId: el.id,
        facId: el.facId,
      });
    });
  return records;
}
