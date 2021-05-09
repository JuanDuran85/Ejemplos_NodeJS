const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.conexion_db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("DB onlyne...");

    } catch (error) {
        console.log(error);
        throw new Error('Error en Base de datos...');
    }
}

module.exports = {
    dbConnection,
}