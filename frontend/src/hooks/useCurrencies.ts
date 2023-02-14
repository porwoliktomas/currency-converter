import axios from "axios";
import { useQuery } from "react-query";

type CurrenciesResponse = {
  currencies: { [currency: string]: string };
};

export const useCurrencies = () =>
  useQuery("currencies", async () => {
    return await axios.get<CurrenciesResponse>(
      process.env.REACT_APP_API_URL! + "/currencies"
    );
  });
