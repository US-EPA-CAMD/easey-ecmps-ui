import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import * as actions from "../../store/actions/dynamicFacilityTab";
import userEvent from "@testing-library/user-event";
import {
  DataTableRender,
  mapDispatchToProps,
  mapStateToProps,
} from "./DataTableRender";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
let options = [];
let data = [];
let columns = [];
let columnNames = [];

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
  test("makes sure 3 rows of data are passed in + 1 for header +2 for rest of table", () => {
    const { container, queryByPlaceholderText } = render(
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
        checkedOutLocations={[
          {
            facId: 1,
            monPlanId: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
            checkedOutBy: "test",
          },
        ]}
      />
    );
    const noData = screen.getByAltText("Please wait");
    expect(noData).toBeDefined();
  });
  test("data is loaded but no preloader or dt ", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );
    expect(container).toBeDefined();
  });

  test("data is loaded but no preloader or dt coniditonal no tableStyling ", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );
    expect(container).toBeDefined();
  });
  test("test no title with section title user is logged in and at configuration table trying to search", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
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
    const btnCheckOut = container.querySelector("#btnOpenAndCheckout");
    fireEvent.click(btnCheckOut);
    btnCheckOut.focus();
    fireEvent.keyPress(btnCheckOut, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });

    const searchInput = container.querySelector("#txtSearchData");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");

    fireEvent.click(container.querySelector("#searchDataTableBTN"));
    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(5);
  });
  test("test no title with no section title- user is logged in and at a sections data table", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );

    const btn = container.querySelector("#btnOpen");
    fireEvent.click(btn);
    btn.focus();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });
  test("user is not logged in and at a sections data table", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );
    const btn = container.querySelector("#btnOpen");
    fireEvent.click(btn);
    btn.focus();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });
  test("user is not logged in and at a sections data table WITH tabletitle", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });

  test("user is  logged in and at a sections data table", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });

  test("user is  logged in and at a sections data table with      tableTitle=tableTitle tableStyling=tableStyling", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });

  test("user is  logged in and at a config data table with  nothing checked out  no tableTitle nothing checked out ", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });

  test("user is  logged in and at a config data table with  nothing checked out  no tableTitle nothing checked out ", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });

  test("user is  logged in and at a config data table with  nothing checked out WITH  tableTitle nothing checked out ", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });

  test("user is not logged in and at a configuration data table", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );

    const btn = container.querySelector("#btnOpen");
    fireEvent.click(btn);
    btn.focus();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });

  test("user is logged in and at a configuration data table with a checked out fac ", () => {
    const { container, queryByPlaceholderText } = render(
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
      />
    );

    const btn = container.querySelector("#btnCheckBackIn");
    fireEvent.click(btn);
    btn.focus();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(9);
  });

  test("user is logged in and at a sections data table and checked out ('view/Edit')", () => {
    const { container, queryByPlaceholderText } = render(
      <DataTableRender
        dataLoaded={true}
        addBtn={jest.fn()}
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
      />
    );
    render(
      <DataTableRender
        dataLoaded={true}
        addBtn={jest.fn()}
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
      />
    );
    const btn = container.querySelector("#btnOpen");
    fireEvent.click(btn);
    btn.focus();
    const addBtn = container.querySelector("#addBtn");
    fireEvent.click(addBtn);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(18);
  });

  test("mapDispatchToProps calls the appropriate action", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const state = jest.fn();
    const stateProps = mapStateToProps(state);

    const formData = [];
    // verify the appropriate action was called
    actionProps.setCheckout();

    expect(state).toBeDefined();
  });
});
describe("67440874", () => {
  let wrapper;

  beforeAll(() => {
    jest.useFakeTimers();
    const columns = [
      { name: "ORIS", selector: "col1", sortable: true },
      { name: "Methodology", selector: "col2", sortable: true },
      { name: "Substitute Data Approach", selector: "col3", sortable: true },
    ];
    const columnNames = ["ORIS", "Methodology", "Substitute Data Approach"];
    const data = [
      { col1: "HI", col2: "CALC", col3: null, disabled: false, expanded: true },
      { col1: "OP", col2: "EXP", col3: null, disabled: true, expanded: true },
      { col1: "HI", col2: "AD", col3: "SPTS", disabled: true, expanded: false },
    ];
    wrapper = mount(
      <DataTableRender
        dataLoaded={true}
        addBtn={jest.fn()}
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
      />
    );
  });
  it("should pass", () => {
    let addBtn = wrapper.find("#addBtn");
    expect(addBtn).toBeDefined();
    act(() => {
      jest.runOnlyPendingTimers();
    });
    wrapper.update();
    expect(addBtn).toBeDefined();
  });
});
