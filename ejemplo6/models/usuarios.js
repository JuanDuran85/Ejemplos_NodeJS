'use strict';
const bcrypt = require('bcrypt');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {}
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
  Usuarios.login = function (email,passwod){
    return Usuarios.findOne({
      where: {
        email: email
      }
    }).then(user => {
       //comparando el password con el guardado
       if (user) {
         return user.autentificacionUsuario(passwod).then(resultado => {
          if (resultado){
            return user;
          } else {
            return null
          }
         });
       } else {
         return null;
       }
    })
  };

  Usuarios.prototype.autentificacionUsuario = function (passwod) {
    return new Promise((res,rej) => {
      bcrypt.compare(passwod, this.passwod_hash, function (err,result) {
        if (err){
          return rej(err);
        }else{
          res(result);
        }
      });
    })
  }

  Usuarios.beforeCreate(async function(user, options) {
    try {
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

