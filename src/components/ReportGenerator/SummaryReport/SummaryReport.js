import React, { useState } from "react";
import { Button, GovBanner } from "@trussworks/react-uswds";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { AppVersion } from "@us-epa-camd/easey-design-system";
import config from "../../../config";

export const SummaryReport = ({
  reportData,
  dataLoaded,
}) => {
  const displayCloseButton = useState(true);

  const displayCurrentDate = () => {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  // Grabs the Report Area for printing (Print button is excluded)
  const print = () => {
    window.print();
  };

  const closeReport = () => {
    window.close();
  };

  let results = [];
  let codeGroups = [];
  let columnNames = [];

  reportData.details.forEach(detail => {
    const groups = [];
    codeGroups.push(groups);
    columnNames.push(detail.columns.map(column => column.displayName));
    results.push(detail.results.map(row => {
      const columnData = detail.columns.map((column, index) => {
        const columnValue = row[column.name];
        const codeDescription = row[column.name + 'Description'];

        if (column.name.endsWith('Code') && codeDescription) {
          let group = groups.find(i => i.name === column.displayName);

          if (!group) {
            group = { name: column.displayName, items: [] };
            groups.push(group);
          }

          const code = group.items.find(i => i.code === columnValue);
          if (!code) {
            group.items.push({ code: columnValue, description: codeDescription })
          }
        }
        return `"col${index + 1}": "${columnValue ?? ''}"`
      })
      return JSON.parse(`{${columnData.join(',')}}`)
    }));
  });

  return (
    <>
      <div>
        <GovBanner className="padding-y-2px bg-base-lighter do-not-print" />

        <div className="">
          <div className="padding-x-5 padding-y-3 border-bottom-1px border-base-light">
            <img
              alt="EPA Logo"
              title="EPA Logo"
              src={`${process.env.PUBLIC_URL}/images/epa-logo-blue.svg`}
            />
            {displayCloseButton ? (
              <Button
                type="button"
                outline={true}
                aria-label={`Close ${reportData.title}`}
                className="float-right clearfix do-not-print"
                onClick={() => closeReport()}
                id="closeBTN"
                epa-testid="closeBTN"
              >
                Close Report
              </Button>
            ) : null
            }
          </div>

          <div className="padding-x-5">
            <h1 className="text-bold">
              {reportData.title}
              <Button
                type="button"
                outline={false}
                aria-label={`Print ${reportData.title}`}
                className="float-right clearfix do-not-print"
                onClick={() => print()}
                id="printBTN"
                epa-testid="printBTN"
              >
                Print PDF
              </Button>
            </h1>

            <div className="text-bold padding-bottom-2 border-bottom-1px border-base-light">
              {displayCurrentDate()}
            </div>

            <div className="subheader-wrapper bg-epa-blue-base text-white text-normal padding-left-1">
              Facility Details
            </div>

            <table role="presentation" className="width-auto">
              <tr>
                <td className="text-right width-auto padding-top-2 text-normal">
                  Facility Name:
                </td>
                <td className="width-auto padding-left-1 padding-top-2 text-bold">
                  {reportData.facilityName}
                </td>
              </tr>
              <tr>
                <td className="text-right width-auto text-normal">
                  Facility ID (ORISPL):
                </td>
                <td className="width-auto padding-left-1 text-bold">
                  {reportData.orisCode}
                </td>
              </tr>
              <tr>
                <td className="text-right width-auto text-normal">
                  Unit/Stack Configuration:
                </td>
                <td className="width-auto padding-left-1 text-bold">
                  {reportData.unitStackInfo}
                </td>
              </tr>
              <tr>
                <td className="text-right width-auto text-normal">State:</td>
                <td className="width-auto padding-left-1 text-bold">
                  {reportData.stateCode}
                </td>
              </tr>
              <tr>
                <td className="text-right width-auto padding-bottom-2 text-normal">County:</td>
                <td className="width-auto padding-left-1 padding-bottom-2 text-bold">
                  {reportData.countyName}
                </td>
              </tr>
            </table>

            {
              reportData.details.map((detail, index) => {
                return (
                  <div className="margin-top-5">
                    <div className="subheader-wrapper bg-epa-blue-base text-white text-normal padding-left-1">
                      {detail.title}
                    </div>

                    <div className="width-auto border-top-1px border-base-light margin-top-3">
                      <DataTableRender
                        columnNames={columnNames[index]}
                        data={results[index]}
                        dataLoaded={dataLoaded}
                        pagination={false}
                        filter={false}
                        noDataString={detail.noResultsMessage ?? reportData.noResultsMessage}
                      />
                    </div>

                    <div>
                      {
                        codeGroups[index].map(group => {
                          return (
                            <div className="display-flex grid-col-12">
                              <div className="grid-col-1 text-bold text-no-wrap padding-right-1">{`${group.name}s:`}</div>
                              <div className="grid-col-11">
                                {
                                  group.items.map(i => {
                                    return (
                                      <div>{`${i.code}-${i.description}`}</div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }

            <div className="position-fixed bottom-0 right-0 width-full do-not-print">
              <AppVersion
                version={config.app.version}
                publishDate={config.app.published}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryReport;
