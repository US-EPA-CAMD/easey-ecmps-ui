import React from "react";
import Tabs from "./Tabs";
import TabPane from "../TabPane/TabPane";
import { render, fireEvent, screen } from "@testing-library/react";

const TabsUsage = (bool) => (
  <Tabs
    dynamic={bool}
    setActive={jest.fn()}
    removeTabs={jest.fn()}
    initTab="Tab1"
    setResizeObserver={jest.fn(() => ({}))}
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
);

describe("testing a reusable Tabs component", () => {
  test("renders all tabs", () => {
    render(<TabsUsage />);
    const tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(4);
  });
  test("renders the specified initial tabpane content ", () => {
    render(<TabsUsage />);
    const initTabContent = screen.getByText("Tab1 Content");
    expect(initTabContent).not.toBeUndefined();
  });
  test("renders the user selected tab", () => {
    const { container } = render(
      <Tabs
        dynamic={true}
        setActive={jest.fn()}
        removeTabs={jest.fn()}
        initTab="Tab1"
        setResizeObserver={jest.fn(() => ({}))}
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
    );
    const btns = screen.getAllByRole("button");
    fireEvent.click(btns[2]);
    const tab3Content = screen.getByText("Tab3 Content");
    expect(tab3Content).not.toBeUndefined();

    const nodeList = container.querySelector("#closeXBtnTab");
    fireEvent.keyDown(nodeList, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });

    // goes to initial tab
    const firstTab = container.querySelector(".initial-tab-button");
    fireEvent.click(firstTab);
    // goes to last tab
    fireEvent.keyPress(btns[3], {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });

    const fothtab = container.querySelector("#closeXBtnTab");
    // clicks on the x button in last tab,
    fireEvent.click(fothtab);
    fireEvent.keyPress(fothtab, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });
  });
});
