import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "../../store/configureStore.dev";
import Resources from "./Resources";
const store = configureStore();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const topics = [
  {
    name: "Glossary",
    descriptions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
    url: "/monitoring-plans",
  },
  {
    name: "Reporting Instructions",
    descriptions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
    url: "/qa_certifications",
  },
  {
    name: "CAM API",
    descriptions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
    url: "/emission",
  },
];

describe("Resources: ", () => {
  test("sections render without errors", () => {
    const query = render(
      <Provider store={store}>
        <MemoryRouter>
          <Resources />
        </MemoryRouter>
      </Provider>
    );
    const { getByText } = query;

    topics.forEach((element) => {
      const section = getByText(element.name);
      expect(section).toBeTruthy();
    });
  });

  test("buttons render without errors", () => {
    const query = render(
      <Provider store={store}>
        <MemoryRouter>
          <Resources />
        </MemoryRouter>
      </Provider>
    );
    const { getByText } = query;

    topics.forEach((element) => {
      const text = `Visit${element.name === "Glossary" ? " the " : " "}${
        element.name
      }`;
      const button = getByText(text);
      expect(button).toBeTruthy();
    });
  });
});
