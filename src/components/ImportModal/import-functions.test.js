import {
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  MONITORING_PLAN_STORE_NAME,
  EMISSIONS_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import { checkingCorrectSchema, formatSchemaErrors } from "./import-functions";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
describe("testing import functions", () => {
  test("called checkingCorrectSchema", () => {
    const f = new File([""], "test.json");

    const correctQaSchema = { orisCode: "123", testSummaryData: [] };
    const correctMpSchema = { orisCode: "123", unitStackConfigurations: [] };

    const incorrectQaSchema = { testSummaryData: [] };
    const incorrectMpSchema = { unitStackConfigurations: [] };
    const fakeSchema = {};
    const fakeWs = "";

    const mpFile = new File([incorrectMpSchema], "test.json");

    const qaFile = new File([incorrectQaSchema], "test.json");
    expect(
      checkingCorrectSchema(
        f,
        fakeWs,
        jest.fn(),
        jest.fn(),
        fakeSchema,
        fakeSchema,
        jest.fn()
      )
    ).not.toBeDefined();
    expect(
      checkingCorrectSchema(
        f,
        fakeWs,
        jest.fn(),
        jest.fn(),
        fakeSchema,
        fakeSchema,
        jest.fn()
      )
    ).not.toBeDefined();
    // MONITORING_PLAN_STORE_NAME with correct scchema
    expect(
      checkingCorrectSchema(
        f,
        MONITORING_PLAN_STORE_NAME,
        jest.fn(),
        jest.fn(),
        fakeSchema,
        correctMpSchema,
        jest.fn()
      )
    ).not.toBeDefined();

    // MONITORING_PLAN_STORE_NAME with correct scchema just errors
    expect(
      checkingCorrectSchema(
        mpFile,
        MONITORING_PLAN_STORE_NAME,
        jest.fn(),
        jest.fn(),
        fakeSchema,
        incorrectMpSchema,
        jest.fn()
      )
    ).not.toBeDefined();
    // MONITORING_PLAN_STORE_NAME with wrong scchema
    expect(
      checkingCorrectSchema(
        f,
        MONITORING_PLAN_STORE_NAME,
        jest.fn(),
        jest.fn(),
        fakeSchema,
        fakeSchema,
        jest.fn()
      )
    ).not.toBeDefined();

    // QA_CERT_TEST_SUMMARY_STORE_NAME with correct schema
    expect(
      checkingCorrectSchema(
        f,
        QA_CERT_TEST_SUMMARY_STORE_NAME,
        jest.fn(),
        jest.fn(),
        correctQaSchema,
        fakeSchema,
        jest.fn()
      )
    ).not.toBeDefined();

    // QA_CERT_TEST_SUMMARY_STORE_NAME with correct schema just errors
    expect(
      checkingCorrectSchema(
        qaFile,
        QA_CERT_TEST_SUMMARY_STORE_NAME,
        jest.fn(),
        jest.fn(),
        incorrectQaSchema,
        fakeSchema,
        jest.fn()
      )
    ).not.toBeDefined();

    // QA_CERT_TEST_SUMMARY_STORE_NAME with wrong schema
    expect(
      checkingCorrectSchema(
        f,
        QA_CERT_TEST_SUMMARY_STORE_NAME,
        jest.fn(),
        jest.fn(),
        fakeSchema,
        fakeSchema,
        jest.fn()
      )
    ).not.toBeDefined();
    // default switcch
    expect(
      checkingCorrectSchema(
        f,
        fakeWs,
        jest.fn(),
        jest.fn(),
        fakeSchema,
        fakeSchema,
        jest.fn()
      )
    ).not.toBeDefined();
  });

  test("called formatSchemaErrors", () => {
    const errors = { errors: ["test", "error"] };
    expect(formatSchemaErrors(errors, jest.fn(), jest.fn())).not.toBeDefined();
  });
});
