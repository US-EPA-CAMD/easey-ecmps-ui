import React from "react";
import config from "../../config";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { EmissionsTabTable } from "./EmissionsTabTable";
import { act, render, screen } from "@testing-library/react";

describe("Emissions Tab Table", function () {
  let mock;
  let viewCode;
  let params;
  let url;
  let searchParams;
  let apiUtilModule;

  beforeAll(async () => {
    mock = new MockAdapter(axios);
    apiUtilModule = await import("../../utils/api/apiUtils");
    jest.spyOn(apiUtilModule, "handleError").mockResolvedValue(undefined);
  });

  beforeEach(() => {
    viewCode = "DAILYCAL";
    params = {
      monitorPlanId: "234",
      quarter: "234",
      year: "234",
      unitIds: "234",
      stackPipeIds: "234",
    };
    url = `${config.services.emissions.uri}/emissions/views/${viewCode}`;
    searchParams = new URLSearchParams(params);
  });

  it("should show table when there is valid data", async function () {
    mock.onGet(`${url.toString()}?${searchParams.toString()}`).reply(
      200,
      [
        {
          Column1: "hello",
          Column2: "hi",
        },
      ],
      {
        "x-field-mappings": JSON.stringify([
          {
            value: "Column1",
            label: "Column One",
          },
          {
            value: "Column2",
            label: "Column Two",
          },
        ]),
      }
    );

    await act(async () => {
      render(
        <EmissionsTabTable
          stackPipeIds={params.stackPipeIds}
          unitIds={params.unitIds}
          viewCode={viewCode}
          quarter={params.quarter}
          year={params.quarter}
          monitorPlanId={params.monitorPlanId}
        />
      );
    });

    expect(screen.getByText("Column One")).toBeDefined();
    expect(screen.getByText("Column Two")).toBeDefined();
    expect(screen.getByText("hello")).toBeDefined();
    expect(screen.getByText("hi")).toBeDefined();
  });

  it("should display nothing if there is no data", async function () {
    mock
      .onGet(`${url.toString()}?${searchParams.toString()}`)
      .reply(200, undefined);

    await act(async () => {
      render(
        <EmissionsTabTable
          stackPipeIds={params.stackPipeIds}
          unitIds={params.unitIds}
          viewCode={viewCode}
          quarter={params.quarter}
          year={params.quarter}
          monitorPlanId={params.monitorPlanId}
        />
      );
    });

    expect(apiUtilModule.handleError).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Column One")).toBeNull();
    expect(screen.queryByText("Column Two")).toBeNull();
  });
});
