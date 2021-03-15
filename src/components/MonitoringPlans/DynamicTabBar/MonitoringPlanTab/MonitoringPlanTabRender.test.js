import React from "react";

import {MonitoringPlanTabRender} from "./MonitoringPlanTabRender";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import configureMockStore from "redux-mock-store";
import { getActiveConfigurations } from "../../../../utils/selectors/monitoringConfigurations";

//testing redux connected component to mimic props passed as argument
const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });

describe("Shallow render to avoid issues with redux store", () => {
  it("should render without throwing an error", () => {
    const monitoringPlans=[
      {
        "id": "MDC-BB3E30BF9A6240A9B3335E77777B55A1",
        "name": "1, 2, CS0CAN",
        "locations": [
          {
            "id": "82",
            "name": "1",
            "type": "Unit",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/82"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/82/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/82/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/82/spans"
              }
            ]
          },
          {
            "id": "83",
            "name": "2",
            "type": "Unit",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/83"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/83/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/83/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/83/spans"
              }
            ]
          },
          {
            "id": "81",
            "name": "CS0CAN",
            "type": "Stack",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/81"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/81/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/81/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/81/spans"
              }
            ]
          }
        ],
        "active": true,
        "links": [
          {
            "rel": "self",
            "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-BB3E30BF9A6240A9B3335E77777B55A1"
          }
        ]
      },
      {
        "id": "MDC-DC8A2E84AFCD4746B5CFB83CD4EA07E7",
        "name": "3, 4, CS0CBN",
        "locations": [
          {
            "id": "85",
            "name": "3",
            "type": "Unit",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/85"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/85/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/85/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/85/spans"
              }
            ]
          },
          {
            "id": "86",
            "name": "4",
            "type": "Unit",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/86"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/86/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/86/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/86/spans"
              }
            ]
          },
          {
            "id": "84",
            "name": "CS0CBN",
            "type": "Stack",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/84"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/84/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/84/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/84/spans"
              }
            ]
          }
        ],
        "active": true,
        "links": [
          {
            "rel": "self",
            "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-DC8A2E84AFCD4746B5CFB83CD4EA07E7"
          }
        ]
      },
      {
        "id": "MDC-92034CBE92C5471D988DB44635C7D301",
        "name": "5",
        "locations": [
          {
            "id": "80",
            "name": "5",
            "type": "Unit",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/80"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/80/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/80/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/80/spans"
              }
            ]
          }
        ],
        "active": false,
        "links": [
          {
            "rel": "self",
            "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-92034CBE92C5471D988DB44635C7D301"
          }
        ]
      },
      {
        "id": "TWCORNEL5-2DC6306895774CE79178478330CD5921",
        "name": "5, MS5A, MS5B",
        "locations": [
          {
            "id": "80",
            "name": "5",
            "type": "Unit",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/80"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/80/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/80/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/80/spans"
              }
            ]
          },
          {
            "id": "TWCORNEL5-FE94F8D858344DF694EE4469D856A9E8",
            "name": "MS5A",
            "type": "Stack",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-FE94F8D858344DF694EE4469D856A9E8"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-FE94F8D858344DF694EE4469D856A9E8/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-FE94F8D858344DF694EE4469D856A9E8/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-FE94F8D858344DF694EE4469D856A9E8/spans"
              }
            ]
          },
          {
            "id": "TWCORNEL5-0D5D32D2D00F4376BD552EF7E6F168A8",
            "name": "MS5B",
            "type": "Stack",
            "active": true,
            "links": [
              {
                "rel": "self",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-0D5D32D2D00F4376BD552EF7E6F168A8"
              },
              {
                "rel": "methods",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-0D5D32D2D00F4376BD552EF7E6F168A8/methods"
              },
              {
                "rel": "systems",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-0D5D32D2D00F4376BD552EF7E6F168A8/systems"
              },
              {
                "rel": "spans",
                "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-0D5D32D2D00F4376BD552EF7E6F168A8/spans"
              }
            ]
          }
        ],
        "active": true,
        "links": [
          {
            "rel": "self",
            "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-2DC6306895774CE79178478330CD5921"
          }
        ]
      }
    ];
    const hasActiveConfigs = getActiveConfigurations(monitoringPlans).length>0?true:false;
    const defualtProps = {
      facility : {
        orisCode: 26,
        name: "E C Gaston",
        geographicLocation: {
          isValid: true,
          latitude: 33.2442,
          longitude: -86.4567,
        },
        monitoringPlans: [
          {
            beginYearQuarter: 19934,
            endYearQuarter: 20094,
            status: "Inactive",
            monitoringLocations: [{ isUnit: true, name: "5" }],
          },
          {
            beginYearQuarter: 19934,
            endYearQuarter: null,
            status: "Active",
            monitoringLocations: [
              { isUnit: true, name: "1" },
              { isUnit: true, name: "2" },
              { isUnit: false, name: "CS0CAN" },
            ],
          },
          {
            beginYearQuarter: 19934,
            endYearQuarter: null,
            status: "Active",
            monitoringLocations: [
              { isUnit: true, name: "3" },
              { isUnit: true, name: "4" },
              { isUnit: false, name: "CS0CBN" },
            ],
          },
          {
            beginYearQuarter: 20101,
            endYearQuarter: null,
            status: "Active",
            monitoringLocations: [
              { isUnit: true, name: "5" },
              { isUnit: false, name: "MS5B" },
              { isUnit: false, name: "MS5A" },
            ],
          },
        ],
        region: { id: "4", name: "Region 4" },
        state: { name: "Alabama", abbrev: "AL" },
        county: { name: "Shelby County", code: "AL117" },
        owners: [
          {
            unitId: "1",
            ownerDesc: "Owner",
            companyName: "Alabama Power Company",
          },
          {
            unitId: "1",
            ownerDesc: "Owner",
            companyName: "Georgia Power Company",
          },
          { unitId: "1", ownerDesc: "Owner", companyName: "Southern Company" },
          {
            unitId: "1",
            ownerDesc: "Operator",
            companyName: "Alabama Power Company",
          },
          {
            unitId: "2",
            ownerDesc: "Owner",
            companyName: "Alabama Power Company",
          },
          {
            unitId: "2",
            ownerDesc: "Owner",
            companyName: "Georgia Power Company",
          },
          { unitId: "2", ownerDesc: "Owner", companyName: "Southern Company" },
          {
            unitId: "2",
            ownerDesc: "Operator",
            companyName: "Alabama Power Company",
          },
          {
            unitId: "3",
            ownerDesc: "Owner",
            companyName: "Alabama Power Company",
          },
          {
            unitId: "3",
            ownerDesc: "Owner",
            companyName: "Georgia Power Company",
          },
          { unitId: "3", ownerDesc: "Owner", companyName: "Southern Company" },
          {
            unitId: "3",
            ownerDesc: "Operator",
            companyName: "Alabama Power Company",
          },
          {
            unitId: "4",
            ownerDesc: "Owner",
            companyName: "Alabama Power Company",
          },
          {
            unitId: "4",
            ownerDesc: "Owner",
            companyName: "Georgia Power Company",
          },
          { unitId: "4", ownerDesc: "Owner", companyName: "Southern Company" },
          {
            unitId: "4",
            ownerDesc: "Operator",
            companyName: "Alabama Power Company",
          },
          {
            unitId: "5",
            ownerDesc: "Owner",
            companyName: "Alabama Power Company",
          },
          {
            unitId: "5",
            ownerDesc: "Operator",
            companyName: "Alabama Power Company",
          },
        ],
        units: [
          {
            unitId: "4",
            commOpDate: "1962-04-17T00:00:00",
            status: "OPR",
            statusDate: "1962-04-17T00:00:00",
            hi: 3635,
            controls: [
              {
                parameterCode: "NOX",
                parameterDesc: null,
                controlCode: "LNB",
                controlDesc: "Low NOx Burner Technology (Dry Bottom only)",
              },
              {
                parameterCode: "PART",
                parameterDesc: null,
                controlCode: "ESP",
                controlDesc: "Electrostatic Precipitator",
              },
            ],
            fuels: [
              {
                indicatorDescription: "Secondary",
                fuelDesc: "Coal",
                fuelCode: "C",
                indCode: "S",
              },
              {
                indicatorDescription: "Primary",
                fuelDesc: "Pipeline Natural Gas",
                fuelCode: "PNG",
                indCode: "P",
              },
            ],
            generators: [{ generatorId: "ST4", nameplateCapacity: 244.8 }],
            programs: [
              { code: "ARP", description: "Acid Rain Program" },
              {
                code: "CSNOX",
                description: "Cross-State Air Pollution Rule NOx Annual Program",
              },
              {
                code: "CSOSG2",
                description:
                  "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
              },
              {
                code: "CSSO2G2",
                description:
                  "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
              },
            ],
            isUnit: null,
            name: null,
          },
          {
            unitId: "1",
            commOpDate: "1960-03-26T00:00:00",
            status: "OPR",
            statusDate: "1960-03-26T00:00:00",
            hi: 5462,
            controls: [
              {
                parameterCode: "NOX",
                parameterDesc: null,
                controlCode: "LNB",
                controlDesc: "Low NOx Burner Technology (Dry Bottom only)",
              },
              {
                parameterCode: "PART",
                parameterDesc: null,
                controlCode: "ESP",
                controlDesc: "Electrostatic Precipitator",
              },
            ],
            fuels: [
              {
                indicatorDescription: "Secondary",
                fuelDesc: "Coal",
                fuelCode: "C",
                indCode: "S",
              },
              {
                indicatorDescription: "Primary",
                fuelDesc: "Pipeline Natural Gas",
                fuelCode: "PNG",
                indCode: "P",
              },
            ],
            generators: [{ generatorId: "1", nameplateCapacity: 272 }],
            programs: [
              { code: "ARP", description: "Acid Rain Program" },
              {
                code: "CSNOX",
                description: "Cross-State Air Pollution Rule NOx Annual Program",
              },
              {
                code: "CSOSG2",
                description:
                  "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
              },
              {
                code: "CSSO2G2",
                description:
                  "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
              },
            ],
            isUnit: null,
            name: null,
          },
          {
            unitId: "3",
            commOpDate: "1960-06-01T00:00:00",
            status: "OPR",
            statusDate: "1960-06-01T00:00:00",
            hi: 5077.2,
            controls: [
              {
                parameterCode: "NOX",
                parameterDesc: null,
                controlCode: "LNB",
                controlDesc: "Low NOx Burner Technology (Dry Bottom only)",
              },
              {
                parameterCode: "PART",
                parameterDesc: null,
                controlCode: "B",
                controlDesc: "Baghouse",
              },
              {
                parameterCode: "PART",
                parameterDesc: null,
                controlCode: "ESP",
                controlDesc: "Electrostatic Precipitator",
              },
            ],
            fuels: [
              {
                indicatorDescription: "Secondary",
                fuelDesc: "Coal",
                fuelCode: "C",
                indCode: "S",
              },
              {
                indicatorDescription: "Primary",
                fuelDesc: "Pipeline Natural Gas",
                fuelCode: "PNG",
                indCode: "P",
              },
            ],
            generators: [{ generatorId: "3", nameplateCapacity: 272 }],
            programs: [
              { code: "ARP", description: "Acid Rain Program" },
              {
                code: "CSNOX",
                description: "Cross-State Air Pollution Rule NOx Annual Program",
              },
              {
                code: "CSOSG2",
                description:
                  "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
              },
              {
                code: "CSSO2G2",
                description:
                  "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
              },
            ],
            isUnit: null,
            name: null,
          },
          {
            unitId: "2",
            commOpDate: "1960-06-08T00:00:00",
            status: "OPR",
            statusDate: "1960-06-08T00:00:00",
            hi: 5324,
            controls: [
              {
                parameterCode: "NOX",
                parameterDesc: null,
                controlCode: "LNB",
                controlDesc: "Low NOx Burner Technology (Dry Bottom only)",
              },
              {
                parameterCode: "PART",
                parameterDesc: null,
                controlCode: "B",
                controlDesc: "Baghouse",
              },
              {
                parameterCode: "PART",
                parameterDesc: null,
                controlCode: "ESP",
                controlDesc: "Electrostatic Precipitator",
              },
            ],
            fuels: [
              {
                indicatorDescription: "Secondary",
                fuelDesc: "Coal",
                fuelCode: "C",
                indCode: "S",
              },
              {
                indicatorDescription: "Primary",
                fuelDesc: "Pipeline Natural Gas",
                fuelCode: "PNG",
                indCode: "P",
              },
            ],
            generators: [{ generatorId: "2", nameplateCapacity: 272 }],
            programs: [
              { code: "ARP", description: "Acid Rain Program" },
              {
                code: "CSNOX",
                description: "Cross-State Air Pollution Rule NOx Annual Program",
              },
              {
                code: "CSOSG2",
                description:
                  "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
              },
              {
                code: "CSSO2G2",
                description:
                  "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
              },
            ],
            isUnit: null,
            name: null,
          },
          {
            unitId: "5",
            commOpDate: "1974-06-05T00:00:00",
            status: "OPR",
            statusDate: "1974-06-05T00:00:00",
            hi: 16078,
            controls: [
              {
                parameterCode: "HG",
                parameterDesc: null,
                controlCode: "CAT",
                controlDesc:
                  "Catalyst (gold, palladium, or other) used to oxidize mercury",
              },
              {
                parameterCode: "HG",
                parameterDesc: null,
                controlCode: "HPAC",
                controlDesc: "Halogenated PAC Sorbent Injection",
              },
              {
                parameterCode: "NOX",
                parameterDesc: null,
                controlCode: "LNC2",
                controlDesc: "Low NOx Burner Technology w/ Separated OFA",
              },
              {
                parameterCode: "NOX",
                parameterDesc: null,
                controlCode: "SCR",
                controlDesc: "Selective Catalytic Reduction",
              },
              {
                parameterCode: "PART",
                parameterDesc: null,
                controlCode: "B",
                controlDesc: "Baghouse",
              },
              {
                parameterCode: "PART",
                parameterDesc: null,
                controlCode: "ESP",
                controlDesc: "Electrostatic Precipitator",
              },
              {
                parameterCode: "SO2",
                parameterDesc: null,
                controlCode: "WLS",
                controlDesc: "Wet Limestone",
              },
            ],
            fuels: [
              {
                indicatorDescription: "Primary",
                fuelDesc: "Coal",
                fuelCode: "C",
                indCode: "P",
              },
              {
                indicatorDescription: "Secondary",
                fuelDesc: "Pipeline Natural Gas",
                fuelCode: "PNG",
                indCode: "S",
              },
            ],
            generators: [{ generatorId: "5", nameplateCapacity: 952 }],
            programs: [
              { code: "ARP", description: "Acid Rain Program" },
              {
                code: "CSNOX",
                description: "Cross-State Air Pollution Rule NOx Annual Program",
              },
              {
                code: "CSOSG2",
                description:
                  "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
              },
              {
                code: "CSSO2G2",
                description:
                  "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
              },
              { code: "MATS", description: "Mercury and Air Toxics Standards" },
            ],
            isUnit: null,
            name: null,
          },
        ],
        contacts: [
          {
            responsibilities: [
              {
                programCode: "",
                roleDesc: "Retrieve Only - MP, QA, EM (all units)",
              },
            ],
            isRep: false,
            firstName: "Brad",
            lastName: "Vick",
            middleInitial: null,
            suffix: null,
            jobTitle: "Environmental Affairs Specialist",
            address1: "744 Highway 87",
            address2: "GSC #8",
            city: "Calera",
            stateAbbrev: "AL",
            zipCode: "35040",
            emailAddress: "bwvick@southernco.com",
            faxNumber: "",
            phoneNumber: "2056646208",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
          {
            responsibilities: [
              {
                programCode: "",
                roleDesc: "Retrieve Only - MP, QA, EM (all units)",
              },
            ],
            isRep: false,
            firstName: "Brittany",
            lastName: "Pitts",
            middleInitial: null,
            suffix: null,
            jobTitle: "Engineer",
            address1: "600 North 18th Street",
            address2: "",
            city: "Birmingham",
            stateAbbrev: "AL",
            zipCode: "352032206",
            emailAddress: "BRPITTS@SOUTHERNCO.COM",
            faxNumber: "",
            phoneNumber: "2052576620",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
          {
            responsibilities: [
              {
                programCode: "",
                roleDesc: "Retrieve Only - MP, QA, EM (all units)",
              },
            ],
            isRep: false,
            firstName: "James",
            lastName: "Bice",
            middleInitial: null,
            suffix: null,
            jobTitle: "",
            address1: "744 County Highway 87",
            address2: "GSC # 8",
            city: "Calera",
            stateAbbrev: "AL",
            zipCode: "35040",
            emailAddress: "jwbice@southernco.com",
            faxNumber: "2052571654",
            phoneNumber: "2056646055",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
          {
            responsibilities: [{ programCode: "", roleDesc: "Alternate" }],
            isRep: true,
            firstName: "John",
            lastName: "Godfrey",
            middleInitial: null,
            suffix: null,
            jobTitle: "",
            address1: "600 North 18th Street",
            address2: "",
            city: "Birmingham",
            stateAbbrev: "AL",
            zipCode: "35203",
            emailAddress: "G2ADRCAM@southernco.com",
            faxNumber: "",
            phoneNumber: "2052576131",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
          {
            responsibilities: [
              {
                programCode: "",
                roleDesc: "Retrieve Only - MP, QA, EM (all units)",
              },
            ],
            isRep: false,
            firstName: "Richard",
            lastName: "Brown",
            middleInitial: null,
            suffix: null,
            jobTitle: "",
            address1: "GSC Building #8",
            address2: "",
            city: "Birmingham",
            stateAbbrev: "AL",
            zipCode: "35291",
            emailAddress: "ribrown@southernco.com",
            faxNumber: "2056646309",
            phoneNumber: "2054382405",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
          {
            responsibilities: [
              {
                programCode: "",
                roleDesc: "Retrieve Only - MP, QA, EM (all units)",
              },
            ],
            isRep: false,
            firstName: "Sarah",
            lastName: "Copeland",
            middleInitial: null,
            suffix: null,
            jobTitle: "Environmental Specialist",
            address1: "600 North 18th Street",
            address2: "",
            city: "Birmingham",
            stateAbbrev: "AL",
            zipCode: "35203",
            emailAddress: "sgcopela@southernco.com",
            faxNumber: "",
            phoneNumber: "2052574403",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
          {
            responsibilities: [{ programCode: "", roleDesc: "Primary" }],
            isRep: true,
            firstName: "Susan",
            lastName: "Comensky",
            middleInitial: null,
            suffix: null,
            jobTitle: "Vice President",
            address1: "600 18th Street North",
            address2: "12th Floor",
            city: "Birmingham",
            stateAbbrev: "AL",
            zipCode: "352032206",
            emailAddress: "scomenskyADR@southernco.com",
            faxNumber: "2052574349",
            phoneNumber: "2052570298",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
          {
            responsibilities: [
              {
                programCode: "",
                roleDesc: "Retrieve Only - MP, QA, EM (all units)",
              },
            ],
            isRep: false,
            firstName: "Toya",
            lastName: "Williams",
            middleInitial: null,
            suffix: null,
            jobTitle: "",
            address1: "744 Highway 87",
            address2: "",
            city: "Calera",
            stateAbbrev: "AL",
            zipCode: "35040",
            emailAddress: "toywilli@southernco.com",
            faxNumber: "",
            phoneNumber: "2056646482",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
          {
            responsibilities: [
              {
                programCode: "",
                roleDesc: "Retrieve Only - MP, QA, EM (all units)",
              },
            ],
            isRep: false,
            firstName: "Trey",
            lastName: "Lightsey",
            middleInitial: null,
            suffix: null,
            jobTitle: "Supervisor E&DS",
            address1: "744 Highway 87",
            address2: "",
            city: "Calera",
            stateAbbrev: "AL",
            zipCode: "35040",
            emailAddress: "jlightse@southernco.com",
            faxNumber: "",
            phoneNumber: "2056646461",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
          {
            responsibilities: [
              {
                programCode: "",
                roleDesc: "Retrieve Only - MP, QA, EM (all units)",
              },
            ],
            isRep: false,
            firstName: "Zachary",
            lastName: "Walk",
            middleInitial: null,
            suffix: null,
            jobTitle: "Engineer",
            address1: "600 North 18th Street",
            address2: "",
            city: "Birmingham",
            stateAbbrev: "AL",
            zipCode: "35203",
            emailAddress: "zmwalk@southernco.com",
            faxNumber: "",
            phoneNumber: "2052573726",
            phoneExt: "",
            companyName: "Alabama Power Company",
          },
        ],
      },  
      monitoringPlans: monitoringPlans,
      hasActiveConfigs : hasActiveConfigs
    };

    const props = { ...defualtProps };
    const wrapper = shallow(<MonitoringPlanTabRender {...props} />);
    expect(wrapper.find("hr")).toHaveLength(3);
  });
});
