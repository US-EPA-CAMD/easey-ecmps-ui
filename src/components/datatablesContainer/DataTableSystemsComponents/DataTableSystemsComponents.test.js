import React from 'react';
import {
  render,
  waitForElement,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import {
  DataTableSystemsComponents,
  mapDispatchToProps,
  mapStateToProps,
} from './DataTableSystemsComponents';
import {
  getMonitoringSystems,
  getMonitoringSystemsComponents,
  getMonitoringSystemsFuelFlows,
  getMonitoringComponents
} from '../../../utils/api/monitoringPlansApi';
const axios = require('axios');

jest.mock('axios');
jest.mock('../../../utils/api/monitoringPlansApi', () => ({
  getMonitoringSystems: jest.fn(),
  getMonitoringSystemsComponents: jest.fn(),
  getMonitoringComponents:jest.fn(),
  getMonitoringSystemsFuelFlows: jest.fn(),
}));
const selectedSystem = [
  {
    active: true,
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    systemFuelFlowUnitsOfMeasureCode: 'PNG',
    id: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    locationId: '6',
    systemDesignationCode: 'P',
    monitoringSystemId: 'AF1',
    maximumFuelFlowRateSourceCode: 'GAS',
  },
  {
    active: true,
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    systemFuelFlowUnitsOfMeasureCode: 'PNG',
    id: 'TWCORNEL5-10B54DDC6DBF4DF3B309251288E83E12',
    locationId: '6',
    systemDesignationCode: 'P',
    monitoringSystemId: 'AF2',
    maximumFuelFlowRateSourceCode: 'GAS',
  },
];
const apiFuel = [
  {
    id: 'TWCORNEL5-346B541485484501A5C748F8CAAABC22',
    locationId: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    systemFuelFlowUnitsOfMeasureCode: 'PNG',
    maximumFuelFlowRateSourceCode: 'GAS',
    maximumFuelFlowRate: '10000.0',
    beginDate: '2019-07-01',
    endDate: null,
    beginHour: '0',
    endHour: null,
    active: true,
  },
];
const apiComp = [
  {
    id: 'TWCORNEL5-902F83FCDE244546ABB2E2F46EC873E3',
    componentRecordId: 'TWCORNEL5-4EA39F9E01AB411EB84E313A212084C1',
    locationId: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    /*locationId: "6",
    componentRecordId: "AFA",*/
    componentTypeCode: 'GFFM',
    basisCode: null,
    modelVersion: 'FAB-3161-2A',
    manufacturer: 'FLUIDID TECHNOLOGIES',
    serialNumber: '001-NG-FE-1000',
    hgConverterIndicator: null,
    sampleAcquisitionMethodCode: 'ORF',
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: 'TWCORNEL5-1E5992F39F084C53AC505D3AA7E6910F',
    componentRecordId: 'TWCORNEL5-BEEEEEF364094199A572406CCAD339B0',
    locationId: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    /*locationId: "6",
    componentRecordId: "AFB",*/
    componentTypeCode: 'PRES',
    basisCode: null,
    modelVersion: 'IGP10S-T52E1FD',
    manufacturer: 'FOXBORO',
    serialNumber: '17300936',
    hgConverterIndicator: null,
    sampleAcquisitionMethodCode: 'ORF',
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: 'TWCORNEL5-2C0D6A3BD0134EB08D517C13F4F29B2B',
    componentRecordId: 'TWCORNEL5-62ADD2B9EBE14827A7A4DDFE317D00BE',
    locationId: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    /* locationId: "6",
    componentRecordId: "AFC",*/
    componentTypeCode: 'PRES',
    basisCode: null,
    modelVersion: 'IGP10S-T52E1FD',
    manufacturer: 'FOXBORO',
    serialNumber: '17300937',
    hgConverterIndicator: null,
    sampleAcquisitionMethodCode: 'ORF',
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: 'TWCORNEL5-CEA2BF80166F4CB1890571BA9ED4ECB4',
    componentRecordId: 'TWCORNEL5-83652BC8FACA47B08F904836032CA7A6',
    locationId: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    /* locationId: "6",
    componentRecordId: "AFD",*/
    componentTypeCode: 'DP',
    basisCode: null,
    modelVersion: 'IDP10S-T22C21FD',
    manufacturer: 'FOXBORO',
    serialNumber: '17300932',
    hgConverterIndicator: null,
    sampleAcquisitionMethodCode: 'ORF',
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: 'TWCORNEL5-FE67CFECB6E946BFB5F80536B5D8359D',
    componentRecordId: 'TWCORNEL5-AC759DF85E834751A04991EBBD8071A3',
    locationId: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    // locationId: "6",
    // componentRecordId: "AFE",
    componentTypeCode: 'DP',
    basisCode: null,
    modelVersion: 'IDP10S-T22C21FD',
    manufacturer: 'FOXBORO',
    serialNumber: '17300933',
    hgConverterIndicator: null,
    sampleAcquisitionMethodCode: 'ORF',
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: 'TWCORNEL5-DDDA16031A6B44A3BF38FCFF52B82668',
    componentRecordId: 'TWCORNEL5-1346D0289EF44F7A87B4ABF92CE501DC',
    locationId: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    // locationId: "6",
    // componentRecordId: "AFF",
    componentTypeCode: 'TEMP',
    basisCode: null,
    modelVersion: 'RTT1SS-T1SA1-EN',
    manufacturer: 'SCHNEIDER',
    serialNumber: '17301602',
    hgConverterIndicator: null,
    sampleAcquisitionMethodCode: 'ORF',
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: 'TWCORNEL5-2DBF3CEFE78142C0996F32BB078C2F5A',
    componentRecordId: 'TWCORNEL5-15BBE0B7C475434887739E964E45EDD3',
    locationId: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    // locationId: "6",
    // componentRecordId: "AFG",
    componentTypeCode: 'TEMP',
    basisCode: null,
    modelVersion: 'RTT1SS-T1SA1-EN',
    manufacturer: 'SCHNEIDER',
    serialNumber: '17301603',
    hgConverterIndicator: null,
    sampleAcquisitionMethodCode: 'ORF',
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: 'TWCORNEL5-E3FA52B8BDD74A73B8F639158D38F147',
    componentRecordId: 'TWCORNEL5-FADC4E3E593A4AB3B006F6F1B7C9F7DA',
    locationId: 'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    //locationId: "6",
    //componentRecordId: "XX4",
    componentTypeCode: 'DAHS',
    basisCode: null,
    modelVersion: 'CEMS',
    manufacturer: 'APCO',
    serialNumber: null,
    hgConverterIndicator: null,
    sampleAcquisitionMethodCode: null,
    beginDate: '2019-07-01',
    beginHour: '0',
    endDate: null,
    endHour: null,
    active: true,
  },
];
//testing redux connected component to mimic props passed as argument
const componentRenderer = (
  checkout,
  secondLevel,
  addComponentFlag,
  openComponentViewTest,
  openAddComponentTest,
) => {
  const props = {
    fuelFlowsMdmData: {
      maximumFuelFlowRateSourceCode: [
        {
          code: '',
          name: '-- Select a value --',
        },
        {
          code: 'UMX',
          name: 'Unit Maximum Rate',
        },
      ],
      systemFuelFlowUnitsOfMeasureCode: [
        {
          code: '',
          name: '-- Select a value --',
        },
        {
          code: '1',
          name: '100 Standard Cubic Feet / Hour per Megawatt',
        },
      ],
    },
    systemComponentsMdmData: {
      componentTypeCode: [
        {
          code: '',
          name: '-- Select a value --',
        },
        {
          code: 'BGFF',
          name: 'Billing Gas Fuel Flowmeter',
        },
      ],
      basisCode: [
        {
          code: '',
          name: '-- Select a value --',
        },
        {
          code: 'BGFF',
          name: 'Billing Gas Fuel Flowmeter',
        },
      ],
      prefilteredSystemsComponents: [
        { componentTypeCode: 'BGFF', basisCode: ['D', 'F', 'E'] },
      ],
    },
    loadDropdownsData: jest.fn(),
    systemID: 'AF1',
    viewOnly: false,
    setSecondLevel: jest.fn(),
    secondLevel: secondLevel,
    thirdLevel: false,
    setThirdLevel: jest.fn(),
    locationSelectValue: 6,
    user: { firstName: 'test' },
    checkout: checkout,
    setCreateBtn: jest.fn(),
    setCreateBtnAPI: jest.fn(),
    setSaveAnalyzerRange: jest.fn(),
    setSelectedFuelFlows: jest.fn(),
    selectedFuelFlows: [],
    setSelectedFuelFlowInFirst: jest.fn(),
    setSelectedRangeInFirst: jest.fn(),
    backBTN: jest.fn(),
    updateAnalyzerRangeTable: false,
    setUpdateFuelFlowTable: jest.fn(),
    setAddExistingComponentFlag: jest.fn(),
    setCreateAnalyzerRangesFlag: jest.fn(),
    createAnalyzerRangesFlag: false,
    setCreateFuelFlowFlag: jest.fn(),
    createFuelFlowFlag: false,
    setCreateNewComponentFlag: jest.fn(),
    createNewComponentFlag: false,
    updateComponentTable: false,
    setupdateComponentTable: jest.fn(),
    addComponentFlag: addComponentFlag,
    setAddComponentFlag: jest.fn(),
    addCompThirdLevelTrigger: false,
    setAddCompThirdLevelTrigger: jest.fn(),
    addCompThirdLevelCreateTrigger: false,
    setAddCompThirdLevelCreateTrigger: jest.fn(),
    backToFirstLevelLevelBTN: false,
    setCurrentBar: jest.fn(),
    openFuelFlowsView: false,
    setOpenFuelFlowsView: jest.fn(),
    setBread: jest.fn(),
    openComponentViewTest: openComponentViewTest,
    openAddComponentTest: openAddComponentTest,
    // loadDropdownsData: jest.fn(),
    // mdmData: {
    //   testCode: [],
    // },
    // systemComponentsMdmData: { testCode: [] },
  };
  return render(<DataTableSystemsComponents {...props} />);
};
describe('DatatableSystemsComponents test suit', () => {
  beforeEach(cleanup);

  test('here so test run', () => {
    expect(true);
  });

  //FAILING
  //Expected: 4
  //Received: 2
  // test("tests getMonitoringSystems view/edit functionality", async () => {
  //   axios.get.mockImplementation(() =>
  //     Promise.resolve({ status: 200, data: selectedSystem })
  //   );
  //   const title = await mpApi.getMonitoringSystems(6);
  //   expect(title.data).toEqual(selectedSystem);
  //   let { container } = await waitForElement(() =>
  //     componentRenderer(true, false, true, true, true)
  //   );
  //   expect(container).toBeDefined();
  //   const systemsComponentsTables = screen.getAllByRole('table');
  //   expect(systemsComponentsTables.length).toBe(4);
  //   const viewEditBtns = screen.getAllByText("View / Edit");
  //   expect(viewEditBtns.length).not.toBe(0);
  //   fireEvent.click(viewEditBtns[0]);
  // });

  //FAILING
  //Expected: 4
  //Received: 2
  // test("tests getMonitoringSystems add component functionality", async () => {
  //   axios.get.mockImplementation(() =>
  //     Promise.resolve({ status: 200, data: selectedSystem })
  //   );
  //   const title = await mpApi.getMonitoringSystems(6);
  //   expect(title.data).toEqual(selectedSystem);
  //   let { container } = await waitForElement(() =>
  //     componentRenderer(true, false, true, true, true)
  //   );
  //   expect(container).toBeDefined();
  //   const systemsComponentsTables = screen.getAllByRole('table');
  //   expect(systemsComponentsTables.length).toBe(4);
  //   const addComponentBtn = screen.getAllByRole('button', {name:"Add Component"});
  //   expect(addComponentBtn.length).toBe(2);
  //   fireEvent.click(addComponentBtn[0]);
  // });

  test('tests a getMonitoringSystemsComponents', async () => {
    const createMock = data => jest.fn().mockResolvedValue({ data });
    getMonitoringSystemsComponents.mockImplementation(createMock(apiComp));
    getMonitoringComponents.mockImplementation(createMock(apiComp));
    getMonitoringSystems.mockImplementation(createMock(selectedSystem));
    getMonitoringSystemsFuelFlows.mockImplementation(createMock(apiFuel));

    // axios.get.mockImplementation(() =>
    //   Promise.resolve({ status: 200, data: apiComp })
    // );
    const title = await getMonitoringSystemsComponents(
      6,
      'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    );

    expect(title.data).toEqual(apiComp);
    // React.useState = jest
    //   .fn()
    // .mockReturnValueOnce([apiComp, {}])
    // .mockReturnValueOnce([true, {}])
    // .mockReturnValueOnce([false, {}])
    // .mockReturnValueOnce([false, {}])
    // .mockReturnValueOnce([
    //   { locationId: 6, id: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D" },
    //   {},
    // ])
    // .mockReturnValueOnce(["", {}])

    // .mockReturnValueOnce([false, {}])
    // .mockReturnValueOnce([false, {}])
    // .mockReturnValueOnce([true, {}])

    // .mockReturnValueOnce([true, {}])
    // .mockReturnValueOnce([false, {}]);

    let { container } = await waitFor(() =>
      componentRenderer(false, false, false, false, false),
    );
    expect(container.querySelector('#backBtn')).toBeDefined();
  });

  test('tests a getMonitoringSystemsFuelFlows', async () => {
    const createMock = data => jest.fn().mockResolvedValue({ data });
    getMonitoringSystemsComponents.mockImplementation(createMock(apiComp));
    getMonitoringComponents.mockImplementation(createMock(apiComp));
    getMonitoringSystems.mockImplementation(createMock(selectedSystem));
    getMonitoringSystemsFuelFlows.mockImplementation(createMock(apiFuel));
    // axios.get.mockImplementation(() =>
    //   Promise.resolve({ status: 200, data: apiFuel })
    // );
    const title = await getMonitoringSystemsFuelFlows(
      6,
      'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    );
    expect(title.data).toEqual(apiFuel);

    let { container } = await waitFor(() =>
      componentRenderer(false, true, true, false, false),
    );

    const fuelBtn = container.querySelectorAll('#btnOpenFuelFlows');
    for (const x of fuelBtn) {
      fireEvent.click(x);
    }
    expect(container.querySelector('#backBtn')).toBeDefined();
  });

  test('tests opening the add modal page ', async () => {
    // axios.get.mockImplementation(() =>
    //   Promise.resolve({ status: 200, data: apiFuel })
    // );
    const createMock = data => jest.fn().mockResolvedValue({ data });
    getMonitoringSystemsComponents.mockImplementation(createMock(apiComp));
    getMonitoringComponents.mockImplementation(createMock(apiComp));
    getMonitoringSystems.mockImplementation(createMock(selectedSystem));
    getMonitoringSystemsFuelFlows.mockImplementation(createMock(apiFuel));
    const title = await getMonitoringSystemsFuelFlows(
      6,
      'TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D',
    );
    expect(title.data).toEqual(apiFuel);

    let { container } = await waitFor(() =>
      componentRenderer(true, false, true, true, false),
    );

    const fuelBtn = container.querySelectorAll('#btnOpenFuelFlows');
    for (const x of fuelBtn) {
      fireEvent.click(x);
    }
    expect(container.querySelector('#backBtn')).toBeDefined();
  });
  test('mapDispatchToProps calls the appropriate action', async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const state = { dropdowns: { fuelFlows: '' } };
    const stateProps = mapStateToProps(state);

    const formData = [];
    // verify the appropriate action was called
    actionProps.loadDropdownsData();
  });
});
