import React from "react";
import { render, screen, act } from "@testing-library/react";
import {ErrorSuppressionFilters} from "./ErrorSuppressionFilters";

describe("ErrorSuppressionFilters component", ()=>{

    let component;

    beforeEach(()=>{
        component = render(<ErrorSuppressionFilters />);  
    })

    it("Renders ErrorSuppressionFilters component", ()=>{
        expect(component).toBeDefined();
    })

    it('renders Check Type', ()=>{
        expect(screen.getByLabelText("Check Type")).toBeDefined();
    })

    it('renders Check Number dropdown', ()=>{
        expect(screen.getByLabelText("Check Number")).toBeDefined();
    })

    it('renders Check Result dropdown', ()=>{
        expect(screen.getByLabelText("Check Result")).toBeDefined();
    })

    it('renders Facility dropdown', ()=>{
        expect(screen.getByLabelText("Facility Name/ID")).toBeDefined();
    })

    it('renders Location multiselect', ()=>{
        expect(screen.getByLabelText("Location Name")).toBeDefined();
    })

    it('renders Active checkbox', ()=>{
        expect(screen.getByLabelText("Active")).toBeDefined();
    })

    it('renders Reason dropdown', ()=>{
        expect(screen.getByLabelText("Facility Name/ID")).toBeDefined();
    })

    it('renders Add Date After and Before datepickers', ()=>{
        expect(screen.queryByText("Add Date After")).toBeDefined();
        expect(screen.queryByText("Add Date Before")).toBeDefined();
    })

    it('renders Clear and Apply Filter buttons', ()=>{
        expect(screen.queryByText("Clear")).toBeDefined();
        expect(screen.queryByText("Apply Filters")).toBeDefined();
    })
})