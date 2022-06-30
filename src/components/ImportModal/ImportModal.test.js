import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ImportModal from "./ImportModal";
import {
    QA_CERT_TEST_SUMMARY_STORE_NAME,
    MONITORING_PLAN_STORE_NAME,
  } from "../../additional-functions/workspace-section-and-store-names";
describe("testing ImportModal component ", () => {
  test("renders the content of ImportModal component with MONITORING_PLAN_STORE_NAME", () => {

    const { container, getAllByText, getByText } = render(
      <ImportModal
      setDisablePortBtn={jest.fn()}
      complete={false}
      setFileName={jest.fn()}
      fileName={'test'}
      setHasFormatError={jest.fn()}
      setHasInvalidJsonError={jest.fn()}
      importApiErrors={[]}
      importedFileErrorMsgs={[]}
      setImportedFile={jest.fn()}
      workspaceSection={MONITORING_PLAN_STORE_NAME}
      />
    );
    const renderedComponent = container.querySelector(".import-modal-container");

    expect(renderedComponent).not.toBeUndefined();
  });

  test("renders the content of ImportModal component with QA_CERT_TEST_SUMMARY_STORE_NAME", () => {

    const { container, getAllByText, getByText } = render(
      <ImportModal
      setDisablePortBtn={jest.fn()}
      complete={false}
      setFileName={jest.fn()}
      fileName={'test'}
      setHasFormatError={jest.fn()}
      setHasInvalidJsonError={jest.fn()}
      importApiErrors={[]}
      importedFileErrorMsgs={[]}
      setImportedFile={jest.fn()}
      workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
      />
    );
    const renderedComponent = container.querySelector(".import-modal-container");

    expect(renderedComponent).not.toBeUndefined();
  });
});
