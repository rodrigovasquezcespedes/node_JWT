import { Router } from 'express';
import usuarioController from '../controllers/usuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/usuarios', usuarioController.registrar);
router.post('/login', usuarioController.login);
router.get('/usuarios', authMiddleware, usuarioController.obtenerUsuario);

export default router;
