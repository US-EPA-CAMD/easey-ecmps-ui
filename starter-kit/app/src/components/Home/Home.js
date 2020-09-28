import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { connect } from "react-redux";
import { actions } from "../../store/actions/facilities";
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
    const setRef = useCallback((node) => {
      if (node) {
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
        //width: headerWidth ? headerWidth[0] + "px" : "61px",
        width: "61px",
      },
      {
        Header: "Facility Name",
        accessor: "col2",
        //width: headerWidth ? headerWidth[1] + "px" : "316px",
        width: "316px",
      },
      {
        Header: "State",
        accessor: "col3",
        //width: headerWidth ? headerWidth[2] + "px" : "146px",
        width: "146px",
      },
    ],
    [headerWidth]
  );

  const data = useMemo(() => {
    if (facilities.length > 0) {
      let records = fs.getTableRecords(facilities);
      return records ? records.slice(0, 100) : records;
    } else {
      return [{ col1: "Loading list of facilities..." }];
    }
  }, [facilities]);

  //const [ref] = useHookWithRefCallback();

  return <HomeView bodyRef={null} columns={columns} data={data} />;
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    loading: state.apiCallsInProgress.facilities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFacilities: () => dispatch(actions.loadFacilities()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
