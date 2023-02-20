import { describe, expect, test } from "@jest/globals";
import cachedAxios from "../cache/cachedAxios";
import getRates from "./getRates";

jest.mock("axios");

describe("External API - getRates", () => {
  test("Get rates returns correct data", async () => {
    (cachedAxios.get as jest.Mock).mockResolvedValue({
      data: { rates: { EUR: 0.936281, CZK: 22.195001 } },
    });

    const rates = await getRates();

    expect(rates).toStrictEqual({
      rates: { EUR: 0.936281, CZK: 22.195001 },
    });
  });
});
