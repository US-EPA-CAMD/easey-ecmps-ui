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

  beforeAll(async () => {
    mock = new MockAdapter(axios);
    const apiUtilModule = await import("../../utils/api/apiUtils");
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
    mock.onGet(`${url.toString()}?${searchParams.toString()}`).reply(200, {
      columns: [
        {
          name: "Column1",
          displayName: "Column One",
        },
        {
          name: "Column2",
          displayName: "Column Two",
        },
      ],
      results: [
        {
          Column1: "hello",
          Column2: "hi",
        },
      ],
    });

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

    const columnOne = screen.getByText("Column One");
    const columnTwo = screen.getByText("Column Two");
    const hello = screen.getByText("hello");
    const hi = screen.getByText("hi");
    expect(columnOne).toBeDefined();
    expect(columnTwo).toBeDefined();
    expect(hello).toBeDefined();
    expect(hi).toBeDefined();
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

    const columnOne = screen.queryByText("Column One");
    const columnTwo = screen.queryByText("Column Two");
    expect(columnOne).toBeNull();
    expect(columnTwo).toBeNull();
  });
});
