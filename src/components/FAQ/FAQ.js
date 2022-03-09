import React, { useEffect, useState } from "react";
import { Accordion } from "@trussworks/react-uswds";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getContent } from "../../utils/api/contentApi";

const FAQ = () => {
  const [mainContent, setMainContent] = useState();
  const [questionsAnswers, setQuestionsAnswers] = useState([]);

  useEffect(() => {
    document.title = "ECMPS FAQs";
    getContent("/ecmps/faqs/index.md").then((resp) =>
      setMainContent(resp.data)
    );
    getContent("/ecmps/faqs/questions-answers.json").then((resp) =>
      setQuestionsAnswers(resp.data)
    );
  }, []);

  const createAccordionItems = (questions, name) => {
    // *** create items
    let items = [];
    let keyCount = 1;

    questions.forEach((element, index) => {
      items.push({
        key: index,
        title: element.question,
        content: element.answer,
        expanded: false,
        id: `question_${keyCount++}_${name.split(" ").join("")}`,
      });
    });

    return <Accordion items={items} bordered={false} multiselectable={true} />;
  };

  return (
    <div
      className="grid-row padding-top-7 padding-2 react-transition fade-in"
      id="faqPage"
    >
      <div className="grid-col-9 fit-content">
        <ReactMarkdown
          className="main-content"
          children={mainContent}
          remarkPlugins={[remarkGfm]}
        />
        {questionsAnswers.map((item) => {
          return (
            <div className=" padding-top-2 padding-bottom-2" key={item.name}>
              {" "}
              <h3 className="text-bold font-heading-xl">{item.name} </h3>
              {createAccordionItems(item.questions, item.name)}
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default FAQ;
