import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Layout from "../Layout/Layout";
import { render, fireEvent } from "@testing-library/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LeftNavigation from "./LeftNavigation";
// cannot use link outside router

describe("usePageTracking", () => {
  let location;
  let mockLocation = new URL("https://example.com/");

  beforeEach(() => {
    location = window.location;
    mockLocation.replace = jest.fn();
    // You might need to mock other functions as well
    location.assign = jest.fn();
    location.reload = jest.fn();
    delete window.location;
    window.location = mockLocation;
  });

  afterEach(() => {
    window.location = location;
    mockLocation = new URL("https://example.com/workspace");
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
                <LeftNavigation
                  user={{ firstName: "test", lastName: "testlast" }}
                />
              )}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
    const header = container.querySelector("#MonitoringPlans");
    // for (var x of header) {
    fireEvent.click(header);
    // }
    expect(header).not.toBeUndefined();
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
                <LeftNavigation
                // user={{ firstName: "test", lastName: "testlast" }}
                />
              )}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
    const openmodal = container.querySelectorAll("#openModalBTN");
    for (var x of openmodal) {
      fireEvent.click(x);
    }
    expect(openmodal).not.toBeUndefined();
  });
});
