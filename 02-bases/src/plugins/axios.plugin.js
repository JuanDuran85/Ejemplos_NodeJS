const axios = require("axios");

const httpClientAxiosPlugin = {
  get: async (url) => {
    const { data } = await axios.get(url);
    return data;
  },
};

module.exports = {
  httpClientAxiosPlugin,
};
