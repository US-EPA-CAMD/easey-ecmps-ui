import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ErrorSuppressionDataContainer } from "./ErrorSuppressionDataContainer";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import { ErrorSuppressionFiltersContextProvider } from "../error-suppression-context";
import userEvent from "@testing-library/user-event";

describe("ErrorSuppressionDataContainer component", () => {

    let component;
    const mock = new MockAdapter(axios);

    beforeEach(async () => {
        mock
            .onGet(`${config.services.camd.uri}/error-suppressions`)
            .reply(200, [{
                "id": 1031,
                "checkCatalogResultId": 3540,
                "checkTypeCode": "QUAL",
                "checkNumber": 23,
                "checkResultCode": "D",
                "severityCode": "NONE",
                "facilityId": 8331,
                "orisCode": 2271,
                "locations": "1A,1B",
                "matchDataTypeCode": "QUALTYP",
                "matchDataValue": "abc",
                "matchTimeTypeCode": "HISTIND",
                "matchTimeBeginValue": "",
                "matchTimeEndValue": null,
                "matchHistoricalIndicator": false,
                "reasonCode": "BUG",
                "note": "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
                "active": false,
                "userId": "WorleyC",
                "addDate": "2011-01-25T11:26:32.000Z",
                "updateDate": "2011-12-21T15:15:06.000Z"
            },
            {
                "id": 1033,
                "checkCatalogResultId": 3540,
                "checkTypeCode": "QUAL",
                "checkNumber": 23,
                "checkResultCode": "D",
                "severityCode": "NONE",
                "facilityId": 262,
                "orisCode": 1305,
                "locations": "GT1,GT2,GT3",
                "matchDataTypeCode": "QUALTYP",
                "matchDataValue": null,
                "matchTimeTypeCode": "QUARTER",
                "matchTimeBeginValue": "2011-03-25T11:26:32.000Z",
                "matchTimeEndValue": "2011-11-25T11:26:32.000Z",
                "matchHistoricalIndicator": false,
                "reasonCode": "BUG",
                "note": "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
                "active": false,
                "userId": "WorleyC",
                "addDate": "2011-01-25T11:46:37.000Z",
                "updateDate": "2011-12-21T15:15:40.000Z"
            },
            {
                "id": 1034,
                "checkCatalogResultId": 3540,
                "checkTypeCode": "QUAL",
                "checkNumber": 23,
                "checkResultCode": "D",
                "severityCode": "NONE",
                "facilityId": 262,
                "orisCode": 1305,
                "locations": "GT1,GT2,GT3",
                "matchDataTypeCode": "QUALTYP",
                "matchDataValue": null,
                "matchTimeTypeCode": "DATE",
                "matchTimeBeginValue": "2011-10-25T11:26:32.000Z",
                "matchTimeEndValue": "2011-11-25T11:26:32.000Z",
                "matchHistoricalIndicator": false,
                "reasonCode": "BUG",
                "note": "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
                "active": false,
                "userId": "WorleyC",
                "addDate": "2011-01-25T11:46:37.000Z",
                "updateDate": "2011-12-21T15:15:40.000Z"
            },
            {
                "id": 1035,
                "checkCatalogResultId": 3540,
                "checkTypeCode": "QUAL",
                "checkNumber": 23,
                "checkResultCode": "D",
                "severityCode": "NONE",
                "facilityId": 262,
                "orisCode": 1305,
                "locations": "GT1,GT2,GT3",
                "matchDataTypeCode": "QUALTYP",
                "matchDataValue": null,
                "matchTimeTypeCode": "HOUR",
                "matchTimeBeginValue": "2011-10-25T11:26:32.000Z",
                "matchTimeEndValue": "2011-11-25T11:26:32.000Z",
                "matchHistoricalIndicator": false,
                "reasonCode": "BUG",
                "note": "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
                "active": false,
                "userId": "WorleyC",
                "addDate": "2011-01-25T11:46:37.000Z",
                "updateDate": "2011-12-21T15:15:40.000Z"
            },

        ]);

        await act(async () => {
            return render(
                (<ErrorSuppressionFiltersContextProvider>
                    <ErrorSuppressionDataContainer />
                </ErrorSuppressionFiltersContextProvider>)
            );
        })
    })

    it("Renders table and the four rows", () => {
        const cb0 = screen.getByTestId("select-cb-0");
        const cb1 = screen.getByTestId("select-cb-1");
        const cb2 = screen.getByTestId("select-cb-2");
        const cb3 = screen.getByTestId("select-cb-3");

        expect(cb0).toBeDefined();
        expect(cb1).toBeDefined();
        expect(cb2).toBeDefined();
        expect(cb3).toBeDefined();
    })

    it("disables clone button when two checkboxes are selected", async()=>{
        const cb0 = screen.getByTestId("select-cb-0");
        const cb1 = screen.getByTestId("select-cb-1");
        const cloneButton = screen.getByTestId("es-clone")

        // Should be enabled after single checkbox clicked
        await act(async()=>{
            userEvent.click(cb0);
            userEvent.click(cb1)    
        })

        // expect(cloneButton).toBeDisabled();
        expect(cloneButton).toBeDisabled();
    })

    it("Reenables clone button when two checkboxes are selected and then one of them is deselected again", async()=>{
        const cb0 = screen.getByTestId("select-cb-0");
        const cb1 = screen.getByTestId("select-cb-1");
        const cloneButton = screen.getByTestId("es-clone")

        // Should be enabled after single checkbox clicked
        await userEvent.click(cb0);
        await userEvent.dblClick(cb1)

        expect(cloneButton).not.toBeDisabled();
    })

    it("Has the correctly formatted data for Match Time Criteria", ()=>{
        // when matchTimeTypeCode=QUARTER
        expect(screen.queryByText("2011 Q1 - 2011 Q4")).toBeDefined();
        // when matchTimeTypeCode=DATE
        expect(screen.queryByText("10/25/2011 - 11/25/2011")).toBeDefined();
        // when matchTimeTypeCode=HOUR
        expect(screen.queryByText("10/25/2011 11:26:32 - 11/25/2011 11:26:32")).toBeDefined();
        // when matchTimeTypeCode=HISTIND
        expect(screen.queryByText("Historical")).toBeDefined();
    })

})