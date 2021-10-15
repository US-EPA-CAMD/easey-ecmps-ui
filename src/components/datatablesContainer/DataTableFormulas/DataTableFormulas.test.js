import React from "react";
import { render, waitForElement, fireEvent, screen } from "@testing-library/react";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
//import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as axios from "axios";
import DataTableFormulas from "./DataTableFormulas";
import { act } from "react-dom/test-utils";
jest.mock("axios");

const selectedFormulas = [{}];

const locationSelectValue = 6;

// const radioName = "secondNormalIndicator";
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
        locationSelectValue: "1111",
        user: "testUser",
        checkout: false,
        inactive: [false],
        settingInactiveCheckBox: jest.fn(),
        revertedState: false,
        setRevertedState: jest.fn(),
    };
    return render(<DataTableFormulas {...props} />);
};

test("tests getMonitoringLoads", async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ status: 200, data: selectedFormulas })
    );
    const title = await mpApi.getMonitoringFormulas(locationSelectValue);
    expect(title.data).toEqual(selectedFormulas);

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
            const mockFormulas = [{
                locationId: 6,
                id: "TWCORNEL5-2B4684083C004FF1B34820C795A55464",
                parameterCode: "HI",
                formulaCode: "F-20",
                formulaId: "AZG",
                beginDate: "2019-07-01",
                beginHour: "0",
                endDate: null,
                endHour: null,
                formulaText: null,
                userId: "testUser",
                addDate: "2019-10-07",
                updateDate: null,
                active: true
            }];
            return {
                getMonitoringFormulas: jest.fn(() => Promise.resolve(mockFormulas))
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

// test("test create/save Load functions", async () => {
//   let { container } = await waitForElement(() =>
//     componentRenderer(false, false, false, true, false)
//   );

//   fireEvent.click(container.querySelector("#testingBtn"));
//   fireEvent.click(container.querySelector("#testingBtn2"));
//   fireEvent.click(container.querySelector("#testingBtn3"));
// });
