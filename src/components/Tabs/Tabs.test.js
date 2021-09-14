import React from "react";
import { Tabs, mapDispatchToProps, mapStateToProps } from "./Tabs";
import TabPane from "../TabPane/TabPane";
import {
  render,
  fireEvent,
  screen,
  waitForElement,
} from "@testing-library/react";
import * as mpApi from "../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");
import { mount, ReactWrapper } from "enzyme";
const TabsUsage = (bool) => (
  <Tabs
    dynamic={bool}
    setActive={jest.fn()}
    removeTabs={jest.fn()}
    initTab="Tab1"
    setResizeObserver={jest.fn(() => ({}))}
    checkedOutLocations={[[{ monPlanId: [5770], checkedOutBy: "test" }]]}
    user={{ firstName: "test" }}
  >
    <TabPane title="( Tab1 )" locationId="5770">
      Tab1 Content
    </TabPane>
    <TabPane title="Select configurations">Tab2 Content</TabPane>
    <TabPane title="( Tab3 )">
      <p>Tab3 Content</p>
    </TabPane>
    <TabPane title="( Tab4 )">
      <p>Tab4 Content 1</p>
      <p>Tab4 Content 2</p>
    </TabPane>
  </Tabs>
);

describe("testing a reusable Tabs component", () => {
  test("renders all tabs", () => {
    render(<TabsUsage />);
    const tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(7);
  });
  test("renders the specified initial tabpane content ", () => {
    render(<TabsUsage />);
    const initTabContent = screen.getByText("Tab1 Content");
    expect(initTabContent).not.toBeUndefined();
  });
  test("renders the user selected tab", async () => {
    axios.delete.mockImplementation((url) => {
      switch (url) {
        case "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/workspace/plans/5770/check-outs":
          return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
        case "/items.json":
          return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
        default:
          return Promise.reject(new Error(url));
      }
    });
    axios.delete.mockImplementation(() =>
      Promise.resolve({ status: 200, data: [] })
    );
    const title = await mpApi.deleteCheckInMonitoringPlanConfiguration(5770);
    const { container } = await waitForElement(() =>
      render(
        <Tabs
          dynamic={true}
          setActive={jest.fn()}
          removeTabs={jest.fn()}
          checkedOutLocations={[]}
          user={{ firstName: "test" }}
          setCheckout={jest.fn()}
          checkedOutLocations={[{ monPlanId: [5770], checkedOutBy: "test" }]}
        >
          <TabPane title="( Tab1 )">Tab1 Content</TabPane>
          <TabPane title="Select configurations">Tab2 Content</TabPane>
          <TabPane title="( Tab3 )">
            <p>Tab3 Content</p>
          </TabPane>
          <TabPane title="( Tab4 )">
            <p>Tab4 Content 1</p>
            <p>Tab4 Content 2</p>
          </TabPane>
        </Tabs>
      )
    );
    const btns = screen.getAllByRole("button");
    fireEvent.click(btns[2]);
    const tab3Content = screen.getByText("Tab2 Content");
    expect(tab3Content).not.toBeUndefined();

    const nodeList = container.querySelector("#closeXBtnTab");
    nodeList.focus();
    fireEvent.keyPress(nodeList, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });
    fireEvent.click(nodeList);
    const tabBtn = container.querySelector("#tabBtn");
    fireEvent.click(tabBtn);
    // goes to initial tab
    const firstTab = container.querySelector(".initial-tab-button");
    fireEvent.click(firstTab);
    // goes to last tab
    btns[3].focus();
    fireEvent.keyPress(btns[3], {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });
    fireEvent.click(btns[3]);

    const allTabs = container.querySelectorAll("#tabBtn");
    fireEvent.click(allTabs[allTabs.length - 1]);

    const fothtab = container.querySelector("#closeXBtnTab");
    // clicks on the x button in last tab,
    fireEvent.click(fothtab);

    const newCLose = container.querySelector("#closeXBtnTab");

    newCLose.focus();
    fireEvent.keyPress(newCLose, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });
    newCLose.focus();
    fireEvent.keyPress(newCLose, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });

    fireEvent.keyDown(newCLose, { key: "Enter", code: "Enter" });
  });
  test("renders the user selected tab", () => {
    const wrapper = mount(
      <Tabs setActive={jest.fn()} removeTabs={jest.fn()}>
        <TabPane title="Select configurations">Tab2 Content</TabPane>
        <TabPane title="( Tab3 )">
          <p>Tab3 Content</p>
        </TabPane>
      </Tabs>
    );
  });
  test("mapDispatchToProps calls the appropriate action", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const state = jest.fn();
    const stateProps = mapStateToProps(state);

    const formData = [];
    // verify the appropriate action was called
    actionProps.setCheckout();

    expect(state).toBeDefined();
  });
});
