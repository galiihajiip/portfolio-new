import { describe, expect, it } from "vitest";
import { clampIndex, indexFromScroll, maxIndex, rangeLabel, scrollForIndex, targetIndex, visibleCount } from "./carousel";

const desktop = { cardWidth: 400, gap: 24, viewportWidth: 1300, count: 7 };

describe("carousel geometry", () => {
  it("counts whole visible cards", () => {
    expect(visibleCount(desktop)).toBe(3);
    expect(visibleCount({ ...desktop, viewportWidth: 300 })).toBe(1);
  });

  it("stops the last page flush with the final card", () => {
    expect(maxIndex(desktop)).toBe(4);
    expect(clampIndex(99, desktop)).toBe(4);
    expect(clampIndex(-3, desktop)).toBe(0);
  });

  it("pages by visible cards and respects both boundaries", () => {
    expect(targetIndex(0, 1, desktop)).toBe(3);
    expect(targetIndex(3, 1, desktop)).toBe(4);
    expect(targetIndex(4, -1, desktop)).toBe(1);
    expect(targetIndex(1, -1, desktop)).toBe(0);
  });

  it("maps scroll offsets to indices and back", () => {
    expect(indexFromScroll(0, desktop)).toBe(0);
    expect(indexFromScroll(424 * 2 + 30, desktop)).toBe(2);
    expect(scrollForIndex(2, desktop)).toBe(848);
  });

  it("handles fewer items than the visible capacity", () => {
    const few = { ...desktop, count: 2 };
    expect(maxIndex(few)).toBe(0);
    expect(targetIndex(0, 1, few)).toBe(0);
    expect(rangeLabel(0, few)).toBe("1–2 of 2");
  });

  it("handles an empty track and a filter shrinking the list", () => {
    const empty = { ...desktop, count: 0 };
    expect(maxIndex(empty)).toBe(0);
    expect(rangeLabel(0, empty)).toBe("0 of 0");
    // Was at index 4 of 7; filter leaves 4 items -> clamp to last valid page.
    expect(clampIndex(4, { ...desktop, count: 4 })).toBe(1);
  });

  it("labels the visible range", () => {
    expect(rangeLabel(0, desktop)).toBe("1–3 of 7");
    expect(rangeLabel(4, desktop)).toBe("5–7 of 7");
    expect(rangeLabel(0, { ...desktop, viewportWidth: 300 })).toBe("1 of 7");
  });
});
