import React, { useState } from "react";
import Tabs from "./Tabs";
import TabPane from "../TabPane/TabPane";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import { Tab } from "@material-ui/core";

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
};

jest.mock("axios", () => {
  return {
    defaults: { headers: { common: "" } },
    get: jest.fn().mockResolvedValue({ data: [] }),
    delete: jest.fn().mockResolvedValue({ data: [] }),
  };
});

const InteractiveTabs = ({ panes }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  return (
    <Tabs
      dynamic={true}
      removeTabs={jest.fn()}
      checkedOutLocations={testCheckedOutLocations}
      user={{ firstName: testFirstName }}
      setCheckout={jest.fn()}
      workspaceSection={MONITORING_PLAN_STORE_NAME}
      setCurrentTabIndex={setCurrentTabIndex}
      currentTabIndex={currentTabIndex}
      panes={panes}
    />
  );
};

const TabsUsage = (bool) => (
  <Tabs
    dynamic={bool}
    removeTabs={jest.fn()}
    checkedOutLocations={testCheckedOutLocations}
    user={{ firstName: testFirstName, userId: testUserId }}
    setCheckout={jest.fn()}
    workspaceSection={MONITORING_PLAN_STORE_NAME}
    setCurrentTabIndex={jest.fn()}
    currentTabIndex={0}
    panes={[
      {
        title: "Select configurations",
        content: <>Select Configurations</>,
      },
      {
        ...childProps,
        content: <>Tab2 Content</>,
      },
      {
        ...childProps,
        title: "Tab (3)",
        content: <>Tab3 Content</>,
        locationId: "DKFJNDSJK",
      },
      {
        ...childProps,
        title: "Tab (4)",
        content: (
          <>
            <p>Tab4 Content 1</p>
            <p>Tab4 Content 2</p>
          </>
        ),
        locationId: "AWOIEUNCS",
      },
    ]}
  />
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
    const initTabContent = screen.getByText("Select Configurations");
    expect(initTabContent).not.toBeUndefined();
  });

  // FIXME: Need to figure out why 'Tab2 Content' is not being found.
  test("renders the user selected tab", async () => {
    // verify the appropriate action was called
    let container;
    const panes = [
      {
        ...childProps,
        title: "Select configurations",
        content: <>Select Configurations</>,
      },
      {
        ...childProps,
        content: <>Tab2 Content</>,
        title: "Tab (2)",
      },
      {
        ...childProps,
        content: <>Tab3 Content</>,
      },
      {
        ...childProps,
        content: (
          <>
            <p>Tab4 Content 1</p>
            <p>Tab4 Content 2</p>
          </>
        ),
        title: "Tab (4)",
      },
    ];
    await act(async () => {
      let renderer = render(<InteractiveTabs panes={panes} />);
      container = renderer.container;
    });
    const findTabButton = async (paneNumber) => {
      const pane = panes[paneNumber - 1];
      const tabFacility = pane.title.split("(")[0].trim();
      const tabLocations = pane.title.match(/\((.*)\)/)?.[1];
      const isCheckedOut = testCheckedOutLocations.some(
        (loc) => pane.locationId === loc.monPlanId
      );
      const name = `open ${tabFacility} ${
        isCheckedOut ? `(locked) ${tabLocations}` : `(${tabLocations})`
      } tab`;
      return screen.findByRole("button", {
        name,
      });
    };
    const tab2Button = await findTabButton(2);
    fireEvent.click(tab2Button);
    await waitFor(
      async () => {
        const tab2Content = await screen.findByText("Tab2 Content");
        expect(tab2Content).not.toBeUndefined();
      },
      { timeout: 3000 }
    );

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
    const tab3Button = await findTabButton(3);
    tab3Button.focus();
    fireEvent.keyPress(tab3Button, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });
    fireEvent.click(tab3Button);

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
