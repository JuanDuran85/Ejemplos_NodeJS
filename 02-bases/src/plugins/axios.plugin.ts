import axios from "axios";

export const httpClientAxiosPlugin = {
  get: async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  },
};
