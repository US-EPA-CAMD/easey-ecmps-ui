// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";

// import userEvent from "@testing-library/user-event";
// import FilterComponent from "./ReactDataTablesFilter";
// import { mount, ReactWrapper } from 'enzyme';
// import { act } from 'react-dom/test-utils';
// let options = [];
// let data = [];
// let columns = [];
// let columnNames = [];

// describe("renders datatable search ", () => {
//   test("clicks search btn", () => {
//     const { container } = render(
//       <FilterComponent
//       filterText={'test'} onSearch={jest.fn()} title={'test'}
//       />
//     );
//     // const noData = screen.getByAltText("Please wait");
//     const input = container.querySelector("#txtSearchData")

//     fireEvent.keyDown(input,{keyCode:13 , key:"Enter"})
//     expect(input).toBeDefined();
//   });
// });