import React from "react";
import { render, screen, } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ErrorSuppressionFilters } from "./ErrorSuppressionFilters";
import { ErrorSuppressionFiltersContextProvider } from "../error-suppression-context";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";

const configurations = [
    {
      id: "MDC-DSF87364AD9879A8FDS7G",
      name: "1, 2, CS0AAN",
      locations: [
        {
          id: "BZ5461",
          name: "1",
          type: "Unit",
        },
        {
          id: "CZ5461",
          name: "2",
          type: "Unit",
        },
        {
          id: "DA5461",
          name: "CS0AAN",
          type: "StackPipe",
        },
      ],
    },
  ];

describe("ErrorSuppressionFilters component", () => {

    const mock = new MockAdapter(axios);

    beforeEach( async() => {
        mock
        .onGet(`${config.services.mdm.uri}/es-reason-codes`)
        .reply(200, [{"errorSuppressionReasonCode":"BUG","errorSuppressionReasonDescription":"Application Bug"}]);

        mock
        .onGet(`${config.services.facilities.uri}/facilities`)
        .reply(200, [{"facilityRecordId":1,"facilityId":3,"facilityName":"Barry","stateCode":"AL"}]);

        mock
        .onGet(`${config.services.mdm.uri}/es-check-catalog-results`)
        .reply(200, [
            {
                "id": "5003",
                "checkTypeCode": "ADESTAT",
                "checkTypeDescription": "Appendix D and E Status",
                "checkNumber": "6",
                "checkResult": "Accuracy Test Not Yet Evaluated",
                "locationTypeCode": "LOC",
                "timeTypeCode": "HOUR",
                "dataTypeCode": "FUELTYP",
                "dataTypeLabel": "Fuel Type",
                "dataTypeUrl": "/master-data-mgmt/fuel-type-codes"
            }]);

            mock
            .onGet(`${config.services.mdm.uri}/workspace/configurations}`)
            .reply(200, configurations);

            await act(async () => {
                render(<ErrorSuppressionFiltersContextProvider>
                                <ErrorSuppressionFilters />
                            </ErrorSuppressionFiltersContextProvider>)
            });
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

    it('renders Facility dropdown', () => {
        expect(screen.getByLabelText("Facility Name/ID")).toBeDefined();
    })

    it('renders Location multiselect', () => {
        expect(screen.getByLabelText("Location Name")).toBeDefined();
    })

    it('renders Active checkbox', () => {
        expect(screen.getByLabelText("Active")).toBeDefined();
    })

    it('renders Reason dropdown', () => {
        expect(screen.getByLabelText("Facility Name/ID")).toBeDefined();
    })

    it('renders Add Date After and Before datepickers', () => {
        expect(screen.queryByText("Add Date After")).toBeDefined();
        expect(screen.queryByText("Add Date Before")).toBeDefined();
    })

    it('renders Clear and Apply Filter buttons', () => {
        expect(screen.queryByText("Clear")).toBeDefined();
        expect(screen.queryByText("Apply Filters")).toBeDefined();
    })
})