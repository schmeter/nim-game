import { describe, it, expect } from "vitest";
import { getRandomInteger } from "./math";

describe("getRandomInteger", () => {
  it("returns an integer between min and max", () => {
    const min = 2;
    const max = 5;
    for (let i = 0; i < 100; i++) {
      const result = getRandomInteger(min, max);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    }
  });

  it("returns min if min and max are equal", () => {
    const min = 7;
    const max = 7;
    for (let i = 0; i < 10; i++) {
      expect(getRandomInteger(min, max)).toBe(7);
    }
  });
});
