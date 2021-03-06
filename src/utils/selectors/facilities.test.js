import * as fs from "./facilities";

describe("testing fetch wrapper facilities data selectors", () => {
  let selectedFacility;

  beforeAll(() => {
    selectedFacility = [
      {
        facilityRecordId: "1",
        facilityId: "3",
        facilityName: "Barry",
        orisCode: "4",
        stateCode: "AL",
        links: [
          {
            rel: "self",
            href: "/api/facility-mgmt/facilities/1",
          },
          {
            rel: "units",
            href: "/api/facility-mgmt/facilities/1/units",
          },
          {
            rel: "stacks",
            href: "/api/facility-mgmt/facilities/1/stacks",
          },
          {
            rel: "owners",
            href: "/api/facility-mgmt/facilities/1/owners",
          },
          {
            rel: "contacts",
            href: "/api/facility-mgmt/facilities/1/contacts",
          },
        ],
      },
    ];
  });

  test("selected facility monitoring plans table records should be", () => {
    const fac = [
      {
        col1: "Barry",
        col2: "3",
        col3: "AL",
        col4: "4",
        facId: "1",
      },
    ];
    expect(fs.getTableRecords(selectedFacility)[0]).toEqual(fac[0]);
  });
});
