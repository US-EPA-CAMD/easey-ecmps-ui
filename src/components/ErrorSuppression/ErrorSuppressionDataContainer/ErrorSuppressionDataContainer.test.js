import React from "react";
import { render } from "@testing-library/react";
import { ErrorSuppressionDataContainer } from "./ErrorSuppressionDataContainer";

describe("ErrorSuppressionDataContainer component", ()=>{

    let component;

    beforeEach(()=>{
        component = render(<ErrorSuppressionDataContainer/>)
    })

    it("Renders ErrorSuppressionDataContainer component", ()=>{
        expect(component).toBeDefined();
    })
})