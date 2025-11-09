const { getUUID } = require("../plugins/get-id.plugin");
const { getAge } = require("../plugins/get-age.plugin");
const { http } = require("../plugins/http-client.plugin");
const { httpClientAxiosPlugin: httpAxios } = require("../plugins/axios.plugin");

module.exports = {
  getUUID,
  getAge,
  http,
  httpAxios,
};
