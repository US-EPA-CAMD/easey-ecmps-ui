import React from "react";
import Tabs from "./Tabs";
import TabPane from "../TabPane/TabPane";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import * as mpApi from "../../utils/api/monitoringPlansApi";

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
    setCheckout={jest.fn()}
    workspaceSection={MONITORING_PLAN_STORE_NAME}
    setCurrentTabIndex={jest.fn()}
    currentTabIndex={0}
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
  beforeEach(() => {
    jest
      .spyOn(mpApi, "deleteCheckInMonitoringPlanConfiguration")
      .mockResolvedValue({});
    jest.spyOn(mpApi, "getCheckedOutLocations").mockResolvedValue({
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
    });
  });

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

  // FIXME: Need to figure out why 'Tab2 Content' is not being found.
  test.skip("renders the user selected tab", async () => {
    // verify the appropriate action was called
    let container;
    await act(async () => {
      let renderer = render(
        <Tabs
          dynamic={true}
          setActive={jest.fn()}
          removeTabs={jest.fn()}
          checkedOutLocations={testCheckedOutLocations}
          user={{ firstName: testFirstName }}
          setCheckout={jest.fn()}
          workspaceSection={MONITORING_PLAN_STORE_NAME}
          setCurrentTabIndex={jest.fn()}
          currentTabIndex={0}
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
      );
      container = renderer.container;
    });
    const btns = await screen.findAllByRole("button");
    fireEvent.click(btns[2]);
    const tab3Content = await screen.findByText("Tab2 Content");
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
});
