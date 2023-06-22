import React from "react";
import { render, screen } from "@testing-library/react";
import AdminMaintenance from "./AdminMaintenance";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import MockAdapter from "axios-mock-adapter";

describe("<AdminMaintenance />", () => {
  test("renders component with correct title and facilities", async () => {

     const mock = new MockAdapter(axios);
    render(<AdminMaintenance user="test" />);
   
    jest.mock("../../../utils/api/facilityApi", () => ({
      getAllFacilities: jest.fn().mockResolvedValue({
        data: [
          {
            facilityId: 1,
            facilityName: "Facility 1",
          },
          {
            facilityId: 2,
            facilityName: "Facility 2",
          },
        ],
      }),
    }));

    const titleElement = screen.getByText("Maintain EM Submission Access");
    expect(titleElement).toBeInTheDocument();

  });
});
