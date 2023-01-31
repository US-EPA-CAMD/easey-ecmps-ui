import React from "react";
import { render } from "@testing-library/react";
import { ErrorSuppression } from "./ErrorSuppression";
describe("ErrorSuppression component", ()=>{

    let component;

    beforeEach(()=>{
        component = render(<ErrorSuppression/>)
    })

    it("Renders ErrorSuppression component", ()=>{
        expect(component).toBeDefined();
    })
})