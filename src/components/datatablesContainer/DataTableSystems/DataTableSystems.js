import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { loadMonitoringSystems } from "../../../store/actions/monitoringSystems";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import DataTableSystemsRender from "../DataTableSystemsRender/DataTableSystemsRender";
import { normalizeRowObjectFormat } from "../../../additional-functions/react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Modal/Modal";
import Details from "../../Details/Details";
import DataTableSystemsComponents from "../DataTableSystemsComponents/DataTableSystemsComponents";

export const DataTableSystems = ({
  monitoringSystems,
  loadMonitoringSystemsData,
  loading,
  locationSelect,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (monitoringSystems.length === 0 || loading === false) {
      loadMonitoringSystemsData(locationSelect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);

  const closeModalHandler = () => setShow(false);

  const [modalData, setModalData] = useState([
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: "05/04/2009 0" },
    { value: "05/04/2009 0" },
  ]);
  const [selected, setSelected] = useState([]);

  const openModal = (value, selection) => {
    setSelected(selection);
    setShow(value);
  };

  // *** row handler onclick event listener
  const selectedRowHandler = (selection) => {
    openModal(true, selection);
  };

  useEffect(() => {
    setModalData(
      selected.map((info) => {
        return {
          header: info.column,
          value: info.value,
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [];
  columnNames.push("System ID");
  columnNames.push("System Type");
  columnNames.push("System Designation");
  columnNames.push("Begin Date and Time");
  columnNames.push("End Date and Time");
  columnNames.push("System ID");

  // *** generate columns array of object based on columnNames array above
  const columns = [];

  columnNames.forEach((name, index) => {
    columns.push({
      name,
      selector: `col${index + 1}`,
      sortable: true,
    });
  });

  // *** add column with action button
  columns.push({
    name: "Actions",
    button: true,
    width: "25%",
    cell: (row) => {
      // *** normalize the row object to be in the format expected by DynamicTabs
      const normalizedRow = normalizeRowObjectFormat(row, columnNames);

      return (
        <div
          className="cursor-pointer"
          onClick={() => selectedRowHandler(normalizedRow.cells)}
        >
          <FontAwesomeIcon icon={faPencilAlt} className="margin-right-1" />
          View
        </div>
      );
    },
  });

  // *** memoize data
  const data = useMemo(() => {
    if (monitoringSystems.length > 0 || loading === false) {
      return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
    } else {
      return [{ col2: "Loading list of Systems" }];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, monitoringSystems]);

  return (
    <>
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

      <div className="methodTable">
        <DataTableSystemsRender columns={columns} data={data} />
      </div>
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          children={
            <div>
              <Details viewOnly={true} modalData={modalData} />

              <DataTableSystemsComponents
                systemID={modalData.length > 1 ? modalData[0].value : 0}
              />
            </div>
          }
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    monitoringSystems: state.monitoringSystems.systems,
    loading: state.apiCallsInProgress.monitoringSystems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringSystemsData: (monitoringPlanLocationSelect) =>
      dispatch(loadMonitoringSystems(monitoringPlanLocationSelect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableSystems);
