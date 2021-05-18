import React, { useState, useEffect } from "react";
import UswdsTable from "../../UswdsTable/UswdsTable";
import "./DataTableSystemsRender.scss";
import Modal from "../../Modal/Modal";
import Details from "../../Details/Details";
import DataTableSystemsComponents from "../DataTableSystemsComponents/DataTableSystemsComponents";
const DataTableSystemsRender = ({ columns, data }) => {
  const [show, setShow] = useState(false);

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
  const selectedRowHandler = (selection) => {};

  const openModal = (value, selection) => {
    setSelected(selection);
    setShow(value);
  };

  useEffect(() => {
    setModalData(
      selected.map((info) => {
        return {
          header: info.column.Header,
          value: info.value,
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // for testing
  // const root = document.getElementById("portal");
  return (
    <div>
      <div className={`usa-overlay ${show ? "is-visible" : ""}`}></div>
      <UswdsTable
        columns={columns}
        data={data}
        bordered={false}
        header
        // /paginate
        // showEntries={[10, 250, 500]}
        // search
        viewDataColumn
        // openTabColumn={[]}
        selectedRowHandler={selectedRowHandler}
        openModal={openModal}
      />
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
      ) : (
        ""
      )}
    </div>
  );
};

export default DataTableSystemsRender;
