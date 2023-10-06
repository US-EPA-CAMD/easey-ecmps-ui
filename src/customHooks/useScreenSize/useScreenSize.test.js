import {
    fireEvent
} from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks"
import useScreenSize from "./useScreenSize";

describe("useScreenSize hook Test", () => {
  global.innerWidth = 500
  global.innerHeight = 800
  it("returns the initially mocked screen resolution", async () => {

    const { result } = renderHook(() => useScreenSize());
    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(800);
    
  });

  it("returns the updated screen resolution based on mocked resize event", async () => {

    const { result } = renderHook(() => useScreenSize());
    act(() => {
      global.innerWidth = 200
      global.innerHeight = 400

      fireEvent(global, new Event("resize"))
    })
  
    expect(result.current.width).toBe(200);
    expect(result.current.height).toBe(400);
    
  });
});