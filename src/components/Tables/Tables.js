import React from "react";
import { Accordion } from "@trussworks/react-uswds";

const Tables = ({
  sectionSelect,
  methodItems,
  supItems,
  matsTableFlag,
  systemsItems,
}) => {
  // console.log('this is section in tables',methodItems)
  // const [expanded, setExpanded] = useState(false);
  // useEffect(() => {
  //   setExpanded(true);
  // }, [sectionSelect]);
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
  return <div>{sections[sectionSelect]}</div>;
};

export default Tables;
