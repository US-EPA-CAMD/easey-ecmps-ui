import React from "react";
import { render, waitForElement, fireEvent, screen } from "@testing-library/react";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
//import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as axios from "axios";
import DataTableQualifications from "./DataTableQualifications";
import { act } from "react-dom/test-utils";
jest.mock("axios");

const selectedQualifications = [{}];

const locationSelectValue = 60;

// const userInput = extractUserInput(payload, ".modalUserInput", radioName);

//testing redux connected component to mimic props passed as argument
const componentRenderer = (
    checkout,
    secondLevel,
    addComponentFlag,
    openComponentViewTest,
    openAddComponentTest
) => {
    const props = {
        locationSelectValue: "60",
        user: "testUser",
        checkout: false,
        inactive: [false],
        settingInactiveCheckBox: jest.fn(),
        revertedState: false,
        setRevertedState: jest.fn(),
    };
    return render(<DataTableQualifications {...props} />);
};

test("tests getMonitoringQualifications", async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ status: 200, data: selectedQualifications })
    );
    const title = await mpApi.getQualifications(locationSelectValue);
    expect(title.data).toEqual(selectedQualifications);

    let { container } = await waitForElement(() =>
        componentRenderer(false, false, false, true, false)
    );
    expect(container).toBeDefined();
});


test('test opening the Modal to view formula details and then closing', async () => {
    act(async () => {

        let { container } = await waitForElement(() => {
            componentRenderer(false, false, false, true, false);
        });

        jest.mock("../../../utils/api/monitoringPlansApi", () => {
            const mockQual = [{
                id: "EP-CONTROL-F9384183CDDF4104AEDEB1855D375ECD",
                locationId: "60",
                qualificationTypeCode: "PK",
                beginDate: "2000-01-01T00:00:00.000Z",
                endDate: "2005-12-31T00:00:00.000Z",
                userId: "RHamerni",
                addDate: "2009-09-21",
                updateDate: null,
                active: false,
                leeQualifications: null,
                lmeQualifications: null,
                pctQualifications: null
            }];
            return {
                getQualifications: jest.fn(() => Promise.resolve(mockQual))
            }
        });

        viewBtn = container.getByText('View');

        fireEvent.click(viewBtn);

        closeBtn = container.getByTestId('closeModalBtn')
        //Modal X button
        expect(closeBtn).toBeInTheDocument();
        //Header
        expect(container.getByText('Formula')).toBeInTheDocument();

        fireEvent.click(closeBtn);
        expect(closeBtn).not.toBeInTheDocument();
    });
});

test("test create/save Load functions", async () => {
    let { container } = await waitForElement(() =>
        componentRenderer(false, false, false, true, false)
    );

    fireEvent.click(container.querySelector("#testingBtn"));
    fireEvent.click(container.querySelector("#testingBtn2"));
});
