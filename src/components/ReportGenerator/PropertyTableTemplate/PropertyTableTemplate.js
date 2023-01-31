import React from "react";

export const PropertyTableTemplate = ({
  data,
  title,
  columnGroups,
}) => {
  return (
    <div className="margin-bottom-3">
      {
        data && data["unitStack"] ? (
          <div className="subheader-wrapper bg-black text-white text-normal padding-left-1 padding-y-2px">
            {`Unit/Stack/Pipe ID: ${data["unitStack"]} - ${title}`}
          </div>
        ) : (
          <div className="subheader-wrapper bg-epa-blue-base text-white text-normal padding-left-1 padding-y-2px">
            {title}
          </div>
        )
      }

      <div className="display-flex grid-col-12">
        {
          columnGroups.map((columnGroup, index) => {
            return (
              <table className="grid-col-4 desktop:grid-col-3" key={`${columnGroup.code}-col-grp-${index}`}>
                {
                  columnGroup.map(column => {
                    return (
                      <tr key={column.name}>
                        <td className="text-bold text-no-wrap grid-col-2 desktop:grid-col-1">
                          {column.displayName}:
                        </td>
                        <td className="text-no-wrap grid-col-2 desktop:grid-col-1">
                          {data[column.name]}
                        </td>
                      </tr>
                    )
                  })
                }
              </table>
            )
          })
        }
      </div>
    </div>
  )
}

export default PropertyTableTemplate;