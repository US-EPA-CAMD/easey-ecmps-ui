import React from "react";
import { MOCK_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

export class Welcome extends React.Component {
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
        <a onClick={this.clickHandler}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              this.clickHandler();
            }
          }}>
          Add Tab
        </a>
      </div>
    );
  }
}

class GoodBye extends React.Component {
  render() {
    return <h1>Good-bye, {this.props.name}</h1>;
  }
}

export const getMockDynamicTabsProps = () => {
  const selectedConfig = {
    id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
    name: "1, 2, CS0AAN",
    locations: [{ id: "6", name: "1" }],
    active: true,
  };

  return {
    addFacility: jest.fn(),
    checkedOutLocations: [],
    currentTabIndex: 0,
    mostRecentlyCheckedInMonitorPlanId: "",
    removeFacility: jest.fn(),
    setActive: jest.fn(),
    setCheckout: jest.fn(),
    setCurrentTabIndex: jest.fn(),
    setMostRecentlyCheckedInMonitorPlanId: jest.fn(),
    tabsProps: () => ([
      {
        title: "Welcome ( test )",
        selectedConfig: selectedConfig,
      },
      {
        title: "Welcome ( test )",
      },
    ]),
    user: { firstName: "Addis" },
    workspaceSection: MOCK_STORE_NAME,
  }
}
