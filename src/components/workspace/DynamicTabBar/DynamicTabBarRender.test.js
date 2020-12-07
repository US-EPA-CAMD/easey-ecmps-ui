import React from "react";
import { render } from "@testing-library/react";
import { DynamicTabBarRender } from "./DynamicTabBarRender";



describe("testing monitoring plan data table component", () => {
  test("by default renders filtered records based on status as active only", () => {
    const defaultProps = [
      {
        title: "Good Bye",
        component: <h1>John </h1>,
      },
    ];
    const { tabBar } = render(<DynamicTabBarRender tabProps={defaultProps} />);
    const tabBarTotal = tabBar.querySelectorAll("<h1>");
    expect(tabBarTotal).toEqual(1);
  });
});

