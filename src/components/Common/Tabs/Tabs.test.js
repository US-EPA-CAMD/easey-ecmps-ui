import React from "react";
import Tabs from "./Tabs";
import TabPane from "./TabPane";
import { render, fireEvent, screen } from "@testing-library/react";

const TabsUsage = () => (
  <Tabs initTab="Tab1" setResizeObserver={jest.fn(() => ({}))}>
    <TabPane title="Tab1">Tab1 Content</TabPane>
    <TabPane title="Tab2">Tab2 Content</TabPane>
    <TabPane title="Tab3">
      <p>Tab3 Content</p>
    </TabPane>
    <TabPane title="Tab4">
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
    render(<TabsUsage />);
    fireEvent.click(screen.getByRole("button", { name: "Tab3" }));
    const tab3Content = screen.getByText("Tab3 Content");
    expect(tab3Content).not.toBeUndefined();
  });
});
