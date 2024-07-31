const sql = require('../config/config');

const createPet = async (user_id, name, weight, breed, sexo) => {
  try {

    const result = await sql`
      INSERT INTO pets (user_id, name, weight, breed, sexo)
      VALUES (${user_id}, ${name}, ${weight}, ${breed}, ${sexo})
      RETURNING *; 
    `;
    return result[0];
  } catch (error) {
    throw new Error('Error al crear la mascota: ' + error.message);
  }
};

const getPetsByUserId = async (user_id) => {
  try {
    const result = await sql`
      SELECT * FROM pets
      WHERE user_id = ${user_id};
    `;
    return result;
  } catch (error) {
    throw new Error('Error al obtener las mascotas: ' + error.message);
  }
};

module.exports = {
    createPet,
    getPetsByUserId,
};