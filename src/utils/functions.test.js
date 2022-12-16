import {
  formatDate,
  getConfigValue,
  getConfigValueBoolean,
  getConfigValueNumber,
  isLocationCheckedOutByUser,
  isLocationUserCheckedOut,
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
  describe("format date", () => {
    it('should format date', () => {
      const dateString = '2022-10-25T12:14:29.997Z';
      const formattedDateString = '10-25-2022';
      const result = formatDate(dateString);
      expect(result).toEqual(formattedDateString);
    })
  })
  describe('Review and submit functions', () => {
    describe('checked out location functions', () => {
    let checkedOutLocationsMap = new Map(),
      tables,
      userId,
      monPlansStateSetter,
      qaStateSetter,
      checkedOutLocationsArray = [
        {
          facId: 946,
          monPlanId: '1',
          checkedOutOn: '2022-12-08T14:54:31.881Z',
          checkedOutBy: 'rboehme-dp',
          lastActivity: '2022-12-08T14:54:31.881Z',
        },
        {
          facId: 946,
          monPlanId: '2',
          checkedOutOn: '2022-12-08T14:54:31.881Z',
          checkedOutBy: 'rboehme-dp',
          lastActivity: '2022-12-08T14:54:31.881Z',
        },
        {
          facId: 946,
          monPlanId: '3',
          checkedOutOn: '2022-12-08T14:54:31.881Z',
          checkedOutBy: 'rboehme-dp',
          lastActivity: '2022-12-08T14:54:31.881Z',
        },
        {
          facId: 946,
          monPlanId: '4',
          checkedOutOn: '2022-12-08T14:54:31.881Z',
          checkedOutBy: 'rboehme-dp',
          lastActivity: '2022-12-08T14:54:31.881Z',
        },
      ];
      beforeEach(() => {
        checkedOutLocationsMap = new Map();
        checkedOutLocationsArray.forEach((el) => {
          checkedOutLocationsMap.set(el.monPlanId, el);
        })
        monPlansStateSetter = jest.fn();
        qaStateSetter = jest.fn();
        userId = 'test-user';
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
      describe('isLocationUserCheckedOut', () => {
        it('should return true if location is checked out by user', () => {
          const relevantLocation = checkedOutLocationsArray[0];
          const monPlanId = relevantLocation.monPlanId, userId = relevantLocation.checkedOutBy;
          const result = isLocationUserCheckedOut(checkedOutLocationsMap, monPlanId, userId);
          expect(result).toBe(true);
        });
        it('should return false if location is not checked out by user', () => {
          const relevantLocation = checkedOutLocationsArray[0];
          const monPlanId = relevantLocation.monPlanId, differentUserId = 'different user';
          const result = isLocationUserCheckedOut(checkedOutLocationsMap, monPlanId, differentUserId);
          expect(result).toBe(false);
        })
      })

      describe("updateCheckedOutLocationsOnTables", () => {
        it('should update checked out locations on tables', () => {
          const checkedOutLocationTableRow = tables.monPlan.ref.current[0];
          updateCheckedOutLocationsOnTables(checkedOutLocationsMap, tables, userId);
          expect(checkedOutLocationTableRow.checkedOut).toBe(true);
        });
        it('should not change rows whose location is not checked out', () => {
          const notCheckedOutLocationTableRow = tables.monPlan.ref.current[1];
          updateCheckedOutLocationsOnTables(checkedOutLocationsMap, tables, userId);
          expect(notCheckedOutLocationTableRow.checkedOut).toBe(false);
        });
        it('updates state if there is change in checkedOut locations', () => {
          updateCheckedOutLocationsOnTables(checkedOutLocationsMap, tables, userId);
          expect(monPlansStateSetter).toHaveBeenCalled();
          expect(qaStateSetter).toHaveBeenCalled();
        });
        it('does not update state if there is no change in checkedOut locations', () => {
          checkedOutLocationsMap = new Map();
          updateCheckedOutLocationsOnTables(checkedOutLocationsMap, tables, userId);
          expect(monPlansStateSetter).not.toHaveBeenCalled();
          expect(qaStateSetter).not.toHaveBeenCalled();
        });
      })

      describe('updateCheckedOutLocationsOnTable', () => {
        it('should update ref if there is a change in checked out locations', () => {
          const {monPlan} = tables;
          const {ref} = monPlan, checkedOutTableRow = ref.current[0];
          updateCheckedOutLocationsOnTable(ref, monPlan.setState, checkedOutLocationsMap, userId);
          expect(checkedOutTableRow.checkedOut).toBe(true);
        });
        it('should call state setter if there is a change in checked out locations', () => {
          const {monPlan} = tables;
          updateCheckedOutLocationsOnTable(monPlan.ref, monPlan.setState, checkedOutLocationsMap, userId);
          expect(monPlansStateSetter).toHaveBeenCalled();
        });
        it('should not update ref if there is no change in checked out locations', () => {
          checkedOutLocationsMap = new Map();
          const {monPlan} = tables;
          const {ref} = monPlan, notCheckedOutTableRow = ref.current[0];
          updateCheckedOutLocationsOnTable(ref, monPlan.setState, checkedOutLocationsMap, userId);
          expect(notCheckedOutTableRow.checkedOut).toBe(false);
        });
        it('should not call state setter if there is no change in checked out locations', () => {
          checkedOutLocationsMap = new Map();
          const {monPlan} = tables;
          const {ref} = monPlan;
          updateCheckedOutLocationsOnTable(ref, monPlan.setState, checkedOutLocationsMap, userId);
          expect(monPlansStateSetter).not.toHaveBeenCalled();
        });
      });

      describe('isLocationCheckedOutByUser', () => {
        let chunk;
        beforeEach(() => {
          userId = 'test-user';
          chunk = {monPlanId: '123'};
        })
        it('returns false if location is not checked out', () => {
          const result = isLocationCheckedOutByUser({userId, checkedOutLocationsMap, isLocationCheckedOut: false, chunk});
          expect(result).toBe(false);
        });
        it('returns false if location is not checked out but not by user', () => {
          const result = isLocationCheckedOutByUser({userId: 'test user Id', checkedOutLocationsMap, isLocationCheckedOut: true, chunk});
          expect(result).toBe(false);
        });
        it('returns true if location is checked out by user', () => {
          userId = 'rboehme-dp';
          chunk.monPlanId = '1';
          const result = isLocationCheckedOutByUser({userId, checkedOutLocationsMap, isLocationCheckedOut: true, chunk});
          expect(result).toBe(true);
        })
      })
    });
  });
});
