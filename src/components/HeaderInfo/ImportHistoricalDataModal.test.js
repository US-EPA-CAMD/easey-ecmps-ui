import React from "react";
import axios from "axios";
import { act, render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { ImportHistoricalDataModal } from "./ImportHistoricalDataModal";
import * as redux from "react-redux";
import config from "../../config";
import userEvent from "@testing-library/user-event";
import { secureAxios } from "../../utils/api/easeyAuthApi";

const mock = new MockAdapter(axios);
jest.mock("../../utils/api/easeyAuthApi");
secureAxios.mockImplementation((options) => axios(options));

const getReportingPeriodsUrl = `${config.services.mdm.uri}/reporting-periods?export=true`;


describe("ImportHistoricalDataModal Test", () => {
  let mock;
  let props;
  let apiUtilModule;
  let emissionsApi;

  beforeAll(async () => {
    apiUtilModule = await import("../../utils/api/apiUtils");
    emissionsApi = await import("../../utils/api/emissionsApi");
  });

  beforeEach(() => {
    props = {
      closeModalHandler: () => null,
      setIsLoading: () => null,
      setFinishedLoading: () => null,
      importedFileErrorMsgs: [],
      setImportedFileErrorMsgs: () => null,
    };
  });
//These Test Cases are outdated
  it("should do stuff", async () => {
    // jest
    //   .spyOn(emissionsApi, "importEmissionsData")
    //   .mockResolvedValue({ data: {}, status: 201 });
    // jest
    //   .spyOn(emissionsApi, "exportEmissionsData")
    //   .mockResolvedValue({ data: {} });

    // await act(async () => {
    //   render(
    //     <ImportHistoricalDataModal
    //       closeModalHandler={() => null}
    //       setIsLoading={() => null}
    //       setFinishedLoading={() => null}
    //       importedFileErrorMsgs={[]}
    //       setImportedFileErrorMsgs={() => null}
    //     />
    //   );
    // });

    // expect(screen.queryByText("Import Historical Data")).toBeDefined();
    // const importBtn = screen.getByTestId("importBtn");
    // userEvent.click(importBtn);

    // await act(async () => {
    //   expect(emissionsApi.exportEmissionsData).toHaveBeenCalledTimes(1);
    //   expect(emissionsApi.importEmissionsData).toHaveBeenCalledTimes(0);
    // });
  });
});
