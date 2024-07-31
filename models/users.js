const sql = require('../config/config'); 
const UserModel = {
  async createUser(name, email, phone, password) {
    try {
      const result = await sql`
        INSERT INTO users (name, email, phone, password)
        VALUES (${name}, ${email}, ${phone}, ${password})
        RETURNING id, name, email, phone;
      `;
      return result[0];
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }
  },

  async findUserByEmail(email) {
    try {
      const result = await sql`
        SELECT id, name, email, phone, password
        FROM users
        WHERE email = ${email};
      `;
      return result[0];
    } catch (error) {
      console.error('Error al encontrar el usuario:', error);
      return null;
    }
  },

  async findUserById(id) {
    try {
      const result = await sql`
        SELECT id, name, email, phone
        FROM users
        WHERE id = ${id};
      `;
      return result[0];
    } catch (error) {
      return null;
    }
  },
};

module.exports = UserModel;
