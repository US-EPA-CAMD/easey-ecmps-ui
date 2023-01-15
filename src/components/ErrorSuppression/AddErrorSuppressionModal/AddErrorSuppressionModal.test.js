import React from "react";
import { render } from "@testing-library/react";
import { AddErrorSupressionModal } from "./AddErrorSuppressionModal";

describe("AddErrorSupressionModal component", ()=>{

    let component;
    
    beforeEach(()=>{
        component = render(<AddErrorSupressionModal/>)
    })

    it("Renders AddErrorSupressionModal component", ()=>{
        expect(component).toBeDefined();
    })
})