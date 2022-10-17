import {
  getConfigValue,
  getConfigValueBoolean,
  getConfigValueNumber,
  parseBool,
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
