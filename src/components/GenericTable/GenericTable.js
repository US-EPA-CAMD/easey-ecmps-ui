import React, { useEffect, useState, useRef } from "react";
import "./GenericTable.scss";
import { Remove, Add } from "@material-ui/icons";

import { Button } from "@trussworks/react-uswds";

const RenderRow = (props) => {
  const [isExpandable, setIsExpandable] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    setIsExpandable(isEllipsisActive(ref.current));
  }, []);

  const isEllipsisActive = (e) => {
    return e.offsetWidth < e.scrollWidth;
  };
  const handleClick = (index) => {
    if (isExpandable) {
      setIsExpanded(() => !isExpanded);
    }
  };

  return props.keys.map((key, index) => {
    if (key === "expandable") {
      return (
        <td
          className={` ${
            !isExpanded ? "collapsed" : "expanded"
          } maxw-2 expandBtn`}
          key={props.data[key]}
        >
          {isExpandable ? (
            <Button
              unstyled={"true"}
              onClick={() => handleClick(index)}
              aria-label={
                !isExpanded ? "click to expand row" : "click to collapse row"
              }
            >
              {!isExpanded ? <Add /> : <Remove />}
            </Button>
          ) : (
            ""
          )}
        </td>
      );
    }
    return (
      <td
        className={` ${
          !isExpanded ? "collapsed" : "expanded"
        } border border-black maxw-6`}
        key={props.data[key]}
        ref={ref}
      >
        {props.data[key]}
      </td>
    );
  });
};
const GenericTable = ({ title, data1, expandable, additionalTitle }) => {
  const addExpander = () => {
    if (expandable) {
      data1.forEach((element) => {
        element["expandable"] = "+";
      });
    }
  };
  addExpander();
  const data = data1;

  const getKeys = () => {
    return Object.keys(data[0]);
  };

  const getHeader = () => {
    var keys = getKeys();
    return keys.map((key, index) => {
      if (key === "expandable") {
        return (
          <th className="border border-black maxw-2" key={key}>
            {""}
          </th>
        );
      }
      return (
        <th className="border border-black" key={key}>
          {key}
        </th>
      );
    });
  };

  const getRowsData = () => {
    var items = data;
    var keys = getKeys();
    // accounts for empty data but still keeping headers
    if (data[0][keys[0]] === "") {
      return;
    }
    return items.map((row, index) => {
      return (
        <tr className="border border-black" key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      );
    });
  };

  return (
    <div className="genericTable padding-top-5" id="genericTable">
      {title ? <div className="text-bold font-mono-lg"> {title} </div> : ""}
      {additionalTitle ? (
        <div className="padding-top-1 padding-bottom-1">
          {" "}
          {additionalTitle}{" "}
        </div>
      ) : (
        ""
      )}
      <table>
        <thead>
          <tr>{getHeader()}</tr>
        </thead>
        <tbody>{getRowsData()}</tbody>
      </table>
    </div>
  );
};

export default GenericTable;
