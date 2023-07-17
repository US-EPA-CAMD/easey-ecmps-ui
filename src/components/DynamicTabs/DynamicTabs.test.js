import React from "react";
import {
  DynamicTabs,
  mapDispatchToProps,
} from "./DynamicTabs";
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as actions from "../../store/actions/dynamicFacilityTab";
import configureStore from "../../store/configureStore.dev";
import { Provider } from "react-redux";
import { getMockDynamicTabsProps } from "./mocks";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

jest.mock("../../store/actions/dynamicFacilityTab");

const store = configureStore();

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

// const Welcome = ({ name, addTabs }) => {
//   const clickHandler = () => {
//     const selectedConfig = {
//       id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
//       name: "1, 2, CS0AAN",
//       locations: [{ id: "6", name: "1" }],
//       active: true,
//     };
//     addTabs([
//       {
//         title: "Good Bye ( test ) ",
//         component: <GoodBye name="John" />,
//         selectedConfig: selectedConfig,
//       },
//     ]);
//   };
//   return (
//     <div>
//       <h1>Hello, {name}</h1>
//       <button onClick={clickHandler}>Add Tab</button>
//     </div>
//   )
// }

class GoodBye extends React.Component {
  render() {
    return <h1>Good-bye, {this.props.name}</h1>;
  }
}

describe("testing a reusable Dynamic Tabs component", () => {

  test("renders the inital tab and its content", async () => {
    // render(<Provider store={store}>{dynamicTabs}</Provider>);
    const dynamicTabs = <DynamicTabs {...getMockDynamicTabsProps()} />

    await act(async () => {
      render(
        <Provider store={store}>
          {dynamicTabs}
        </Provider>
      );
    })

    const tabs = screen.getAllByRole("button");
    const initTabContent = screen.getByText("Hello, Addis");
    expect(tabs).toHaveLength(4);
    expect(initTabContent).not.toBeUndefined();
  });

  test.skip("renders workspace section monitoring plan", async () => {
    const dynamicTabs = <DynamicTabs {...getMockDynamicTabsProps()} workspaceSection={MONITORING_PLAN_STORE_NAME} />
    await act(async () => {
      render(
        <Provider store={store}>
          {dynamicTabs}
        </Provider>
      );
    })

    const tabs = screen.getAllByRole("button");
    const initTabContent = screen.getByText("Hello, Addis");
    expect(tabs).toHaveLength(4);
    expect(initTabContent).not.toBeUndefined();
  });

  test("renders other tabs on a click event of Add Tab until there's enough space in container width. Also removes the opened tab when close icon is clicked", async () => {
    const dynamicTabs = <DynamicTabs {...getMockDynamicTabsProps()} />
    await act(async () => {
      render(
        <Provider store={store}>
          {dynamicTabs}
        </Provider>
      );
    })

    //add faciliites tab
    fireEvent.click(screen.getByText("Add Tab"));
    let tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(6);

    //second click to add tabs won't work since there's no space and the number of tabs should remain two
    const addTabBtn = screen.getByText('Add Tab')
    await act(() => addTabBtn.click())

    tabs = screen.getAllByRole("button");
    expect(tabs).toHaveLength(6);
    //close the opened facilities tab
    const closeTabIcons = screen.getAllByTestId('closeXBtnTab')
    expect(closeTabIcons).toHaveLength(3);
    fireEvent.click(closeTabIcons[1]);


    screen.getAllByRole("button");
    expect(closeTabIcons).toHaveLength(3);
  });

  test.skip("mapDispatchToProps calls the appropriate action", async () => {
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
    expect(actions.setActiveTab).toHaveBeenCalled();
  });
});
