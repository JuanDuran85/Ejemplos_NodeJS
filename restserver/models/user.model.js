const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El clave es obligatorio'],
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE','SALE_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

//sobre escribir los metodos de mongo
// sobrescribiendo toJSON. Debe ser una funcion normal

UserSchema.methods.toJSON = function () {  
    const { __v, password, _id, ...dataUser  } = this.toObject();
    dataUser['uid'] = _id;
    return dataUser;
};

module.exports = model('User', UserSchema);