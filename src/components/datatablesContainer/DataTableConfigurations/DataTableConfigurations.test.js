import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTableConfigurations } from "./DataTableConfigurations";

//testing redux connected component to mimic props passed as argument
function componentRenderer(args) {
  const defualtProps = {
    monitoringPlans: [
      [
        "9",
        [
          {
            id: "MDC-B4147730E09A4AEFBCFE88A76A60C840",
            name: "CTG-1",
            locations: [
              {
                id: "5930",
                name: "CTG-1",
                type: "Unit",
                active: true,
              },
            ],
            active: true,
          },
        ],
      ],
    ],
    loadMonitoringPlansData: jest.fn(),
    loading: false,
    user: args,
    data: {
      col1: "9",
      col2: "Copper Station",
      col3: "TX",
      disabled: false,
      expanded: false,
    },
  };

  const props = { ...defualtProps };
  return render(<DataTableConfigurations {...props} />);
}
function componentRendererNoData(args) {
  const defualtProps = {
    monitoringPlans: [],
    loadMonitoringPlansData: jest.fn(),
    loading: true,
    user: false,
    data: {},
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableConfigurations {...props} />);
}

test("testing configuration dropdown table user not logged in, 1 btns, open and filter ", () => {
  const { container } = componentRenderer(false);
  const buttons = container.querySelectorAll("button");
  expect(buttons.length).toEqual(1);
});

test("testing configuration dropdown table user not logged in, 2 btns, open,open and checkout ", () => {
  const { container } = componentRenderer(true);
  const buttons = container.querySelectorAll("button");
  expect(buttons.length).toEqual(2);
});
test("testing redux connected data-table component renders no records", () => {
  const { container } = componentRendererNoData();
  expect(
    screen.getByText("Loading list of configurations...")
  ).toBeInTheDocument();
});
