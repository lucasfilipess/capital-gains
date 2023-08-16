import assert from "node:assert";
import { test } from "node:test";

import { SharesStore } from "@/store";

test("Loss store", async (t) => {
  const sharesStore = new SharesStore();
  await t.test("Add shares", () => {
    const shares = sharesStore.addShares(50 * 1000);
    assert.equal(shares, 50 * 1000);
  });

  await t.test("Remove shares", () => {
    const shares = sharesStore.removeShares(25 * 1000);
    assert.equal(shares, 25 * 1000);
  });

  await t.test("Clear store", () => {
    sharesStore.clearStore();
    assert.equal(sharesStore.shares, 0);
  });
});
