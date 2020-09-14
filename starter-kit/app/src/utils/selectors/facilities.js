export function getSelectedFacility(orisCode, facilities) {
  return facilities.find((el) => el.orisCode === orisCode);
}

export function getTableRecords(facilities) {
  let records = [];
  facilities.forEach((el) => {
    records.push({
      col1: el.orisCode,
      col2: el.name,
      col3: el.state.name,
    });
  });
  return records;
}

export function getLocation(facility) {
  const activeMonitoringPlans = (monitoringPlans) => {
    const actives = monitoringPlans.filter((el) => el.status === "Active");
    return actives.map((el) => el.monitoringLocations.map((d) => d.name));
  };
  return {
    name: facility.name,
    county: facility.county.name,
    state: facility.state.name,
    region: facility.region.id,
    latitude: facility.geographicLocation.latitude,
    longitude: facility.geographicLocation.longitude,
    activeMonitoringPlans: activeMonitoringPlans(facility.monitoringPlans),
  };
}

export function getLocationByState(state, facilites) {
  const stateFacilities = facilites.filter((el) => el.state.name === state);
  return stateFacilities.map((el) => getLocation(el));
}

export function getContacts(facility) {
  return facility.contacts.map((el) => {
    return {
      name: `${el.firstName} ${el.lastName}`,
      title: el.jobTitle,
      company: el.companyName,
      email: el.emailAddress,
      responsibilities: el.responsibilities.map((d) => d.roleDesc),
      phone: el.phoneNumber,
      address: `${el.address1},${el.address2},${el.city},${el.stateAbbrev} ${el.zipCode}`,
    };
  });
}

export function getContactsRoleUnits(role, facility) {
  const distinctCompany = [
    ...new Set(facility.owners.map((d) => d.companyName)),
  ];
  return distinctCompany.map((company) => {
    return {
      company,
      role,
      units: facility.owners
        .filter((el) => el.companyName === company && el.ownerDesc === role)
        .map((el) => el.unitId),
    };
  });
}

export function getUnitsTableRecords(facility) {
  let records = [];
  facility.units.forEach((el) => {
    records.push({
      col1: el.unitId,
      col2: el.commOpDate,
      col3: el.status,
    });
  });
  return records;
}

export function getSelectedUnitDetail(unitId, facility) {
  const unit = facility.units.find((el) => el.unitId === unitId);
  return {
    hi: unit.hi,
    fuel: unit.fuels.map((el) => {
      return { indicator: el.indicatorDescription, fuel: el.fuelDesc };
    }),
    controls: unit.controls.map((el) => {
      return { code: el.controlCode, description: el.controlDesc };
    }),
    programs: unit.programs.map((el) => el.description),
    generators: unit.generators.map((el) => {
      return { id: el.generatorId, capacity: el.nameplateCapacity };
    }),
  };
}

export function getMonitoringPlansTableRecords(facility, filterActive) {
  const data = filterActive
    ? facility.monitoringPlans.filter((el) => el.status === "Active")
    : facility.monitoringPlans;
  let records = [];
  data.forEach((el) => {
    const beginStr = el.beginYearQuarter.toString();
    const endStr = el.beginYearQuarter.toString();
    records.push({
      col1: el.monitoringLocations.map((d) => d.name),
      col2: el.status,
      col3: `${beginStr.substring(0, beginStr.length - 1)} Q${beginStr.slice(
        -1
      )}`,
      col4: `${endStr.substring(0, endStr.length - 1)} Q${endStr.slice(-1)}`,
    });
  });
  return records;
}
