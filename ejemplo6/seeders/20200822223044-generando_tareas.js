'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tarreas', [
      {
        id: 1,
        descripcion: 'Tarea numero 1',
        createdAt: new Date(),
        updatedAt: new Date,
      },
      {
        id: 2,
        descripcion: 'Tarea numero 2',
        createdAt: new Date(),
        updatedAt: new Date,
      },
      {
        id: 3,
        descripcion: 'Tarea numero 3',
        createdAt: new Date(),
        updatedAt: new Date,
      },
      {
        id: 4,
        descripcion: 'Tarea numero 4',
        createdAt: new Date(),
        updatedAt: new Date,
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tarreas', null, {});
  }
};
