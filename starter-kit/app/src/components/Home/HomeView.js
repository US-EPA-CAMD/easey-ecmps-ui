import React from "react";
import UswdsTable from "../Common/Table/UswdsTable";
import "./Home.css";

const HomeView = ({ bodyRef, columns, data }) => {
  return (
    <div className="container"  style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}} >
      <UswdsTable
        bodyRef={bodyRef}
        columns={columns}
        data={data}
        bordered={false}
        caption="MP Facilities Data Table"
        paginate
      />
    </div>
  );
};

export default HomeView;
