import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const usuarioController = {
  registrar: async (req, res) => {
    const { email, password, rol, lenguage } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const usuario = await Usuario.create(email, hashedPassword, rol, lenguage);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findByEmail(email);
      if (!usuario) {
        return res.status(400).json({ error: 'Credenciales incorrectas' });
      }
      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Credenciales incorrectas' });
      }
      const token = jwt.sign({ email: usuario.email }, process.env.SECRET_KEY);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obtenerUsuario: async (req, res) => {
    const { email } = req.user;
    try {
      const usuario = await Usuario.findByEmail(email);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json([usuario]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default usuarioController;
