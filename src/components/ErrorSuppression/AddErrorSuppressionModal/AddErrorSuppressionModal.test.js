import React from "react";
import { render, screen, } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AddErrorSupressionModal } from "./AddErrorSuppressionModal";
// import { ErrorSuppressionFiltersContextProvider } from "../context/error-suppression-context";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import { useSuppressionFiltersStore } from "../context/error-suppression-context";
import { ErrorSuppressionFiltersContext } from "../context/error-suppression-context";
import userEvent from "@testing-library/user-event";

describe("AddErrorSupressionModal component", () => {
    let component;
    const mock = new MockAdapter(axios);
    global.scrollTo = jest.fn();

    const orisCode = 6481;
    const configurations = [
        {
            id: "MDC-B70F8B921ADD47D29C2ACEFE8C6282BE",
            name: "1SGA",
            locations: [
                {
                    id: "2215",
                    name: "1SGA",
                    type: "unit",
                },
                // {
                //     id: "DA5461",
                //     name: "CS0AAN",
                //     type: "StackPipe",
                // },
            ],
        },
    ];

    mock.onGet(`${config.services.mdm.uri}/es-reason-codes`).reply(200, [
        {
            errorSuppressionReasonCode: "BUG",
            errorSuppressionReasonDescription: "Application Bug",
        },
    ]);

    mock.onGet(`${config.services.facilities.uri}/facilities`).reply(200, [
        {
            facilityRecordId: 1,
            facilityId: 3,
            facilityName: "Barry",
            stateCode: "AL",
        },
    ]);

    mock
        .onGet(`${config.services.mdm.uri}/es-check-catalog-results`)
        .reply(200, [
            {
                "id": "715",
                "checkTypeCode": "LINEAR",
                "checkTypeDescription": "Linearity Check",
                "checkNumber": "12",
                "checkResult": "A",
                "locationTypeCode": "LOC",
                "timeTypeCode": "DATE",
                "dataTypeCode": "TESTNUM",
                "dataTypeLabel": "Test Number",
                "dataTypeUrl": "/qa-certification-mgmt/workspace/locations/{id}/test-summary"
            },
        ]);

    mock
        .onGet(
            `${config.services.monitorPlans.uri
            }/configurations?orisCodes=${orisCode}`
        )
        .reply(200, configurations);

    mock
        .onGet(`${config.services.mdm.uri}/es-severity-codes`)
        .reply(200, [{ "severityCode": "NONE", "severityDescription": "No Errors" }, { "severityCode": "ADMNOVR", "severityDescription": "Administrative Override" }]);



    describe("Clone screen", () => {
        const tableRow = {
            "id": 482,
            "checkCatalogResultId": 715,
            "checkTypeCode": "LINEAR",
            "checkNumber": 12,
            "checkResultCode": "A",
            "severityCode": "NONE",
            "facilityId": 864,
            "orisCode": 6481,
            "locations": "1SGA",
            "matchDataTypeCode": "TESTNUM",
            "matchDataValue": "EPA-023-1024",
            "matchTimeTypeCode": "DATE",
            "matchTimeBeginValue": null,
            "matchTimeEndValue": null,
            "matchHistoricalIndicator": null,
            "reasonCode": "APPROVE",
            "note": "Approved by Matt B.  See RT 8808.",
            "active": false,
            "userId": "PQA",
            "addDate": "2009-05-05T17:40:29.000Z",
            "updateDate": "2009-12-16T11:55:28.000Z",
            "selected": true
        };
        let contextMock = {
            "transformedData": {
                "LINEAR": {
                    "12": [
                        {
                            "id": "715",
                            "checkTypeCode": "LINEAR",
                            "checkTypeDescription": "Linearity Check",
                            "checkNumber": "12",
                            "checkResult": "A",
                            "locationTypeCode": "LOC",
                            "timeTypeCode": "DATE",
                            "dataTypeCode": "TESTNUM",
                            "dataTypeLabel": "Test Number",
                            "dataTypeUrl": "/qa-certification-mgmt/workspace/locations/{id}/test-summary"
                        }
                    ]
                }
            },
            "facilityList": [],
            "reasonCodeList": []
        }

        beforeEach(async () => {

            component = await act(async () => {
                render(
                    <ErrorSuppressionFiltersContext.Provider value={contextMock}>
                        <AddErrorSupressionModal values={tableRow} />
                    </ErrorSuppressionFiltersContext.Provider>
                )
            })
        })

        it('should populate the form with proper values', () => {

            expect(screen.queryByText("Linearity Check (LINEAR)")).toBeDefined();
            expect(screen.queryByText("12")).toBeDefined();
            expect(screen.queryByText("A")).toBeDefined();
            expect(screen.queryByText("NONE")).toBeDefined();
            expect(screen.queryByText("APPROVE")).toBeDefined();
            expect(screen.queryByText("Intermountain (6481)")).toBeDefined();
            expect(screen.queryByText("Approved by Matt B.  See RT 8808.")).toBeDefined();
        })

        // it('should reset Check Number dropdown when Check Type dropown is reset', async()=>{
        //     const checkTypeDD = await screen.findByTestId("add-check-type");
        //     await act(async ()=>{
        //         await userEvent.click(checkTypeDD);
        //         await userEvent.click(screen.getByTestId("add-check-type-reset"));
        //     })

        //     //screen.debug();
        //     const checkNumberDD = await screen.findByTestId('add-check-number');
        //     expect(checkNumberDD).toHaveValue("false")
        //     // expect(screen.queryByTestId('add-check-number').target.value).toBe("false");
        // })

    })

})