import axios from "axios";

export type ConvertResponse = {
  query: {
    from: string;
    to: string;
    amount: number;
  };
  result: number;
};

export const convert = async (amount: number, from: string, to: string) => {
  return await axios.get<ConvertResponse>(
    process.env.REACT_APP_API_URL! +
      `/convert?from=${from}&to=${to}&amount=${amount}`
  );
};
