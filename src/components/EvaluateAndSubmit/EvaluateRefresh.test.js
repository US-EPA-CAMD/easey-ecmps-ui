import React from "react";
import { render, act } from "@testing-library/react";
import EvaluateRefresh from "./EvaluateRefresh";
import config from "../../config";

jest.useFakeTimers();

const callFunc = jest.fn();

describe("EvaluateRefresh Component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <EvaluateRefresh
          dataList={[
            {
              ref: { current: [{ monPlanId: "test", evalStatusCode: "PASS" }] },
              call: callFunc.mockResolvedValue({
                data: [
                  {
                    monPlanId: "test",
                    evalStatusCode: "ERR",
                  },
                ],
              }),
              rowId: "monPlanId",
              name: "Monitoring Plan",
              type: "MP",
            },
          ]}
          storedFilters={{
            current: {
              orisCodes: [],
              monPlanIds: [],
              submissionPeriods: [],
            },
          }}
          lastEvalTime={{ current: 0 }}
        />
      );
    });
  });

  it("Fast forward timer and expect mock calls to have been made", async () => {
    await act(async () => {
      jest.advanceTimersByTime(config.app.refreshEvalStatusRate);
    });
    expect(callFunc).toHaveBeenCalled();
  });
});
