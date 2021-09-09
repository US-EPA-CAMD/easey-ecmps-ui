import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "../../store/configureStore.dev";
import HelpSupport from "./HelpSupport";

const store = configureStore();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const topics = [
  {
    name: "Help/Support",
    descriptions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
  },
  {
    name: "FAQs",
    descriptions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
  },
  {
    name: "Tutorials",
    descriptions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
  },
  {
    name: "Contact Us",
    descriptions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
  },
];

const commentTypes = [
  {
    id: 1,
    comment: `Help using application`,
  },
  {
    id: 2,
    comment: `Report a bug`,
  },
  {
    id: 3,
    comment: `Data question`,
  },
  {
    id: 4,
    comment: `Suggested enhancement`,
  },
  {
    id: 5,
    comment: `Other`,
  },
];

describe("HelpSources: ", () => {
  let query;

  beforeEach(() => {
    query = render(
      <Provider store={store}>
        <MemoryRouter>
          <HelpSupport />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    query = null;
  });

  test("sections render without errors", () => {
    const { getByText } = query;

    topics.forEach((element) => {
      expect(getByText(element.name)).toBeTruthy();
    });
  });

  test("Visit FAQ link renders", () => {
    expect(screen.getByTestId("linkFAQ")).toBeTruthy();
  });

  test("CDX Help Topics renders ", () => {
    expect(screen.getByTestId("linkCDXHelp")).toBeTruthy();
  });

  test("Comment options are populated properly", () => {
    const { getByText } = query;

    commentTypes.forEach((element) => {
      if (element.comment !== "") {
        expect(getByText(element.comment)).toBeTruthy();
      }
    });
  });
});
