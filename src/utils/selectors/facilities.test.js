// import * as fs from "./facilities";

// describe("testing fetch wrapper facilities data selectors", () => {
//   let selectedFacility;
//   let selectedFacilityLocation;
//   let contactsLength;
//   let contactsOwnerUnits;
//   let unitsTableRecords;
//   let selectedUnitFuelData;
//   let monitoringPlansTableRecords;

//   beforeAll(() => {
//     selectedFacility = {
//       orisCode: 26,
//       name: "E C Gaston",
//       geographicLocation: {
//         isValid: true,
//         latitude: 33.2442,
//         longitude: -86.4567,
//       },
//       monitoringPlans: [
//         {
//           beginYearQuarter: 19934,
//           endYearQuarter: 20094,
//           status: "Inactive",
//           monitoringLocations: [{ isUnit: true, name: "5" }],
//         },
//         {
//           beginYearQuarter: 19934,
//           endYearQuarter: null,
//           status: "Active",
//           monitoringLocations: [
//             { isUnit: true, name: "1" },
//             { isUnit: true, name: "2" },
//             { isUnit: false, name: "CS0CAN" },
//           ],
//         },
//         {
//           beginYearQuarter: 19934,
//           endYearQuarter: null,
//           status: "Active",
//           monitoringLocations: [
//             { isUnit: true, name: "3" },
//             { isUnit: true, name: "4" },
//             { isUnit: false, name: "CS0CBN" },
//           ],
//         },
//         {
//           beginYearQuarter: 20101,
//           endYearQuarter: null,
//           status: "Active",
//           monitoringLocations: [
//             { isUnit: true, name: "5" },
//             { isUnit: false, name: "MS5B" },
//             { isUnit: false, name: "MS5A" },
//           ],
//         },
//       ],
//       region: { id: "4", name: "Region 4" },
//       state: { name: "Alabama", abbrev: "AL" },
//       county: { name: "Shelby County", code: "AL117" },
//       owners: [
//         {
//           unitId: "1",
//           ownerDesc: "Owner",
//           companyName: "Alabama Power Company",
//         },
//         {
//           unitId: "1",
//           ownerDesc: "Owner",
//           companyName: "Georgia Power Company",
//         },
//         { unitId: "1", ownerDesc: "Owner", companyName: "Southern Company" },
//         {
//           unitId: "1",
//           ownerDesc: "Operator",
//           companyName: "Alabama Power Company",
//         },
//         {
//           unitId: "2",
//           ownerDesc: "Owner",
//           companyName: "Alabama Power Company",
//         },
//         {
//           unitId: "2",
//           ownerDesc: "Owner",
//           companyName: "Georgia Power Company",
//         },
//         { unitId: "2", ownerDesc: "Owner", companyName: "Southern Company" },
//         {
//           unitId: "2",
//           ownerDesc: "Operator",
//           companyName: "Alabama Power Company",
//         },
//         {
//           unitId: "3",
//           ownerDesc: "Owner",
//           companyName: "Alabama Power Company",
//         },
//         {
//           unitId: "3",
//           ownerDesc: "Owner",
//           companyName: "Georgia Power Company",
//         },
//         { unitId: "3", ownerDesc: "Owner", companyName: "Southern Company" },
//         {
//           unitId: "3",
//           ownerDesc: "Operator",
//           companyName: "Alabama Power Company",
//         },
//         {
//           unitId: "4",
//           ownerDesc: "Owner",
//           companyName: "Alabama Power Company",
//         },
//         {
//           unitId: "4",
//           ownerDesc: "Owner",
//           companyName: "Georgia Power Company",
//         },
//         { unitId: "4", ownerDesc: "Owner", companyName: "Southern Company" },
//         {
//           unitId: "4",
//           ownerDesc: "Operator",
//           companyName: "Alabama Power Company",
//         },
//         {
//           unitId: "5",
//           ownerDesc: "Owner",
//           companyName: "Alabama Power Company",
//         },
//         {
//           unitId: "5",
//           ownerDesc: "Operator",
//           companyName: "Alabama Power Company",
//         },
//       ],
//       units: [
//         {
//           unitId: "4",
//           commOpDate: "1962-04-17T00:00:00",
//           status: "OPR",
//           statusDate: "1962-04-17T00:00:00",
//           hi: 3635,
//           controls: [
//             {
//               parameterCode: "NOX",
//               parameterDesc: null,
//               controlCode: "LNB",
//               controlDesc: "Low NOx Burner Technology (Dry Bottom only)",
//             },
//             {
//               parameterCode: "PART",
//               parameterDesc: null,
//               controlCode: "ESP",
//               controlDesc: "Electrostatic Precipitator",
//             },
//           ],
//           fuels: [
//             {
//               indicatorDescription: "Secondary",
//               fuelDesc: "Coal",
//               systemFuelFlowUOMCode: "C",
//               indCode: "S",
//             },
//             {
//               indicatorDescription: "Primary",
//               fuelDesc: "Pipeline Natural Gas",
//               systemFuelFlowUOMCode: "PNG",
//               indCode: "P",
//             },
//           ],
//           generators: [{ generatorId: "ST4", nameplateCapacity: 244.8 }],
//           programs: [
//             { code: "ARP", description: "Acid Rain Program" },
//             {
//               code: "CSNOX",
//               description: "Cross-State Air Pollution Rule NOx Annual Program",
//             },
//             {
//               code: "CSOSG2",
//               description:
//                 "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
//             },
//             {
//               code: "CSSO2G2",
//               description:
//                 "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
//             },
//           ],
//           isUnit: null,
//           name: null,
//         },
//         {
//           unitId: "1",
//           commOpDate: "1960-03-26T00:00:00",
//           status: "OPR",
//           statusDate: "1960-03-26T00:00:00",
//           hi: 5462,
//           controls: [
//             {
//               parameterCode: "NOX",
//               parameterDesc: null,
//               controlCode: "LNB",
//               controlDesc: "Low NOx Burner Technology (Dry Bottom only)",
//             },
//             {
//               parameterCode: "PART",
//               parameterDesc: null,
//               controlCode: "ESP",
//               controlDesc: "Electrostatic Precipitator",
//             },
//           ],
//           fuels: [
//             {
//               indicatorDescription: "Secondary",
//               fuelDesc: "Coal",
//               systemFuelFlowUOMCode: "C",
//               indCode: "S",
//             },
//             {
//               indicatorDescription: "Primary",
//               fuelDesc: "Pipeline Natural Gas",
//               systemFuelFlowUOMCode: "PNG",
//               indCode: "P",
//             },
//           ],
//           generators: [{ generatorId: "1", nameplateCapacity: 272 }],
//           programs: [
//             { code: "ARP", description: "Acid Rain Program" },
//             {
//               code: "CSNOX",
//               description: "Cross-State Air Pollution Rule NOx Annual Program",
//             },
//             {
//               code: "CSOSG2",
//               description:
//                 "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
//             },
//             {
//               code: "CSSO2G2",
//               description:
//                 "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
//             },
//           ],
//           isUnit: null,
//           name: null,
//         },
//         {
//           unitId: "3",
//           commOpDate: "1960-06-01T00:00:00",
//           status: "OPR",
//           statusDate: "1960-06-01T00:00:00",
//           hi: 5077.2,
//           controls: [
//             {
//               parameterCode: "NOX",
//               parameterDesc: null,
//               controlCode: "LNB",
//               controlDesc: "Low NOx Burner Technology (Dry Bottom only)",
//             },
//             {
//               parameterCode: "PART",
//               parameterDesc: null,
//               controlCode: "B",
//               controlDesc: "Baghouse",
//             },
//             {
//               parameterCode: "PART",
//               parameterDesc: null,
//               controlCode: "ESP",
//               controlDesc: "Electrostatic Precipitator",
//             },
//           ],
//           fuels: [
//             {
//               indicatorDescription: "Secondary",
//               fuelDesc: "Coal",
//               systemFuelFlowUOMCode: "C",
//               indCode: "S",
//             },
//             {
//               indicatorDescription: "Primary",
//               fuelDesc: "Pipeline Natural Gas",
//               systemFuelFlowUOMCode: "PNG",
//               indCode: "P",
//             },
//           ],
//           generators: [{ generatorId: "3", nameplateCapacity: 272 }],
//           programs: [
//             { code: "ARP", description: "Acid Rain Program" },
//             {
//               code: "CSNOX",
//               description: "Cross-State Air Pollution Rule NOx Annual Program",
//             },
//             {
//               code: "CSOSG2",
//               description:
//                 "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
//             },
//             {
//               code: "CSSO2G2",
//               description:
//                 "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
//             },
//           ],
//           isUnit: null,
//           name: null,
//         },
//         {
//           unitId: "2",
//           commOpDate: "1960-06-08T00:00:00",
//           status: "OPR",
//           statusDate: "1960-06-08T00:00:00",
//           hi: 5324,
//           controls: [
//             {
//               parameterCode: "NOX",
//               parameterDesc: null,
//               controlCode: "LNB",
//               controlDesc: "Low NOx Burner Technology (Dry Bottom only)",
//             },
//             {
//               parameterCode: "PART",
//               parameterDesc: null,
//               controlCode: "B",
//               controlDesc: "Baghouse",
//             },
//             {
//               parameterCode: "PART",
//               parameterDesc: null,
//               controlCode: "ESP",
//               controlDesc: "Electrostatic Precipitator",
//             },
//           ],
//           fuels: [
//             {
//               indicatorDescription: "Secondary",
//               fuelDesc: "Coal",
//               systemFuelFlowUOMCode: "C",
//               indCode: "S",
//             },
//             {
//               indicatorDescription: "Primary",
//               fuelDesc: "Pipeline Natural Gas",
//               systemFuelFlowUOMCode: "PNG",
//               indCode: "P",
//             },
//           ],
//           generators: [{ generatorId: "2", nameplateCapacity: 272 }],
//           programs: [
//             { code: "ARP", description: "Acid Rain Program" },
//             {
//               code: "CSNOX",
//               description: "Cross-State Air Pollution Rule NOx Annual Program",
//             },
//             {
//               code: "CSOSG2",
//               description:
//                 "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
//             },
//             {
//               code: "CSSO2G2",
//               description:
//                 "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
//             },
//           ],
//           isUnit: null,
//           name: null,
//         },
//         {
//           unitId: "5",
//           commOpDate: "1974-06-05T00:00:00",
//           status: "OPR",
//           statusDate: "1974-06-05T00:00:00",
//           hi: 16078,
//           controls: [
//             {
//               parameterCode: "HG",
//               parameterDesc: null,
//               controlCode: "CAT",
//               controlDesc:
//                 "Catalyst (gold, palladium, or other) used to oxidize mercury",
//             },
//             {
//               parameterCode: "HG",
//               parameterDesc: null,
//               controlCode: "HPAC",
//               controlDesc: "Halogenated PAC Sorbent Injection",
//             },
//             {
//               parameterCode: "NOX",
//               parameterDesc: null,
//               controlCode: "LNC2",
//               controlDesc: "Low NOx Burner Technology w/ Separated OFA",
//             },
//             {
//               parameterCode: "NOX",
//               parameterDesc: null,
//               controlCode: "SCR",
//               controlDesc: "Selective Catalytic Reduction",
//             },
//             {
//               parameterCode: "PART",
//               parameterDesc: null,
//               controlCode: "B",
//               controlDesc: "Baghouse",
//             },
//             {
//               parameterCode: "PART",
//               parameterDesc: null,
//               controlCode: "ESP",
//               controlDesc: "Electrostatic Precipitator",
//             },
//             {
//               parameterCode: "SO2",
//               parameterDesc: null,
//               controlCode: "WLS",
//               controlDesc: "Wet Limestone",
//             },
//           ],
//           fuels: [
//             {
//               indicatorDescription: "Primary",
//               fuelDesc: "Coal",
//               systemFuelFlowUOMCode: "C",
//               indCode: "P",
//             },
//             {
//               indicatorDescription: "Secondary",
//               fuelDesc: "Pipeline Natural Gas",
//               systemFuelFlowUOMCode: "PNG",
//               indCode: "S",
//             },
//           ],
//           generators: [{ generatorId: "5", nameplateCapacity: 952 }],
//           programs: [
//             { code: "ARP", description: "Acid Rain Program" },
//             {
//               code: "CSNOX",
//               description: "Cross-State Air Pollution Rule NOx Annual Program",
//             },
//             {
//               code: "CSOSG2",
//               description:
//                 "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
//             },
//             {
//               code: "CSSO2G2",
//               description:
//                 "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
//             },
//             { code: "MATS", description: "Mercury and Air Toxics Standards" },
//           ],
//           isUnit: null,
//           name: null,
//         },
//       ],
//       contacts: [
//         {
//           responsibilities: [
//             {
//               programCode: "",
//               roleDesc: "Retrieve Only - MP, QA, EM (all units)",
//             },
//           ],
//           isRep: false,
//           firstName: "Brad",
//           lastName: "Vick",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "Environmental Affairs Specialist",
//           address1: "744 Highway 87",
//           address2: "GSC #8",
//           city: "Calera",
//           stateAbbrev: "AL",
//           zipCode: "35040",
//           emailAddress: "bwvick@southernco.com",
//           faxNumber: "",
//           phoneNumber: "2056646208",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//         {
//           responsibilities: [
//             {
//               programCode: "",
//               roleDesc: "Retrieve Only - MP, QA, EM (all units)",
//             },
//           ],
//           isRep: false,
//           firstName: "Brittany",
//           lastName: "Pitts",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "Engineer",
//           address1: "600 North 18th Street",
//           address2: "",
//           city: "Birmingham",
//           stateAbbrev: "AL",
//           zipCode: "352032206",
//           emailAddress: "BRPITTS@SOUTHERNCO.COM",
//           faxNumber: "",
//           phoneNumber: "2052576620",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//         {
//           responsibilities: [
//             {
//               programCode: "",
//               roleDesc: "Retrieve Only - MP, QA, EM (all units)",
//             },
//           ],
//           isRep: false,
//           firstName: "James",
//           lastName: "Bice",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "",
//           address1: "744 County Highway 87",
//           address2: "GSC # 8",
//           city: "Calera",
//           stateAbbrev: "AL",
//           zipCode: "35040",
//           emailAddress: "jwbice@southernco.com",
//           faxNumber: "2052571654",
//           phoneNumber: "2056646055",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//         {
//           responsibilities: [{ programCode: "", roleDesc: "Alternate" }],
//           isRep: true,
//           firstName: "John",
//           lastName: "Godfrey",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "",
//           address1: "600 North 18th Street",
//           address2: "",
//           city: "Birmingham",
//           stateAbbrev: "AL",
//           zipCode: "35203",
//           emailAddress: "G2ADRCAM@southernco.com",
//           faxNumber: "",
//           phoneNumber: "2052576131",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//         {
//           responsibilities: [
//             {
//               programCode: "",
//               roleDesc: "Retrieve Only - MP, QA, EM (all units)",
//             },
//           ],
//           isRep: false,
//           firstName: "Richard",
//           lastName: "Brown",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "",
//           address1: "GSC Building #8",
//           address2: "",
//           city: "Birmingham",
//           stateAbbrev: "AL",
//           zipCode: "35291",
//           emailAddress: "ribrown@southernco.com",
//           faxNumber: "2056646309",
//           phoneNumber: "2054382405",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//         {
//           responsibilities: [
//             {
//               programCode: "",
//               roleDesc: "Retrieve Only - MP, QA, EM (all units)",
//             },
//           ],
//           isRep: false,
//           firstName: "Sarah",
//           lastName: "Copeland",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "Environmental Specialist",
//           address1: "600 North 18th Street",
//           address2: "",
//           city: "Birmingham",
//           stateAbbrev: "AL",
//           zipCode: "35203",
//           emailAddress: "sgcopela@southernco.com",
//           faxNumber: "",
//           phoneNumber: "2052574403",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//         {
//           responsibilities: [{ programCode: "", roleDesc: "Primary" }],
//           isRep: true,
//           firstName: "Susan",
//           lastName: "Comensky",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "Vice President",
//           address1: "600 18th Street North",
//           address2: "12th Floor",
//           city: "Birmingham",
//           stateAbbrev: "AL",
//           zipCode: "352032206",
//           emailAddress: "scomenskyADR@southernco.com",
//           faxNumber: "2052574349",
//           phoneNumber: "2052570298",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//         {
//           responsibilities: [
//             {
//               programCode: "",
//               roleDesc: "Retrieve Only - MP, QA, EM (all units)",
//             },
//           ],
//           isRep: false,
//           firstName: "Toya",
//           lastName: "Williams",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "",
//           address1: "744 Highway 87",
//           address2: "",
//           city: "Calera",
//           stateAbbrev: "AL",
//           zipCode: "35040",
//           emailAddress: "toywilli@southernco.com",
//           faxNumber: "",
//           phoneNumber: "2056646482",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//         {
//           responsibilities: [
//             {
//               programCode: "",
//               roleDesc: "Retrieve Only - MP, QA, EM (all units)",
//             },
//           ],
//           isRep: false,
//           firstName: "Trey",
//           lastName: "Lightsey",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "Supervisor E&DS",
//           address1: "744 Highway 87",
//           address2: "",
//           city: "Calera",
//           stateAbbrev: "AL",
//           zipCode: "35040",
//           emailAddress: "jlightse@southernco.com",
//           faxNumber: "",
//           phoneNumber: "2056646461",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//         {
//           responsibilities: [
//             {
//               programCode: "",
//               roleDesc: "Retrieve Only - MP, QA, EM (all units)",
//             },
//           ],
//           isRep: false,
//           firstName: "Zachary",
//           lastName: "Walk",
//           middleInitial: null,
//           suffix: null,
//           jobTitle: "Engineer",
//           address1: "600 North 18th Street",
//           address2: "",
//           city: "Birmingham",
//           stateAbbrev: "AL",
//           zipCode: "35203",
//           emailAddress: "zmwalk@southernco.com",
//           faxNumber: "",
//           phoneNumber: "2052573726",
//           phoneExt: "",
//           companyName: "Alabama Power Company",
//         },
//       ],
//     };

//     selectedFacilityLocation = {
//       name: "E C Gaston",
//       county: "Shelby County",
//       state: "Alabama",
//       region: "4",
//       latitude: 33.2442,
//       longitude: -86.4567,
//       activeMonitoringPlans: [
//         ["1", "2", "CS0CAN"],
//         ["3", "4", "CS0CBN"],
//         ["5", "MS5B", "MS5A"],
//       ],
//     };
//     contactsLength = 10;
//     contactsOwnerUnits = [
//       {
//         company: "Alabama Power Company",
//         role: "Owner",
//         units: ["1", "2", "3", "4", "5"],
//       },
//       {
//         company: "Georgia Power Company",
//         role: "Owner",
//         units: ["1", "2", "3", "4"],
//       },
//       {
//         company: "Southern Company",
//         role: "Owner",
//         units: ["1", "2", "3", "4"],
//       },
//     ];
//     unitsTableRecords = [
//       { col1: "4", col2: "1962-04-17T00:00:00", col3: "OPR" },
//       { col1: "1", col2: "1960-03-26T00:00:00", col3: "OPR" },
//       { col1: "3", col2: "1960-06-01T00:00:00", col3: "OPR" },
//       { col1: "2", col2: "1960-06-08T00:00:00", col3: "OPR" },
//       { col1: "5", col2: "1974-06-05T00:00:00", col3: "OPR" },
//     ];
//     selectedUnitFuelData = [
//       { indicator: "Secondary", fuel: "Coal" },
//       { indicator: "Primary", fuel: "Pipeline Natural Gas" },
//     ];
//     monitoringPlansTableRecords = [
//       { col1: ["5"], col2: "Inactive", col3: "1993 Q4", col4: "1993 Q4" },
//       {
//         col1: ["1", "2", "CS0CAN"],
//         col2: "Active",
//         col3: "1993 Q4",
//         col4: "1993 Q4",
//       },
//       {
//         col1: ["3", "4", "CS0CBN"],
//         col2: "Active",
//         col3: "1993 Q4",
//         col4: "1993 Q4",
//       },
//       {
//         col1: ["5", "MS5B", "MS5A"],
//         col2: "Active",
//         col3: "2010 Q1",
//         col4: "2010 Q1",
//       },
//     ];
//   });

//   // test("selected facility location should be", () => {
//   //   expect(fs.getLocation(selectedFacility)).toEqual(selectedFacilityLocation);
//   // });

//   // test("selected facility contacts length should have the value", () => {
//   //   expect(fs.getContacts(selectedFacility).length).toEqual(contactsLength);
//   // });

//   // test("selected facility contacts owner units should equal", () => {
//   //   expect(fs.getContactsRoleUnits("Owner", selectedFacility)).toEqual(
//   //     contactsOwnerUnits
//   //   );
//   // });

//   // test("selected facility units table records should be", () => {
//   //   expect(fs.getUnitsTableRecords(selectedFacility)).toEqual(
//   //     unitsTableRecords
//   //   );
//   // });
//   // test("selected units fuel data should equal", () => {
//   //   expect(fs.getSelectedUnitDetail("4", selectedFacility).fuel).toEqual(
//   //     selectedUnitFuelData
//   //   );
//   // });
//   // test("selected facility monitoring plans table recods should be", () => {
//   //   expect(fs.getMonitoringPlansTableRecords(selectedFacility)).toEqual(
//   //     monitoringPlansTableRecords
//   //   );
//   // });

//   test("selected facility monitoring plans table recods should be", () => {
//     const fac = [
//       {
//         col1: "E C Gaston",
//         col2: 26,
//         col3: { abbrev: "AL", name: "Alabama" },
//         col4: 26,
//       },
//     ];
//     expect(fs.getTableRecords([selectedFacility])).toEqual(fac);
//   });
// });
test("test file", () => {
  const val = 1;
  expect(val === 1);
});
