import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Layout from "../Layout/Layout";
import { render, fireEvent } from "@testing-library/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LeftNavigation from "./LeftNavigation";
// cannot use link outside router
const { container } = render(
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route
          path="/"
          exact
          component={() => (
            <LeftNavigation
              user={{ firstName: "test", lastName: "testlast" }}
            />
          )}
        />
      </Switch>
    </Layout>
  </BrowserRouter>
);
test("renders accesory links ", () => {
  const openmodal = container.querySelectorAll("#openModalBTN");
  for (var x of openmodal) {
    fireEvent.click(x);
  }
  expect(openmodal).not.toBeUndefined();
});
