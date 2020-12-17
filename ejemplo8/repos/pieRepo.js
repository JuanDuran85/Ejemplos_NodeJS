let fs = require('fs');
const FILE_NAME = './assets/pies.json';

let pieRepo = {
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {  
            if (err){
                reject(err);
            } else{
                resolve(JSON.parse(data));
            }
        });
    },
    getById: function (id,resolve,reject) {
        fs.readFile(FILE_NAME, function (err,data){
            if(err){
                reject(err);
            } else {
                let pie = JSON.parse(data).find(result => result.id == id);
                resolve(pie);
            }
        });
    },
    search: function(searchObject,resolve,reject){
        fs.readFile(FILE_NAME, function(err,data){
            if (err){
                reject(err);
            } else {
                let pies = JSON.parse(data);
                if (searchObject){
                    pies = pies.filter(
                        p => 
                            (searchObject.id ? p.id == searchObject.id : true) && (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true)
                    );
                }
                resolve(pies);
            }
        })
    }
};

module.exports = pieRepo;


/* let pieRepo = {
    get: function() {
        return [
            {"id": 1, "name": "Apple"},
            {"id": 2, "name": "Cherry"},
            {"id": 3, "name": "Peach"},
        ];
    }
}; */