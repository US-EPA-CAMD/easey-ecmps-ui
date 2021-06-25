import React, { useRef, useEffect } from "react";
import { Accordion } from "@trussworks/react-uswds";

const Tables = ({
  sectionSelect,
  methodItems,
  supItems,
  matsTableFlag,
  systemsItems,
}) => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current !== undefined) {
      if (
        ref.current
          .querySelectorAll(".usa-accordion__content")[0]
          .hasAttribute("hidden")
      ) {
        ref.current.children[0]
          .querySelectorAll(".usa-accordion__button")[0]
          .click();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, sectionSelect]);

  useEffect(() => {
    if (matsTableFlag) {
      sections[3] = (
        <div>
          <Accordion
            bordered={false}
            aria-expanded={true}
            items={methodItems}
            className="accordions"
          />

          {matsTableFlag ? (
            <>
              <Accordion
                bordered={false}
                items={supItems}
                className="accordions"
              />
            </>
          ) : (
            ""
          )}
          {/* <hr width="100%" align="center" /> */}
        </div>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matsTableFlag]);
  const sections = {
    0: <div />,
    1: <div />,
    "Monitoring Defaults": <div />,

    3: (
      <div>
        <Accordion
          bordered={false}
          aria-expanded={true}
          items={methodItems}
          className="accordions"
        />

        {matsTableFlag ? (
          <>
            <Accordion
              bordered={true}
              items={supItems}
              className="accordions"
            />
          </>
        ) : (
          ""
        )}
      </div>
    ),
    4: (
      <div>
        <Accordion
          bordered={false}
          aria-expanded={true}
          items={systemsItems}
          className="accordions"
        />
      </div>
    ),
    Qualifications: <div />,
    "Rectangular Duct WAFs": <div />,
    "Reporting Frequency": <div />,
    "Span, Range, and Formulas": <div />,
    "Unit Information": <div />,
    "Stack/Pipe Information": <div />,
  };
  return (
    <div aria-live="polite" ref={ref}>
      {sections[sectionSelect]}
    </div>
  );
};

export default Tables;
