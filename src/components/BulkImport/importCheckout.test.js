import { buildBlockedFilesMessage } from "./importCheckout";

test("describes both checkout and responsibility reasons for skipped files", () => {
  expect(
    buildBlockedFilesMessage([
      { fileName: "first.json" },
      { fileName: "second.json" },
    ])
  ).toBe(
    "These files were skipped because their monitoring plan is checked out by another user or you do not currently have the appropriate responsibilities associated with the monitoring plan being imported: first.json, second.json."
  );
});
