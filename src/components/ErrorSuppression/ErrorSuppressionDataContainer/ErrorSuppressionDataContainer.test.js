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
                "matchDataValue": null,
                "matchTimeTypeCode": "HISTIND",
                "matchTimeBeginValue": null,
                "matchTimeEndValue": null,
                "matchHistoricalIndicator": false,
                "reasonCode": "BUG",
                "note": "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
                "active": false,
                "userId": "WorleyC",
                "addDate": "2011-10-25T11:26:32.000Z",
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
                "matchTimeTypeCode": "HISTIND",
                "matchTimeBeginValue": null,
                "matchTimeEndValue": null,
                "matchHistoricalIndicator": false,
                "reasonCode": "BUG",
                "note": "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
                "active": false,
                "userId": "WorleyC",
                "addDate": "2011-10-25T11:46:37.000Z",
                "updateDate": "2011-12-21T15:15:40.000Z"
            }]);

        component = await waitForElement(async () => {
            return render(
                (<ErrorSuppressionFiltersContextProvider>
                    <ErrorSuppressionDataContainer />
                </ErrorSuppressionFiltersContextProvider>)
            );
        })
    })

    it("Renders component", ()=>{
        expect(component).toBeDefined();
    })

    it("Renders table and checkbox", () => {
        const cb0 = screen.getByTestId("select-cb-0");
        const cb1 = screen.getByTestId("select-cb-1");

        expect(cb0).toBeDefined();
        expect(cb1).toBeDefined();
    })

    it("tests when clone button is disabled/enabled", async()=>{
        const {getByText} = component;
        const cb0 = await screen.findByTestId("select-cb-0");
        const cb1 = await screen.findByTestId("select-cb-1");

        // Should be enabled after single checkbox clicked
        await userEvent.click(cb0);
        let cloneButton = await screen.findByTestId("es-clone")
        expect(cloneButton).not.toBeDisabled()
        
        // Should be disabled when multiple checkboxes are checked
        await userEvent.click(cb1);
        await expect(screen.findByTestId("es-clone")).toBeDisabled();
        screen.debug();
    })
})