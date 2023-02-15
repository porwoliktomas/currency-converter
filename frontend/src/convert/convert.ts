import axios from "axios";

type ConvertResponse = {
  result: number;
};

export const convert = async (amount: number, from: string, to: string) => {
  return await axios.get<ConvertResponse>(
    process.env.REACT_APP_API_URL! +
      `/convert?from=${from}&to=${to}&amount=${amount}`
  );
};
