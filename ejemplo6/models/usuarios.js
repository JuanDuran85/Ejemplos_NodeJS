'use strict';
const bcrypt = require('bcrypt');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuarios.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    passwod_hash: DataTypes.STRING,
    passwod: DataTypes.VIRTUAL
  }, {
   /*  hooks: {
      beforeCreate: (user,options)=>{
        console.log("desde beforecreate");
      }
    }, */
    sequelize,
    modelName: 'Usuarios',
  });
  Usuarios.beforeCreate(async function(user, options) {
    console.log("desde beforecreate");
    try {
        console.log("Entrando a try")
        if (user.passwod) {
          console.log("si hay clave")
          let resultado = await bcrypt.hash(user.passwod,10);
          console.log("password: "+resultado);
          user.passwod_hash = resultado;
        }
    } catch (err) {
      console.log("error en beforeCreate");
      console.log(error);
    }
  });
  return Usuarios;
};

