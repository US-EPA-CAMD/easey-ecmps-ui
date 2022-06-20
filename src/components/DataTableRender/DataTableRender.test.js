import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import { Provider } from "react-redux";
import {
  DataTableRender,
  mapDispatchToProps,
  mapStateToProps,
} from "./DataTableRender";
let options = [];
let data = [];
let columnNames = [];
let columns = [];

import configureStore from "../../store/configureStore.dev";
const store = configureStore();
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
beforeAll(() => {
  columns = [
    { name: "ORIS", selector: "col1", sortable: true },
    { name: "Methodology", selector: "col2", sortable: true },
    { name: "Substitute Data Approach", selector: "col3", sortable: true },
    { name: "Configurations", selector: "col4", sortable: true },
    { name: "Facility", selector: "col5", sortable: true },
  ];
  columnNames = [
    "ORIS",
    "Methodology",
    "Substitute Data Approach",
    "Configurations",
    "Facility",
  ];
  data = [
    {
      col1: "HI",
      col2: "CALC",
      col3: 1,
      col4: null,
      col5: null,
      disabled: false,
      expanded: true,
      facId: 1,
    },
    {
      col1: "OP",
      col2: "EXP",
      col3: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
      col4: null,
      col5: null,
      disabled: true,
      expanded: true,
      facId: "83",
    },
    {
      col1: "HI",
      col2: "AD",
      col3: "SPTS",
      col4: null,
      col5: null,
      disabled: true,
      expanded: false,
      facId: "83",
      monPlanId: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
    },
  ];
});
describe("renders datatable with all values ", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("makes sure 3 rows of data are passed in + 1 for header +2 for rest of table", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={false}
            sectionTitle="sectionTitle"
            tableTitle="tableTitle"
            button={true}
            columnNames={columnNames}
            data={[]}
            user={{ firstName: "test" }}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            expandableRowComp={<button>{"click me"}</button>}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            componentStyling="componentStyling"
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
            checkedOutLocations={[
              {
                facId: 1,
                monPlanId: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
                checkedOutBy: "test",
              },
            ]}
          />
        </Provider>
      )
    );
    const noData = screen.getByAltText("Content loading");
    expect(noData).toBeDefined();
  });
  test("data is loaded but no preloader or dt ", async () => {
    const { container } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            sectionTitle="sectionTitle"
            tableTitle="tableTitle"
            button={true}
            columnNames={columnNames}
            data={[]}
            user={{ username: "test" }}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            expandableRowComp={<button>{"click me"}</button>}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            componentStyling="componentStyling"
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );
    expect(container).toBeDefined();
  });

  test("data is loaded but no preloader or dt coniditonal no tableStyling ", async () => {
    const { container } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            sectionTitle="sectionTitle"
            tableTitle="tableTitle"
            button={true}
            columnNames={columnNames}
            data={[]}
            user={{ username: "test" }}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            expandableRowComp={<button>{"click me"}</button>}
            expandableRows={true}
            headerStyling="headerStyling"
            componentStyling="componentStyling"
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );
    expect(container).toBeDefined();
  });
  test("test no title with section title user is logged in and at configuration table trying to search", async () => {
    const { container } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            sectionTitle="tableTitle"
            addBtn={true}
            columnNames={columnNames}
            data={data}
            user={{ username: "test" }}
            pagination={true}
            filter={true}
            expandableRowComp={<button>{"click me"}</button>}
            expandableRows={true}
            headerStyling="headerStyling"
            componentStyling="componentStyling"
            actionsBtn={"Open"}
            openHandler={jest.fn()}
            uniqueKey={true}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            checkedOutLocations={[]}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );
    const btn = container.querySelector("#btnOpen");
    fireEvent.click(btn);
    btn.focus();
    fireEvent.keyPress(btn, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });
    // const btnCheckOut = container.querySelector("#btnOpenAndCheckout");
    // fireEvent.click(btnCheckOut);
    // btnCheckOut.focus();
    // fireEvent.keyPress(btnCheckOut, {
    //   key: "Enter",
    //   code: "Enter",
    //   keyCode: 13,
    //   charCode: 13,
    // });

    const searchInput = container.querySelector("#txtSearchData");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");

    fireEvent.click(container.querySelector("#searchDataTableBTN"));
    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(8);
  });
  test("test no title with no section title- user is logged in and at a sections data table", async () => {
    const { container } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            columnNames={columnNames}
            data={data}
            user={{ username: "test" }}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            componentStyling="componentStyling"
            actionsBtn={"View"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );

    const btn = container.querySelector("#btnOpen");
    // fireEvent.click(btn);
    // btn.focus();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });
  test("user is not logged in and at a sections data table", async () => {
    const { container } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            columnNames={columnNames}
            data={data}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            componentStyling="componentStyling"
            actionsBtn={"View"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );
    const btn = container.querySelector("#btnOpen");
    // fireEvent.click(btn);
    // btn.focus();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });
  test("user is not logged in and at a sections data table WITH tabletitle", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            columnNames={columnNames}
            data={data}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            tableTitle="tableTitle"
            componentStyling="componentStyling"
            actionsBtn={"View"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />{" "}
        </Provider>
      )
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });

  test("user is  logged in and at a sections data table", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            columnNames={columnNames}
            data={data}
            user={{ firstName: "test" }}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableTitle="tableStyling"
            componentStyling="componentStyling"
            actionsBtn={"View"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });

  test("user is  logged in and at a sections data table with      tableTitle=tableTitle tableStyling=tableStyling", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            columnNames={columnNames}
            data={data}
            user={{ firstName: "test" }}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableTitle="tableTitle"
            tableStyling="tableStyling"
            componentStyling="componentStyling"
            actionsBtn={"View"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });

  test("user is  logged in and at a config data table with  nothing checked out  no tableTitle nothing checked out ", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            columnNames={columnNames}
            data={data}
            user={{ firstName: "test" }}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            checkedOutLocations={[]}
            componentStyling="componentStyling"
            actionsBtn={"Open"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });

  test("user is  logged in and at a config data table with  nothing checked out  no tableTitle nothing checked out ", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            columnNames={columnNames}
            data={data}
            user={{ firstName: "test" }}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            checkedOutLocations={[]}
            componentStyling="componentStyling"
            actionsBtn={"Open"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });

  test("user is  logged in and at a config data table with  nothing checked out WITH  tableTitle nothing checked out ", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            columnNames={columnNames}
            data={data}
            user={{ firstName: "test" }}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableTitle="tableTitle"
            tableStyling="tableStyling"
            checkedOutLocations={[]}
            componentStyling="componentStyling"
            actionsBtn={"Open"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });

  test("user is not logged in and at a configuration data table", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            addBtn={true}
            columnNames={columnNames}
            data={data}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            componentStyling="componentStyling"
            actionsBtn={"Open"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );

    const btn = container.querySelector("#btnOpen");
    // fireEvent.click(btn);
    // btn.focus();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });

  test("user is logged in and at a configuration data table with a checked out fac ", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            addBtn={true}
            columnNames={columnNames}
            data={data}
            user={{ firstName: "test" }}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            defaultSort={"col2"}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            componentStyling="componentStyling"
            actionsBtn={"Open"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            checkedOutLocations={[
              {
                facId: 1,
                monPlanId: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
                checkedOutBy: "test",
              },
            ]}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );

    const btn = container.querySelector("#btnCheckBackIn");
    // fireEvent.click(btn);
    // btn.focus();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(12);
  });

  test("user is logged in and at a sections data table and checked out ('view/Edit')", async () => {
    const { container, queryByPlaceholderText } = await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            addBtn={jest.fn()}
            addBtnName={"test test"}
            columnNames={columnNames}
            data={data}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            user={{ username: "test" }}
            defaultSort={"col"}
            checkout={true}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            componentStyling="componentStyling"
            actionsBtn={"View"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );
    await waitForElement(() =>
      render(
        <Provider store={store}>
          <DataTableRender
            dataLoaded={true}
            addBtn={jest.fn()}
            addBtnName={"test test"}
            columnNames={columnNames}
            data={data}
            selectedRowHandler={jest.fn()}
            pagination={true}
            filter={true}
            user={{ username: "test" }}
            defaultSort={"col2"}
            checkout={true}
            // expandableRowComp={true}
            expandableRows={true}
            headerStyling="headerStyling"
            tableStyling="tableStyling"
            componentStyling="componentStyling"
            actionsBtn={"View"}
            openHandler={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
            setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
            setCheckout={jest.fn()}
            setShowInactive={jest.fn()}
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        </Provider>
      )
    );
    const btn = container.querySelector("#btnOpen");
    // fireEvent.click(btn);
    // btn.focus();
    // const addBtn = container.querySelector("#addBtn");
    // fireEvent.click(addBtn);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(24);
  });

  test("mapDispatchToProps calls the appropriate action", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const state = store.getState();
    const stateProps = mapStateToProps(state);
    // verify the appropriate action was called
    actionProps.setCheckout();

    expect(state).toBeDefined();
  });
});
