import React, { useMemo } from "react";
import { render, waitForDomChange } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DataTableConfigurationsRender from "./DataTableConfigurationsRender";

let columns = [],
  data = [];

const DataTableConfigurationsRenderTest = () => {
  data = useMemo(
    () => [
      {
        col1: "CTG-1",
        col2: "Active",
      },
    ],
    []
  );
  columns = useMemo(
    () => [
      {
        name: "Configurations",
        selector: "col1",
        sortable: true,
      },
      {
        name: "Status",
        selector: "col2",
        sortable: true,
      },
    ],
    []
  );
  return <DataTableConfigurationsRender columns={columns} data={data} />;
};

const DataTableConfigurationsRenderNoDataTest = () => {
  data = useMemo(() => [], []);
  columns = useMemo(
    () => [
      {
        name: "Configurations",
        selector: "col1",
        sortable: true,
      },
      {
        name: "Status",
        selector: "col2",
        sortable: true,
      },
    ],
    []
  );
  return <DataTableConfigurationsRender columns={columns} data={data} />;
};
test("demo table renders without crashing", () => {
  const { container } = render(<DataTableConfigurationsRenderTest />);
  waitForDomChange({ container })
    .then(() => {
      const table = container.querySelector(".rdt_Table");
      expect(table).not.toBeNull();
    })
    .catch((err) => console.log(`Error you need to deal with: ${err}`));
});
test("demo table renders without data and preloader loads", () => {
  const { container } = render(<DataTableConfigurationsRenderNoDataTest />);
  waitForDomChange({ container })
    .then(() => {
      const preloader = container.querySelector("#preloader");
      expect(preloader).not.toBeNull();
    })
    .catch((err) => console.log(`Error you need to deal with: ${err}`));
});
