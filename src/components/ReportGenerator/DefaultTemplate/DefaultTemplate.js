import React from "react";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

export const DefaultTemplate = ({
  data,
  title,
  codeGroups,
  columnNames,
  dataLoaded,
}) => {
  if (!data || data.length === 0) {
    return <></>
  }

  return (
    <div className="margin-bottom-3">
      <h2 className="subheader-wrapper bg-epa-blue-base text-white text-normal padding-left-1 padding-y-2px">
        {title}
      </h2>

      <div className="width-auto margin-top-0">
        <DataTableRender
          data={data}
          filter={false}
          pagination={false}
          dataLoaded={dataLoaded}
          columnNames={columnNames}
        />
      </div>

      <div>
        {
          codeGroups.filter(x => x.items.length > 0).map(group => {
            return (
              <div key={group.name}>
                <hr />
                <div className="display-flex grid-col-12" key={group.name}>
                  <div className="grid-col-3 text-bold text-no-wrap padding-right-1">{`${group.name}:`}</div>
                  <div className="grid-col-9">
                    {
                      group.items.map(i => {
                        return (
                          <div key={i.code}>{`${i.code} - ${i.description}`}</div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DefaultTemplate;