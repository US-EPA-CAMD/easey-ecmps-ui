import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { connect } from "react-redux";
import { loadFacilities } from "../../store/actions/facilities";
import * as fs from "../../utils/selectors/facilities";
import HomeView from "./HomeView";

const Home = ({ facilities, loadFacilities, loading }) => {
  const [headerWidth, setHeaderWidth] = useState([]);

  useEffect(() => {
    if (facilities.length === 0) loadFacilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function useHookWithRefCallback() {
    const ref = useRef(null);
    const setRef = useCallback(
      (node) => {
        if (node) {
          const row = node.children[0].children; // Get the children of one <tr>
          const headerWidths = [];
          for (let i = 0; i < row.length; i += 1) {
            i === 0
              ? headerWidths.push(row[i].getBoundingClientRect().width)
              : headerWidths.push(row[i].getBoundingClientRect().width + 10); // Get the rendered width of the element.
          }
          setHeaderWidth(headerWidths);
        }
        ref.current = node; // eslint-disable-next-line react-hooks/exhaustive-deps
      },
      [loading]
    );

    return [setRef];
  }
  const columns = useMemo(
    () => [
      {
        Header: "Oris Code",
        accessor: "col1",
        width: headerWidth ? headerWidth[0] + "px" : "10px",
        //width: "90px",
      },
      {
        Header: "Facility Name",
        accessor: "col2",
        width: headerWidth ? headerWidth[1] + "px" : "20px",
        //width: "316px",
      },
      {
        Header: "State",
        accessor: "col3",
        width: headerWidth ? headerWidth[2] + "px" : "10px",
        //width: "146px",
      },
    ],
    [headerWidth]
  );

  const data = useMemo(() => {
    if (facilities.length > 0) {
      let records = fs.getTableRecords(facilities);
      return records; //? records.slice(0, 100) : records;
    } else {
      return [{ col2: "Loading list of facilities..." }];
    }
  }, [facilities]);

  const [ref] = useHookWithRefCallback();

  return <HomeView bodyRef={ref} columns={columns} data={data} />;
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    loading: state.apiCallsInProgress.facilities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFacilities: () => dispatch(loadFacilities()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
