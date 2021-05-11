import React, { useMemo } from "react";
import UswdsTable from "../../UswdsTable/UswdsTable";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

describe("testing generic uswds table component with pagination", () => {
  let columns = [],
    columnsGrouping = [],
    data = [];
  const events = {};
  const UswdsTableTest = ({ grouping, paginate }) => {
    data = useMemo(
      () => [
        {
          col1: "1",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "2",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "3",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "4",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "5",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "6",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "7",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "8",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "9",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "10",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "11",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "12",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "13",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "14",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "15",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "16",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "17",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "18",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "19",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "20",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "21",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "22",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "23",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "24",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "25",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "26",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "27",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "28",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "29",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "30",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "31",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "32",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "33",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "34",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "35",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "36",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "37",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "38",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "39",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "41",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "42",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "43",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "44",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "45",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "46",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "47",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "48",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "49",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "50",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "1",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "2",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "3",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "4",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "5",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "6",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "7",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "8",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "9",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "10",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "11",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "12",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "13",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "14",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "15",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "16",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "17",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "18",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "19",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "20",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "21",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "22",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "23",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "24",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "25",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "26",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "27",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "28",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "29",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "30",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "31",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "32",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "33",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "34",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "35",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "36",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "37",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "38",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "39",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "41",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "42",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "43",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "44",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "45",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "46",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "47",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "48",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "49",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "100",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "101",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "102",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "1",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "2",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "3",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "1",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "2",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "3",
          col2: "you want",
          col3: "in here",
        },
        {
          col1: "1",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "2",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "3",
          col2: "you want",
          col3: "in here",
        },
      ],
      []
    );
    columns = useMemo(
      () => [
        {
          Header: "Column 1",
          accessor: "col1",
        },
        {
          Header: "Column 2",
          accessor: "col2",
        },
        {
          Header: "Column 3",
          accessor: "col3",
        },
      ],
      []
    );
    columnsGrouping = useMemo(
      () => [
        {
          Header: "Column 1",
          accessor: "col1",
        },
        {
          Header: "Column 2",
          columns: [
            {
              Header: "Column 2:1",
              accessor: "col2",
            },
            {
              Header: "Column 2:2",
              accessor: "col3",
            },
          ],
        },
      ],
      []
    );
    return (
      <UswdsTable
        columns={grouping ? columnsGrouping : columns}
        data={data}
        paginate={paginate}
        showEntries={[10, 25, 50]}
      />
    );
  };

  test("paginate tabs are enabled", () => {
    const { container } = render(<UswdsTableTest grouping={false} paginate />);
    const tab = container.querySelectorAll(".paginationTabs");
    expect(tab.length).toEqual(1);
  });
  test("pagination is disabled ", () => {
    const { container } = render(
      <UswdsTableTest grouping={false} paginate={false} />
    );

    const tab = container.querySelectorAll(".paginationTabs");
    expect(tab.length).toEqual(0);
  });

  test("PAgination bar with previous, 1, 2, next tab", () => {
    const { container } = render(<UswdsTableTest grouping={false} paginate />);
    const paginationBar = container.querySelectorAll("ul li");
    expect(paginationBar.length).toEqual(7);
  });

  test("selects 250 option and tests total pages, total tabs should be previous, 1, next  ", () => {
    const { container, getByTestId } = render(
      <UswdsTableTest grouping={false} paginate />
    );
    userEvent.selectOptions(getByTestId("select-option"), ["250"]);
    const paginationBar = container.querySelectorAll("ul li");
    const paginationExpection = 7;
    expect(paginationBar.length).toEqual(paginationExpection);
  });

  test("test total rows by default is 100 ", () => {
    const { container } = render(<UswdsTableTest grouping={true} paginate />);
    const tableRecords = container.querySelectorAll("tbody tr");
    expect(tableRecords.length).toEqual(10);
  });

  test("selects 2nd page and tests total rows that should show  ", () => {
    const { container } = render(<UswdsTableTest grouping={true} paginate />);
    const nodeList = container.querySelectorAll("li button");
    nodeList[3].focus();
    fireEvent.keyPress(nodeList[3], { key: "Enter", code: 13, charCode: 13 });
    fireEvent.click(nodeList[2]);

    fireEvent.click(nodeList[nodeList.length - 1]);
    fireEvent.click(nodeList[nodeList.length - 1]);
    fireEvent.click(nodeList[nodeList.length - 1]);
    fireEvent.click(nodeList[nodeList.length - 1]);
    fireEvent.click(nodeList[nodeList.length - 1]);
    fireEvent.click(nodeList[nodeList.length - 1]);
    fireEvent.click(nodeList[nodeList.length - 1]);
    fireEvent.click(nodeList[0]);
    fireEvent.click(nodeList[0]);
    fireEvent.click(nodeList[0]);
    const tableRecords = container.querySelectorAll("tbody tr");
    expect(tableRecords.length).toEqual(10);
    fireEvent.click(nodeList[0]);
    const updatedRecords = container.querySelectorAll("tbody tr");
    expect(updatedRecords.length).toEqual(10);
    fireEvent.click(nodeList[nodeList.length - 1]);
    const updatedRecords2 = container.querySelectorAll("tbody tr");
    expect(updatedRecords2.length).toEqual(10);
  });

  test("testing enter button 508 ", () => {
    jest
      .spyOn(window, "addEventListener")
      .mockImplementation((event, handle) => {
        events[event] = handle;
      });
    jest
      .spyOn(window, "removeEventListener")
      .mockImplementation((event, handle) => {
        events[event] = undefined;
      });
    const { container } = render(<UswdsTableTest grouping={true} paginate />);
    const nodeList = container.querySelectorAll("li button");

    const e = {
      keyCode: 13,
    };
    nodeList[1].focus();
    events["keydown"](e);
    nodeList[0].focus();
    events["keydown"](e);
  });


});
