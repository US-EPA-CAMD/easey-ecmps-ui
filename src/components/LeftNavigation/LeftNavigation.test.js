import { screen } from "@testing-library/react";
import LeftNavigation from "./LeftNavigation";
import render from "../../mocks/render";

describe("Left Navigation links", () => {
  it("renders only home link menu when roles are not provided", async () => {
    await render(<LeftNavigation user={true} setCurrentLink={jest.fn()} />);
    const homeLink = screen.getByLabelText("Go to Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href','/');
  });

  it("renders applicable menu items for specified role", async ()=>{
    await render(<LeftNavigation user={{roles: ["ECMPS Analyst", "ECMPS Admin", "Preparer", "Submitter"]}} setCurrentLink={jest.fn()} />);
    const homeLink = screen.getByLabelText("Go to Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href','/');

    const mpLink = screen.getByLabelText("Monitoring Plans - Workspace");
    expect(mpLink).toBeInTheDocument();
    expect(mpLink).toHaveAttribute('href','/workspace/monitoring-plans');

    const tdLink = screen.getByLabelText("Test Data - Workspace");
    expect(tdLink).toBeInTheDocument();
    expect(tdLink).toHaveAttribute('href','/workspace/qa/tests');

    const certEvtExtExmLink = screen.getByLabelText("Cert Events, Extensions & Exemptions - Workspace");
    expect(certEvtExtExmLink).toBeInTheDocument();
    expect(certEvtExtExmLink).toHaveAttribute('href','/workspace/qa/qce-tee');

    const emissionsLink = screen.getByLabelText("Emissions - Workspace");
    expect(emissionsLink).toBeInTheDocument();
    expect(emissionsLink).toHaveAttribute('href','/workspace/emissions');

    const evaluateLink = screen.getByLabelText("Evaluate - Workspace");
    expect(evaluateLink).toBeInTheDocument();
    expect(evaluateLink).toHaveAttribute('href','/workspace/evaluate');

    const submitLink = screen.getByLabelText("Submit - Workspace");
    expect(submitLink).toBeInTheDocument();
    expect(submitLink).toHaveAttribute('href','/workspace/submit');
    
    const qaMtnLink = screen.getByLabelText("QA Maintenance - Workspace");
    expect(qaMtnLink).toBeInTheDocument();
    expect(qaMtnLink).toHaveAttribute('href','/admin/qa-maintenance');

    const errSupLink = screen.getByLabelText("Error Suppression - Workspace");
    expect(errSupLink).toBeInTheDocument();
    expect(errSupLink).toHaveAttribute('href','/admin/error-suppression');

    const emSubAccessLink = screen.getByLabelText("Emission Submission Access - Workspace");
    expect(emSubAccessLink).toBeInTheDocument();
    expect(emSubAccessLink).toHaveAttribute('href','/admin/em-submission-access');
    //screen.debug(null, Infinity);
  });
});
