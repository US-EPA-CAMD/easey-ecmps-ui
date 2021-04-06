import React, { useState, useEffect } from "react";
import UswdsTable from "../../../../../Common/Table/UswdsTable";
import "./DataTableSystemsRender.css";
import Modal from "../../../../../Common/Modal/Modal";
import Details from "../Systems/Details/Details";
const DataTableSystemsRender = ({ columns, data, testShow }) => {
  const [show, setShow] = useState(testShow ? testShow : false);

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
  }, [show]);

  const root = document.getElementById("portal");
  return (
    <div className="tableContainerWS">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`}></div>
      <UswdsTable
        columns={columns}
        data={data}
        bordered={false}
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
          children={<Details viewOnly={true} modalData={modalData} />}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default DataTableSystemsRender;
