import { useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import { ConvertResponse, convert } from "../convert/convert";
import { useQueryClient } from "react-query";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState<ConvertResponse | undefined>();

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    const response = await convert(
      parseFloat(amount),
      fromCurrency,
      toCurrency
    );

    setResult(response.data);

    queryClient.invalidateQueries("stats");
  };

  return (
    <div className="flex flex-col items-center md:px-8 md:py-16 p-4 md:gap-10 gap-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex gap-4 items-center flex-col md:flex-row"
      >
        <input
          type="number"
          min="0"
          step="any"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white hover:bg-slate-100 focus:bg-slate-100 text-stone-800 font-semibold py-2 px-4 border border-slate-400 text-xl rounded shadow transition w-full"
        />

        <CurrencyDropdown
          value={fromCurrency}
          onChange={(newValue) => setFromCurrency(newValue)}
        />

        <div className="font-semibold">to</div>

        <CurrencyDropdown
          value={toCurrency}
          onChange={(newValue) => setToCurrency(newValue)}
        />

        <button
          type="submit"
          className="bg-white hover:bg-slate-100 text-stone-800 font-semibold py-2 px-4 border border-slate-400 text-xl rounded shadow active:shadow-inner transition w-full"
        >
          Convert!
        </button>
      </form>

      {result && (
        <div className="font-bold text-3xl text-center">
          {result.query.amount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          {result.query.from} ={" "}
          {result.result.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          {result.query.to}
        </div>
      )}
    </div>
  );
}
