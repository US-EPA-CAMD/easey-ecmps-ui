import { getContent } from "./contentApi";
import axios from "axios";
jest.mock("axios");

describe("testing content management API functions", () => {
  it("should test getContent function", async () => {
    const mockData = [];
    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: mockData })
    );
    const url = "testUrl";
    const res = getContent(url);

    expect(res).toBe(mockData);
  });
});
