import React from "react";
import { render } from "@testing-library/react";
import {ErrorSuppressionFilters} from "./ErrorSuppressionFilters";

describe("ErrorSuppressionFilters component", ()=>{

    let component;

    beforeEach(()=>{
        component = render(<ErrorSuppressionFilters/>)
    })

    it("Renders ErrorSuppressionFilters component", ()=>{
        expect(component).toBeDefined();
    })
})