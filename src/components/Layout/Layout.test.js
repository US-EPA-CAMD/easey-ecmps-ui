import React from "react";
import Layout from "./Layout";
import { render, screen, fireEvent, wait } from "@testing-library/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => () => {});

jest.mock("../../utils/api/contentApi", () => {
  const testContent = {
    data: {
      heading: "Test Heading:",
      message: "Test message.",
      enabled: "true",
    },
  };
  return {
    getContent: jest.fn().mockResolvedValue(testContent),
  };
});

const childComponent = () => {
  return <div>Welcome!</div>;
};
describe("tests Layout component", () => {
  it(" should render a routed child component between header and footer", async () => {
    await wait(() => {
      // render Layout component with a sample child div element
      const layout = render(
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/" exact component={childComponent} />
            </Switch>
          </Layout>
        </BrowserRouter>
      );

      const errorMsgCloseBtn = layout.container.querySelector(
        ".MuiSvgIcon-root.float-right.cursor-pointer"
      );

      // click error message close button
      userEvent.click(errorMsgCloseBtn);
      const errorMsgBanner = layout.container.querySelector("#appErrorMessage");

      // fire keyPress event (Enter) on error message close button
      const child = errorMsgBanner.children[1];
      fireEvent.keyPress(child, {
        key: "Enter",
        code: 13,
        charCode: 13,
      });

      // check that the child component was rendered
      const layoutContent = screen.getByText("Welcome!");
      expect(layoutContent).not.toBeUndefined();
    });
  });
});
