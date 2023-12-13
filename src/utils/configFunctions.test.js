import {
  getConfigValue,
  getConfigValueBoolean,
  getConfigValueNumber,
} from "./configFunctions";

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
