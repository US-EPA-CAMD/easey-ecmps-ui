import React from "react";
import UswdsTable from "../Common/Table/UswdsTable";
import "./Home.css";

const HomeView = ({ bodyRef, columns, data }) => {
  return (
    <div className="container">
      <UswdsTable
        bodyRef={bodyRef}
        columns={columns}
        data={data}
        bordered={false}
        caption="MP Facilities Data Table"
        paginate
        search
        showEntries={[100,250,500]}
        //disabledColumnFilters={[0]}
        
      />
    </div>
  );
};

export default HomeView;
