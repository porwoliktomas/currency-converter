import { useCurrencies } from "../hooks/useCurrencies";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function CurrencyDropdown({ value, onChange }: Props) {
  const currencies = useCurrencies();
  if (!currencies.data) return null;

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {Object.entries(currencies.data.data.currencies).map(([key, value]) => (
        <option key={key} value={key}>
          {key} - {value}
        </option>
      ))}
    </select>
  );
}
