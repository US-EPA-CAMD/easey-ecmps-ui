import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import { DataTableSystems } from './DataTableSystems';
import { getMonitoringSystems } from '../../../utils/api/monitoringPlansApi';

const axios = require('axios');
const DataTableSystemsfunction = require('./DataTableSystems');
jest.mock('axios');
jest.mock('../../../utils/api/monitoringPlansApi', () => ({
  getMonitoringSystems: jest.fn(),
  saveSystems: jest.fn(),
  createSystems: jest.fn(),
  saveAnalyzerRanges: jest.fn(),
  createAnalyzerRanges: jest.fn(),
  saveSystemsFuelFlows: jest.fn(),
  createSystemsFuelFlows: jest.fn(),
  createSystemsComponents: jest.fn(),
  createComponents: jest.fn(),
  saveSystemsComponents: jest.fn(),
}));
const systemsDataActiveOnly = [
  {
    id: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    locationId: '6',
    maximumFuelFlowRateSourceCode: 'GAS',
    systemDesignationCode: 'P',
    monitoringSystemId: 'AF1',
    systemFuelFlowUnitsOfMeasureCode: 'PNG',
    beginDate: '2019-07-01',
    endDate: null,
    beginHour: '0',
    endHour: null,
    active: true,
  },
  {
    id: 'TWCORNEL5-10B54DDC6DBF4DF3B309251288E83E12',
    locationId: '6',
    maximumFuelFlowRateSourceCode: 'GAS',
    systemDesignationCode: 'P',
    monitoringSystemId: 'AF2',
    systemFuelFlowUnitsOfMeasureCode: 'PNG',
    beginDate: '2019-07-01',
    endDate: null,
    beginHour: '0',
    endHour: null,
    active: true,
  },
];

const systemData = [
  {
    id: 'CAMD-DDD452F9F99344048EFB96C42432C0ED',
    locationId: '5',
    maximumFuelFlowRateSourceCode: 'OP',
    systemDesignationCode: 'P',
    monitoringSystemId: 'AA5',
    systemFuelFlowUnitsOfMeasureCode: 'NFS',
    beginDate: '1993-10-01',
    endDate: '2018-10-02',
    beginHour: '0',
    endHour: '23',
    active: false,
  },
  {
    id: 'CAMD-7903CC3112AF47F797D1F0E58EDB486E',
    locationId: '5',
    maximumFuelFlowRateSourceCode: 'SO2',
    systemDesignationCode: 'P',
    monitoringSystemId: 'AA1',
    systemFuelFlowUnitsOfMeasureCode: 'NFS',
    beginDate: '1993-10-01',
    endDate: '2019-06-30',
    beginHour: '0',
    endHour: '23',
    active: false,
  },
  {
    id: 'CAMD-F0470799B81840DB81B5BBD810F9EE15',
    locationId: '5',
    maximumFuelFlowRateSourceCode: 'NOX',
    systemDesignationCode: 'P',
    monitoringSystemId: 'AA2',
    systemFuelFlowUnitsOfMeasureCode: 'NFS',
    beginDate: '1993-10-01',
    endDate: null,
    beginHour: '0',
    endHour: null,
    active: true,
  },
  {
    id: 'CAMD-F5E1F18322AB4688982A8E4633001B12',
    locationId: '5',
    maximumFuelFlowRateSourceCode: 'CO2',
    systemDesignationCode: 'P',
    monitoringSystemId: 'AA3',
    systemFuelFlowUnitsOfMeasureCode: 'NFS',
    beginDate: '1993-10-01',
    endDate: '2019-06-30',
    beginHour: '0',
    endHour: '23',
    active: false,
  },
  {
    id: 'CAMD-51F3958C85DE4A0BB7DA47F2D1EDE131',
    locationId: '5',
    maximumFuelFlowRateSourceCode: 'FLOW',
    systemDesignationCode: 'P',
    monitoringSystemId: 'AA4',
    systemFuelFlowUnitsOfMeasureCode: 'NFS',
    beginDate: '1993-10-01',
    endDate: '2019-06-30',
    beginHour: '0',
    endHour: '23',
    active: false,
  },
];

const systemsInactiveOnly = [
  {
    id: 'CAMD-0BEB1B660CA54089B7C1CC2CC3297C85',
    locationId: '76',
    maximumFuelFlowRateSourceCode: 'OP',
    systemDesignationCode: 'P',
    monitoringSystemId: 'DB5',
    systemFuelFlowUnitsOfMeasureCode: 'NFS',
    beginDate: '1994-11-01',
    endDate: '2007-09-30',
    beginHour: '0',
    endHour: '23',
    active: false,
  },
];

const componentRenderer = location => {
  const props = {
    user: { firstName: 'test' },
    checkout: true,
    inactive: true,
    settingInactiveCheckBox: jest.fn(),
    locationSelectValue: location,
    revertedState: false,
    setRevertedState: jest.fn(),
    selectedSysIdTest: 'testId',
    selectedRangeInFirstTest: { locationId: 1, componentRecordId: 1 },
    tabs: [
      {
        openedFacilityTabs: [],
        inactive: [true],
      },
    ],
    currentTabIndex: 0,
    mdmData: {
      systemDesignationCode: [
        {
          code: '',
          name: '-- Select a value --',
        },
        {
          code: 'B',
          name: 'Non-redundant Backup',
        },
        {
          code: 'CI',
          name: 'Certified Monitoring System at Inlet to Emission Control Device',
        },
        {
          code: 'DB',
          name: 'Data Backup',
        },
        {
          code: 'P',
          name: 'Primary',
        },
        {
          code: 'PB',
          name: 'Primary Bypass',
        },
        {
          code: 'RB',
          name: 'Redundant Backup',
        },
        {
          code: 'RM',
          name: 'Reference Method Backup',
        },
      ],
      systemTypeCode: [
        {
          code: '',
          name: '-- Select a value --',
        },
        {
          code: 'CO2',
          name: 'CO2 Concentration',
        },
        {
          code: 'FLOW',
          name: 'Stack Flow',
        },
        {
          code: 'GAS',
          name: 'Gas Fuel Flow',
        },
        {
          code: 'H2O',
          name: 'Moisture (O2 Wet and Dry)',
        },
        {
          code: 'H2OM',
          name: 'Moisture Sensor',
        },
        {
          code: 'H2OT',
          name: 'Moisture Table',
        },
        {
          code: 'HG',
          name: 'Hg Concentration CEMS',
        },
        {
          code: 'LTGS',
          name: 'Long-term Gas Fuel Flow',
        },
        {
          code: 'LTOL',
          name: 'Long-term Oil Fuel Flow',
        },
        {
          code: 'NOX',
          name: 'NOx Emission Rate',
        },
        {
          code: 'NOXC',
          name: 'NOx Concentration',
        },
        {
          code: 'NOXE',
          name: 'NOx Appendix E',
        },
        {
          code: 'NOXP',
          name: 'NOx PEMS',
        },
        {
          code: 'O2',
          name: 'O2 Concentration',
        },
        {
          code: 'OILM',
          name: 'Mass of Oil Fuel Flow',
        },
        {
          code: 'OILV',
          name: 'Volumetric Oil Fuel Flow',
        },
        {
          code: 'OP',
          name: 'Opacity',
        },
        {
          code: 'PM',
          name: 'Particulate Matter',
        },
        {
          code: 'SO2',
          name: 'SO2 Concentration',
        },
        {
          code: 'HCL',
          name: 'HCl Concentration CEMS',
        },
        {
          code: 'HF',
          name: 'HF Concentration CEMS',
        },
        {
          code: 'ST',
          name: 'Sorbent Trap Monitoring System',
        },
      ],
      fuelCode: [
        {
          code: '',
          name: '-- Select a value --',
        },
        {
          code: 'ANT',
          name: 'Anthracite Coal',
        },
        {
          code: 'BFG',
          name: 'Blast Furnace Gas',
        },
        {
          code: 'BT',
          name: 'Bituminous Coal',
        },
        {
          code: 'BUT',
          name: 'Butane Gas',
        },
        {
          code: 'C',
          name: 'Coal',
        },
        {
          code: 'CDG',
          name: 'Coal Derived Gas',
        },
        {
          code: 'COG',
          name: 'Coke Oven Gas',
        },
        {
          code: 'CRF',
          name: 'Coal Refuse',
        },
        {
          code: 'DGG',
          name: 'Digester Gas',
        },
        {
          code: 'DSL',
          name: 'Diesel Oil',
        },
        {
          code: 'LFG',
          name: 'Landfill Gas',
        },
        {
          code: 'LIG',
          name: 'Lignite Coal',
        },
        {
          code: 'LPG',
          name: 'Liquefied Petroleum Gas',
        },
        {
          code: 'MIX',
          name: 'Mixture (Co-Fired Fuels)',
        },
        {
          code: 'NFS',
          name: 'Non-Fuel Specific',
        },
        {
          code: 'NNG',
          name: 'Natural Gas',
        },
        {
          code: 'OGS',
          name: 'Other Gas',
        },
        {
          code: 'OIL',
          name: 'Residual Oil',
        },
        {
          code: 'OOL',
          name: 'Other Oil',
        },
        {
          code: 'OSF',
          name: 'Other Solid Fuel',
        },
        {
          code: 'PDG',
          name: 'Producer Gas',
        },
        {
          code: 'PNG',
          name: 'Pipeline Natural Gas',
        },
        {
          code: 'PRG',
          name: 'Process Gas',
        },
        {
          code: 'PRP',
          name: 'Propane Gas',
        },
        {
          code: 'PRS',
          name: 'Process Sludge',
        },
        {
          code: 'PTC',
          name: 'Petroleum Coke',
        },
        {
          code: 'R',
          name: 'Refuse',
        },
        {
          code: 'RFG',
          name: 'Refinery Gas',
        },
        {
          code: 'SRG',
          name: 'Unrefined Sour Gas',
        },
        {
          code: 'SUB',
          name: 'Sub-Bituminous Coal',
        },
        {
          code: 'TDF',
          name: 'Tire-Derived Fuel',
        },
        {
          code: 'W',
          name: 'Wood',
        },
        {
          code: 'WL',
          name: 'Waste Liquid',
        },
      ],
    },
    loadDropdownsData: jest.fn(),
  };
  return render(<DataTableSystems {...props} />);
};

afterAll(() => {
  jest.clearAllMocks();
});

test('tests a configuration with only active systems', async () => {
  getMonitoringSystems.mockResolvedValue({ data: systemsDataActiveOnly });
  const title = await getMonitoringSystems(5);
  expect(title.data).toEqual(systemsDataActiveOnly);
  let { container } = await waitFor(() => componentRenderer(5));
  expect(container).toBeDefined();
});

test('tests a configuration with both inactive and active systems', async () => {
  getMonitoringSystems.mockResolvedValue({ data: systemData });
  const title = await getMonitoringSystems(5);
  expect(title.data).toEqual(systemData);
  let { container } = await waitFor(() => componentRenderer(5));
  expect(container).toBeDefined();
});

test('tests a configuration with inactive only', async () => {
  getMonitoringSystems.mockResolvedValue({ data: systemsInactiveOnly });
  const title = await getMonitoringSystems(76);

  expect(title.data).toEqual(systemsInactiveOnly);
  let { container, debug } = await waitFor(() => componentRenderer(76));
  fireEvent.click(container.querySelector('#testingBtn'));
  fireEvent.click(container.querySelector('#testingBtn2'));
  debug();
  expect(container).toBeDefined();
});

// test("click",async () => {
//   const props = {
//     user: { firstName: "test" },
//     checkout: true,
//     inactive: true,
//     settingInactiveCheckBox: jest.fn(),
//     locationSelectValue: 76,
//   };

// //   const spy1 = jest.spyOn(DataTableSystems.prototype, "selectedRowHandler");
// //  const wrapper = shallow(<DataTableSystems   {...props}/>);
// //   wrapper.find("#btnOpen").simulate("click");
// //   expect(spy1).not.toHaveBeenCalled(); // Success!  (onClick NOT bound to spy)

// //   wrapper.setState({}); // <= force re-render (sometimes calling wrapper.update isn't enough)

// //   wrapper.find("#btnOpen").simulate("click");
// //   expect(spy1).toHaveBeenCalledTimes(1); // Success!  (onClick IS bound to spy)

// // const spy = jest.spyOn(util, 'selectedRowHandler');
// // const wrapper =  shallow(<DataTableSystems   {...props}/>);
// let { container } = await waitForElement(() => componentRenderer(5));
// // const spy1 = jest.spyOn(wrapper.instance(), 'selectedRowHandler');
// // wrapper.update();

// // const button = wrapper.find('#btnOpen');
// // button.simulate('click');
// expect(container.selectedRowHandler()).toBe("Hello");

// });
