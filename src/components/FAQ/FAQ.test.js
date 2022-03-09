import React from "react";
import { render, wait } from "@testing-library/react";
import FAQ from "./FAQ";

jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => () => {});

jest.mock("../../utils/api/contentApi", () => {
  const testContent = {
    data: "test",
  };
  const testQuestionsAnswers = {
    data: [
      {
        name: "test questions",
        questions: [
          {
            question: "test question",
            answer: "test answer",
          },
        ],
      },
    ],
  };
  return {
    getContent: jest
      .fn()
      .mockResolvedValueOnce(testContent)
      .mockResolvedValueOnce(testQuestionsAnswers),
  };
});

describe("testing FAQ component ", () => {
  test("renders the content of faqPage component", async () => {
    await wait(() => {
      const { container } = render(<FAQ />);
      const renderedComponent = container.querySelector("#faqPage");
      expect(renderedComponent).not.toBeUndefined();
    });
  });
});
