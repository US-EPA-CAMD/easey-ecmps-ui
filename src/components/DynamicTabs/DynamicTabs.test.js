import React from "react";
import {DynamicTabs} from "./DynamicTabs";
import { render, fireEvent, screen } from "@testing-library/react";
import {addFacilityTab, removeFacilityTab} from "../../store/actions/dynamicFacilityTab";

class Welcome extends React.Component {
  clickHandler = () => {
    this.props.addTabs([
      {
        title: "Good Bye",
        component: <GoodBye name="John" />,
      },
    ]);
  };
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <a onClick={this.clickHandler}>Add Tab</a>
      </div>
    );
  }
}

class GoodBye extends React.Component {
  render() {
    return <h1>Good-bye, {this.props.name}</h1>;
  }
}

describe("testing a reusable Dynamic Tabs component", () => {
  const dynamicTabs =
  <DynamicTabs
    addFacility={addFacilityTab}
    removeFacility={removeFacilityTab}
    tabsProps={[
      {
        title: "Welcome",
        component: <Welcome name="Addis" />,
      },
    ]}
  />

  test("renders the inital tab and its content", () => {
    render(dynamicTabs);
    const tabs = screen.getAllByRole("button");
    const initTabContent = screen.getByText("Hello, Addis");
    expect(tabs).toHaveLength(1);
    expect(initTabContent).not.toBeUndefined();
  });
  test("renders other tabs on a click event of Add Tab until there's enough space in container width. Also removes the opened tab when close icon is clicked", () => {
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      return {width: 300}
    }
    window.alert = jest.fn(() => ({}));
    const {container} = render(dynamicTabs);
    //add faciliites tab
    fireEvent.click(screen.getByText("Add Tab"));
    let tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(2);
    //second click to add tabs won't work since there's no space and the number of tabs should remain two
    fireEvent.click(screen.getByText("Add Tab"));
    tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(2);
    //close the opened facilities tab
    const closeTabIcon = container.querySelector(".close-icon");
    fireEvent.click(closeTabIcon);
    tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(1);
  });
});
