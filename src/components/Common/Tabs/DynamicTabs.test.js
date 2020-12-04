import React from "react";
import DynamicTabs from "./DynamicTabs";
import { render, fireEvent, screen } from "@testing-library/react";

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
  beforeEach(() => {
    render(
      <DynamicTabs
        tabsProps={[
          {
            title: "Welcome",
            component: <Welcome name="Addis" />,
          },
        ]}
      />
    );
  });
  test("renders the inital tab and its content", () => {
    const tabs = screen.getAllByRole("button");
    const initTabContent = screen.getByText("Hello, Addis");
    expect(tabs).toHaveLength(1);
    expect(initTabContent).not.toBeUndefined();
  });
  test("renders other tabs on a click event of Add Tab from with-in first tab component", () => {
    fireEvent.click(screen.getByText("Add Tab"));
    const tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(2);
  });
});
