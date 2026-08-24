import {
  getCheckedOutLocations,
  postCheckoutMonitoringPlanConfiguration,
} from "../../utils/api/monitoringPlansApi";

// Checks out the given plans for import (skipping ones already ours). Returns
// the monPlanIds that couldn't be checked out so the caller can drop just those
// files.
export const checkoutPlansForImport = async (monPlanIds, userId) => {
  const blocked = new Set();

  const checkedOut = (await getCheckedOutLocations()).data?.items ?? [];
  const checkOutMapping = new Map();
  for (const loc of checkedOut) {
    checkOutMapping.set(loc.monPlanId, loc.checkedOutBy);
  }

  const toCheckOut = [];
  for (const mp of new Set(monPlanIds)) {
    if (checkOutMapping.has(mp)) {
      if (checkOutMapping.get(mp) !== userId) blocked.add(mp);
    } else {
      toCheckOut.push(mp);
    }
  }

  const results = await Promise.allSettled(
    toCheckOut.map((mp) => postCheckoutMonitoringPlanConfiguration(mp, false))
  );
  results.forEach((res, i) => {
    if (res.status === "rejected") blocked.add(toCheckOut[i]);
  });

  return blocked;
};
