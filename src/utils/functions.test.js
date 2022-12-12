import {
  getConfigValue,
  getConfigValueBoolean,
  getConfigValueNumber,
  parseBool,
  updateCheckedOutLocationsOnTable,
  updateCheckedOutLocationsOnTables,
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
});

describe('Review and submit functions', () => {
  describe('checked out location functions', () => {
  let checkedOutLocationsMap, tables, monPlansStateSetter, qaStateSetter;
    beforeEach(() => {
      checkedOutLocationsMap = new Set(['1', '2', '3', '4']);
      monPlansStateSetter = jest.fn();
      qaStateSetter = jest.fn();
      tables = {
        monPlan: {
          ref: {
            current: [
              {
                selected: false,
                checkedOut: false,
                userCheckedOut: false,
                monPlanId: '1',
              },
              {
                selected: false,
                checkedOut: false,
                userCheckedOut: false,
                monPlanId: '5',
              },
            ],
          },
          state: [
            {
              selected: false,
              checkedOut: false,
              userCheckedOut: false,
              monPlanId: '1',
            },
            {
              selected: false,
              checkedOut: false,
              userCheckedOut: false,
              monPlanId: '5',
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
                monPlanId: '1',
              },
              {
                selected: false,
                checkedOut: false,
                userCheckedOut: false,
                monPlanId: '5',
              },
            ],
          },
          state: [
            {
              selected: false,
              checkedOut: false,
              userCheckedOut: false,
              monPlanId: '1',
            },
            {
              selected: false,
              checkedOut: false,
              userCheckedOut: false,
              monPlanId: '5',
            },
          ],
          setState: qaStateSetter,
        },
      };
    });
    describe("updateCheckedOutLocationsOnTables", () => {
      it('should update checked out locations on tables', () => {
        const checkedOutLocationTableRow = tables.monPlan.ref.current[0];
        updateCheckedOutLocationsOnTables(checkedOutLocationsMap, tables);
        expect(checkedOutLocationTableRow.checkedOut).toBe(true);
      });
      it('should not change rows whose location is not checked out', () => {
        const notCheckedOutLocationTableRow = tables.monPlan.ref.current[1];
        updateCheckedOutLocationsOnTables(checkedOutLocationsMap, tables);
        expect(notCheckedOutLocationTableRow.checkedOut).toBe(false);
      });
      it('updates state if there is change in checkedOut locations', () => {
        updateCheckedOutLocationsOnTables(checkedOutLocationsMap, tables);
        expect(monPlansStateSetter).toHaveBeenCalled();
        expect(qaStateSetter).toHaveBeenCalled();
      });
      it('does not update state if there is no change in checkedOut locations', () => {
        checkedOutLocationsMap = new Set([]);
        updateCheckedOutLocationsOnTables(checkedOutLocationsMap, tables);
        expect(monPlansStateSetter).not.toHaveBeenCalled();
        expect(qaStateSetter).not.toHaveBeenCalled();
      });
    })
    describe('updateCheckedOutLocationsOnTable', () => {
      it('should update ref if there is a change in checked out locations', () => {
        const {monPlan} = tables;
        const {ref} = monPlan, checkedOutTableRow = ref.current[0];
        updateCheckedOutLocationsOnTable(ref, monPlan.setState, checkedOutLocationsMap);
        expect(checkedOutTableRow.checkedOut).toBe(true);
      });
      it('should call state setter if there is a change in checked out locations', () => {
        const {monPlan} = tables;
        updateCheckedOutLocationsOnTable(monPlan.ref, monPlan.setState, checkedOutLocationsMap);
        expect(monPlansStateSetter).toHaveBeenCalled();
      });
      it('should not update ref if there is no change in checked out locations', () => {
        checkedOutLocationsMap = new Set([]);
        const {monPlan} = tables;
        const {ref} = monPlan, notCheckedOutTableRow = ref.current[0];
        updateCheckedOutLocationsOnTable(ref, monPlan.setState, checkedOutLocationsMap);
        expect(notCheckedOutTableRow.checkedOut).toBe(false);
      });
      it('should not call state setter if there is no change in checked out locations', () => {
        checkedOutLocationsMap = new Set([]);
        const {monPlan} = tables;
        const {ref} = monPlan;
        updateCheckedOutLocationsOnTable(ref, monPlan.setState, checkedOutLocationsMap);
        expect(monPlansStateSetter).not.toHaveBeenCalled();
      });
    });
  });
});
