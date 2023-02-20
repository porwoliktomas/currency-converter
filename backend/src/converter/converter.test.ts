import { describe, expect, test } from "@jest/globals";
import { convertToDestinationCurrency, convertToUSD } from "./converter";

describe("Conversion tests", () => {
  test("Conversion to USD is correct", () => {
    expect(convertToUSD({ rates: { EUR: 0.936281 } }, 10, "EUR")).toBeCloseTo(
      10.68
    );
  });

  test("Conversion to the destination currency is correct", () => {
    expect(
      convertToDestinationCurrency(
        { rates: { EUR: 0.936281, CZK: 22.195001 } },
        10,
        "EUR",
        "CZK"
      )
    ).toBeCloseTo(237.05);
  });
});
