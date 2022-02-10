import React from "react";
import Layout from "../Layout/Layout";
import { render, screen } from "@testing-library/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LeftNavigation from "./LeftNavigation";

describe("Left Navigation links", () => {
  test("renders links correctly", () => {
    render(
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <LeftNavigation
                  user={true}
                />
              )}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  
    const homeLink = screen.getAllByText("Home");
    expect(homeLink).not.toBeUndefined();

    const wksLink = screen.getAllByText("Workspace");
    expect(wksLink).not.toBeUndefined();

    const mpLink = screen.getAllByText("Monitoring Plans");
    expect(mpLink).not.toBeUndefined();

    const qaLink = screen.getAllByText("QA & Certifications");
    expect(qaLink).not.toBeUndefined();

    const emLink = screen.getAllByText("Emissions");
    expect(emLink).not.toBeUndefined(); 

  });
});