import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTableSystems } from "./DataTableSystems";

//testing redux connected component to mimic props passed as argument
function componentRenderer() {
  const props = {
    monitoringSystems:[
      {
        "id": "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
        "monLocId": "3",
        "systemType": "SO2",
        "systemDesignationCode": "P",
        "systemIdentifier": "ABF",
        "fuelCode": "NFS",
        "beginDate": "1993-10-01",
        "endDate": null,
        "beginHour": "0",
        "endHour": null
      },
      {
        "id": "CAMD-735700562C644DBC9F1FCA3AD06DA8EE",
        "monLocId": "3",
        "systemType": "NOX",
        "systemDesignationCode": "P",
        "systemIdentifier": "ABG",
        "fuelCode": "NFS",
        "beginDate": "1993-10-01",
        "endDate": null,
        "beginHour": "0",
        "endHour": null
      },
      {
        "id": "CAMD-F4FD3AEEC8684A33A5963FA4D0E46790",
        "monLocId": "3",
        "systemType": "CO2",
        "systemDesignationCode": "P",
        "systemIdentifier": "ABH",
        "fuelCode": "NFS",
        "beginDate": "1993-10-01",
        "endDate": null,
        "beginHour": "0",
        "endHour": null
      },
      {
        "id": "CAMD-BD2F8ADCD3A940029CF8136B52829B0A",
        "monLocId": "3",
        "systemType": "FLOW",
        "systemDesignationCode": "P",
        "systemIdentifier": "ABJ",
        "fuelCode": "NFS",
        "beginDate": "1993-10-01",
        "endDate": null,
        "beginHour": "0",
        "endHour": null
      },
      {
        "id": "CAMD-F79348595AFD46849C2503F8717250C8",
        "monLocId": "3",
        "systemType": "OP",
        "systemDesignationCode": "P",
        "systemIdentifier": "ABK",
        "fuelCode": "NFS",
        "beginDate": "1993-10-01",
        "endDate": null,
        "beginHour": "0",
        "endHour": null
      },
      {
        "id": "CAMD-A3CE0C952BD44CB2878908537200979A",
        "monLocId": "3",
        "systemType": "OP",
        "systemDesignationCode": "B",
        "systemIdentifier": "ASK",
        "fuelCode": "NFS",
        "beginDate": "1993-10-01",
        "endDate": "2004-12-31",
        "beginHour": "0",
        "endHour": "23"
      }
    ],
    loadMonitoringSystemsData: jest.fn(),

    loading: false,

  };
  return render(<DataTableSystems {...props} />);
}
function componentRendererNoData(args) {
  const defualtProps = {
    monitoringSystems: [],
    loadMonitoringSystemsData: jest.fn(),
    loading: true,

  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableSystems {...props} />);
}

// test("should render only active monitoring methods by default", () => {
//   const { container } = componentRenderer();
//   const records = container.querySelectorAll("tbody tr");
//   expect(records.length).toEqual(6);
// });


test("testing redux connected data-table component renders no records", () => {
  const { container } = componentRendererNoData();
  expect(screen.getByText("Loading list of Systems")).toBeInTheDocument();
});