import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import HeaderInfo from "./HeaderInfo";
import { getActiveConfigurations } from "../../utils/selectors/monitoringConfigurations";

describe("testing select dropdowns for configutations, locations, and sections of the monitoring plans header", () => {
  const monitoringPlans = [
    {
      id: "MDC-0AD77532C61345C6B50CBC80ADA1A3E1",
      name: "1, 2, 3, CS0AAN",
      endReportPeriodId: "91",
      locations: [
        {
          id: "6",
          name: "1",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/spans",
            },
          ],
        },
        {
          id: "7",
          name: "2",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/spans",
            },
          ],
        },
        {
          id: "8",
          name: "3",
          type: "Unit",
          active: false,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/spans",
            },
          ],
        },
        {
          id: "5",
          name: "CS0AAN",
          type: "Stack",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/spans",
            },
          ],
        },
      ],
      active: false,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-0AD77532C61345C6B50CBC80ADA1A3E1",
        },
      ],
    },
    {
      id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
      name: "1, 2, CS0AAN",
      locations: [
        {
          id: "6",
          name: "1",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/spans",
            },
          ],
        },
        {
          id: "7",
          name: "2",
          type: "Unit",
          active: false,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/spans",
            },
          ],
        },
        {
          id: "5",
          name: "CS0AAN",
          type: "Stack",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/spans",
            },
          ],
        },
      ],
      active: true,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
        },
      ],
    },
    {
      id: "TWCORNEL5-F4E3DAADF24B4E1C8F2BEDD2DE59B436",
      name: "4",
      locations: [
        {
          id: "4",
          name: "4",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4/spans",
            },
          ],
        },
      ],
      active: true,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-F4E3DAADF24B4E1C8F2BEDD2DE59B436",
        },
      ],
    },
    {
      id: "TWCORNEL5-CE9F29AAC6764B649442259B0D7C2CF1",
      name: "4",
      endReportPeriodId: "8",
      locations: [
        {
          id: "4",
          name: "4",
          type: "Unit",
          active: false,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4/spans",
            },
          ],
        },
      ],
      active: false,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-CE9F29AAC6764B649442259B0D7C2CF1",
        },
      ],
    },
    {
      id: "MDC-BFCBF3162FE24E66BEB57E81A2938527",
      name: "4, MS4A, MS4B",
      endReportPeriodId: "87",
      locations: [
        {
          id: "4",
          name: "4",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/4/spans",
            },
          ],
        },
        {
          id: "2",
          name: "MS4A",
          type: "Stack",
          active: false,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2/spans",
            },
          ],
        },
        {
          id: "3",
          name: "MS4B",
          type: "Stack",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/3",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/3/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/3/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/3/spans",
            },
          ],
        },
      ],
      active: false,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-BFCBF3162FE24E66BEB57E81A2938527",
        },
      ],
    },
    {
      id: "MDC-E34723690C24486AAEEF840F1AAD8525",
      name: "5",
      endReportPeriodId: "68",
      locations: [
        {
          id: "11",
          name: "5",
          active: false,
          type: "Unit",
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/spans",
            },
          ],
        },
      ],
      active: false,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-E34723690C24486AAEEF840F1AAD8525",
        },
      ],
    },
    {
      id: "TWCORNEL5-488E42008B434177BC7D7BFF138D18EF",
      name: "5",
      locations: [
        {
          id: "11",
          name: "5",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/spans",
            },
          ],
        },
      ],
      active: true,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-488E42008B434177BC7D7BFF138D18EF",
        },
      ],
    },
    {
      id: "MDC-725B0D3F956C4E0EB994536D286F9195",
      name: "5, MS5A, MS5B",
      endReportPeriodId: "61",
      locations: [
        {
          id: "11",
          name: "5",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/spans",
            },
          ],
        },
        {
          id: "9",
          name: "MS5A",
          type: "Stack",
          active: false,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/9",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/9/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/9/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/9/spans",
            },
          ],
        },
        {
          id: "10",
          name: "MS5B",
          type: "Stack",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/10",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/10/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/10/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/10/spans",
            },
          ],
        },
      ],
      active: false,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-725B0D3F956C4E0EB994536D286F9195",
        },
      ],
    },
    {
      id: "TWCORNEL5-89EAAE9552324A3C810BA51039637105",
      name: "5, MS5C, MS5D",
      endReportPeriodId: "73",
      locations: [
        {
          id: "11",
          name: "5",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/spans",
            },
          ],
        },
        {
          id: "TWCORNEL5-08488F3863384A61A715848B8679208D",
          name: "MS5C",
          type: "Stack",
          active: false,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-08488F3863384A61A715848B8679208D",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-08488F3863384A61A715848B8679208D/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-08488F3863384A61A715848B8679208D/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-08488F3863384A61A715848B8679208D/spans",
            },
          ],
        },
        {
          id: "TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682",
          name: "MS5D",
          type: "Stack",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682/spans",
            },
          ],
        },
      ],
      active: false,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-89EAAE9552324A3C810BA51039637105",
        },
      ],
    },
    {
      id: "TWCORNEL5-EA112F04E50E44E29ED6A63A025E4B4F",
      name: "5, MS5C, MS5D, MS5E",
      endReportPeriodId: "107",
      locations: [
        {
          id: "11",
          name: "5",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/11/spans",
            },
          ],
        },
        {
          id: "TWCORNEL5-08488F3863384A61A715848B8679208D",
          name: "MS5C",
          type: "Stack",
          active: false,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-08488F3863384A61A715848B8679208D",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-08488F3863384A61A715848B8679208D/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-08488F3863384A61A715848B8679208D/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-08488F3863384A61A715848B8679208D/spans",
            },
          ],
        },
        {
          id: "TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682",
          name: "MS5D",
          type: "Stack",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-A30C0B16F17B4CA3B818DE99BE6D1682/spans",
            },
          ],
        },
        {
          id: "TWCORNEL5-F53E1E91724B4226BBB7B57BA8152531",
          name: "MS5E",
          type: "Stack",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-F53E1E91724B4226BBB7B57BA8152531",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-F53E1E91724B4226BBB7B57BA8152531/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-F53E1E91724B4226BBB7B57BA8152531/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/TWCORNEL5-F53E1E91724B4226BBB7B57BA8152531/spans",
            },
          ],
        },
      ],
      active: false,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-EA112F04E50E44E29ED6A63A025E4B4F",
        },
      ],
    },
    {
      id: "MDC-68FF9CD5F0C2464E85FD2A3C15D5A670",
      name: "6A",
      locations: [
        {
          id: "2706",
          name: "6A",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2706",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2706/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2706/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2706/spans",
            },
          ],
        },
      ],
      active: true,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-68FF9CD5F0C2464E85FD2A3C15D5A670",
        },
      ],
    },
    {
      id: "MDC-A89416B9A1414C1CADE050800574A24C",
      name: "6B",
      locations: [
        {
          id: "2707",
          name: "6B",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2707",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2707/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2707/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2707/spans",
            },
          ],
        },
      ],
      active: true,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-A89416B9A1414C1CADE050800574A24C",
        },
      ],
    },
    {
      id: "MDC-78E54EA179FA4C12B3640D3EA96110EC",
      name: "7A",
      locations: [
        {
          id: "2708",
          name: "7A",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2708",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2708/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2708/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2708/spans",
            },
          ],
        },
      ],
      active: true,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-78E54EA179FA4C12B3640D3EA96110EC",
        },
      ],
    },
    {
      id: "MDC-ABF4B69D22C04494A78DA1667DFE9DE6",
      name: "7B",
      locations: [
        {
          id: "2709",
          name: "7B",
          type: "Unit",
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2709",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2709/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2709/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/2709/spans",
            },
          ],
        },
      ],
      active: true,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-ABF4B69D22C04494A78DA1667DFE9DE6",
        },
      ],
    },
  ];
  const sections = [
    { name: "Monitoring Methods" },
    { name: "Location Attributes" },
    { name: "Reporting Frequency" },
    { name: "Unit Information" },
    { name: "Stack/Pipe Information" },
    { name: "Monitoring Systems" },
    { name: "Monitoring Defaults" },
    { name: "Span, Range, and Formulas" },
    { name: "Rectangular Duct WAFs" },
    { name: "Loads" },
    { name: "Qualifications" },
  ];
  const locationHandler = jest.fn();
  const activeMethodsHandler = jest.fn();
  const sectionHandler = jest.fn();
  let queries = null;

  beforeEach(() => {
    queries = render(
      <HeaderInfo
        sectionHandler={sectionHandler}
        facility={{ name: "Test Facility" }}

        monitoringPlans={monitoringPlans}
        locationHandler={locationHandler}
      />
    );
  });
 
  });
});
