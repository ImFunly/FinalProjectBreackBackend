const { body, validationResult } = require('express-validator');
const PetModel = require('../models/pet');

const UsePetController = {
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Errores de validación:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { user_id, name, weight, breed, sexo } = req.body;

      if (!user_id) {
        return res.status(400).json({ error: 'El id del usuario es requerido' });
      }
      console.log("intent id");
      const pet = await PetModel.createPet(user_id, name, weight, breed, sexo);
      
      res.status(201).json({ message: 'Mascota creada con éxito', pet });
    } catch (error) {
      console.error('Error al crear la mascota:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getPets(req, res) {
    const { user_id } = req.params;

    try {
      const pets = await PetModel.getPetsByUserId(user_id);
      res.status(201).json({ message: 'Mascotas obtenidas', pets });
    } catch (error) {
      console.error('Error al obtener las mascotas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = UsePetController;
