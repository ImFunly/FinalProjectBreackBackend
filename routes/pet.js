const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const PetController = require('../controllers/petController');

router.post('/create', [
  body('name').isString().notEmpty().withMessage('El nombre es obligatorio'),
  body('weight').isString().notEmpty().withMessage('El peso es obligatorio'),
  body('breed').isString().notEmpty().withMessage('La raza  es obligatorio'),
  body('sexo').isString().notEmpty().withMessage('El sexo es obligatorio'),
], PetController.create);

router.get('/:user_id', PetController.getPets);

module.exports = router