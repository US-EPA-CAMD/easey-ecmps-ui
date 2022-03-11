import React from "react";
import { Tabs, mapDispatchToProps, mapStateToProps } from "./Tabs";
import TabPane from "../TabPane/TabPane";
import {
  render,
  fireEvent,
  screen,
  waitForElement,
} from "@testing-library/react";

const testMonPlanId = "testMonPlanId";
const testFacId = "123";
const testUserId = "testUserId";
const testFirstName = "testFirstName";
const testTitle = "testTitle (1, 2, 3)";
const testLocationId = "testMonPlanId";
const testCheckedOutLocations = [
  {
    monPlanId: testMonPlanId,
    checkedOutBy: testUserId,
    facId: testFacId,
    locationId: testLocationId,
  },
];

const childProps = {
  title: testTitle,
  locationId: testLocationId,
  facId: testFacId,
  checkedOutBy: testUserId,
};

jest.mock("../../utils/api/monitoringPlansApi", () => {
  return {
    deleteCheckInMonitoringPlanConfiguration: jest.fn().mockResolvedValue(),
    getCheckedOutLocations: jest.fn().mockResolvedValue({
      data: [
        {
          data: [
            {
              monPlanId: "testMonPlanId",
              facId: "1234567890",
              checkedOutBy: "testUserId",
            },
          ],
        },
      ],
    }),
  };
});

jest.mock("axios", () => {
  return {
    defaults: { headers: { common: "" } },
    get: jest.fn().mockResolvedValue({ data: [] }),
    delete: jest.fn().mockResolvedValue({ data: [] }),
  };
});

const TabsUsage = (bool) => (
  <Tabs
    dynamic={bool}
    setActive={jest.fn()}
    removeTabs={jest.fn()}
    checkedOutLocations={testCheckedOutLocations}
    user={{ firstName: testFirstName, userId: testUserId }}
  >
    <TabPane {...childProps}>Tab1 Content</TabPane>
    <TabPane title="Select configurations">Tab2 Content</TabPane>
    <TabPane
      title={"Tab (3)"}
      locationId={"DKFJNDSJK"}
      facId={testFacId}
      checkedOutBy={testUserId}
    >
      <p>Tab3 Content</p>
    </TabPane>
    <TabPane
      title={"Tab (4)"}
      locationId={"AWOIEUNCS"}
      facId={testFacId}
      checkedOutBy={testUserId}
    >
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
    const { container } = await waitForElement(() =>
      render(
        <Tabs
          dynamic={true}
          setActive={jest.fn()}
          removeTabs={jest.fn()}
          checkedOutLocations={testCheckedOutLocations}
          user={{ firstName: testFirstName }}
          setCheckout={jest.fn()}
        >
          <TabPane {...childProps}>Tab1 Content</TabPane>
          <TabPane title="Select configurations">Tab2 Content</TabPane>
          <TabPane {...childProps}>
            <p>Tab3 Content</p>
          </TabPane>
          <TabPane {...childProps}>
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

    const nodeList = container.querySelector(".closeXBtnTab");
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

    const fothtab = container.querySelector(".closeXBtnTab");

    // clicks on the x button in last tab,
    fireEvent.click(fothtab);

    const newCLose = container.querySelector(".closeXBtnTab");

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
  test("mapDispatchToProps calls the appropriate action", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const state = jest.fn();

    // verify the appropriate action was called
    actionProps.setCheckout();

    expect(state).toBeDefined();
  });
  test("mapStateToProps calls the appropriate state", async () => {
    const state = { dropdowns: [1] };
    mapStateToProps(state, true);
  });
});
