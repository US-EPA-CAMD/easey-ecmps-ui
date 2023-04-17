import _ from "lodash";
import {
  formatDate,
  getConfigValue,
  getConfigValueBoolean,
  getConfigValueNumber,
  isLocationUserCheckedOut,
  parseBool,
  updateCheckedOutLocationsOnTable,
  getPreviouslyFullSubmitedQuarter,
  evalStatusStyle,
  alertStyle,
  getQuarter,
} from "./functions";

describe("functions.js", function () {
  describe("parseBool", function () {
    it("should return false as a default", function () {
      expect(parseBool({})).toEqual(false);
      expect(parseBool("hello")).toEqual(false);
    });

    it("should return boolean for number value", function () {
      expect(parseBool(2)).toEqual(true);
      expect(parseBool(0)).toEqual(false);
      expect(parseBool(-2)).toEqual(false);
    });

    it("should return boolean for boolean value", function () {
      expect(parseBool(true)).toEqual(true);
      expect(parseBool(false)).toEqual(false);
    });

    it("should return a boolean for string value", function () {
      expect(parseBool("truE")).toEqual(true);
      expect(parseBool("false")).toEqual(false);
    });
  });

  describe("getConfigValue", function () {
    it("should return default value if none found", function () {
      expect(getConfigValue(undefined, "default")).toEqual("default");
    });

    it("should return process env values", function () {
      process.env.TEST_TEST_TEST = 1;
      expect(getConfigValue("TEST_TEST_TEST")).toEqual("1");
    });
  });

  describe("getConfigValueNumber", function () {
    it("should return a number given a config number", function () {
      process.env.TEST_TEST_TEST = 1;
      expect(getConfigValueNumber("TEST_TEST_TEST")).toEqual(1);
    });

    it("should return a boolean given a config boolean", function () {
      process.env.TEST_TEST_TEST = "true";
      expect(getConfigValueBoolean("TEST_TEST_TEST")).toEqual(true);
    });
  });

  describe("Review and submit functions", () => {
    describe("checked out location functions", () => {
      let checkedOutLocationsMap = new Map(),
        tables,
        userId,
        monPlansStateSetter,
        qaStateSetter,
        checkedOutLocationsArray = [
          {
            facId: 946,
            monPlanId: "1",
            checkedOutOn: "2022-12-08T14:54:31.881Z",
            checkedOutBy: "rboehme-dp",
            lastActivity: "2022-12-08T14:54:31.881Z",
          },
          {
            facId: 946,
            monPlanId: "2",
            checkedOutOn: "2022-12-08T14:54:31.881Z",
            checkedOutBy: "rboehme-dp",
            lastActivity: "2022-12-08T14:54:31.881Z",
          },
          {
            facId: 946,
            monPlanId: "3",
            checkedOutOn: "2022-12-08T14:54:31.881Z",
            checkedOutBy: "rboehme-dp",
            lastActivity: "2022-12-08T14:54:31.881Z",
          },
          {
            facId: 946,
            monPlanId: "4",
            checkedOutOn: "2022-12-08T14:54:31.881Z",
            checkedOutBy: "rboehme-dp",
            lastActivity: "2022-12-08T14:54:31.881Z",
          },
        ];
      beforeEach(() => {
        checkedOutLocationsMap = new Map();
        checkedOutLocationsArray.forEach((el) => {
          checkedOutLocationsMap.set(el.monPlanId, el);
        });
        monPlansStateSetter = jest.fn();
        qaStateSetter = jest.fn();
        userId = "test-user";
        tables = {
          monPlan: {
            ref: {
              current: [
                {
                  selected: false,
                  checkedOut: false,
                  userCheckedOut: false,
                  monPlanId: "1",
                },
                {
                  selected: false,
                  checkedOut: false,
                  userCheckedOut: false,
                  monPlanId: "5",
                },
              ],
            },
            state: [
              {
                selected: false,
                checkedOut: false,
                userCheckedOut: false,
                monPlanId: "1",
              },
              {
                selected: false,
                checkedOut: false,
                userCheckedOut: false,
                monPlanId: "5",
              },
            ],
            setState: monPlansStateSetter,
          },
          qaTest: {
            ref: {
              current: [
                {
                  selected: false,
                  checkedOut: false,
                  userCheckedOut: false,
                  monPlanId: "1",
                },
                {
                  selected: false,
                  checkedOut: false,
                  userCheckedOut: false,
                  monPlanId: "5",
                },
              ],
            },
            state: [
              {
                selected: false,
                checkedOut: false,
                userCheckedOut: false,
                monPlanId: "1",
              },
              {
                selected: false,
                checkedOut: false,
                userCheckedOut: false,
                monPlanId: "5",
              },
            ],
            setState: qaStateSetter,
          },
        };
      });
      describe("isLocationUserCheckedOut", () => {
        it("should return true if location is checked out by user", () => {
          const relevantLocation = checkedOutLocationsArray[0];
          const monPlanId = relevantLocation.monPlanId,
            userId = relevantLocation.checkedOutBy;
          const result = isLocationUserCheckedOut(
            checkedOutLocationsMap,
            monPlanId,
            userId
          );
          expect(result).toBe(true);
        });
        it("should return false if location is not checked out by user", () => {
          const relevantLocation = checkedOutLocationsArray[0];
          const monPlanId = relevantLocation.monPlanId,
            differentUserId = "different user";
          const result = isLocationUserCheckedOut(
            checkedOutLocationsMap,
            monPlanId,
            differentUserId
          );
          expect(result).toBe(false);
        });
      });

      describe("updateCheckedOutLocationsOnTable", () => {
        it("should update ref if there is a change in checked out locations", () => {
          const { monPlan } = tables;
          const { ref } = monPlan,
            checkedOutTableRow = ref.current[0];
          updateCheckedOutLocationsOnTable(
            ref,
            monPlan.setState,
            checkedOutLocationsMap,
            userId
          );
          expect(checkedOutTableRow.checkedOut).toBe(true);
        });
        it("should call state setter if there is a change in checked out locations", () => {
          const { monPlan } = tables;
          updateCheckedOutLocationsOnTable(
            monPlan.ref,
            monPlan.setState,
            checkedOutLocationsMap,
            userId
          );
          expect(monPlansStateSetter).toHaveBeenCalled();
        });
        it("should not update ref if there is no change in checked out locations", () => {
          checkedOutLocationsMap = new Map();
          const { monPlan } = tables;
          const { ref } = monPlan,
            notCheckedOutTableRow = ref.current[0];
          updateCheckedOutLocationsOnTable(
            ref,
            monPlan.setState,
            checkedOutLocationsMap,
            userId
          );
          expect(notCheckedOutTableRow.checkedOut).toBe(false);
        });
        it("should not call state setter if there is no change in checked out locations", () => {
          checkedOutLocationsMap = new Map();
          const { monPlan } = tables;
          const { ref } = monPlan;
          updateCheckedOutLocationsOnTable(
            ref,
            monPlan.setState,
            checkedOutLocationsMap,
            userId
          );
          expect(monPlansStateSetter).not.toHaveBeenCalled();
        });
      });
    });
    describe("evalStatusStyle", () => {
      it("returns empty string if no status is given", () => {
        const result = evalStatusStyle();
        expect(result).toBe("");
      });
      it('returns "usa-alert--warning" if "ERR" is the status', () => {
        const result = evalStatusStyle("ERR");
        expect(result).toBe("usa-alert--warning");
      });
      it('returns "usa-alert--warning" if "EVAL" is the status', () => {
        const result = evalStatusStyle("EVAL");
        expect(result).toBe("usa-alert--warning");
      });
      it('returns "usa-alert--success" if "INFO" is the status', () => {
        const result = evalStatusStyle("INFO");
        expect(result).toBe("usa-alert--success");
      });
      it('returns "usa-alert--success" if "PASS" is the status', () => {
        const result = evalStatusStyle("PASS");
        expect(result).toBe("usa-alert--success");
      });
      it('returns "usa-alert--info" if "INQ" is the status', () => {
        const result = evalStatusStyle("INQ");
        expect(result).toBe("usa-alert--info");
      });
      it('returns "usa-alert--info" if "WIP" is the status', () => {
        const result = evalStatusStyle("WIP");
        expect(result).toBe("usa-alert--info");
      });
    });
    describe("alertStyle", () => {
      it("returns returns correct string with eval status", () => {
        const evalStatus = "PASS";
        const result = alertStyle(evalStatus);
        const expectedResult = `padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
          evalStatus
        )} margin-y-0 maintainBorder`;
        expect(result).toBe(expectedResult);
      });
    });

    // describe("displayReport", () => {
    //   it("returns returns correct string with eval status", () => {
    //     const windowOpenMock = jest.fn();
    //     global.open = () => windowOpenMock();
    //     const monPlanId = "123",
    //       reportCodes = ["MP_EVAL", "MPP", "MP_AUDIT", "Evaluation"];
    //     reportCodes.forEach((code) => displayReport(monPlanId, code));
    //     expect(windowOpenMock).toHaveBeenCalledTimes(4);
    //   });
    // });

    /*
    describe("addEvalStatusCell", () => {
      it("adds cell with alert style to eval status columns", () => {
        const columns = addEvalStatusCell(_.clone(monPlanColumns, 
          () => {}));
          console.log(columns)
        const evalStatusColumn = columns.find(
          (column) => column.name === "Eval Status"
        );
        expect(evalStatusColumn).not.toBeDefined();
      });
      it("does not add cell with alert style to non eval status columns", () => {
        const columns = addEvalStatusCell(_.clone(monPlanColumns), () => {});
        const nonEvalStatusColumn = columns.find(
          (column) => column.name !== "Eval Status"
        );
        expect(nonEvalStatusColumn.cell).not.toBeDefined();
      });
    });
    */
  });

  describe("getPreviouslyFullSubmitedQuarter tests", () => {
    it("returns 2021 Q3 for input date 2022-01-01 (beginning of Q1)", () => {
      const yearQuarter = getPreviouslyFullSubmitedQuarter("01/01/2022");
      expect(yearQuarter).toBe("2021 Q3");
    });

    it("returns 2021 Q4 for input date 04/01/2022 (beginning of Q2)", () => {
      const yearQuarter = getPreviouslyFullSubmitedQuarter("04/01/2022");
      expect(yearQuarter).toBe("2021 Q4");
    });

    it("returns 2022 Q1 for input date 07/01/2022 (beginning of Q3)", () => {
      const yearQuarter = getPreviouslyFullSubmitedQuarter("07/01/2022");
      expect(yearQuarter).toBe("2022 Q1");
    });

    it("returns 2022 Q2 for input date 10/01/2022 (beginning of Q3)", () => {
      const yearQuarter = getPreviouslyFullSubmitedQuarter("10/01/2022");
      expect(yearQuarter).toBe("2022 Q2");
    });
  });

  describe("getQuarter tests", ()=>{
    it('returns quarter 1 for January 1st, February 1st, March 31st', ()=>{
      expect(getQuarter(new Date("2023/01/01"))).toBe(1);
      expect(getQuarter(new Date("2023/02/01"))).toBe(1);
      expect(getQuarter(new Date("2023/03/31"))).toBe(1);
    });

    it('returns quarter 2 for April 1st, May 1st, June 30th', ()=>{
      expect(getQuarter(new Date("2023/04/01"))).toBe(2);
      expect(getQuarter(new Date("2023/05/01"))).toBe(2);
      expect(getQuarter(new Date("2023/06/30"))).toBe(2);
    });

    it('returns quarter 3 for July 1st, August 1st, September 30th', ()=>{
      expect(getQuarter(new Date("2023/07/01"))).toBe(3);
      expect(getQuarter(new Date("2023/08/01"))).toBe(3);
      expect(getQuarter(new Date("2023/09/30"))).toBe(3);
    });

    it('returns quarter 4 for October 1st, November 1st, December 31st', ()=>{
      expect(getQuarter(new Date("2023/10/01"))).toBe(4);
      expect(getQuarter(new Date("2023/11/01"))).toBe(4);
      expect(getQuarter(new Date("2023/12/31"))).toBe(4);
    });
  })
});
