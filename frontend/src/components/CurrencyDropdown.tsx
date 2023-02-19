import { useCurrencies } from "../hooks/useCurrencies";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function CurrencyDropdown({ value, onChange }: Props) {
  const currencies = useCurrencies();
  if (!currencies.data) return null;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white hover:bg-slate-100 focus:bg-slate-100 text-stone-800 font-semibold py-2 px-4 border border-slate-400 text-xl rounded shadow transition w-full"
    >
      {Object.entries(currencies.data.data.currencies).map(([key, value]) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}
