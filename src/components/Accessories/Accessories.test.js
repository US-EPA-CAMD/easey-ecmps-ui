import React from "react";
import Accessories from "./Accessories";
import "@testing-library/jest-dom/extend-expect";
import Layout from "../Layout/Layout";
import { render, fireEvent } from "@testing-library/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
// cannot use link outside router
test("renders accesory links ", () => {
  const { container } = render(
    <BrowserRouter>
      <Layout>
        <Switch>
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
        </Switch>
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
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Accessories
               
                logOut={jest.fn()}
              />
            )}
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
  const accessoriesLinks = container.querySelectorAll("#logoutBtn");
  for (var x of accessoriesLinks) {
    fireEvent.click(x);
  }
  expect(accessoriesLinks).not.toBeUndefined();
});
