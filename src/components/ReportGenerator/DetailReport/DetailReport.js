import React, { useState } from "react";
import { Button, GovBanner } from "@trussworks/react-uswds";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { AppVersion } from "@us-epa-camd/easey-design-system";
import config from "../../../config";

export const DetailReport = ({
  reportData,
  dataLoaded,
}) => {
  const [displayCloseButton, setDisplayCloseButton] = useState(true);

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
    setDisplayCloseButton(false);
    window.print();
    setDisplayCloseButton(true);
  };

  const closeReport = () => {
    window.close();
  };

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
              { displayCloseButton ? (
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

              { reportData.details.map(detail => {
                return (
                  <>
                    <div className="subheader-wrapper bg-epa-blue-base text-white text-normal padding-left-1">
                      {detail.title}
                    </div>

                    <div className="width-auto border-top-1px border-base-light margin-top-3">
                      <DataTableRender
                        columnNames={detail.columns.map(column => column.displayName)}
                        data={detail.results.map(row => {
                          const columnData = detail.columns.map((column, index) => {
                            return `"col${index+1}": "${row[column.name]}"`
                          })
                          console.log(`{${columnData.join(',')}}`)
                          return JSON.parse(`{${columnData.join(',')}}`)
                        })}
                        dataLoaded={dataLoaded}
                        pagination={false}
                        filter={false}
                        noDataString={detail.noResultsMessage ?? reportData.noResultsMessage}
                      />
                    </div>
                  </>
              )})}

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

export default DetailReport;
