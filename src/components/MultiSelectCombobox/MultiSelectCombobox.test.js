import React from "react";
import { cleanup, fireEvent, render, within, screen } from "@testing-library/react";

import MultiSelectCombobox from "./MultiSelectCombobox";

const facilities = [
  {
    id: "1",
    facilityId: "3",
    facilityName: "Barry",
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
  {
    id: "2",
    facilityId: "5",
    facilityName: "Chickasaw",
    stateCode: "AL",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/2",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/2/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/2/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/2/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/2/contacts",
      },
    ],
  },
  {
    id: "3",
    facilityId: "7",
    facilityName: "Gadsden",
    stateCode: "AL",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/3",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/3/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/3/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/3/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/3/contacts",
      },
    ],
  },
  {
    id: "4",
    facilityId: "8",
    facilityName: "Gorgas",
    stateCode: "AL",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/4",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/4/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/4/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/4/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/4/contacts",
      },
    ],
  },
  {
    id: "5",
    facilityId: "10",
    facilityName: "Greene County",
    stateCode: "AL",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/5",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/5/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/5/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/5/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/5/contacts",
      },
    ],
  },
  {
    id: "6",
    facilityId: "26",
    facilityName: "E C Gaston",
    stateCode: "AL",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/6",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/6/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/6/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/6/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/6/contacts",
      },
    ],
  },
  {
    id: "7",
    facilityId: "47",
    facilityName: "Colbert",
    stateCode: "AL",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/7",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/7/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/7/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/7/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/7/contacts",
      },
    ],
  },
  {
    id: "8",
    facilityId: "50",
    facilityName: "Widows Creek",
    stateCode: "AL",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/8",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/8/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/8/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/8/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/8/contacts",
      },
    ],
  },
  {
    id: "9",
    facilityId: "51",
    facilityName: "Dolet Hills Power Station",
    stateCode: "LA",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/9",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/9/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/9/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/9/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/9/contacts",
      },
    ],
  },
  {
    id: "10",
    facilityId: "54",
    facilityName: "Smith Generating Facility",
    stateCode: "KY",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/10",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/10/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/10/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/10/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/10/contacts",
      },
    ],
  },
];
const items = facilities.map((f) => ({
  id: f.facilityId,
  label: `${f.facilityName} (${f.facilityId})`,
  selected: false,
  enabled: true,
}));

describe("MultiSelectCombobox Component", () => {
  let query;
  beforeEach(() => {
    query = render(
      <MultiSelectCombobox
        items={items}
        label="Select or Search Facilities/ORIS Codes"
        entity="Facility"
        onChangeUpdate={jest.fn()}
        searchBy="contains"
      />
    );
  });

  afterEach(cleanup);

  it("renders all roles that make up the multi-select-combobox and populates items in drowpdown list", () => {
    const { getByTestId, getAllByTestId } = query;
    const searchbox = getByTestId("Facility-input-search");
    expect(searchbox).toBeInTheDocument();
    searchbox.focus();
    searchbox.click();
    const listBox = getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId("multi-select-option").length).toBe(
      items.length
    );
  });

  it("handles click event of listbox option", () => {
    const { getByTestId, getAllByTestId } = query;
    getByTestId("Facility-input-search").click();
    const options = getAllByTestId("multi-select-option");
    fireEvent.click(options[0]);
    fireEvent.click(options[1]);
    expect(getAllByTestId("button").length).toBe(2);
  });

  it("should search using input box for facilities in listboxt", () => {
    const { getByTestId, getAllByTestId } = query;
    const searchbox = getByTestId("Facility-input-search");
    searchbox.click();
    fireEvent.change(searchbox, { target: { value: "Barry" } });
    expect(searchbox.value).toBe("Barry");
    expect(
      within(getByTestId("multi-select-listbox")).getAllByTestId(
        "multi-select-option"
      ).length
    ).toBe(1);
    fireEvent.keyDown(searchbox, { key: "Tab", code: 9 });
    fireEvent.keyDown(searchbox, { key: "Enter", code: "Enter" });
    expect(searchbox.value).toBe("Barry");
    expect(getAllByTestId("multi-select-option").length).toBe(1);
    fireEvent.click(getByTestId("multi-select-option"));
    expect(getAllByTestId("button", { name: "Barry (3)" })).toBeDefined();
  });

  it("should remove an already selected item that has been clicked for removal and keep focus on the search input element", ()=>{
    // Clicks barry 3 and clicks the x button to remove it again

    const { getByTestId, getAllByTestId } = query;
    const searchbox = getByTestId("Facility-input-search");
    fireEvent.change(searchbox, { target: { value: "Barry" } });
    fireEvent.keyDown(searchbox, { key: "Tab", code: 9 });
    fireEvent.keyDown(searchbox, { key: "Enter", code: "Enter" });

    expect(getByTestId('3-remove')).toBeInTheDocument();
          
    fireEvent.click(getByTestId('3-remove'));
    expect(screen.queryByTestId('3-remove')).toBeNull();
    expect(getByTestId('Facility-input-search')).toHaveFocus();
  })

});
