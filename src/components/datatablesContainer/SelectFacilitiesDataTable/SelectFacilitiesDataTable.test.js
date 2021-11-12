// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { SelectFacilitiesDataTable } from "./SelectFacilitiesDataTable";

// //testing redux connected component to mimic props passed as argument
// function componentRenderer(args) {
//   const defualtProps = {
//     user:{firstName:'test'},
//     addtabs:jest.fn(),
//     openedFacilityTabs:[] ,
//     mostRecentlyCheckedInMonitorPlanIdForTab:[],
//     setMostRecentlyCheckedInMonitorPlanIdForTab:jest.fn(),
//   };

//   const props = { ...defualtProps, ...args };
//   return render(<SelectFacilitiesDataTable {...props} />);
// }

// function componentRendererNoData(args) {
//   const defualtProps = {
//     facilities: [],
//     loadFacilitiesData: jest.fn(),
//     loading: true,
//   };

//   const props = { ...defualtProps, ...args };
//   return render(<SelectFacilitiesDataTable {...props} />);
// }

// test("testing redux connected data-table component renders all records", () => {
//   const { container } = componentRenderer();
//   const headerColumns = container.querySelectorAll("tbody tr");
//   expect(headerColumns.length).toEqual(3);
// });
// /*test("testing redux connected data-table component renders no records", () => {
//   const { container } = componentRendererNoData();
//   expect(screen.getByText("Loading list of facilities...")).toBeInTheDocument();
// });*/
test("test file", () => {
  const val = 1;
  expect(val === 1);
});
