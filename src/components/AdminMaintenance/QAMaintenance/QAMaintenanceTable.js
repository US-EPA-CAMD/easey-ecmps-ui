import { ArrowDownwardSharp } from "@material-ui/icons"
import { Button, Checkbox } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import DataTable from "react-data-table-component"
import { certEventsCols, testExtensionExemptionCols, testSummaryCols } from "./QAMaintenanceTableColumns";
import { certEventLabel, testExtensionExemptionLabel, testSummaryLabel } from "../AdminMaintenance";

const QAMaintenanceTable = ({
  data = [],
  isLoading = false,
  typeSelection, // string description of selected type
}) => {

  // handle loading
  if (isLoading) {
    return <Preloader />
  }

  const baseStaticCols = [
    {
      name: "Select",
      width: "95px",
      cell: (row, idx) => (
        <div>
          <Checkbox
            data-testid={`select-cb-${idx}`}
            className="margin-bottom-5"
            id={idx}
            key={idx}
            onChange={(e) => {
              // onRowSelection(row, e.target.checked);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.target.checked = !event.target.checked;
              }
            }}
            defaultChecked={row.selected}
          />
        </div>
      ),
    },
    {
      name: "",
      width: "135px",
      cell: (row, idx) => (
        <div>
          <Button
            className=" usa-button usa-button--outline"
          // onClick={() => openViewEditModalHandler(row, idx, false)}
          >
            View
          </Button>
        </div>
      ),
    },
    {
      name: "Facility Name / ID",
      width: "210px",
      // facilityName isn't in api response and will have to be added
      selector: (row) =>
        row.facilityName
          ? `${row.facilityName} (${row.orisCode})`
          : row.orisCode,
      sortable: true,
    },
    {
      name: "MP Location(s)",
      width: "200px",
      selector: (row) => row.locations,
      sortable: true,
    },
    {
      name: "Identifying Data",
      width: "150px",
      selector: (row) => row.identifyingData,
      sortable: true,
    },

    {
      name: "Last Submission ID",
      width: "220px",
      selector: (row) => row.lastSubmissionId,
      sortable: true,
    },
    {
      name: "Submission Date/Time",
      width: "150px",
      selector: (row) => row.submissionDateTime,
      sortable: true,
    },
    {
      name: "Severity Level",
      width: "200px",
      selector: (row) => row.severityLevel,
      sortable: true,
    },
    {
      name: "Representative",
      width: "200px",
      selector: (row) => row.representative,
      sortable: true,
    },
  ];

  let columns
  switch (typeSelection) {
    case testSummaryLabel:
      columns = baseStaticCols.concat(testSummaryCols)
      break
    case certEventLabel:
      columns = baseStaticCols.concat(certEventsCols)
      break
    case testExtensionExemptionLabel:
      columns = baseStaticCols.concat(testExtensionExemptionCols)
      break
    default:
      return
  }

  return (
    <div>
      <DataTable
        sortIcon={
          <ArrowDownwardSharp className="margin-left-2 text-primary" />
        }
        noHeader={true}
        fixedHeader={true}
        fixedHeaderScrollHeight="50vh"
        columns={columns}
        data={data}
        className={`data-display-table react-transition fade-in`}
      />
    </div>
  )
}

export default QAMaintenanceTable
