import React from "react";
import { render, screen, } from "@testing-library/react";
import { DeactivateNotificationModal } from "./DeactivateNotificationModal";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";
import { secureAxios } from "../../../utils/api/easeyAuthApi";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";

describe("DeactivateNotificationModal", ()=>{
    // const mock = new MockAdapter(secureAxios);

    let component;
    let refreshTableMock;
    let errorSuppressionApi;

    beforeAll(async ()=>{
        errorSuppressionApi = await import('../../../utils/api/errorSuppressionApi');

        refreshTableMock = jest.fn();
        global.scrollTo = jest.fn();
        jest.spyOn(errorSuppressionApi, 'deactivateErrorSuppression').mockResolvedValue(
            {
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
            }
        )
    });

    beforeEach( ()=>{

        // mock
        // .onPut(`${config.services.camd.uri}/error-suppressions`)
        // .reply(200, );

        component = render(
            <DeactivateNotificationModal close={jest.fn()} showModal={jest.fn()} selectedRowIds={[1]} refreshTable={refreshTableMock}/>
        )    
    })

    it("successfully renders", ()=>{
        expect(component).toBeDefined();
    })

    it("Runs the refresh function after the save button is clicked", async ()=>{
        const saveButton = screen.getByTestId("saveBtn");
        
        await act(async ()=>{

            userEvent.click(saveButton);
        })
        expect(refreshTableMock).toHaveBeenCalled()
    })
})