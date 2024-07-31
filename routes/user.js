const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const UserController = require('../controllers/userController');

router.post('/create', [
  body('name').isString().notEmpty().withMessage('El nombre de usuario es obligatorio.'),
  body('email').isString().notEmpty().withMessage('El email es obligatorio'),
  body('phone').isString().notEmpty().withMessage('El número de teléfono es obligatorio'),
  body('password').isString().notEmpty().withMessage('La contraseña es obligatoria'),
], UserController.create);

router.post('/login', [
  body('email').isEmail().notEmpty().withMessage('El email es requerido o no es válido'),
  body('password').isLength({ min: 6 }).notEmpty().withMessage('La contraseña es requerida'),
], UserController.login);

router.get('/user-info', UserController.getUserInfo);

router.get('/:id', [
  body('id').notEmpty().withMessage('El id es requerido o no es válido'),
], UserController.getUserById);



module.exports = router