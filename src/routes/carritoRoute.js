import express from 'express'
import { agregarItem, obtenerCarrito } from '../controllers/carritoController.js'

const router = express.Router()

router.post('/item', agregarItem)
router.get('/:idUsuario', obtenerCarrito)

export default router
