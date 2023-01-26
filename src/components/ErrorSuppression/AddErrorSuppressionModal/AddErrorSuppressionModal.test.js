import React from "react";
import { render, screen, } from "@testing-library/react";
import { AddErrorSupressionModal } from "./AddErrorSuppressionModal";
import { ErrorSuppressionFiltersContextProvider } from "../error-suppression-context";

describe("AddErrorSupressionModal component", () => {

    let component;

    beforeEach(() => {
        component = render(
            <ErrorSuppressionFiltersContextProvider>
                <AddErrorSupressionModal />
            </ErrorSuppressionFiltersContextProvider>
        )
    })

    it("Renders AddErrorSupressionModal component", () => {
        expect(component).toBeDefined();
    })

    it('renders Check Type', () => {
        expect(screen.getByLabelText("Check Type")).toBeDefined();
    })

    it('renders Check Number dropdown', () => {
        expect(screen.getByLabelText("Check Number")).toBeDefined();
    })

    it('renders Check Result dropdown', () => {
        expect(screen.getByLabelText("Check Result")).toBeDefined();
    })

    it('renders Type dropdown', () => {
        expect(screen.getByLabelText("Type")).toBeDefined();
    })

    it('renders Reason dropdown', () => {
        expect(screen.getByLabelText("Reason")).toBeDefined();
    })

    it('renders Facility Name dropdown', () => {
        expect(screen.getByLabelText("Facility Name")).toBeDefined();
    })

    it('renders Locations multiselect', () => {
        expect(screen.getByLabelText("Locations")).toBeDefined();
    })

    it('renders Fuel Type dropdown', () => {
        expect(screen.getByLabelText("Fuel Type")).toBeDefined();
    })

    it('renders Notes text box', () => {
        expect(screen.getByLabelText("Notes")).toBeDefined();
    })

})