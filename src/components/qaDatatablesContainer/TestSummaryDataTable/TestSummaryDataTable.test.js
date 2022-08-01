import React from "react";
import { render, screen } from "@testing-library/react";

import TestSummaryDataTable from "./TestSummaryDataTable";

const props = {
  mapDataToRows: (data) => data
}

const axios = require("axios");
jest.mock("axios");

beforeEach(() => {
  axios.get.mockResolvedValueOnce({ status: 200, data: [] })
})

test('renders table title', () => {
  // Arrange
  render(<TestSummaryDataTable {...props} />)
  const title = screen.getByRole('heading', { name: /Test Summary Data/i })

  // Assert
  expect(title).toBeInTheDocument()
})

test('test summary data is fetched', () => {
  // Arrange
  render(<TestSummaryDataTable {...props} />)

  // Assert
  expect(axios.get).toHaveBeenCalled()
})
