import React from "react";
import Accessories from "./Accessories";
import "@testing-library/jest-dom/extend-expect";
import Layout from "../Layout/Layout";
import { render, screen } from "@testing-library/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
render(
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" exact component={Accessories} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
test("renders accesory links ", () => {
  const accessoriesLinks = screen.queryAllByRole("accessoryLink");
  expect(accessoriesLinks).not.toBeUndefined();
});
