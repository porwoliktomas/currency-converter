import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type ConvertResponse = {
  query: {
    from: string;
    to: string;
    amount: number;
  };
  result: number;
};

type ConvertParams = {
  amount: number;
  from: string;
  to: string;
};

export const useConvert = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ amount, from, to }: ConvertParams) => {
      return axios.get<ConvertResponse>(
        process.env.REACT_APP_API_URL! +
          `/convert?from=${from}&to=${to}&amount=${amount}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stats");
      },
    }
  );
};
