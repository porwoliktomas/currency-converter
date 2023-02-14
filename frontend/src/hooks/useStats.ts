import axios from "axios";
import { useQuery } from "react-query";

type StatsResponse = {
  stats: {
    mostPopularDestinationCurrencies: string[];
    totalAmountConvertedInUsd: number;
    totalRequests: number;
  };
};

export const useStats = () =>
  useQuery(
    "stats",
    async () => {
      return await axios.get<StatsResponse>(
        process.env.REACT_APP_API_URL! + "/stats"
      );
    },
    {
      refetchInterval: 5000,
    }
  );
