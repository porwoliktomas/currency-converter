import { useStats } from "../hooks/useStats";

export default function Stats() {
  const stats = useStats();

  return stats.data ? (
    <>
      <div>
        Most popular destination currencies:{" "}
        {stats.data.data.stats.mostPopularDestinationCurrencies.join(", ") ||
          "---"}
      </div>
      <div>
        Total amount converted (in USD):{" "}
        {stats.data.data.stats.totalAmountConvertedInUsd.toLocaleString(
          undefined,
          { maximumFractionDigits: 2 }
        )}
      </div>
      <div>
        Total number of conversion requests made:{" "}
        {stats.data.data.stats.totalRequests.toLocaleString()}
      </div>
    </>
  ) : null;
}
