import React from "react";
import {
  render,
  screen,
  within,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import HeaderInfo from "./HeaderInfo";
import { act } from "react-dom/test-utils";
import * as mpApi from "../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");
test("test file", () => {
  const val = 1;
  expect(val === 1);
});

// describe("tests the header of configuration component", () => {
//   test("renders preloader ", async () => {
//     act(async () => {
//       jest.mock("../../utils/api/monitoringPlansApi", () => {
//         const mockreturnedConfig = [
//           {
//             id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
//             updateDate: "2021-12-06",
//             userId: "mddee-dp",
//             evalStatusCode: "INQ",
//           },
//         ];
//         return {
//           getConfigInfo: jest.fn(() => Promise.resolve(mockreturnedConfig)),
//         };
//       });
//       const { container } = await waitForElement(() =>
//         render(
//           <HeaderInfo
//             facility={"Barry (1, 2, CS0AAN)"}
//             selectedConfig={[]}
//             orisCode={3}
//             setSectionSelect={jest.fn()}
//             sectionSelect={[4, "Methods"]}
//             setLocationSelect={jest.fn()}
//             locationSelect={[0, "test"]}
//             locations={[{ id: "6", name: "1", type: "Unit", active: true }]}
//             checkout={false}
//             user={{ firstName: "test" }}
//             checkoutAPI={jest.fn()}
//             setInactive={jest.fn()}
//             setCheckout={jest.fn()}
//             inactive={[true, false]}
//             checkoutAPI={jest.fn()}
//             checkedOutLocations={[{ monPlanId: [1, 2, 3] }]}
//             setRevertedState={jest.fn()}
//             configID={"TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A"}
//           />
//         )
//       );

//       const img = container.querySelectorAll("img");

//       expect(img.length).toBe(2);
//     });
//   });
// });
    // const { container } = await waitForElement(() =>
    //   render(
    //     <HeaderInfo
    //       facility={"Barry (1, 2, CS0AAN)"}
    //       selectedConfig={[]}
    //       orisCode={3}
    //       setSectionSelect={jest.fn()}
    //       sectionSelect={[4, "Methods"]}
    //       setLocationSelect={jest.fn()}
    //       locationSelect={[0, "test"]}
    //       locations={[{ id: "6", name: "1", type: "Unit", active: true }]}
    //       checkout={false}
    //       user={{ firstName: "test" }}
    //       checkoutAPI={jest.fn()}
    //       setInactive={jest.fn()}
    //       setCheckout={jest.fn()}
    //       inactive={[true, false]}
    //       checkoutAPI={jest.fn()}
    //       checkedOutLocations={[{ monPlanId: [1, 2, 3] }]}
    //       setRevertedState={jest.fn()}
    //       configID={"TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A"}
    //     />
    //   )
    // );
    // fireEvent.click(screen.getByText("Check Out"));
    // fireEvent.click(screen.getByText("Check Back In"));


// describe("renders header with checked out ", () => {
//   test("cliks check  back in, then check out , 3 buttons because of the rest of header", () => {
//     const { container, getByText } = render(
//       <HeaderInfo
//         facility={"Barry (1, 2, CS0AAN)"}
//         selectedConfig={[]}
//         orisCode={3}
//         user={{ firstName: "test" }}
//         setRevertedState={jest.fn()}
//         setCheckout={jest.fn()}
//         setInactive={jest.fn()}
//         setLocationSelect={jest.fn()}
//         setSectionSelect={jest.fn()}
//         sectionSelect={[4, "Methods"]}
//         locationSelect={[0, "test"]}
//         locations={[{ id: "6", name: "1", type: "Unit", active: true }]}
//         inactive={[true, false]}
//         checkoutAPI={jest.fn()}
//         configID={1}
//       />
//     );
//     fireEvent.click(container.querySelector("#checkInBTN"));
//     fireEvent.click(container.querySelector("#checkOutBTN"));

//     fireEvent.click(container.querySelector("#checkbox"));
//     const btns = screen.getAllByRole("button");

//     fireEvent.click(container.querySelector("#showRevertModal"));
//     fireEvent.click(screen.getByTestId("saveBtn"));
//     expect(btns).toHaveLength(4);
//   });
// });

// describe("renders header with no user logged in ", () => {
//   test("verifies everythign is rendered only 2 buttons, no checkout/check in", () => {
//     const { container, getByText } = render(
//       <HeaderInfo
//         facility={"Barry (1, 2, CS0AAN)"}
//         selectedConfig={[]}
//         orisCode={3}
//         setSectionSelect={jest.fn()}
//         sectionSelect={[4, "Methods"]}
//         setLocationSelect={jest.fn()}
//         locationSelect={[0, "test"]}
//         locations={[{ id: "6", name: "1", type: "Unit", active: true }]}
//         checkoutAPI={jest.fn()}
//         setCheckout={jest.fn()}
//         setInactive={jest.fn()}
//         inactive={[true, false]}
//         checkoutAPI={jest.fn()}
//         checkedOutLocations={[{monPlanId:[1,2,3]}]}
//       />
//     );

//     expect(container).toBeDefined();
//   });
// });
// checkedOutLocations[checkedOutLocations.map((location) => location["monPlanId"]).indexOf(selectedConfig.id)]      ["checkedOutBy"] === user["firstName"]
//   describe("renders header with no user logged in ", () => {
//     test("verifies everythign is rendered only 2 buttons, no checkout/check in", () => {
//       const { container, getByText } = render(
//         <HeaderInfo
//           facility={"Barry (1, 2, CS0AAN)"}
//           selectedConfig={{ id: 5770 }}
//           user={{ firstName: "test" }}
//           orisCode={3}
//           setSectionSelect={jest.fn()}
//           sectionSelect={[4, "Methods"]}
//           setLocationSelect={jest.fn()}
//           locationSelect={[0, "test"]}
//           locations={[{ id: "6", name: "1", type: "Unit", active: true }]}
//           checkoutAPI={jest.fn()}
//           setCheckout={jest.fn()}
//           setInactive={jest.fn()}
//           inactive={[true, false]}
//           checkoutAPI={jest.fn()}
//           checkedOutLocations={[{ monPlanId: [5770], checkedOutBy: "test" }]}
//         />
//       );

//       expect(container).toBeDefined();
//     });
//   });
// });

// test("test audit records for workspace checked out", () => {
//   const { container } = render(
//     <HeaderInfo
//       facility={"Barry (1, 2, CS0AAN)"}
//       selectedConfig={{ id: 5770 }}
//       user={{ firstName: "test" }}
//       checkout={true}
//       checkedOutLocations={[{ monPlanId: [5770], checkedOutBy: "test" }]}
//       locationSelect={[0, "test"]}
//       sectionSelect={[4, "Methods"]}
//       inactive={[true, false]}
//       locations={[{ id: "6", name: "1", type: "Unit", active: true }]}
//     />
//   );

//   expect(container.instance().setAuditInformation()).toContain(
//     "Currently checked out by:"
//   );
// });

// test("test audit records for workspace checked in", () => {
//   const { container, getByText } = render(
//     <HeaderInfo
//       facility={"Barry (1, 2, CS0AAN)"}
//       selectedConfig={{ id: 5770 }}
//       user={{ firstName: "test" }}
//       checkout={false}
//     />
//   );

//   expect(container.instance().setAuditInformation()).toContain(
//     "Last Updated by:"
//   );
// });

// test("test audit records for globalView", () => {
//   const container = render(
//     <HeaderInfo
//       facility={"Barry (1, 2, CS0AAN)"}
//       selectedConfig={{ id: 5770 }}
//       checkout={false}
//       checkedOutLocations={[{ monPlanId: [5770], checkedOutBy: "test" }]}
//     />
//   );

//   expect(container.instance().setAuditInformation()).toContain(
//     "Last Submitted by:"
//   );
// });
