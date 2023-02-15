import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

export const cachedAxios = setupCache(axios);

export default cachedAxios;
