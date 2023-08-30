import { screen } from "@testing-library/react";
import LoadingModal from "./LoadingModal";
import render from "../../mocks/render";

describe("loading modal component", ()=>{

  it("renders Loading component elements", async () =>{
    await render(<LoadingModal loading={true} type="Loading" />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
    expect(images[0].src).toContain("loading-snake");
    expect(images[0].title).toBe("Loading... Please wait...");
    expect(images[1].src).toContain("loading-text");
    expect(images[1].title).toBe("Loading Text... Please wait...");
  });

  it("renders Auth component elements", async () =>{
    await render(<LoadingModal loading={true} type="Auth" />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
    expect(images[0].src).toContain("scanning");
    expect(images[0].title).toBe("Loading... Please wait...");
    expect(images[1].src).toContain("authenticating-message");
    expect(images[1].title).toBe("Authenticating... Please wait...");
  });

});

