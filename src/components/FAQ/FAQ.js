import React from "react";
import { Accordion, AccordionItem } from "@trussworks/react-uswds";
import NotFound from "../NotFound/NotFound";
const FAQ = () => {
  const topics = [
    {
      name: "Monitoring Plans",
      questions: [
        {
          question: "what?",
          answer: "yes",
        },
        {
          question: "what?",
          answer: "yes",
        },
        {
          question: "what?",
          answer: "yes",
        },
      ],
    },
    {
      name: "QA & Certifications",
      questions: [
        {
          question: "what?",
          answer: "yes",
        },
      ],
    },
    {
      name: "Emissions",
      questions: [
        {
          question: "what?",
          answer: "yes",
        },
      ],
    },
  ];

  const createAccordionItems = (questions) => {
    return questions.map((question) => {
      return (
        <Accordion
          items={[
            <AccordionItem
              id={`${question.question.split(" ").join("")}`}
              title={question.question}
              content={<NotFound />} 
              expanded = {true}
            />,
          ]}
          bordered={false}
          multiselectable={true}
         
        />
      );
    });
  };
  return (
    <div className="grid-row padding-top-7 padding-2 " id="faqPage">
      <div className="grid-col-9 fit-content">
        <div>
          <span className="text-bold font-heading-2xl">FAQs</span>
          <p>
            {" "}
            Examine she brother prudent add day ham. Far stairs now coming bed
            oppose hunted become his. You zealously departure had procuring
            suspicion. Examine she brother prudent add day ham. Far stairs now
            coming bed oppose hunted become his. You zealously departure had
            procuring suspicion. Books whose front would purse if be do decay.
            Quitting you way formerly diBooks who{" "}
          </p>
        </div>

        {topics.map((topic) => {
          return (
            <div className=" padding-top-2 padding-bottom-2">
              {" "}
              <h2 className="text-bold font-heading-xl">{topic.name} </h2>
             {createAccordionItems(topic.questions)}
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default FAQ;
