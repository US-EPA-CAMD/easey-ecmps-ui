import React from "react";
import axios from "axios";
import { act, render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import {ImportHistoricalDataModal} from "./ImportHistoricalDataModal";
import * as redux from 'react-redux'
import config from "../../config";
import { getReportingPeriod,  } from "../export/ExportTab/ExportTab.test.mocks";
import userEvent from "@testing-library/user-event";

describe("ImportHistoricalDataModal Test", ()=>{

    let mock;
    let props;
    let apiUtilModule;
    let qaCertificationsApi;
    let emissionsApi;

    beforeAll(async () => {
        mock = new MockAdapter(axios);
        jest.spyOn(redux, 'useSelector')
            .mockReturnValue({ id:'mp-id' })
        apiUtilModule = await import("../../utils/api/apiUtils");
        qaCertificationsApi = await import(
            "../../utils/api/qaCertificationsAPI"
          );
        emissionsApi = await import("../../utils/api/emissionsApi");

    });

    beforeEach(()=>{
        props = {
            closeModalHandler:()=>null,
            setIsLoading: ()=>null,
            setFinishedLoading: ()=>null,
            importedFileErrorMsgs: [],
            setImportedFileErrorMsgs: ()=>null,
        }
        jest.spyOn(qaCertificationsApi, "getReportingPeriod")
            .mockResolvedValue(getReportingPeriod);

    }) 

    it("should do stuff", async ()=>{
        jest
            .spyOn(emissionsApi, "importEmissionsData")
            .mockResolvedValue({data:{}, status:201});
        jest
            .spyOn(emissionsApi, "exportEmissionsData")
            .mockResolvedValue({data:{}});
    
        await act(async ()=>{
            render(
                <ImportHistoricalDataModal
                    closeModalHandler={()=>null}
                    setIsLoading={()=>null}
                    setFinishedLoading={()=>null}
                    importedFileErrorMsgs={[]}
                    setImportedFileErrorMsgs={()=>null}
                />
            )
        })

        expect(screen.queryByText("Import Historical Data")).toBeDefined();
        const importBtn = screen.getByTestId("importBtn")
        userEvent.click(importBtn);

        await act(async () =>{
            expect(emissionsApi.exportEmissionsData).toHaveBeenCalledTimes(1)
            expect(emissionsApi.importEmissionsData).toHaveBeenCalledTimes(0)

        })
    })
    
})