import { useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import { convert } from "../convert/convert";
import { useQueryClient } from "react-query";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState<number | undefined>();

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    const response = await convert(
      parseFloat(amount),
      fromCurrency,
      toCurrency
    );

    setResult(response.data.result);

    queryClient.invalidateQueries("stats");
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="number"
          min="0"
          step="any"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <span>from</span>
        <CurrencyDropdown
          value={fromCurrency}
          onChange={(newValue) => setFromCurrency(newValue)}
        />

        <span>to</span>
        <CurrencyDropdown
          value={toCurrency}
          onChange={(newValue) => setToCurrency(newValue)}
        />

        <button type="submit">Convert!</button>
      </form>

      {result && (
        <div>
          {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      )}
    </>
  );
}
