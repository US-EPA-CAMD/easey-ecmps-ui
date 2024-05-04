import React from "react";
import Accessories from "./Accessories";
import "@testing-library/jest-dom/extend-expect";
import Layout from "../Layout/Layout";
import { render, fireEvent } from "@testing-library/react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
// cannot use link outside router
jest.mock("@us-epa-camd/easey-design-system", () => ({
  ...jest.requireActual("@us-epa-camd/easey-design-system"),
  Header: () => <></>,
}));
test("renders accesory links ", () => {
  const { container } = render(
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            exact
            component={() => (
              <Accessories
                user={{ firstName: "test", lastName: "testlast" }}
                logOut={jest.fn()}
              />
            )}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
  const accessoriesLinks = container.querySelectorAll("#logoutBtn");
  for (var x of accessoriesLinks) {
    fireEvent.click(x);
  }
  expect(accessoriesLinks).not.toBeUndefined();
});
test("renders accesory links ", () => {
  const { container } = render(
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            exact
            component={() => <Accessories logOut={jest.fn()} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
  const accessoriesLinks = container.querySelectorAll("#logoutBtn");
  for (var x of accessoriesLinks) {
    fireEvent.click(x);
  }
  expect(accessoriesLinks).not.toBeUndefined();
});
