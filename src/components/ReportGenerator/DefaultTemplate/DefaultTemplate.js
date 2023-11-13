import React from "react";
import DataTable from "react-data-table-component";

export const DefaultTemplate = ({
  data,
  title,
  codeGroups,
  columnNames,
  templateType,
  referenceMethod,
}) => {
  if (!data || data.length === 0) {
    return <></>;
  }

  const refMethodCode = referenceMethod["referenceMethodCode"];
  const refMethodDescription = referenceMethod["referenceMethodDescription"];

  const columns = [];
  columnNames.forEach((name, index) => {
    columns.push({
      id: `col${index + 1}`,
      name: <span>{name}</span>,
      selector: (row) => row[`col${index + 1}`],
      sortable: false,
      wrap: true,
    });
  });

  const customStyles = {
    headCells: {
      style: {
        wrap: true, // override the cell padding for head cells
        whiteSpace: "normal",
      },
    },
  };

  return (
    <div className="margin-bottom-3">
      {templateType === "DEFAULT2" ? (
        <div>
          <hr className="border border-dashed" />
          <div>{title}</div>
          <div>Reference Method Used: {`${refMethodCode} - ${refMethodDescription}`}</div>
          <hr className="border border-dashed" />
        </div>
      ): (
        <h3 className="subheader-wrapper bg-epa-blue-base text-white text-normal padding-left-1 padding-y-2px">
          {title}
        </h3>
      )}

      <div className="width-auto margin-top-0 data-display-table-report">
        <DataTable
          data={data}
          columns={columns}
          customStyles={customStyles}
        ></DataTable>
      </div>

      <div>
        {codeGroups
          .filter((x) => x.items.length > 0)
          .map((group) => {
            return (
              <div key={group.name}>
                <hr />
                <div className="display-flex grid-col-12" key={group.name}>
                  <div className="grid-col-3 text-bold text-no-wrap padding-right-1">{`${group.name}:`}</div>
                  <div className="grid-col-9">
                    {group.items.map((i) => {
                      return (
                        <div key={i.code}>{`${i.code} - ${i.description}`}</div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DefaultTemplate;
