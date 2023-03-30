import React, { useState } from "react";
import { Button, GovBanner } from "@trussworks/react-uswds";
import { AppVersion } from "@us-epa-camd/easey-design-system";
import DefaultTemplate from "../DefaultTemplate/DefaultTemplate";
import PropertyTableTemplate from "../PropertyTableTemplate/PropertyTableTemplate";
import config from "../../../config";

export const Report = ({
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
  let columnGroups = [];

  reportData.details.forEach(detail => {
    let groups = [];
    const detailColumns = reportData.columns.find(
      x => x.code === detail.templateCode
    );
    columnNames.push(
      detailColumns.values.map((column, index) => {
        let mod = 1;
        if (detail.templateType.endsWith('COLTBL')) {
          mod = Number(detail.templateType.charAt(0));
        }
        let columnGroup = groups[index%mod];
        if (columnGroup === null || columnGroup === undefined) {
          columnGroup = [];
          groups.push(columnGroup);
        }
        columnGroup.push(column);
        return column.displayName;
      }
    ));
    columnGroups.push(groups);
    
    groups = [];
    codeGroups.push(groups);
    results.push(detail.results.map(row => {
      const columnData = detailColumns.values.map((column, index) => {
        const columnValue = row[column.name];
        const codeGroup = row[column.name + 'Group'];
        const codeDescription = row[column.name + 'Description'];

        if (codeGroup) {
          let group = groups.find(i => i.name === codeGroup);

          if (!group) {
            group = { name: codeGroup, items: [] };
            groups.push(group);
          }

          const code = group.items.find(i => i.code === columnValue);
          if (!code && columnValue !== null && columnValue !== undefined) {
            group.items.push({ code: columnValue, description: codeDescription })
          }
        }

        const columnNumber = `"col${index + 1}": `;
        if (columnValue !== null && columnValue !== undefined) {
          if (columnValue.includes('"')) {
            return `${columnNumber}"${columnValue.replace(/"/gi, '\\"')}"`;
          }
          return `${columnNumber}"${columnValue}"`;
        }
        return `${columnNumber}null`;
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
              {reportData.displayName}
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

            {
              reportData.details.map((detail, index) => {
                if (detail.templateType.endsWith('COLTBL')) {
                  return (
                    <PropertyTableTemplate
                      key={detail.displayName}
                      title={detail.displayName}
                      columnGroups={columnGroups[index]}
                      data={detail.results[0]}
                    />
                  )
                } else {
                  return (
                    <DefaultTemplate
                      key={detail.displayName}                      
                      title={detail.displayName}
                      codeGroups={codeGroups[index]}
                      columnNames={columnNames[index]}
                      data={results[index]}
                      dataLoaded={dataLoaded}
                    />
                  )                  
                }
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

export default Report;
