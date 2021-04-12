import React from "react";
import { Accordion } from "@trussworks/react-uswds";
const Tables = ({
  sectionSelect,
  methodItems,
  supItems,
  matsTableFlag,
  systemsItems,
}) => {
  // const [expanded, setExpanded] = useState(false);
  // useEffect(() => {
  //   setExpanded(true);
  // }, [sectionSelect]);
  const sections = {
    "Monitoring Methods": (
      <div>
        <hr width="100%" align="center" />
        <Accordion
          bordered={false}
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
    "Monitoring Systems": (
      <div>
        <hr width="100%" align="center" />
        <Accordion
          bordered={false}
          expanded={true}
          items={systemsItems}
          className="accordions"
        />
        {/* <hr width="100%" align="center" /> */}

        {/* <hr width="100%" align="center" /> */}
      </div>
    ),
  };
  return <div>{sections[sectionSelect]}</div>;
};

export default Tables;
