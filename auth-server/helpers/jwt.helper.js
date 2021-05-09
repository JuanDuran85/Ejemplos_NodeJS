const jwt  = require('jsonwebtoken');

const generateJwt = (uid, name) => {
    
    const payload = { uid , name};

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.jwt_SEED, {
            expiresIn: '12h'
        },(error, token)=>{
            if(error){
                console.log(error);
                reject(error);
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJwt
}