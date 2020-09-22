import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { getAllFacilities } from "../../utils/api/facilityApi";
import * as fs from "../../utils/selectors/facilities";
import log from "loglevel";
import UswdsTable from "../Common/Table/UswdsTable";
import "./Home.css";

function Home() {
  let element = null;
  const [facilities, setFacilities] = useState([]);
  const [headerWidth, setHeaderWidth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllFacilities();
        if (result) {
          setFacilities(result.data.data);
        }
      } catch (e) {
        log.error(e);
      }
    };
    fetchData();
  }, []);

  function useHookWithRefCallback() {
    const ref = useRef(null);
    const setRef = useCallback((node) => {
      if (node) {
        console.log(node);
        const row = node.children[0].children; // Get the children of one <tr>
        const headerWidths = [];
        for (let i = 0; i < row.length; i += 1) {
          headerWidths.push(row[i].getBoundingClientRect().width); // Get the rendered width of the element.
        }
        setHeaderWidth(headerWidths);
      }
      ref.current = node;
    }, []);

    return [setRef];
  }
  const columns = useMemo(
    () => [
      {
        Header: "Oris Code",
        accessor: "col1",
        width: headerWidth ? headerWidth[0] + "px" : "20%",
      },
      {
        Header: "Facility Name",
        accessor: "col2",
        width: headerWidth ? headerWidth[1] + "px" : "60%",
      },
      {
        Header: "State",
        accessor: "col3",
        width: headerWidth ? headerWidth[2] + "px" : "20%",
      },
    ],
    [headerWidth]
  );

  const data = useMemo(() => {
    let records = fs.getTableRecords(facilities);
    return records ? records.slice(0, 100) : records;
  }, [facilities]);

  const [ref] = useHookWithRefCallback();

  if (facilities.length > 0)
    element = (
      <div className="container">
        <UswdsTable
          bodyRef={ref}
          columns={columns}
          data={data}
          bordered={false}
          caption="MP Facilities Data Table"
        />
      </div>
    );
  return element;
}

export default Home;
