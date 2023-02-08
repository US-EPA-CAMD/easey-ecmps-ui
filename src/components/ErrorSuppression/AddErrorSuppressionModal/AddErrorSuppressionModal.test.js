import React from "react";
import { render, screen, } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AddErrorSupressionModal } from "./AddErrorSuppressionModal";
import { ErrorSuppressionFiltersContextProvider } from "../context/error-suppression-context";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";

describe("AddErrorSupressionModal component", () => {

    let component;
    const mock = new MockAdapter(axios);
    global.scrollTo = jest.fn();


    beforeEach(async () => {
        mock
        .onGet(`${config.services.mdm.uri}/es-severity-codes`)
        .reply(200, [{"severityCode":"NONE","severityDescription":"No Errors"},{"severityCode":"ADMNOVR","severityDescription":"Administrative Override"}]);

        component = await act(async () => {
            render(
                <ErrorSuppressionFiltersContextProvider>
                    <AddErrorSupressionModal />
                </ErrorSuppressionFiltersContextProvider>
            )
        })
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

    it('renders Notes text box', () => {
        expect(screen.getByLabelText("Notes")).toBeDefined();
    })

})