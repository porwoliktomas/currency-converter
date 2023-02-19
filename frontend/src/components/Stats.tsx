import { useStats } from "../hooks/useStats";

export default function Stats() {
  const stats = useStats();

  return stats.data ? (
    <div>
      <div>
        Most popular destination currencies:{" "}
        <span className="font-semibold">
          {stats.data.data.stats.mostPopularDestinationCurrencies.join(", ") ||
            "---"}
        </span>
      </div>
      <div>
        Total amount converted:{" "}
        <span className="font-semibold">
          {stats.data.data.stats.totalAmountConvertedInUsd.toLocaleString(
            undefined,
            { maximumFractionDigits: 2 }
          )}{" "}
          USD
        </span>
      </div>
      <div>
        Total number of conversion requests made:{" "}
        <span className="font-semibold">
          {stats.data.data.stats.totalRequests.toLocaleString()}
        </span>
      </div>
    </div>
  ) : null;
}
