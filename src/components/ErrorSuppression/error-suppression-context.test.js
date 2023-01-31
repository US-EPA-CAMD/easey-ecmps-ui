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
        expect(Object.keys(filters).length).toBe(24)
    })
})  