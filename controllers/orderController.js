const { body, validationResult } = require('express-validator');
const OrderModel = require('../models/order');
require('dotenv').config();

const UseOrderController = {
  async create(req, res) {
    console.log('funca')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('funca2345')

    try {
      const { customer_id, price, shipping_address, item, payment_status, order_status } = req.body;

      const order = await OrderModel.createOrder(customer_id, price, shipping_address, item, payment_status, order_status);

      res.status(201).json({ message: 'Orden generada', order });
    } catch (error) {
      console.error('Error al registrar el usuario: ', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getOrders(req, res) {
    const { user_id } = req.params;

    try {
      const orders = await OrderModel.getOrdersById(user_id);
      res.status(201).json({ message: 'Ordenes obtenidas', orders });
    } catch (error) {
      console.error('Error al obtener las ordenes:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

};

module.exports = UseOrderController;
