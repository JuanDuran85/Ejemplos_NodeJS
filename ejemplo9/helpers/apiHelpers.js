const axios = require('axios');

let apiHelpers = {
    callApi: async function(url){
        try {
            let response = await axios.get(url);
            return response.data;
        } catch (error) {   
            console.log(error); 
        }
    }
}

module.exports = apiHelpers;