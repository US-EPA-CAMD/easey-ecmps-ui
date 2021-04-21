import React from "react";
import { render } from "@testing-library/react";
import ContactsData from "./ContactsData";
const mockFacilityContactData = {
  owners: [
    { unitId: "1", ownerDesc: "Owner", companyName: "Alabama Power Company" },
    {
      unitId: "1",
      ownerDesc: "Operator",
      companyName: "Alabama Power Company",
    },
  ],
  contacts: [
    {
      address1: "744 Highway 87",
      address2: "GSC #8",
      city: "Calera",
      companyName: "Alabama Power Company",
      emailAddress: "bwvick@southernco.com",
      faxNumber: "",
      firstName: "Brad",
      isRep: false,
      jobTitle: "Environmental Affairs Specialist",
      lastName: "Vick",
      middleInitial: null,
      phoneExt: "",
      phoneNumber: "2056646208",
      responsibilities: [
        { programCode: "", roleDesc: "Retrieve Only - MP, QA, EM (all units)" },
      ],

      stateAbbrev: "AL",
      suffix: null,
      zipCode: "35040",
    },
  ],
};

describe("testing monitoring plan data table component", () => {
  test("renders how many contacts appear", () => {
    const { container } = render(
      <ContactsData facility={mockFacilityContactData} />
    );
    const card = container.querySelectorAll(".row");
    expect(card.length).toEqual(1);
  });

  test("counts how many columns are rendered based on total contacts ", () => {
    const { container } = render(
      <ContactsData facility={mockFacilityContactData} />
    );
    const card = container.querySelectorAll(".column");
    expect(card.length).toEqual(2);
  });
  test("renders each title box based on roles", () => {
    const { container } = render(
      <ContactsData facility={mockFacilityContactData} />
    );
    const card = container.querySelectorAll(".titleBox");
    expect(card.length).toEqual(2);
  });
});
