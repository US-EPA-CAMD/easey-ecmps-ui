import { getContent } from "./contentApi";
import axios from "axios";
jest.mock("axios");

describe("testing content management API functions", () => {
  it("should test getContent function (success)", async () => {
    const mockData = [];
    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: mockData })
    );
    const url = "testUrl";
    const res = await getContent(url);

    expect(res.data).toBe(mockData);
  });

  it("should test getContent function (fail)", async () => {
    const mockData = [];
    axios.get.mockImplementation(() => Promise.resolve({ status: 400 }));
    const url = "testUrl";
    try {
      const res = await getContent(url);
    } catch (e) {
      expect(e.message).toBe("Error: failed");
    }
  });
});
