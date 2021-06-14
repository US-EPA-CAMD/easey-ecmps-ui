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
          <hr width="100%" align="center" />
          <Accordion
            bordered={false}
            aria-expanded={true}
            items={methodItems}
            className="accordions"
          />

          {matsTableFlag ? (
            <>
              <hr width="100%" align="center" />
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
    0: <div></div>,
    1: <div></div>,
    "Monitoring Defaults": <div></div>,

    3: (
      <div>
        <hr width="100%" align="center" />
        <Accordion
          bordered={false}
          aria-expanded={true}
          items={methodItems}
          className="accordions"
        />

        {matsTableFlag ? (
          <>
            <hr width="100%" align="center" />
            <Accordion
              bordered={true}
              items={supItems}
              className="accordions"
            />
          </>
        ) : (
          ""
        )}
        {/* <hr width="100%" align="center" /> */}
      </div>
    ),
    4: (
      <div>
        <hr width="100%" align="center" />
        <Accordion
          bordered={false}
          aria-expanded={true}
          items={systemsItems}
          className="accordions"
        />
        {/* <hr width="100%" align="center" /> */}

        {/* <hr width="100%" align="center" /> */}
      </div>
    ),
    Qualifications: <div></div>,
    "Rectangular Duct WAFs": <div></div>,
    "Reporting Frequency": <div></div>,
    "Span, Range, and Formulas": <div></div>,
    "Unit Information": <div></div>,
    "Stack/Pipe Information": <div></div>,
  };
  return (
    <div aria-live="polite" ref={ref}>
      {sections[sectionSelect]}
    </div>
  );
};

export default Tables;
