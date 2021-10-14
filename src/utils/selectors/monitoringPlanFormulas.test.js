import * as fs from "./monitoringPlanFormulas";

describe("testing monitoring plan data selectors", () => {
    let selectedMonitoringFormulas;
    let monitoringFormulasTableRecods;

    beforeAll(() => {
        selectedMonitoringFormulas = [
            {
                id: "TWCORNEL5-2B4684083C004FF1B34820C795A55464",
                locationId: "6",
                parameterCode: "HI",
                formulaCode: "F-20",
                formulaId: "AZG",
                beginDate: null,
                beginHour: null,
                endDate: null,
                endHour: null,
                formulaText: null,
                userId: "bvick",
                addDate: "2019-10-07",
                updateDate: null,
                active: true
            },
            {
                id: "TWCORNEL5-80F48AB52FC948A08E99030D307B6A26",
                locationId: "6",
                parameterCode: "SO2",
                formulaCode: "D-5",
                formulaId: "AZH",
                beginDate: "2019-07-01",
                beginHour: "0",
                endDate: null,
                endHour: null,
                formulaText: null,
                userId: "bvick",
                addDate: "2019-10-07",
                updateDate: null,
                active: true
            },
            {
                id: "TWCORNEL5-D99581B275634FD59E4F50C6AB3A5588",
                locationId: "6",
                parameterCode: "CO2",
                formulaCode: "G-4",
                formulaId: "AZI",
                beginDate: "2019-07-01",
                beginHour: "0",
                endDate: null,
                endHour: null,
                formulaText: null,
                userId: "bvick",
                addDate: "2019-10-07",
                updateDate: null,
                active: true
            },
            {
                id: "CAMD-CEF3025332484B8790DD44B63D9DC0AB",
                locationId: "5",
                parameterCode: "SO2",
                formulaCode: "F-1",
                formulaId: "AZA",
                beginDate: "1993-10-01",
                beginHour: "0",
                endDate: "2019-06-30",
                endHour: "23",
                formulaText: "1.660 * 10**-7 * S#(AA6-AA1) * S#(AA9-AA4)",
                userId: "bvick",
                addDate: "2009-02-20",
                updateDate: "2019-10-07",
                active: false
            },
        ];

        monitoringFormulasTableRecods = [
            {
                col1: "HI",
                col2: "F-20",
                col3: null,
                col4: " ",
                col5: " ",
                col6: "TWCORNEL5-2B4684083C004FF1B34820C795A55464",
            },
            {
                col1: "SO2",
                col2: "D-5",
                col3: null,
                col4: "07/01/2019 0",
                col5: " ",
                col6: "TWCORNEL5-80F48AB52FC948A08E99030D307B6A26",
            },
            {
                col1: "CO2",
                col2: "G-4",
                col3: null,
                col4: "07/01/2019 0",
                col5: " ",
                col6: "TWCORNEL5-D99581B275634FD59E4F50C6AB3A5588",
            },
            {
                col1: "SO2",
                col2: "F-1",
                col3: "1.660 * 10**-7 * S#(AA6-AA1) * S#(AA9-AA4)",
                col4: "10/01/1993 0",
                col5: "06/30/2019 23",
                col6: "CAMD-CEF3025332484B8790DD44B63D9DC0AB",
            },
        ];
    });
    test("should generate data table records for monitoring formulas", () => {
        expect(
            fs.getMonitoringPlansFormulasTableRecords(selectedMonitoringFormulas)
        ).toEqual(monitoringFormulasTableRecods);
    });
});