import { render } from "enzyme";
import React from "react";
import { useSuppressionFiltersStore } from "./error-suppression-context";

const getHookValue = ()=>{
    const returnVal = {};

    const TestComponent = ()=>{
        Object.assign(returnVal, useSuppressionFiltersStore());
        return null
    }

    render(<TestComponent/>)

    return returnVal;
}

describe("useSuppressionFiltersStore hook", ()=>{

    it("has the correct number of fields", ()=>{
        const filters = getHookValue();
        expect(Object.keys(filters).length).toBe(18)
    })

    it("has all of the correct fields for error suppression filters", ()=>{
        const filters = getHookValue();
        expect(filters.hasOwnProperty("checkType")).toBe(true)
        expect(filters.hasOwnProperty("checkNumber")).toBe(true)
        expect(filters.hasOwnProperty("checkResult")).toBe(true)
        expect(filters.hasOwnProperty("facility")).toBe(true)
        expect(filters.hasOwnProperty("locations")).toBe(true)
        expect(filters.hasOwnProperty("active")).toBe(true)
        expect(filters.hasOwnProperty("reason")).toBe(true)
        expect(filters.hasOwnProperty("addDateAfter")).toBe(true)
        expect(filters.hasOwnProperty("addDateBefore")).toBe(true)

    })
})  