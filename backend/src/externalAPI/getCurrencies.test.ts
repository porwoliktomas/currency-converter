import { describe, expect, test } from "@jest/globals";
import cachedAxios from "../cache/cachedAxios";
import getCurrencies from "./getCurrencies";

jest.mock("axios");

describe("External API - getCurrencies", () => {
  test("Get currencies returns correct data", async () => {
    (cachedAxios.get as jest.Mock).mockResolvedValue({
      data: { CZK: "Czech Republic Koruna", EUR: "Euro" },
    });

    const currencies = await getCurrencies();

    expect(currencies).toStrictEqual({
      CZK: "Czech Republic Koruna",
      EUR: "Euro",
    });
  });
});
