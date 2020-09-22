import React from "react";
import Home from "./Home";
import { render, waitForDomChange } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("demo table renders without crashing", () => {
  const { container } = render(<Home />);
  waitForDomChange({ container })
    .then(() => {
      const table = container.querySelector("table");
      expect(table).not.toBeNull();
    })
    .catch((err) => console.log(`Error you need to deal with: ${err}`));
});
