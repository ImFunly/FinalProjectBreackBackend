const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const OrderController = require('../controllers/orderController');

router.post('/create', [
  body('customer_id').notEmpty().withMessage('El id del usuario es obligatorio.'),
  body('price').notEmpty().withMessage('El precio es obligatorio '),
  body('shipping_address').isString().notEmpty().withMessage('La dirección de envio es obligatorio'),
  body('item').isString().notEmpty().withMessage('El producto es obligatorio'),
  body('payment_status').isString().notEmpty().withMessage('El estado del pago es obligatorio'),
  body('order_status').isString().notEmpty().withMessage('El estado de la orden es obligatorio'),
], OrderController.create);

router.get('/:user_id', OrderController.getOrders);

module.exports = router