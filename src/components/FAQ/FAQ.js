import React, { useEffect } from "react";
import { Accordion } from "@trussworks/react-uswds";

const FAQ = () => {
  useEffect(() => {
    document.title = "ECMPS FAQs";
  }, []);
  const topics = [
    {
      name: "Monitoring Plans",
      questions: [
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Phasellus tincidunt velit sed leo porttitor tincidunt",
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Phasellus tincidunt velit sed leo porttitor tincidunt",
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Phasellus tincidunt velit sed leo porttitor tincidunt",
        },
      ],
    },
    {
      name: "QA & Certifications",
      questions: [
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Phasellus tincidunt velit sed leo porttitor tincidunt",
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Phasellus tincidunt velit sed leo porttitor tincidunt",
        },
      ],
    },
    {
      name: "Emissions",
      questions: [
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Phasellus tincidunt velit sed leo porttitor tincidunt",
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Phasellus tincidunt velit sed leo porttitor tincidunt",
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Phasellus tincidunt velit sed leo porttitor tincidunt",
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Phasellus tincidunt velit sed leo porttitor tincidunt",
        },
      ],
    },
  ];

  const createAccordionItems = (questions, name) => {
    // *** create items
    let items = [];
    let keyCount = 1;

    questions.forEach((element, index) => {
      items.push({
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
        <div>
          <h2 className="text-bold font-heading-2xl">FAQs</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
            arcu in ipsum sollicitudin viverra. Vestibulum ut tincidunt lacus.
            Aliquam erat volutpat. Donec eget tincidunt mauris. Sed ac orci a
            risus vehicula molestie quis sit amet ligula. Sed faucibus, neque
            eget finibus lobortis, nunc erat molestie diam, sed pulvinar metus
          </p>
        </div>
        {topics.map((topic) => {
          return (
            <div className=" padding-top-2 padding-bottom-2">
              {" "}
              <h3 className="text-bold font-heading-xl">{topic.name} </h3>
              {createAccordionItems(topic.questions, topic.name)}
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default FAQ;
