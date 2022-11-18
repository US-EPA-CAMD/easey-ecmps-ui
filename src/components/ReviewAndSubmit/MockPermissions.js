export const MockPermissions = [
  {
    id: 3,
    facilityName: "Barry",
    permissions: ["DSMP", "DSQA", "DSEM"],
  },
  {
    id: 7,
    facilityName: "Gadsden",
    permissions: [],
  },
  {
    id: 10,
    facilityName: "Greene County",
    permissions: ["MPDS", "QADS", "EMDS"],
  },
];

export const isLocationCheckedOut = () => {
  //check if item is checked out
  return false;
};
export const isUserDataSubmitter = (row, dataTableName) => {
  const { facId } = row;
  const facility = MockPermissions.find((fac) => fac.id === facId);
  console.log({facility, facId});
  if (!facility) return false;
  switch (dataTableName) {
    case 'Monitoring Plan':
      return (
        facility.permissions.includes('DSMP') ||
        facility.permissions.includes('MPDS')
      );
    case 'Emissions':
      return (
        facility.permissions.includes('DSEM') ||
        facility.permissions.includes('EMDS')
      );
    case 'QA':
      return (
        facility.permissions.includes('DSQA') ||
        facility.permissions.includes('QADS')
      );
    default:
      return false;
  }
};

export default MockPermissions;
