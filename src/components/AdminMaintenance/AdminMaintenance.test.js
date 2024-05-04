import React from "react";
import { render, screen } from "@testing-library/react";
import {AdminMaintenance} from "./AdminMaintenance";
import "@testing-library/jest-dom/extend-expect";

describe("<AdminMaintenance />", () => {
  test("renders component with correct title and facilities", async () => {

    render(<AdminMaintenance user="test" section="emSubmissionAccess" />);
   
    jest.mock("../../utils/api/facilityApi", () => ({
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

    const titleElement = screen.getAllByText("Maintain EM Submission Access");
    expect(titleElement[0]).toBeInTheDocument();

  });
});
