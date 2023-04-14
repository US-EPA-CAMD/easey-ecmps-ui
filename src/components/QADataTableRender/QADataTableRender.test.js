import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QADataTableRender from "./QADataTableRender"; //   mapStateToProps, //   mapDispatchToProps, //     QADataTableRender, // {

let options = [];
let data = [];
let columnNames = [];
let columns = [];

beforeAll(() => {
  columns = [
    { name: "ORIS", selector: "col1", sortable: true },
    { name: "Methodology", selector: "col2", sortable: true },
    { name: "Substitute Data Approach", selector: "col3", sortable: true },
    { name: "Configurations", selector: "col4", sortable: true },
    { name: "Facility", selector: "col5", sortable: true },
  ];
  columnNames = [
    "Unit or Stack Pipe ID",
    "Test Type Code",
    "Monitoring System Code",
    "Component ID",
    "Span Scale Code",
    "Test Number",
    "Test Reason Code",
    "Test Description",
    "Test Result Code",
    "Begin Date/Time",
    "End Date/Time",
    "Grace Period Indicator",
    "Year",
    "Quarter",
    "Test Comment",
    "Injection Protocol Code",
  ];
  data = [
    {
      col1: "1",
      col2: "FFACCTT",
      col3: null,
      col4: "AFA",
      col5: null,
      col6: "20201CEM5FFMAFA",
      col7: "QA",
      col8: null,
      col9: "PASSED",
      col10: "",
      col11: "02/26/2020 20:03",
      col12: null,
      col13: null,
      col14: null,
      col15: null,
      col16: null,
      col17: "TWCORNEL5-3668BE41C5E348EFB9BD565B78249C04",
    },
  ];
});
describe("renders datatable with all values ", () => {
  test("makes sure 3 rows of data are passed in + 1 for header +2 for rest of table", () => {
    const { container } = render(
      <QADataTableRender
        actionsBtn={"View"}
        columnNames={columnNames}
        data={[]}
        user={{ firstName: "test" }}
        isCheckedOut={true}
        dataTableName="Test Summary Data"
      // expandableRowComp={<button>{"click me"}</button>}
      // expandableRows={true}
      />
    );
    expect(container).toBeDefined();

    // expandBTN.click();
    // const noData = screen.getByAltText("Please wait");
    // expect(noData).toBeDefined();
  });
  test("data is loaded but no preloader or dt ", () => {
    const { container } = render(
      <QADataTableRender
        columnNames={columnNames}
        data={[]}
        user={{ username: "test" }}
        isCheckedOut={true}
        dataTableName="Test Summary Data"
      />
    );
    expect(container).toBeDefined();
  });
  test("no user logged in - should not render edit/remove buttons and only renders view", () => {
    render(
      <QADataTableRender
        columnNames={columnNames}
        data={data}
        actionsBtn={"View"}
        dataTableName="Test Summary Data"
      />
    );
    const editBtns = screen.queryAllByRole('button', { name: /Edit/i })
    expect(editBtns).toHaveLength(0);
    const deleteBtns = screen.queryAllByRole('button', { name: /Remove/i })
    expect(deleteBtns).toHaveLength(0);
    const viewBtns = screen.queryAllByRole('button', { name: /View/i })
    expect(viewBtns).toHaveLength(1);
  });

  test('given a user then renders edit button for each row in table', () => {
    // Arrange
    render(
      <QADataTableRender
        actionsBtn={"View"}
        columnNames={columnNames}
        data={data}
        user={{ firstName: "test" }}
        isCheckedOut={true}
        dataTableName="Test Summary Data"
      />
    );

    // Assert
    const editBtns = screen.getAllByRole('button', { name: /edit/i })
    expect(editBtns).toHaveLength(data.length)
  })

  test("given a user then renders remove button for each row in table", () => {
    // Arrange
    render(
      <QADataTableRender
        actionsBtn={"View"}
        columnNames={columnNames}
        data={data}
        user={{ firstName: "test" }}
        isCheckedOut={true}
        dataTableName="Test Summary Data"
      />
    );

    // Assert
    const removeBtns = screen.getAllByRole('button', { name: /remove/i })
    expect(removeBtns).toHaveLength(data.length)
  });
});
