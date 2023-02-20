import { useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import { useCurrencies } from "../hooks/useCurrencies";
import { useConvert } from "../hooks/useConvert";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");

  const currencies = useCurrencies();
  const converter = useConvert();

  const handleSubmit = () => {
    converter.mutate({
      amount: parseFloat(amount),
      from: fromCurrency,
      to: toCurrency,
    });
  };

  return (
    <div className="flex flex-col items-center md:px-8 md:py-16 p-4 md:gap-10 gap-6 w-full">
      {!currencies.data && currencies.isLoading && (
        <div className="w-full h-12 flex items-center justify-center italic">
          Loading&hellip;
        </div>
      )}

      {!currencies.data && currencies.isError && (
        <div className="w-full h-12 flex items-center justify-center text-red-800">
          Error loading currencies.
        </div>
      )}

      {currencies.data && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex gap-4 items-center flex-col md:flex-row md:h-12"
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
      )}

      {converter.isLoading && (
        <div className="w-full h-9 flex items-center justify-center italic">
          Converting&hellip;
        </div>
      )}

      {converter.isError && (
        <div className="w-full h-9 flex items-center justify-center text-red-800">
          Error converting currencies.
        </div>
      )}

      {converter.isSuccess && converter.data.data && (
        <div className="font-bold text-3xl text-center">
          {converter.data.data.query.amount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          {converter.data.data.query.from} ={" "}
          {converter.data.data.result.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          {converter.data.data.query.to}
        </div>
      )}
    </div>
  );
}
