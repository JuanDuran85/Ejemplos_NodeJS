const httpClientPlugin = {
  get: async (url) => {
    const response = await fetch(url);
    return response.json();
  },
};

module.exports = {
  http: httpClientPlugin,
};
