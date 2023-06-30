import React from "react";
import Accessories from "./Accessories";
import "@testing-library/jest-dom/extend-expect";
import Layout from "../Layout/Layout";
import { render, fireEvent } from "@testing-library/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

jest.mock("@us-epa-camd/easey-design-system", () => ({
  ...jest.requireActual("@us-epa-camd/easey-design-system"),
  Header: () => <></>,
}));

const renderWithRouter = (user) => {
  return render(
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Accessories user={user} logOut={jest.fn()} />}
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

describe("Accessories Component", () => {
  test("renders logout button when user is logged in ", () => {
    const { getByTestId } = renderWithRouter({ firstName: "test", lastName: "testlast" });
    const logoutButton = getByTestId("logoutBtn");
    fireEvent.click(logoutButton);
    expect(logoutButton).toBeInTheDocument();
  });

  test("does not render logout button when user is not logged in ", () => {
    const { queryByTestId } = renderWithRouter();
    const logoutButton = queryByTestId("logoutBtn");
    expect(logoutButton).not.toBeInTheDocument();
  });
});
