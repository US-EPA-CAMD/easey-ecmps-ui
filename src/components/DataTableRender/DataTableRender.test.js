import React from "react";
import { render, screen ,getByRole} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTableRender from "./DataTableRender";

let options = [];
let data = [];
let columns = [];
beforeAll(() => {
  columns = [
    { name: "Parameter", selector: "col1", sortable: true },
    { name: "Methodology", selector: "col2", sortable: true },
    { name: "Substitute Data Approach", selector: "col3", sortable: true },
  ];

  data = [
    { col1: "HI", col2: "CALC", col3: null },
    { col1: "OP", col2: "EXP", col3: null },
    { col1: "HI", col2: "AD", col3: "SPTS" },
  ];
});
describe("renders datatable with all values ", () => {
  test("makes sure 3 rows of data are passed in + 1 for header +2 for rest of table", () => {
    const { container,queryByPlaceholderText  } = render(
      <DataTableRender
        sectionTitle="sectionTitle"
        tableTitle="tableTitle"
        button={true}
        columns={columns}
        data={data}
        user={{ username: "test" }}
        selectedRowHandler={jest.fn()}
        pagination={true}
        filter={true}
        // expandableRowComp={true}
        defaultSort={"col1"}
        expandableRows={true}
        headerStyling="headerStyling"
        tableStyling="tableStyling"
        componentStyling="componentStyling"
      />
    );
    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(6);

  });

});
