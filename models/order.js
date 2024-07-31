const sql = require('../config/config');

const createOrder = async (customer_id, price, shipping_address, item, payment_status, order_status) => {
  try {
    const result = await sql`
      INSERT INTO orders (customer_id, price, shipping_address, item, payment_status, order_status)
      VALUES (${customer_id}, ${price}, ${shipping_address}, ${item}, ${payment_status}, ${order_status})
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    throw new Error('Error al crear la tarea: ' + error.message);
  }
};

const getOrdersById = async (customer_id) => {
  try {
    const result = await sql`
      SELECT * FROM orders
      WHERE customer_id = ${customer_id};
    `;
    return result;
  } catch (error) {
    throw new Error('Error al obtener las mascotas: ' + error.message);
  }
};


module.exports = {
    createOrder,
    getOrdersById,
};