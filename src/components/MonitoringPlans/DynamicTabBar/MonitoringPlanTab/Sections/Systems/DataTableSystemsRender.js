import React, { useState } from "react";
import UswdsTable from "../../../../../Common/Table/UswdsTable";
import "./DataTableSystemsRender.css";
import Modal from "../../../../../Common/Modal/Modal";
const DataTableSystemsRender = ({ columns, data, selectedRowHandler }) => {
  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);
  const openModal = (value) => {
    setShow(value);
  };

  const root = document.getElementById("portal")
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
      {show ? <Modal show={show} close={closeModalHandler} />: ''}
    </div>
  );
};

export default DataTableSystemsRender;
