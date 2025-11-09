const { default: axios } = require('axios');

const httpClientAxiosPlugin = {
    get: async(url) => {
        const response = await axios.get(url);
        return response.data
    }
}


module.exports = {
  httpClientAxiosPlugin,
};