import React from "react";



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

export const getMockDynamicTabsProps = () => {
  const selectedConfig = {
    id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
    name: "1, 2, CS0AAN",
    locations: [{ id: "6", name: "1" }],
    active: true,
  };

  return {
    addFacility: jest.fn(),
    removeFacility: jest.fn(),
    setActive: jest.fn(),
    checkedOutLocations: [],
    user: { firstName: "test" },
    setMostRecentlyCheckedInMonitorPlanId: jest.fn(),
    mostRecentlyCheckedInMonitorPlanId: "",
    tabsProps: [
      {
        title: "Welcome ( test )",
        component: <Welcome name="Addis" />,
        selectedConfig: selectedConfig,
      },
      {
        title: "Welcome ( test )",
        component: <Welcome name="Addis" />,
      },
    ],
    setCurrentTabIndex: jest.fn(),
    currentTabIndex: 0,
    setCheckout: jest.fn(),
  }
}