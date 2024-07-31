const { validationResult } = require('express-validator');
const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../crypto/config'); 

const UseUserController = {
  async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, password } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await UserModel.createUser(name, email, phone, hashedPassword);

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

      res.status(201).json({ token });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.params.id;

      const user = await UserModel.findUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error al obtener el usuario getUserById:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await UserModel.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
      }

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getUserInfo(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: 'Autorización requerida' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, secret);

      if (!decoded.userId) {
        return res.status(400).json({ error: 'Token inválido' });
      }

      const user = await UserModel.findUserById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  
};

module.exports = UseUserController;
