import express from 'express'
import usuarioController from '../controllers/usuario.js'
import authMiddleware from '../middleware/auth.js';

const router = express.Router()

router.get('/', usuarioController.findAll)
router.post('/registro', usuarioController.registrar);
router.post('/login', usuarioController.login)
router.post('/recuperar-password', usuarioController.recuperarPassword)
router.put('/profile', authMiddleware, usuarioController.updateProfile);

export default router;