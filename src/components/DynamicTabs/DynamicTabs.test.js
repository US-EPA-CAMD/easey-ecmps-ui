import React from "react";
import { DynamicTabs,mapDispatchToProps  } from "./DynamicTabs";
import { render, fireEvent, screen } from "@testing-library/react";
// import {
//   addFacilityTab,
//   removeFacilityTab,
// } from "../../store/actions/dynamicFacilityTab";
// import { setActiveTab } from "../../store/actions/activeTab";

jest.mock('../../store/actions/dynamicFacilityTab');
import * as actions from '../../store/actions/dynamicFacilityTab';
class Welcome extends React.Component {
  clickHandler = () => {
    const selectedConfig = {
      id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
      name: "1, 2, CS0AAN",
      locations: [{ id: "6", name: "1" }],
      active: true,
    };
    this.props.addtabs([
      {
        title: "Good Bye ( test ) ",
        component: <GoodBye name="John" />,
        selectedConfig: selectedConfig,
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
  const selectedConfig = {
    id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
    name: "1, 2, CS0AAN",
    locations: [{ id: "6", name: "1" }],
    active: true,
  };
  const dynamicTabs = (
    <DynamicTabs
      addFacility={jest.fn()}
      removeFacility={jest.fn()}
      setActive={jest.fn()}
      tabsProps={[
        {
          title: "Welcome ( test )",
          component: <Welcome name="Addis" />,
          selectedConfig: selectedConfig,
        },
      ]}
    />
  );

  test("renders the inital tab and its content", () => {
    render(dynamicTabs);
    const tabs = screen.getAllByRole("button");
    const initTabContent = screen.getByText("Hello, Addis");
    expect(tabs).toHaveLength(1);
    expect(initTabContent).not.toBeUndefined();
  });
  test("renders other tabs on a click event of Add Tab until there's enough space in container width. Also removes the opened tab when close icon is clicked", () => {
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      return { width: 300 };
    };
    window.alert = jest.fn(() => ({}));
    const { container } = render(dynamicTabs);
    //add faciliites tab
    fireEvent.click(screen.getByText("Add Tab"));
    let tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(2);
    //second click to add tabs won't work since there's no space and the number of tabs should remain two
    fireEvent.click(screen.getByText("Add Tab"));
    tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(2);    
    //close the opened facilities tab
    const closeTabIcon = container.querySelector("#closeXBtnTab");
    fireEvent.click(closeTabIcon);
    tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(1);

  });

  test('mapDispatchToProps calls the appropriate action', async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const formData = [];
    // verify the appropriate action was called 
    actionProps.addFacility();
    expect(actions.addFacilityTab).toHaveBeenCalled(); 

    actionProps.removeFacility();
    expect(actions.removeFacilityTab).toHaveBeenCalled(); 

    actionProps.setActive();
    
    
  });
});
